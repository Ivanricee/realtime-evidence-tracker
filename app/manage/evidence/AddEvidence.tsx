'use client'
import { useState, useEffect, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { EvidenceForm } from './EvidenceForm'
import Divider from '@mui/material/Divider'
import { Paper, Skeleton } from '@mui/material'
import { Grow } from '@mui/material'
type Props = {
  participantId: string
  participants: Partial<Participants[]>
}
export function AddEvidence({ participantId, participants }: Props) {
  const [participant, setParticipant] = useState<Participants | null>(null)
  const [loading, setLoading] = useState(true)
  const handleSelectItem = useCallback(
    (participantId: string) => {
      const participantItm = participants.find(
        (participant) => participant?.id === Number(participantId)
      )
      if (participantItm) setParticipant({ ...participantItm })
      setLoading(false)
    },
    [participants]
  )
  useEffect(() => {
    if (participantId !== null) handleSelectItem(participantId)
  }, [handleSelectItem, participantId])

  if (!participant && loading)
    return (
      <>
        <div className=" w-5/12">
          <Skeleton variant="text" className="w-full h-20" />
        </div>
        {participantId && (
          <>
            <Divider flexItem />
            <div className="flex flex-col w-full items-center gap-0">
              <Skeleton variant="text" className="w-3/5 h-20 " />
              <Skeleton variant="text" className="w-full h-20" />
              <Skeleton variant="text" className="w-1/5 h-16 " />
            </div>
          </>
        )}
      </>
    )

  return (
    <>
      {
        <Autocomplete
          disablePortal
          value={participant}
          onChange={(event, value) => handleSelectItem(String(value?.id))}
          id="participant menu"
          autoComplete
          autoHighlight
          openOnFocus
          options={participants}
          getOptionLabel={(option) => (option?.name ? option?.name : '')}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Selecciona un participante" />
          )}
        />
      }
      {participant?.id && (
        <Grow in={Boolean(participant?.id)} className="w-full">
          <div>
            <Divider flexItem />
            <EvidenceForm serverParticipants={participant || null} />
          </div>
        </Grow>
      )}
    </>
  )
}
