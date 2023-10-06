'use client'
import { useRealtimeParticipantEvidence } from '@/hooks/useRealtimeParticipantEvidence'
import { Divider, List, Paper, Skeleton } from '@mui/material'
import AddParticipant from './AddParticipant'
import { useParams } from 'next/navigation'
import { useAlertToast } from '@/hooks/useAlertToast'
import { AlertToast } from '@/components/AlertToast'
import { NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { useEffect } from 'react'
import { ParticipantMenuItem } from './ParticipantMenuItem'

type Card = {
  children: React.ReactNode
}
function Card({ children }: Card) {
  return (
    <Paper
      elevation={12}
      className={`w-full rounded-xl overflow-y-auto bg-transparent
      bg-gradient-to-t from-zinc-800/20 from-15% ... to-50%`}
    >
      {children}
    </Paper>
  )
}
function SkeletonList() {
  return (
    <div className=" flex gap-4 flex-col w-full">
      <Skeleton variant="text" className="text-7xl my-9 mx-8 bg-purple-400/5" />
      {Array.from({ length: 7 }).map((_, index) => {
        return (
          <div className="flex gap-4 px-6" key={index}>
            <Skeleton
              variant="circular"
              className="w-full bg-green-300/5"
              width={85}
              height={60}
            />
            <Skeleton
              variant="rounded"
              className="w-full bg-green-300/5"
              height={60}
            />
          </div>
        )
      })}
    </div>
  )
}
export default function ParticipantMenu() {
  const { participant: participantId } = useParams()
  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
  const [particEvidence, loading, error] = useRealtimeParticipantEvidence()

  useEffect(() => {
    //Display an alert for errors or empty data.
    if (!loading) {
      let status = null
      if (particEvidence?.length === 0) status = NO_DATA
      if (error) status = error.status
      if (status !== null) {
        openAlertToast({
          feature: PARTICIPANTS,
          action: SELECT,
          status,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particEvidence, loading])

  if (loading)
    return (
      <Card>
        <SkeletonList />
      </Card>
    )
  //error/empty data
  if (alertToast.isOpen)
    return (
      <Card>
        <div className="flex justify-center px-6 mt-6">
          <AlertToast
            alertToast={alertToast}
            resetAlertToast={resetAlertToast}
            width="6/6"
          />
        </div>
      </Card>
    )

  return (
    <>
      {/*participantId && <ParticipantStats />*/}
      <Card>
        <h1 className="text-purple-300/60 text-center py-6 pb-2 text-2xl">
          Participantes
        </h1>
        <AddParticipant />
        <Divider />
        <List component="nav" aria-label="participant menu">
          {particEvidence?.map((participant) => {
            return (
              <ParticipantMenuItem
                key={participant.id}
                participant={participant}
              />
            )
          })}
        </List>
      </Card>
    </>
  )
}
