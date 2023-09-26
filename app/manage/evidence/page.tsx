'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Grow, Skeleton } from '@mui/material'
import Divider from '@mui/material/Divider'
import { AutocompleteParticipant } from '../../../components/AutocompleteParticipants'
import { EvidenceForm } from './EvidenceForm'

import Sanctions from '@/components/Sanctions'
import { EVIDENCE } from '@/const'

export default function Evidence() {
  const [participant, setParticipant] = useState<Participants | null>(null)

  const searchParams = useSearchParams()
  const participantId = searchParams.get('participantId')

  const handleAutocomplete = (participant: Participants) => {
    if (participant) setParticipant({ ...participant })
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-full">
      {participant?.id && (
        <Sanctions participantId={participant?.id} type={EVIDENCE} />
      )}
      <div className="min-w-[16rem]">
        <AutocompleteParticipant
          participantId={participantId}
          participant={participant}
          onChange={handleAutocomplete}
        />
      </div>
      {participant?.id && (
        <Grow in={Boolean(participant?.id)} className="w-full">
          <div>
            <Divider flexItem />
            <EvidenceForm serverParticipants={participant || null} />
          </div>
        </Grow>
      )}
      {
        //skeleton for initial participant
        participantId && !participant && (
          <>
            <Divider flexItem />
            <div className="flex flex-col w-full items-center gap-0">
              <Skeleton variant="text" className="w-3/5 h-20 " />
              <Skeleton variant="text" className="w-full h-20" />
              <Skeleton variant="text" className="w-1/5 h-16 " />
            </div>
          </>
        )
      }
    </div>
  )
}
