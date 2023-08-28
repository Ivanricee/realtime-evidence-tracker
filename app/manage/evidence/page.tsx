'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Grow, Skeleton } from '@mui/material'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { E_FULFILLED } from '@/const'
import { AutocompleteParticipant } from '../../../components/AutocompleteParticipants'
import { EvidenceForm } from './EvidenceForm'
import { useRealtimeParticipantSancion } from '@/hooks/useRealtimeParticipantSancion'
import { useSanctionEdit } from '@/hooks/useSanctionEdit'

export default function Evidence() {
  const [participant, setParticipant] = useState<Participants | null>(null)
  const [editSanctionStatus, loadingSanction] = useSanctionEdit()
  const [sancion, loadingSancion, errorSancion] = useRealtimeParticipantSancion(
    {
      participantId: participant?.id ? String(participant?.id) : null,
      isSingleRow: true,
    }
  )
  const searchParams = useSearchParams()
  const participantId = searchParams.get('participantId')

  const handleAutocomplete = (participant: Participants) => {
    if (participant) setParticipant({ ...participant })
  }

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
        participant={participant}
        onChange={handleAutocomplete}
      />
      {participant?.id && (
        <Grow in={Boolean(participant?.id)} className="w-full">
          <div>
            <Divider flexItem />
            <EvidenceForm serverParticipants={participant || null} />
          </div>
        </Grow>
      )}
      {
        //skeleton for initial participant
        participantId && !participant && (
          <>
            <Divider flexItem />
            <div className="flex flex-col w-full items-center gap-0">
              <Skeleton variant="text" className="w-3/5 h-20 " />
              <Skeleton variant="text" className="w-full h-20" />
              <Skeleton variant="text" className="w-1/5 h-16 " />
            </div>
          </>
        )
      }
    </>
  )
}
