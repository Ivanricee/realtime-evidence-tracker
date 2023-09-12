import { getParticipantSancion } from '@/app/actions/getParticipantSancion'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

type responseHook = [participantsancionview[], boolean, SupabaseError | null]
type Props = {
  participantId: string | null
  isSingleRow?: boolean
}
export function useRealtimeParticipantSancion({
  participantId,
  isSingleRow = false,
}: Props): responseHook {
  const supabase = createClientComponentClient<Database>()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<SupabaseError | null>(null)
  const [particSancion, setParticSancion] = useState<
    participantsancionview[] | []
  >([])

  useEffect(() => {
    if (participantId) {
      if (!loading) setLoading(true)

      const participantSancion = async () => {
        const response = await getParticipantSancion({ participantId })
        if (response[0]?.data === null) {
          setError(response[0])
        } else {
          setParticSancion(response)
        }
        await setLoading(false)
      }
      participantSancion()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantId])

  //subscript to sancion then update local state
  useEffect(() => {
    const channel = supabase
      .channel('sancion')
      .on(
        'postgres_changes',
        {
          schema: 'public',
          table: 'sancion',
          event: '*',
        },
        (payload: any) => {
          const newParticipantId = payload?.new.participant_id || 0
          if (
            Number(participantId) === newParticipantId ||
            payload.eventType === 'DELETE'
          ) {
            const participantSancion = async () => {
              const response = await getParticipantSancion({ participantId })
              if (!response[0]?.error) setParticSancion(response)
            }
            participantSancion()
          }
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, participantId])
  return [particSancion, loading, error]
}
