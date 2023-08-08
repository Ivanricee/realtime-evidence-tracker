import { getParticipants } from '@/app/actions/participantActions'
import { useEffect, useState } from 'react'

type response = [Participants[], boolean, SupabaseError | null]

export function useParticipants(): response {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<SupabaseError | null>(null)
  const [participants, setParticipants] = useState<Participants[] | []>([])

  useEffect(() => {
    const participants = async () => {
      const response = await getParticipants()
      if (response[0]?.data === null) {
        setError(response[0])
      } else {
        setParticipants(response)
      }
      setLoading(false)
    }
    participants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [participants, loading, error]
}
