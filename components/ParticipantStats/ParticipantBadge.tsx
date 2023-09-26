'use client'

import { Avatar, Badge, Tooltip } from '@mui/material'

type Props = {
  participant: participantsancionview
}
const sancionDir: { [key: string]: string } = {
  0: 'Sin sanciones',
  1: '1 Sancion',
}
export default function ParticipantBadge({ participant }: Props) {
  const { evidencecount, evidencefullfilled, name } = participant

  return (
    <>
      <div className="w-full  mb-4">
        <div className="flex gap-2 items-center">
          <Tooltip title="Sanciones pendientes" placement="right-start">
            <Badge badgeContent={evidencecount} color="error">
              <Avatar
                alt="profile participant"
                src={participant.imgProfile!}
                sx={{ width: 56, height: 56 }}
              />
            </Badge>
          </Tooltip>
          <div className="flex justify-center items-center text-blue-300 flex-wrap w-full">
            <strong className="w-full text-center">{evidencefullfilled}</strong>
            <p className="text-sm flex "> Sanciones totales</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center">{name} </h1>
      </div>
    </>
  )
}
