/* eslint-disable react-hooks/exhaustive-deps */
import { useFinance } from '@/hooks/useFinance'
import { useParticipants } from '@/hooks/useParticipants'
import { List, Skeleton, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import ItemFinance from './ItemFinance'
import { Toaster } from 'sonner'
import { AlertToast } from '@/components/AlertToast'
import { useAlertToast } from '@/hooks/useAlertToast'
import { FINANCE, NO_DATA, SELECT } from '@/const'

interface Props {
  participant: Participants
}
function SkeletonList() {
  return (
    <div className=" flex gap-4 flex-col w-full">
      {Array.from({ length: 2 }).map((_, index) => {
        return (
          <div
            className="flex gap-2 bg-purple-300/5 rounded-lg p-3"
            key={index}
          >
            <Skeleton
              variant="circular"
              className="w-full bg-green-300/5"
              width={55}
              height={42}
            />
            <Skeleton
              variant="rounded"
              className="w-full bg-green-300/5"
              height={50}
            ></Skeleton>
          </div>
        )
      })}
    </div>
  )
}
export default function ListFinanceDetails({ participant }: Props) {
  const fromParticipantId = participant?.id || null
  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
  const [finance, finLoading, finError] = useFinance({ fromParticipantId })
  const [participants, partLoading, partError] = useParticipants()
  const [mapParticipant, setMapParticipant] = useState<Map<
    number,
    Partial<Participants>
  > | null>(null)

  useEffect(() => {
    if (participants) {
      const draftP = participants.map((item) => {
        const { id, imgProfile, name } = item
        return [id, { imgProfile, name }] as [number, Partial<Participants>]
      })
      const participantMap = new Map(draftP)
      setMapParticipant(participantMap)
    }
  }, [fromParticipantId])
  useEffect(() => {
    //Display an alert for errors or empty data.
    if (alertToast.isOpen) resetAlertToast()
    if (!finLoading) {
      let status = null
      if (finance?.length === 0) status = NO_DATA
      if (finError) status = 404
      if (status !== null) {
        openAlertToast({
          feature: FINANCE,
          action: SELECT,
          status,
        })
      }
    }
  }, [finLoading, finance])

  const deudas = useMemo(
    () =>
      finance?.filter(
        ({ fromParticipant }) => fromParticipantId === fromParticipant
      ) || [],
    [finance, fromParticipantId]
  )
  const deudores = useMemo(
    () =>
      finance?.filter(
        ({ toParticipant }) => fromParticipantId === toParticipant
      ) || [],
    [finance, fromParticipantId]
  )
  const totalDeudas = useMemo(
    () =>
      finance.reduce(
        (accum, financeItm) => {
          let deudaAcc = [...accum]
          const { bits, subscription, fromParticipant } = financeItm
          if (fromParticipantId === fromParticipant) {
            const [accBits, accSubs] = accum
            const sumBits = accBits + (bits || 0)
            const sumSubs = accSubs + (subscription || 0)
            deudaAcc = [sumBits, sumSubs]
          }
          return deudaAcc
        },
        [0, 0]
      ),
    [finance, fromParticipantId]
  )
  const totalDeudores = useMemo(
    () =>
      finance.reduce(
        (accum, financeItm) => {
          let deudaAcc = [...accum]
          const { bits, subscription, toParticipant } = financeItm
          if (fromParticipantId === toParticipant) {
            const [accBits, accSubs] = accum
            const sumBits = accBits + (bits || 0)
            const sumSubs = accSubs + (subscription || 0)
            deudaAcc = [sumBits, sumSubs]
          }
          return deudaAcc
        },
        [0, 0]
      ),
    [finance, fromParticipantId]
  )
  //error/empty data
  if (alertToast.isOpen)
    return (
      <section className="flex gap-4 flex-col lg:flex-row justify-center">
        <div className="flex flex-col gap-4 p-4 bg-purple-300/5 rounded-lg items-center w-full lg:w-1/2">
          <AlertToast
            alertToast={alertToast}
            resetAlertToast={resetAlertToast}
            width="6/6"
          />
        </div>
      </section>
    )
  return (
    <>
      <section className="flex gap-4 flex-col lg:flex-row">
        <div className="flex flex-col gap-4 p-4 bg-purple-300/5 rounded-lg items-center w-full lg:w-1/2">
          <Typography variant="body1" className="text-emerald-200">
            DEUDAS
          </Typography>
          <div className=" rounded-lg px-3 flex gap-4 w-full justify-center">
            <div className="text-center bg-purple-50/10 rounded-lg p-2 w-1/2">
              <p className="text-red-400">-{totalDeudas[0]}</p>
              <p className="text-red-400">Bits </p>
            </div>
            <div className="text-center bg-purple-50/10 rounded-lg p-2 w-1/2">
              <p className="text-red-400">-{totalDeudas[1]}</p>
              <p className="text-red-400">Subs </p>
            </div>
          </div>
          {finLoading && <SkeletonList />}
          <List className="flex flex-col gap-4 w-full">
            {deudas.map((financeItm) => {
              const { toParticipant, id } = financeItm
              const toData = mapParticipant?.get(toParticipant) || null
              return (
                <ItemFinance
                  key={id}
                  id={id}
                  toParticipant={toData}
                  debt={financeItm}
                />
              )
            })}
          </List>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-purple-300/5 rounded-lg items-center w-full lg:w-1/2">
          <Typography variant="body1" className="text-emerald-200">
            DEUDORES
          </Typography>
          <div className=" rounded-lg px-3 flex gap-4 w-full justify-center">
            <div className="text-center bg-purple-50/10 rounded-lg p-2 w-1/2">
              <p className="text-emerald-400">+{totalDeudores[0]}</p>
              <p className="text-emerald-400">Bits </p>
            </div>
            <div className="text-center bg-purple-50/10 rounded-lg p-2 w-1/2">
              <p className="text-emerald-400">+{totalDeudores[1]}</p>
              <p className="text-emerald-400">Subs </p>
            </div>
          </div>
          {finLoading && <SkeletonList />}
          <List className="flex flex-col gap-4 w-full">
            {deudores.map((financeItm) => {
              const { fromParticipant, id } = financeItm
              const fromData = mapParticipant?.get(fromParticipant) || null
              return (
                <ItemFinance
                  key={id}
                  id={id}
                  fromParticipant={fromData}
                  debt={financeItm}
                />
              )
            })}
          </List>
        </div>
        <Toaster position="bottom-left" richColors closeButton />
      </section>
    </>
  )
}
