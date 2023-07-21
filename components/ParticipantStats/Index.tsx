'use client'

import Paper from '@mui/material/Paper'
import { useParams } from 'next/navigation'
import ParticipantBadge from './ParticipantBadge'
import { Divider } from '@mui/material'
type Props = {
  serverParticipants: Participants[]
}
export default function ParticipantStats({ serverParticipants }: Props) {
  const { participant: idParticipant } = useParams()

  let participants = []
  if (idParticipant) {
    participants.push(
      serverParticipants.find(
        (participant) => participant.id === Number(idParticipant)
      )
    )
  } else {
    participants = serverParticipants
  }

  return (
    <>
      {participants &&
        participants.map((participant) => {
          if (participant?.id === Number(idParticipant)) {
            return (
              <Paper
                key={participant.id}
                className="w-full rounded-xl p-4 xl:w-1/2 h-2/6
          bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-35%"
                elevation={12}
              >
                <ParticipantBadge
                  participant={participant}
                  idParticipant={idParticipant}
                />
                <Divider />
                <h1>{'params.participant'}</h1>
                <p>Participant info</p>
                <small> get stats realtime participant</small>
                <p>components</p>
                <ol>
                  <li>participant badge</li>
                  <li>
                    participant castigo stats
                    <ol>
                      <li>sin cumplir [3]</li>
                      <li>total [17]</li>
                    </ol>
                  </li>
                </ol>
              </Paper>
            )
          }
          return
        })}
    </>
  )
}
