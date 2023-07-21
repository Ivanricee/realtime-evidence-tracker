'use client'
import { useRealtimeParticipants } from '@/hooks/useRealtimeParticipants'
import {
  Avatar,
  Badge,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import AddParticipant from './AddParticipant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useToaster } from '@/hooks/useToaster'
import { Toaster } from '@/components/Toaster'
import { INSERT, PARTICIPANTS, SELECT } from '@/const'
import { useEffect } from 'react'

type Props = {
  //serverParticipants: participantEvidenceView
}

export default function ParticipantMenu() {
  const pathname = usePathname()
  const [toaster, openToaster, resetToaster] = useToaster()
  const particEvidence = useRealtimeParticipants()
  useEffect(() => {
    //pasar esto a useREaltimePArticipants tat should be renamed to  useREaltiemParticipantsEvidence.
    if (!Array.isArray(particEvidence)) {
      console.log('errore bambino ', { particEvidence })
      openToaster({
        feature: PARTICIPANTS,
        action: SELECT,
        status: particEvidence.status,
      })
    }
  }, [particEvidence])
  return (
    <Paper
      elevation={24}
      className="w-full h-4/6 rounded-xl overflow-y-auto xl:mr-4 xl:w-1/2 xl:h-full
      bg-transparent bg-gradient-to-t from-zinc-800/20 from-15% ... to-50%"
    >
      <h1 className="text-purple-300/60 text-center py-8 pb-4 text-3xl">
        Participantes
      </h1>
      <AddParticipant />
      <Divider />
      {!Array.isArray(particEvidence) && toaster.isOpen && (
        <div className="flex justify-center px-6 mt-6">
          <Toaster toaster={toaster} resetToaster={resetToaster} width="6/6" />
        </div>
      )}
      <List component="nav" aria-label="participant menu">
        {Array.isArray(particEvidence) &&
          particEvidence?.map((participant) => (
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
    </Paper>
  )
}
