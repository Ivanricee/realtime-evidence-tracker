'use client'
import { AutocompleteParticipant } from '@/components/AutocompleteParticipants'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import ListFinanceDetails from './ListFinanceDetails'

export default function Financial() {
  const [participant, setParticipant] = useState<Participants | null>(null)
  const searchParams = useSearchParams()
  const participantId = searchParams.get('participantId')

  const handleAutocomplete = (participant: Participants) => {
    if (participant) setParticipant({ ...participant })
  }

  return (
    <section className="pt-8 grid place-items-center overflow-y-auto h-full w-full">
      <div className="w-full flex flex-col items-center gap-8 ">
        <div className="min-w-[16rem]">
          <AutocompleteParticipant
            participantId={participantId}
            participant={participant}
            onChange={handleAutocomplete}
          />
        </div>
        <div className="w-full">
          {participant && <ListFinanceDetails participant={participant} />}
        </div>
      </div>
    </section>
  )
}
