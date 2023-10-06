/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { AutocompleteParticipant } from '@/components/AutocompleteParticipants'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Questions from './Questions'
import Sanctions from '@/components/Sanctions'
import { QUIZ } from '@/const'

export default function Quiz() {
  const [participant, setParticipant] = useState<Participants | null>(null)

  const searchParams = useSearchParams()
  const paramParticipantId = searchParams.get('participantId')

  const handleAutocomplete = (participant: Participants) => {
    if (participant) setParticipant({ ...participant })
  }

  return (
    <div className="pt-8 grid place-items-center overflow-y-auto h-full w-full px-16">
      <div className="w-full flex flex-col items-center gap-8 ">
        {participant?.id && (
          <Sanctions participantId={participant.id} type={QUIZ} />
        )}
        <div className="min-w-[16rem]">
          <AutocompleteParticipant
            participantId={paramParticipantId}
            participant={participant}
            onChange={handleAutocomplete}
          />
        </div>
        {participant && <Questions participantId={participant?.id} />}
      </div>
    </div>
  )
}
