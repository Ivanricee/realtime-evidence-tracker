'use client'
import { useRealtimeSancion } from '@/hooks/useRealtimeSancion'
import { Avatar, Paper } from '@mui/material'

type Props = {
  participant: participantsancionview
}
const sancionDir: { [key: string]: string } = {
  0: 'Sin sanciones',
  1: '1 Sancion',
}
export default function ParticipantBadge({ participant }: Props) {
  const { sanciontotal, name } = participant

  return (
    <>
      <div className="w-full  mb-4">
        <div className="flex gap-2 items-center">
          <div>
            <Avatar
              alt="profile participant"
              src={participant.imgProfile!}
              sx={{ width: 56, height: 56 }}
            />
          </div>
          <div className="flex justify-center items-center gap-2 text-blue-300">
            <strong className="text-4xl ">
              {sanciontotal !== null && sanciontotal > 1 && sanciontotal}
            </strong>
            <p className="text-lg flex ">
              {(sanciontotal !== null && sancionDir[sanciontotal]) ||
                'Sanciones'}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center">{name} </h1>
      </div>
    </>
  )
}
