import { getParticipantEvidences } from '@/app/actions/getParticipantEvidences'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type response = [participantEvidenceView[], boolean, SupabaseError | null]

export function useRealtimeParticipantEvidence(): response {
  const supabase = createClientComponentClient<Database>()
  const { participant: participantId } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<SupabaseError | null>(null)
  const [particEvidence, setParticEvidence] = useState<
    participantEvidenceView[] | []
  >([])

  // get participants and evidence data/error/loading
  useEffect(() => {
    const participantEvidence = async () => {
      const response = await getParticipantEvidences({
        participantId,
      })
      if (response[0]?.error) {
        setError(response[0])
      } else {
        setParticEvidence(response)
      }
      setLoading(false)
    }
    participantEvidence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //subscript to participants and events then update local state
  useEffect(() => {
    const channel = supabase
      .channel('participants & evidence')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants',
        },
        (payload) => {
          const participantEvidence = async () => {
            const particEvidenceRes = await getParticipantEvidences({
              participantId,
            })
            if (particEvidenceRes) setParticEvidence(particEvidenceRes)
          }
          participantEvidence()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'evidence',
        },
        (payload) => {
          const participantEvidence = async () => {
            const particEvidenceRes = await getParticipantEvidences({
              participantId,
            })
            if (particEvidenceRes) setParticEvidence(particEvidenceRes)
          }
          participantEvidence()
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase])
  return [particEvidence, loading, error]
}
