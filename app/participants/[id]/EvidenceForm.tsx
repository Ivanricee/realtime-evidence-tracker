'use client'
import { Skeleton, TextField } from '@mui/material'
import { Submit } from './Submit'
import { useEffect, useRef } from 'react'
import { useToaster } from '@/hooks/useToaster'
import { EVIDENCE, INSERT, NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { addEvidenceAction } from '@/app/actions/addEvidenceAction'
import { Toaster } from '@/components/Toaster'

type Props = {
  serverParticipants: Participants[] | []
}

export function EvidenceForm({ serverParticipants }: Props) {
  const [toaster, openToaster, resetToaster] = useToaster()

  const urlRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (serverParticipants.length === 0) {
      openToaster({ feature: PARTICIPANTS, action: SELECT, status: NO_DATA })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitAction = async (formData: FormData) => {
    if (urlRef.current) urlRef.current.value = ''
    const { data, status } = await addEvidenceAction(formData)
    openToaster({ feature: EVIDENCE, action: INSERT, status })
  }

  if (serverParticipants.length === 0) {
    return (
      toaster.isOpen && (
        <Toaster
          toaster={toaster}
          resetToaster={resetToaster}
          linkSrc="/dashboard"
          linkTitle="/dashboard"
        />
      )
    )
  }
  const participant = serverParticipants[0] as Participants
  return (
    <div className="flex w-screen flex-wrap justify-center p-4 gap-4">
      <h1 className="text-center text-6xl">{participant.name}</h1>

      {!participant.name && (
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
          label="Url clip"
          variant="outlined"
          autoFocus
          required
        />
        <TextField
          id="participant_id"
          name="participant_id"
          label="participant id"
          defaultValue={participant.id}
          className="absolute invisible"
          variant="outlined"
        />
        <Submit description="Enviar Evidencia" />
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
