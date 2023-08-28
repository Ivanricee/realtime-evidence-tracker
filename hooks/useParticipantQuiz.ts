import { getParticipantQuizByid } from '@/app/actions/quizActions'
import { useState } from 'react'
type getParticipantQuizType = ({ ids }: { ids: number[] }) => void
type response = [
  Participants[],
  boolean,
  SupabaseError | null,
  getParticipantQuizType,
]

export function useParticipantQuiz(): response {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<SupabaseError | null>(null)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [errorEdit, setErrorEdit] = useState<SupabaseError | null>(null)
  const [participantQuiz, setParticipantQuiz] = useState<Participants[] | []>(
    []
  )

  const getParticipantQuiz = async ({ ids }: { ids: number[] }) => {
    setLoading(true)
    if (error !== null) setError(null)
    const response = await getParticipantQuizByid({ ids })
    console.log('participan hook ', response)

    if (response[0]?.data === null) {
      setError(response[0])
    } else {
      setParticipantQuiz(response)
    }
    setLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  //const updateParticipantQuiz = async ({ ids }: { ids: [string] }) => {}
  return [participantQuiz, loading, error, getParticipantQuiz]
}
