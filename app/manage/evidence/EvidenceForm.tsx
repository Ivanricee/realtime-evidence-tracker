'use client'
import { Skeleton, TextField } from '@mui/material'

import { useEffect, useRef } from 'react'
import { useAlertToast } from '@/hooks/useAlertToast'
import { NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { addEvidenceAction } from '@/app/actions/addEvidenceAction'
import { AlertToast } from '@/components/AlertToast'
import { Toaster, toast } from 'sonner'
import { Submit } from '@/components/Submit'

type Props = {
  serverParticipants: Participants
}

export function EvidenceForm({ serverParticipants }: Props) {
  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
  const urlRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!serverParticipants) {
      openAlertToast({ feature: PARTICIPANTS, action: SELECT, status: NO_DATA })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitAction = async (formData: FormData) => {
    if (urlRef.current) urlRef.current.value = ''
    const { data, status } = await addEvidenceAction(formData)
    if (status === 201) return toast.success('Evidencia agregada con exito')
    return toast.error('Algo salio mal, intenta mas terde')
  }

  if (!serverParticipants) {
    return (
      alertToast.isOpen && (
        <AlertToast
          alertToast={alertToast}
          resetAlertToast={resetAlertToast}
          linkSrc="/dashboard"
          linkTitle="/dashboard"
        />
      )
    )
  }
  const participant = serverParticipants as Participants
  return (
    <div className="flex flex-col w-full h-full p-4 gap-4 items-center justify-center">
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
          id="url"
          name="url"
          label="Url clip"
          variant="outlined"
          autoFocus
          required
          className="w-full"
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

      {alertToast.isOpen && (
        <AlertToast
          alertToast={alertToast}
          resetAlertToast={resetAlertToast}
          linkSrc="/dashboard"
          linkTitle="/dashboard"
        />
      )}
      <Toaster position="bottom-left" richColors closeButton />
    </div>
  )
}
