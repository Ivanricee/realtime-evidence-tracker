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

type Props = {
  serverParticipants: Participants[]
}

export default function ParticipantMenu({ serverParticipants }: Props) {
  const participants = useRealtimeParticipants({ serverParticipants })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
  }
  return (
    <>
      <AddParticipant />
      <Divider />
      <List component="nav" aria-label="participant menu">
        {participants &&
          participants?.map((participant, index) => (
            <ListItemButton
              dense
              key={participant.id}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
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
          ))}
      </List>
    </>
  )
}
