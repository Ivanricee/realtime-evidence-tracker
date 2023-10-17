'use client'

import { useParticipantStats } from '@/hooks/useParticipantStats'
import { useSearchParams } from 'next/navigation'
import ParticipantsStats from './ParticipantsStats'
import { CircularProgress, Skeleton } from '@mui/material'

type Props = {
  params: { id: string }
}
export default function Participants({ params }: Props) {
  const searchParams = useSearchParams()
  const showInfo = searchParams.get('showInfo')
  const position = searchParams.get('position')

  const [stats, loading, revalidateLoading, error] = useParticipantStats()

  //----- stat positions -------
  type PositionStyle = {
    wrap: string
    section: string
    article: string
    section2: string
  }
  const initPosition = {
    wrap: '',
    section: 'flex-col',
    article: 'flex-col items-center ',
    section2: 'flex-col mt-4 ',
  }
  const mapPosition: Record<string, PositionStyle> = {
    left: initPosition,
    right: {
      ...initPosition,
      wrap: 'flex flex-col items-end',
    },
    top: {
      wrap: 'flex',
      section: 'items-center flex-col',
      article: 'flex-row max-w-[18rem] items-start',
      section2: 'flex-row ml-4 items-start ',
    },
    bottom: {
      wrap: 'flex h-full items-end',
      section: ' flex-col-reverse items-center text-center',
      article: 'flex-row max-w-[18rem] items-end',
      section2: 'flex-row ml-4 items-start ',
    },
  }
  const cstStyle = mapPosition[position || ''] ?? initPosition
  //------------------------
  const selectedStat = stats
    ? stats.find((stat) => stat.id === Number(params.id))
    : null
  const filterStats = stats
    ? stats.filter((stat) => stat.id !== Number(params.id))
    : null
  return (
    <>
      <div className={`-m-2 ${cstStyle.wrap}`}>
        <section className={`flex gap-2 ${cstStyle.section}`}>
          <h2 className="bg-zinc-950/60 inline-block px-2 rounded-sm truncate max-w-[173px] text-lg font-medium w-full text-center py-1">
            {selectedStat ? (
              selectedStat?.name
            ) : (
              <Skeleton variant="text" className="w-full h-6 py-5" />
            )}
          </h2>
          <article
            className={`flex text-center min-w-[150px] max-w-[173px] gap-2 ${cstStyle.article}`}
          >
            <div className="flex flex-wrap gap-1 bg-zinc-950/60 p-2 w-full rounded-md">
              <h3 className="w-full text-green-50 text-base font-medium">
                Sanciones
              </h3>
              <div className="flex w-full gap-1">
                <div className="bg-zinc-800/40 rounded-md w-1/2 pt-2">
                  <h4>
                    <small className="text-base">Total</small>
                  </h4>
                  <p className="font-semibold text-2xl">
                    {selectedStat ? (
                      Number(selectedStat?.fulfilled_evidence) +
                      Number(selectedStat?.fulfilled_quiz)
                    ) : (
                      <CircularProgress size="1.5rem" />
                    )}
                  </p>
                </div>
                <div className="bg-zinc-800/40 rounded-md w-1/2  pt-2">
                  <h4>
                    <small>Pendientes</small>
                  </h4>
                  <p className="font-semibold text-2xl">
                    {selectedStat ? (
                      Number(selectedStat?.pending_evidence) +
                      Number(selectedStat?.pending_quiz)
                    ) : (
                      <CircularProgress size="1.5rem" />
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 w-full text-zinc-100/80">
                <div className="bg-zinc-800/40 rounded-md w-1/2  pt-2">
                  <h4>
                    <small>Preguntas</small>
                  </h4>
                  <p className="font-semibold text-lg">
                    {selectedStat ? (
                      `${selectedStat?.fulfilled_quiz} / ${selectedStat?.pending_quiz}`
                    ) : (
                      <CircularProgress size="1.5rem" />
                    )}
                  </p>
                </div>
                <div className="bg-zinc-800/40 rounded-md w-1/2  pt-2">
                  <h4>
                    <small>Evidencias</small>
                  </h4>
                  <p className="font-semibold text-lg">
                    {selectedStat ? (
                      `${selectedStat?.fulfilled_evidence} / ${selectedStat?.pending_evidence}`
                    ) : (
                      <CircularProgress size="1.5rem" />
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 bg-zinc-950/60 p-2 w-full rounded-md">
              <h3 className="w-full text-green-50 text-base font-medium">
                Deudas
              </h3>
              <div className="flex gap-1 w-full text-zinc-100/80">
                <div className="bg-zinc-800/40 rounded-md w-1/2 pt-2">
                  <h4>
                    <small className="text-base">Bits</small>
                  </h4>
                  <p className="font-semibold text-lg">
                    {selectedStat ? (
                      `${selectedStat?.bits}`
                    ) : (
                      <CircularProgress size="1.5rem" />
                    )}
                  </p>
                </div>
                <div className="bg-zinc-800/40 rounded-md w-1/2 pt-2">
                  <h4>
                    <small className="text-base">Subs</small>
                  </h4>
                  <p className="font-semibold text-lg">
                    {selectedStat ? (
                      `${selectedStat?.subs}`
                    ) : (
                      <CircularProgress size="1.5rem" />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
        <section className={`flex gap-1 ${cstStyle.section2}`}>
          {filterStats && showInfo && (
            <ParticipantsStats
              stats={filterStats}
              participantSelected={params.id}
            />
          )}
        </section>
      </div>
    </>
  )
}
