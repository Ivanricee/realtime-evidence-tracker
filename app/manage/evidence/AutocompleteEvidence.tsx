'use client'
import { useEffect, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

type Props = {
  participantId: string | null
  participants: Partial<Participants[]>
  participant: Participants | null
  handleAutocomplete: (participants: Participants) => void
}
export function AutocompleteParticipant({
  participantId,
  participants,
  participant,
  handleAutocomplete,
}: Props) {
  const handleSelectItem = useCallback(
    (participantId: string) => {
      const participantItm = participants.find(
        (participant) => participant?.id === Number(participantId)
      )
      if (participantItm) {
        handleAutocomplete(participantItm)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [participants]
  )
  useEffect(() => {
    if (participantId !== null) handleSelectItem(participantId)
  }, [handleSelectItem, participantId])

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
    </>
  )
}
