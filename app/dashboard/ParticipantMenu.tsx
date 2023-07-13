'use client'
import { useRealtimeParticipants } from '@/hooks/useRealtimeParticipants'
import {
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemText,
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
    <>
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
    </>
  )
}
