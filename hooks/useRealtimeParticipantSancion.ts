/* eslint-disable react-hooks/exhaustive-deps */
import { getParticipantSancion } from '@/app/actions/getParticipantSancion'
import { debounce } from '@/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useCallback, useEffect, useState } from 'react'

type responseHook = [participantsancionview[], boolean, SupabaseError | null]
type Props = {
  participantId: string | null
  sancionType?: string | null
  isSingleRow?: boolean
}
//issingleRow for when participantId is not needed
export function useRealtimeParticipantSancion({
  participantId,
  sancionType = null,
  isSingleRow = false,
}: Props): responseHook {
  const supabase = createClientComponentClient<Database>()

  const [loading, setLoading] = useState(true)
  const [debounceLoading, setDebounceLoading] = useState(false)
  const [error, setError] = useState<SupabaseError | null>(null)
  const [particSancion, setParticSancion] = useState<
    participantsancionview[] | []
  >([])

  useEffect(() => {
    if (participantId) {
      if (!loading) setLoading(true)

      const participantSancion = async () => {
        const response = await getParticipantSancion({
          participantId,
          sancionType,
        })
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
  const debounceUpdate = useCallback(() => {
    const callback = async () => {
      if (!loading) setLoading(true)

      const participantSancion = async () => {
        const response = await getParticipantSancion({
          participantId,
          sancionType,
        })
        if (response[0]?.data === null) {
          setError(response[0])
        } else {
          setParticSancion(response)
        }
        await setLoading(false)
        setDebounceLoading(false)
      }
      participantSancion()
    }
    const delay = 1000
    const debouncedFn = debounce({ callback, delay })
    setDebounceLoading(true)
    debouncedFn()
  }, [participantId])

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
            debounceUpdate()
          }
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, participantId])
  const isLoading = loading || debounceLoading
  return [particSancion, isLoading, error]
}
