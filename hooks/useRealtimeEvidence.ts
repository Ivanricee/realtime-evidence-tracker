import { getEvidence } from '@/app/actions/getEvidence'
import { getParticipantEvidences } from '@/app/actions/getParticipantEvidences'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useRealtimeEvidence() {
  const [evidence, setEvidence] = useState<number | null>(null)
  const supabase = createClientComponentClient<Database>()
  const { participant: participantId } = useParams()

  useEffect(() => {
    console.log('asdf')
    const getParticipantEvi = async () => {
      const evidence = await getParticipantEvidences({ participantId })
      console.log('hook resp ', evidence)

      if (evidence) setEvidence(evidence)
    }
    getParticipantEvi()
  }, [])
  useEffect(() => {
    const channel = supabase
      .channel('onlyShot participants')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'evidence',
        },
        (payload) => {
          setEvidence((prevEvidence) => {
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
  }, [supabase, setEvidence])
  return evidence
}
