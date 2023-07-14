'use client'
import { useRealtimeParticipants } from '@/hooks/useRealtimeParticipants'
import {
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { useState } from 'react'
import AddParticipant from './AddParticipant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  serverParticipants: Participants[]
}

export default function ParticipantMenu({ serverParticipants }: Props) {
  const pathname = usePathname()
  const participants = useRealtimeParticipants({ serverParticipants })

  return (
    <Paper
      elevation={24}
      className="w-3/12 h-full rounded-xl overflow-y-auto
      bg-transparent bg-gradient-to-t from-zinc-800/20 from-15% ... to-50%"
    >
      <h1 className="text-purple-300/60 text-center py-8 pb-4 text-3xl">
        Participantes
      </h1>
      <AddParticipant />
      <Divider />
      <List component="nav" aria-label="participant menu">
        {participants &&
          participants?.map((participant, index) => (
            <Link key={participant.id} href={`/dashboard/${participant.id}`}>
              <ListItemButton
                dense
                selected={pathname === `/dashboard/${participant.id}`}
              >
                <ListItemAvatar className="pr-4">
                  <Avatar
                    alt="profile participant"
                    src={participant.imgProfile!}
                    sx={{ width: 56, height: 56 }}
                  />
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
