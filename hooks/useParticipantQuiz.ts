import { getParticipantQuizByid } from '@/app/actions/quizActions'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useEffect, useState } from 'react'
type fnPropsType = {
  ids?: number[] | null
  participantId?: number | null
}
type getParticipantQuizType = ({ ids }: fnPropsType) => void
type resetDataType = () => void
type response = [
  quizResultsView[],
  boolean,
  SupabaseError | null,
  getParticipantQuizType,
  resetDataType?,
]
const supabase = createClientComponentClient()
interface usePQ {
  participantId?: null | number
}
export function useParticipantQuiz({ participantId = null }: usePQ): response {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<SupabaseError | null>(null)
  const [participantQuiz, setParticipantQuiz] = useState<
    quizResultsView[] | []
  >([])

  const resetData = () => {
    error !== null && setError(null)
    !loading && setLoading(true)
    participantQuiz.length !== 0 && setParticipantQuiz([])
  }

  const getParticipantQuiz = async ({
    ids = null,
    participantId = null,
  }: fnPropsType) => {
    const response = await getParticipantQuizByid({ ids, participantId })
    console.log('response server ', response)

    if (response[0]?.data === null) {
      setError(response[0])
    } else {
      setParticipantQuiz(response)
    }
    setLoading(false)
  }
  useEffect(() => {
    let filter = {}
    if (participantId) filter = { filter: `participant_id=eq.${participantId}` }

    const channelPQ = supabase
      .channel('pq-insert-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'participantQuiz',
          ...filter,
        },
        (payload) => {
          //console.log('--- payload --- Change received!-----', payload)
          const ids: number[] = [Number(payload.new.id)]
          getParticipantQuiz({ ids })
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channelPQ)
    }
  }, [participantId])

  return [participantQuiz, loading, error, getParticipantQuiz]
}
