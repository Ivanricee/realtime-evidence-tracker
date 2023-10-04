import Button from '@mui/material/Button'
import { Grow, Skeleton } from '@mui/material'
import { EVIDENCE, E_FULFILLED, QUIZ } from '@/const'
import { useRealtimeParticipantSancion } from '@/hooks/useRealtimeParticipantSancion'
import { useSanctionEdit } from '@/hooks/useSanctionEdit'

interface Props {
  participantId: number | null
  type: string
}
export default function Sanctions({ participantId, type }: Props) {
  const [editSanctionStatus, loadingEditSanction] = useSanctionEdit()
  const [sancion, loadingSancion, errorSancion] = useRealtimeParticipantSancion(
    {
      participantId: participantId ? String(participantId) : null,
      sancionType: EVIDENCE,
      isSingleRow: true,
    }
  )

  type sancionT = {
    [key: string]: {
      total: number | null
      fullfilled: number | null
    }
  }
  let sancionT: sancionT = {
    [EVIDENCE]: {
      total: sancion[0]?.evidencecount ?? 0,
      fullfilled: sancion[0]?.evidencefullfilled ?? 0,
    },
    [QUIZ]: {
      total: sancion[0]?.quizcount ?? 0,
      fullfilled: sancion[0]?.quizfullfilled ?? 0,
    },
  } || {
    total: 0,
    fullfilled: 0,
  }

  return (
    <>
      {sancion[0] && (
        <Grow in={Boolean(sancion[0])}>
          <div className="bg-purple-100/10 p-4 w-full flex justify-center items-center mb-10 rounded-lg">
            <div className="w-72 flex justify-between items-center">
              <div className="text-center flex flex-col border border-purple-400/10 p-2">
                <strong className="text-4xl flex justify-center">
                  {loadingSancion ? (
                    <Skeleton variant="rectangular" width={35} height={40} />
                  ) : (
                    sancionT[type].total
                  )}
                </strong>
                <small>Sanciones</small>
              </div>
              <div>
                <Button
                  variant="outlined"
                  disabled={
                    loadingSancion || sancionT[type].total === 0
                      ? true
                      : false || loadingEditSanction
                  }
                  onClick={() =>
                    editSanctionStatus({
                      id: Number(sancion[0].id),
                      status: E_FULFILLED,
                      type,
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
    </>
  )
}
