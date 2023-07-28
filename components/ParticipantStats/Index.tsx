'use client'
import { useEffect } from 'react'
import Paper from '@mui/material/Paper'
import { useParams } from 'next/navigation'
import ParticipantBadge from './ParticipantBadge'
import { Divider, Grow, Skeleton } from '@mui/material'
import { useRealtimeParticipantSancion } from '@/hooks/useRealtimeParticipantSancion'
import { useToaster } from '@/hooks/useToaster'
import { NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { Toaster } from '../Toaster'

type Card = {
  children: React.ReactNode
}
function Card({ children }: Card) {
  return (
    <Paper
      className=" rounded-xl p-4 h-full overflow-x-auto
          bg-transparent bg-gradient-to-t from-zinc-800/30 from-20% ... to-35%"
      elevation={12}
    >
      {children}
    </Paper>
  )
}
function SkeletonList() {
  return (
    <div className=" flex gap-4 flex-col w-full">
      <div className="flex gap-4 items-center">
        <Skeleton
          variant="circular"
          className="w-full bg-purple-300/5"
          width={70}
          height={70}
        />
        <Skeleton
          variant="rounded"
          className="w-20 bg-purple-300/5"
          height={30}
        />
      </div>
      <Divider />
    </div>
  )
}
export default function ParticipantStats() {
  const { participant: idParticipant } = useParams()
  const [particSancion, loading, error] = useRealtimeParticipantSancion()
  const [toaster, openToaster, resetToaster] = useToaster()

  useEffect(() => {
    if (!loading) {
      let status = null
      if (particSancion?.length === 0) status = NO_DATA
      if (error) status = error.status
      if (status !== null) {
        openToaster({
          feature: PARTICIPANTS,
          action: SELECT,
          status,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particSancion])

  if (loading)
    return (
      <div className="w-full rounded-xl xl:w-5/12 h-2/6">
        <Card>
          <SkeletonList />
        </Card>
      </div>
    )
  //error/empty data
  if (toaster.isOpen)
    return (
      <div className="w-full rounded-xl xl:w-5/12 h-2/6">
        <Card>
          <div className="flex justify-center px-6 mt-6">
            <Toaster
              toaster={toaster}
              resetToaster={resetToaster}
              width="6/6"
            />
          </div>
        </Card>
      </div>
    )
  return (
    <>
      {particSancion.map((participant) => {
        return (
          <div
            className="min-w-[240px] w-4/5 rounded-xl xl:w-5/12 min-h-[15rem] "
            key={participant.id}
          >
            <Grow in={Boolean(particSancion)} className="h-full">
              <div>
                <Card key={participant.id}>
                  <ParticipantBadge participant={participant} />
                  <Divider />

                  <ol>
                    <li>
                      participant castigo stats
                      <ol>
                        <li>Preguntas Buenas[3] Malas</li>
                        <li>castigos cumplidos[3] rechazados</li>
                        <li>Bits Subs</li>
                        <li>{'--->'} alka </li>
                        <li>{'<---'} ded </li>
                      </ol>
                    </li>
                  </ol>
                </Card>
              </div>
            </Grow>
          </div>
        )
      })}
    </>
  )
}
