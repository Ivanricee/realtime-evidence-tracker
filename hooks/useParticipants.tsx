import { getParticipants } from '@/app/actions/participantActions'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'

type response = [Participants[], boolean, SupabaseError | null]

const fetcher = async () => {
  const response = await getParticipants()
  if (response[0]?.data === null) {
    throw new Error('failed to fetch participants')
  }
  return response
}
export function useParticipants(): response {
  const supabase = createClientComponentClient<Database>()
  const { data: participants, error } = useSWR<Participants[]>(
    'participants-key',
    fetcher
  )

  useEffect(() => {
    const channel = supabase
      .channel('participants')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants',
        },
        (payload) => {
          mutate('participants-key')
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase])
  return [participants || [], !error && !participants, error]
}
