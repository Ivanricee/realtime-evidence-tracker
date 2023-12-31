import { getEvidence } from '@/app/actions/evidenceActions'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type response = [Evidence[], boolean, SupabaseError | null]
export function useRealtimeEvidence(): response {
  const [evidences, setEvidences] = useState<Evidence[] | []>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<SupabaseError | null>(null)
  const supabase = createClientComponentClient()
  const { participant } = useParams()
  const participantId = Array.isArray(participant)
    ? participant[0]
    : participant
  useEffect(() => {
    const getEvidenceRes = async () => {
      const evidence = await getEvidence({ participantId })

      if (evidence[0]?.data === null) {
        setError(evidence[0])
      } else {
        setEvidences(evidence)
      }
      setLoading(false)
    }
    getEvidenceRes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    let filter = {}
    if (participantId) filter = { filter: `participant_id=eq.${participantId}` }

    const channel = supabase
      .channel('evidence')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'evidence',
          ...filter,
        },
        (payload) => {
          setEvidences((prevEvidence) => {
            //eventType: 'DELETE'
            const payloadEvidence = payload.new as Evidence

            const foundEvidence = prevEvidence.findIndex(
              (evidence) => evidence.id === payloadEvidence.id
            )
            if (foundEvidence !== -1) {
              const updateEvidence = {
                ...prevEvidence[foundEvidence],
                ...payloadEvidence,
              }
              const newEvidence = [...prevEvidence]
              newEvidence[foundEvidence] = updateEvidence
              return newEvidence
            }
            return [...prevEvidence, payloadEvidence]
          })
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setEvidences, participantId])
  return [evidences, loading, error]
}
