import { getParticipantStats } from '@/app/actions/participantActions'
import { debounce } from '@/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'

type response = [participantStats[], boolean, boolean, SupabaseError | null]

const fetcher = async () => {
  const response = await getParticipantStats()
  if (response[0]?.data === null) {
    throw new Error('failed to fetch participants')
  }
  return response
}

export function useParticipantStats(): response {
  const supabase = createClientComponentClient()
  const [debounceLoading, setDebounceLoading] = useState(false)
  const { data: participantStats, error } = useSWR<participantStats[]>(
    ['participantStats-key'],
    () => fetcher()
  )

  useEffect(() => {
    const callback = () => {
      setDebounceLoading(false)
      return mutate(['participantStats-key'])
    }
    const mutateDebounce = debounce({ callback, delay: 2500 })
    const channel = supabase
      .channel('sancion & finance')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sancion' },
        (payload) => {
          !debounceLoading && setDebounceLoading(true)
          mutateDebounce()
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'finance' },
        (payload) => {
          !debounceLoading && setDebounceLoading(true)
          mutateDebounce()
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'participants' },
        (payload) => {
          !debounceLoading && setDebounceLoading(true)
          mutateDebounce()
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase])

  const loading = !error && !participantStats
  return [participantStats || [], loading, debounceLoading, error]
}
