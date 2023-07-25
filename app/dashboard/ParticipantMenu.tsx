'use client'
import { useRealtimeParticipantEvidence } from '@/hooks/useRealtimeParticipantEvidence'
import {
  Avatar,
  Badge,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
} from '@mui/material'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import AddParticipant from './AddParticipant'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useToaster } from '@/hooks/useToaster'
import { Toaster } from '@/components/Toaster'
import { NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { useEffect } from 'react'
import ParticipantStats from '@/components/ParticipantStats/Index'

type Props = {
  expand: boolean
}
type Card = {
  expand: boolean
  children: React.ReactNode
}
function Card({ expand, children }: Card) {
  return (
    <Paper
      elevation={24}
      className={`w-full rounded-xl overflow-y-auto xl:mr-4
  bg-transparent bg-gradient-to-t from-zinc-800/20 from-15% ... to-50%
  ${expand ? 'h-full xl:w-7/12' : 'h-4/6 xl:h-full'}`}
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
export default function ParticipantMenu({ expand = false }: Props) {
  const pathname = usePathname()
  const { participant: participantId } = useParams()
  const [toaster, openToaster, resetToaster] = useToaster()
  const [particEvidence, loading, error] = useRealtimeParticipantEvidence()

  useEffect(() => {
    if (!loading) {
      let status = null
      if (error) status = error.status
      if (particEvidence?.length === 0) status = NO_DATA
      if (status) {
        openToaster({
          feature: PARTICIPANTS,
          action: SELECT,
          status,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particEvidence])

  if (loading)
    return (
      <Card expand>
        <SkeletonList />
      </Card>
    )
  //error/empty data
  if (toaster.isOpen)
    return (
      <Card expand>
        <div className="flex justify-center px-6 mt-6">
          <Toaster toaster={toaster} resetToaster={resetToaster} width="6/6" />
        </div>
      </Card>
    )

  return (
    <>
      {participantId && <ParticipantStats />}

      <Card expand>
        <h1 className="text-purple-300/60 text-center py-8 pb-4 text-3xl">
          Participantes
        </h1>
        <AddParticipant />
        <Divider />

        <List component="nav" aria-label="participant menu">
          {particEvidence?.map((participant) => (
            <Link key={participant.id} href={`/dashboard/${participant.id}`}>
              <ListItemButton
                dense
                selected={pathname === `/dashboard/${participant.id}`}
              >
                <ListItemAvatar className="pr-4">
                  <Badge
                    badgeContent={participant.pendingevidence}
                    color="primary"
                  >
                    <Avatar
                      alt="profile participant"
                      src={participant.imgProfile!}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={participant.name}
                  className="text-gray-400"
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Card>
    </>
  )
}
