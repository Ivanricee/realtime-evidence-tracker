import { useEffect } from 'react'
import { useParticipantQuiz } from '@/hooks/useParticipantQuiz'
import { NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { useAlertToast } from '@/hooks/useAlertToast'
import { Card } from '@mui/material'
import { AlertToast } from '@/components/AlertToast'
import { Skeleton } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import PendingIcon from '@mui/icons-material/Pending'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import Link from 'next/link'
type Props = {
  participant?: number | number[] | null
  showDetails?: boolean
}
type AnswerType = {
  answer: string
  isCorrect: boolean
}
export function QuizResult({ participant, showDetails = true }: Props) {
  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
  const [participantQuiz, loading, error, getParticipantQuiz] =
    useParticipantQuiz({})
  useEffect(() => {
    if (participant) {
      const ids: number[] = Array.isArray(participant)
        ? participant
        : [participant]
      getParticipantQuiz({ ids })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!loading) {
      let status = null
      if (participantQuiz?.length === 0) status = NO_DATA
      if (error) status = error.status
      if (status !== null) {
        openAlertToast({
          feature: PARTICIPANTS,
          action: SELECT,
          status,
        })
      } else if (alertToast.isOpen) resetAlertToast()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantQuiz, loading])
  if (alertToast.isOpen)
    return (
      <Card>
        <div className="flex justify-center px-6 mt-6">
          <AlertToast
            alertToast={alertToast}
            resetAlertToast={resetAlertToast}
            width="6/6"
            closeBtn={false}
          />
        </div>
      </Card>
    )

  if (loading)
    return (
      <div className="flex flex-col h-full w-full ">
        <div className="mb-8">
          <Skeleton variant="rounded" className="w-1/2 h-6 mb-4" />
          <Skeleton variant="rounded" className="w-full h-16" />
        </div>
        <Skeleton variant="rounded" className="w-full h-24" />
      </div>
    )

  return (
    <div className="flex flex-col h-full w-full ">
      <div className="mb-8">
        {showDetails && (
          <>
            <Divider variant="fullWidth" />
            <h1 className="text-3xl text-emerald-100/90 py-3">
              Resultados de la pregunta:
            </h1>
          </>
        )}
        <h2 className="text-2xl text-emerald-100/50">
          {participantQuiz[0].question}
        </h2>
      </div>

      <List
        className=" w-full min-w-[360px] rounded-md pb-6
         bg-transparent bg-gradient-to-t from-zinc-400/5 from-1% to-100%"
      >
        {participantQuiz.map((PAQuiz) => {
          const { id, name, imgProfile, status, answers } = PAQuiz

          //get answer
          let PAnswer = PAQuiz.participant_answer
          let answer = PAnswer !== null ? answers![Number(PAnswer)]?.answer : ''
          answer ??= 'Sin respuesta'

          const icon =
            status === 'correct' ? (
              <ThumbUpAltIcon className="text-teal-300" />
            ) : (
              <ThumbDownAltIcon className="text-red-400" />
            )
          return (
            <div key={id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={name || ''} src={imgProfile || ''} />
                </ListItemAvatar>
                <ListItemText
                  className="text-emerald-50/90"
                  primary={name}
                  secondary={
                    <>
                      <span className="text-emerald-200">
                        {status === 'pending' ? (
                          <div className=" flex justify-between items-center gap-4">
                            <Chip
                              icon={<PendingIcon className="text-orange-200" />}
                              className="text-orange-200"
                              label="Respuesta pendiente"
                              variant="outlined"
                            />
                            {showDetails && (
                              <Link
                                className="text-emerald-100/60 border-b border-emerald-400/20"
                                target="_blank"
                                href={`/manage/quiz?participantId=${PAQuiz.participant_id}`}
                              >
                                revisar respuesta
                              </Link>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="text-emerald-50/80 truncate">{`Respondio: ${answer}`}</p>
                            <Chip
                              icon={icon}
                              label={`Respuesta ${
                                status === 'correct' ? 'correcta' : 'incorrecta'
                              }`}
                              className={`${
                                status === 'correct'
                                  ? 'text-teal-200'
                                  : 'text-red-200'
                              }`}
                              variant="outlined"
                            />
                          </div>
                        )}
                      </span>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )
        })}
      </List>
    </div>
  )
}
