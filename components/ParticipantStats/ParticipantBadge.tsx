'use client'
import { useRealtimeSancion } from '@/hooks/useRealtimeSancion'
import { Avatar, Paper } from '@mui/material'

type Props = {
  participant: Participants
  idParticipant: string
}
export default function ParticipantBadge({
  participant,
  idParticipant,
}: Props) {
  const hookParams = { serverParticipants: null, idParticipant }
  //useRealtimeSancion(hookParams)
  return (
    <div className="w-full ">
      <div className="flex gap-2 items-center">
        <div className="">
          <Avatar
            alt="profile participant"
            src={participant.imgProfile!}
            sx={{ width: 56, height: 56 }}
          />
        </div>
        <div className="">
          <p>
            <strong className="text-lg">+4</strong> Evidencias
          </p>
          <p>
            <strong className="text-lg">+4</strong> Preguntas
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-center">{participant.name} </h1>
      </div>
    </div>
  )
}
