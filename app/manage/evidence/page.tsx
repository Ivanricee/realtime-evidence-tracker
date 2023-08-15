'use client'

import { useParticipants } from '@/hooks/useParticipants'
import { AutocompleteParticipant } from './AutocompleteEvidence'
import { useAlertToast } from '@/hooks/useAlertToast'
import { AlertToast } from '@/components/AlertToast'
import { useEffect, useState } from 'react'
import { E_FULFILLED, NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { Grow, Skeleton } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useSearchParams } from 'next/navigation'
import { EvidenceForm } from './EvidenceForm'
import Button from '@mui/material/Button'
import { useRealtimeParticipantSancion } from '@/hooks/useRealtimeParticipantSancion'
import { useSanctionEdit } from '@/hooks/useSanctionEdit'
import { Toaster } from 'sonner'

export default function Evidence() {
  const [participant, setParticipant] = useState<Participants | null>(null)
  const [participants, loading, error] = useParticipants()
  const [editSanctionStatus, loadingSanction] = useSanctionEdit()
  const [sancion, loadingSancion, errorSancion] = useRealtimeParticipantSancion(
    {
      participantId: participant?.id ? String(participant?.id) : null,
      isSingleRow: true,
    }
  )
  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
  const searchParams = useSearchParams()
  const participantId = searchParams.get('participantId')

  const handleAutocomplete = (participants: Participants) => {
    if (participants) setParticipant({ ...participants })
  }
  useEffect(() => {
    //Display an alert for errors or empty data.
    if (!loading) {
      let status = null
      if (participants?.length === 0) status = NO_DATA
      if (error) status = error.status
      if (status !== null) {
        openAlertToast({
          feature: PARTICIPANTS,
          action: SELECT,
          status,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants, loading])

  if (loading)
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

  if (alertToast.isOpen)
    return (
      <>
        <div className="flex justify-center px-6 mt-6">
          <AlertToast
            alertToast={alertToast}
            resetAlertToast={resetAlertToast}
            width="6/6"
          />
        </div>
      </>
    )
  return (
    <>
      {sancion[0] && (
        <Grow in={Boolean(sancion[0])}>
          <div className="bg-purple-500/10 p-4 w-full flex justify-center items-center mb-10 rounded-lg">
            <div className="w-72 flex justify-between items-center">
              <div className="text-center flex flex-col border border-purple-400/10 p-2">
                <strong className="text-4xl flex justify-center">
                  {loadingSancion ? (
                    <Skeleton variant="rectangular" width={35} height={40} />
                  ) : (
                    sancion[0].sanciontotal
                  )}
                </strong>
                <small>Sanciones</small>
              </div>
              <div>
                <Button
                  variant="outlined"
                  disabled={
                    loadingSancion || sancion[0].sanciontotal === 0
                      ? true
                      : false
                  }
                  onClick={() =>
                    editSanctionStatus({
                      id: Number(sancion[0].id),
                      status: E_FULFILLED,
                    })
                  }
                >
                  Cumplir sanciones
                </Button>
              </div>
            </div>
          </div>
        </Grow>
      )}
      <AutocompleteParticipant
        participantId={participantId}
        participants={participants}
        participant={participant}
        handleAutocomplete={handleAutocomplete}
      />
      {participant?.id && (
        <Grow in={Boolean(participant?.id)} className="w-full">
          <div>
            <Divider flexItem />
            <EvidenceForm serverParticipants={participant || null} />
          </div>
        </Grow>
      )}
      <Toaster position="bottom-left" richColors closeButton />
    </>
  )
}
