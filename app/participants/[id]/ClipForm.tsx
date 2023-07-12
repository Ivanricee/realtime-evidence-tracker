'use client'
import {
  Alert,
  AlertTitle,
  IconButton,
  Skeleton,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Submit } from './Submit'
import { useEffect, useRef, useState } from 'react'

import { useToaster } from '@/hooks/useToaster'
import { CLIPS } from '@/const'
import { addClipAction } from '@/app/actions/addClipAction'
import { Toaster } from '@/components/Toaster'
type Prop = {
  id: number
  serverParticipants: Participants[]
}
export function ClipForm({ id, serverParticipants }: Prop) {
  const [toaster, openToaster, resetToaster] = useToaster()
  const [participantName, setParticipantName] = useState<string | null>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    serverParticipants.forEach(
      (participant) =>
        participant.id === id && setParticipantName(participant.name)
    )
  }, [id, serverParticipants])

  const submitAction = async (formData: FormData) => {
    if (urlRef.current) urlRef.current.value = ''
    const { data, status } = await addClipAction(formData)
    const toasterParams = { feature: CLIPS, status }
    openToaster(toasterParams)
  }
  console.log({ participantName })

  return (
    <div className="flex w-screen flex-wrap justify-center p-4 gap-4">
      <h1 className="text-center text-6xl">{participantName}</h1>

      {!participantName && (
        <span className="min-w-[150px] w-2/5">
          <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
        </span>
      )}
      <form
        action={submitAction}
        className="w-full flex justify-center flex-wrap"
      >
        <TextField
          inputRef={urlRef}
          fullWidth
          id="url"
          name="url"
          label="Clip"
          variant="outlined"
          autoFocus
          required
        />
        <TextField
          id="participant_id"
          name="participant_id"
          label="Clip"
          defaultValue={id}
          hidden
          variant="outlined"
        />
        <Submit description="Enviar Clip" />
      </form>

      {toaster.isOpen && (
        <Toaster
          toaster={toaster}
          resetToaster={resetToaster}
          linkSrc="/dashboard"
          linkTitle="/dashboard"
        />
      )}
    </div>
  )
}
