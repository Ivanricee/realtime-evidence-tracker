import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { useEffect, useState } from 'react'
type Props = {
  serverParticipants: Participants[] | null
  idParticipant: string
}

export function useRealtimeSancion({
  serverParticipants,
  idParticipant,
}: Props) {
  /*const [participants, setParticipants] =
    useState<Participants[]>(serverParticipants)*/
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const channel = supabase
      .channel('Sanciones dashboard')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sancion',
        },
        (payload) => {
          console.log('cambio sancion ', payload)
          //revalidatePath(`dashboard/[participant]`)
          /*setParticipants((prevParticipant) => {
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
          })*/
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])
  //return participants
}
