'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  serverParticipants: Participants[]
}

export default function ParticipantList({ serverParticipants }: Props) {
  const [participants, setParticipants] =
    useState<Participants[]>(serverParticipants)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const channel = supabase
      .channel('participants')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants',
        },
        (payload) => {
          setParticipants((prevParticipant) => {
            const payloadParticipant = payload.new as Participants
            const foundParticipant = prevParticipant.findIndex(
              (participant) => participant.id === payloadParticipant.id
            )
            if (foundParticipant !== -1) {
              const updateParticipant = {
                ...prevParticipant[foundParticipant],
                ...payloadParticipant,
              }
              const newParticipants = [...prevParticipant]
              newParticipants[foundParticipant] = updateParticipant
              return newParticipants
            }
            return [...prevParticipant, payloadParticipant]
          })
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setParticipants])
  console.log({ participants })
  return (
    <div>
      <ul className="my-auto text-green-500">
        {participants &&
          participants?.map((participant) => (
            <div key={participant.id} className="bg-red-600">
              <div className="bg-red-600">
                <div key={participant.id}>
                  <Image
                    width="150"
                    height="150"
                    alt="participant profile"
                    src={participant.imgProfile!}
                  />
                  {participant.name}
                </div>
              </div>
            </div>
          ))}
      </ul>
    </div>
  )
}
