'use client'

import { useParticipants } from '@/hooks/useParticipants'
import { AutocompleteParticipant } from './AutocompleteEvidence'
import { useAlertToast } from '@/hooks/useAlertToast'
import { AlertToast } from '@/components/AlertToast'
import { useEffect, useState } from 'react'
import { NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { Grow, Skeleton } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useSearchParams } from 'next/navigation'
import { EvidenceForm } from './EvidenceForm'
type Props = {
  searchParams: { participantId: string }
}

export default function Evidence() {
  const [participant, setParticipant] = useState<Participants | null>(null)
  const [participants, loading, error] = useParticipants()
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
  //error/empty data
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
    </>
  )
}
