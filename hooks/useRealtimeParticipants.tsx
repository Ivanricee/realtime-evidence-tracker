import { getParticipantEvidences } from '@/app/actions/getParticipantEvidences'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  //serverParticipants: Participants[]
}
export function useRealtimeParticipants() {
  const [particEvidence, setparticEvidence] = useState<
    participantEvidenceView[] | SupabaseError | []
  >([])

  const { participant: participantId } = useParams()
  // get participants and evidence data
  useEffect(() => {
    const participantEvidence = async () => {
      const particEvidenceRes = await getParticipantEvidences({
        participantId,
      })
      if (particEvidenceRes) setparticEvidence(particEvidenceRes)
    }
    participantEvidence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const supabase = createClientComponentClient<Database>()
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
            if (particEvidenceRes) setparticEvidence(particEvidenceRes)
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
            if (particEvidenceRes) setparticEvidence(particEvidenceRes)
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
  return particEvidence
}
