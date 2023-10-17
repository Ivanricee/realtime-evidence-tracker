'use client'

import { Avatar } from '@mui/material'

interface Props {
  stats: participantStats[]
  participantSelected: string
}

export default function ParticipantsStats({
  stats,
  participantSelected,
}: Props) {
  return (
    <>
      {stats.map((stat) => {
        return (
          <article
            key={stat.id}
            className="flex items-center min-w-[150px] max-w-[158px] gap-2 w-full text-zinc-100/80 text-center"
          >
            <div className="flex gap-1 bg-lime-950/60 p-1 w-full rounded-md items-center">
              <Avatar
                alt={stat.name || ''}
                src={stat.imgProfile || ''}
                className="w-9 h-9"
              />
              <div className="bg-zinc-800/50 rounded-md  px-1">
                <h4>
                  <small className="text-sm">Total</small>
                </h4>
                <p className="font-semibold text-lg">
                  {Number(stat?.fulfilled_evidence) +
                    Number(stat?.fulfilled_quiz)}
                </p>
              </div>
              <div className="bg-zinc-800/50 rounded-md px-1">
                <h4>
                  <small>Pendiente</small>
                </h4>
                <p className="font-semibold text-lg">
                  {Number(stat?.pending_evidence) + Number(stat?.pending_quiz)}
                </p>
              </div>
            </div>
          </article>
        )
      })}
    </>
  )
}
