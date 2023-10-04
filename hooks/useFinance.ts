import { getFinance } from '@/app/actions/financeActions'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'

//type getParticipantQuizType = ({ ids }: getFinanceT) => void

type response = [financeType[], boolean, SupabaseError | null]

interface props {
  fromParticipantId?: null | number
}

const fetcher = async ({ fromParticipantId }: props) => {
  const participantId = fromParticipantId
  const response = participantId ? await getFinance({ participantId }) : []
  if (response[0]?.data === null) {
    throw new Error('failed to fetch participants')
  }

  return response
}

export function useFinance({ fromParticipantId = null }: props): response {
  const supabase = createClientComponentClient()
  const { data: finance, error } = useSWR<financeType[]>(
    ['finance-key', fromParticipantId],
    () => fetcher({ fromParticipantId })
  )

  useEffect(() => {
    const channel = supabase
      .channel('finance')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'finance',
        },
        (payload) => {
          mutate(['finance-key', fromParticipantId])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, fromParticipantId])
  return [finance || [], !error && !finance, error]
}
