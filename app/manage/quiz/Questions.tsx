/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useParticipantQuiz } from '@/hooks/useParticipantQuiz'
import Answer from './Answer'
import { Alert, Collapse } from '@mui/material'
import { QuizResult } from '@/app/dashboard/quiz/QuizResult'
import { Toaster } from 'sonner'
import { useSortParticipantQuizTask } from '@/hooks/useSortParticipantQuizTask'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
interface Props {
  participantId: number
  questions?: quizResultsView[]
  autoAnswer?: boolean
}

export default function Questions({ participantId, autoAnswer }: Props) {
  const [participantQuiz, loading, error, getParticipantQuiz] =
    useParticipantQuiz({ participantId: participantId ?? null })
  const [showAnswer, setShowAnswer] = useState(true)

  //check quee and outOfTime questions
  //editSucced only for auto response
  const { questions, resetQuestion, editSucceed, loadingEdit } =
    useSortParticipantQuizTask({ participantQuiz })

  //get question & answers
  useEffect(() => {
    !showAnswer && setShowAnswer(!showAnswer)
  }, [questions])
  useEffect(() => {
    participantId && getParticipantQuiz({ participantId: participantId })
  }, [participantId])

  //new question to answer
  if (questions.isQueue)
    return (
      <>
        {questions.queue?.map((question) => {
          //questionA.map((question) => {
          return (
            <Collapse key={question.id} in={showAnswer}>
              <Alert
                severity="info"
                className=" place-content-evenly place-items-center text-purple-50/60 w-full flex flex-col-reverse bg-blue-200/5"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowAnswer(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <h1 className="text-xl mb-4 text-emerald-100/90 uppercase text-center">
                  {question.question}
                </h1>
                <Answer
                  answers={question.answers!}
                  id={question.id!}
                  time={question.time!}
                  timeGone={question.secondsgone!}
                />
              </Alert>
            </Collapse>
          )
        })}
        <Toaster position="bottom-left" richColors closeButton />
      </>
    )

  //no data, show info
  if (!questions.isOutOfTime && !questions.isQueue) {
    return (
      <Alert variant="outlined" severity="info">
        ¡Participante seleccionado, prepárate para la próxima pregunta!
      </Alert>
    )
  }

  //Pending question to auto-answer as incorrect

  if (questions.isOutOfTime) {
    return (
      <>
        <h1 className="text-2xl text-emerald-100/90 uppercase">
          Preguntas sin contestar
        </h1>
        {loadingEdit && (
          <div className="flex flex-col h-full w-full ">
            <h2 className="text-emerald-100/50">
              Actualizando preguntas sin contestar
            </h2>
          </div>
        )}
        {editSucceed &&
          questions.outOfTime!.map((question) => {
            return (
              <QuizResult
                participant={question.id!}
                showDetails={false}
                key={question.id}
              />
            )
          })}
      </>
    )
  }
}
