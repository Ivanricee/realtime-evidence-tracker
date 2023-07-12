import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
type Props = {
  serverParticipants: Participants[]
}
export function useRealtimeParticipants({ serverParticipants }: Props) {
  const [participants, setParticipants] =
    useState<Participants[]>(serverParticipants)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const channel = supabase
      .channel('onlyShot participants')
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
  return participants
}
