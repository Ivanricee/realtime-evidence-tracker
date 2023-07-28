import { getParticipantSancion } from '@/app/actions/getParticipantSancion'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type responseHook = [participantsancionview[], boolean, SupabaseError | null]
export function useRealtimeParticipantSancion(): responseHook {
  const { participant: participantId } = useParams()
  const supabase = createClientComponentClient<Database>()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<SupabaseError | null>(null)
  const [particSancion, setParticSancion] = useState<
    participantsancionview[] | []
  >([])

  useEffect(() => {
    if (!loading) setLoading(true)
    const participantSancion = async () => {
      const response = await getParticipantSancion({ participantId })
      if (response[0]?.data === null) {
        setError(response[0])
      } else {
        setParticSancion(response)
      }
      setLoading(false)
    }
    participantSancion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantId])

  //subscript to sancion then update local state
  useEffect(() => {
    const channel = supabase
      .channel('sancion')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sancion',
        },
        (payload) => {
          const participantSancion = async () => {
            const response = await getParticipantSancion({ participantId })
            if (!response[0]?.error) setParticSancion(response)
          }
          participantSancion()
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
