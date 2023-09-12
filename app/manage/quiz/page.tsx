/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { QuizResult } from '@/app/dashboard/quiz/QuizResult'
import { AutocompleteParticipant } from '@/components/AutocompleteParticipants'
import { TimerCount } from '@/components/TimerCount'
import { useEditParticipantQuiz } from '@/hooks/useEditParticipantQuiz'
import { useParticipantQuiz } from '@/hooks/useParticipantQuiz'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import Alert from '@mui/material/Alert'
import Questions from './Questions'
import { time } from 'console'

type questionsState = {
  queue: quizResultsView[] | null
  outOfTime: quizResultsView[] | null
  isQueue: boolean
  isOutOfTime: boolean
}
type fnCloseTimerType = {
  timer?: number
}
export default function Quiz() {
  const [participant, setParticipant] = useState<Participants | null>(null)
  const initQuestions = {
    queue: null,
    outOfTime: null,
    isQueue: false,
    isOutOfTime: false,
  }
  const [questions, setQuestion] = useState<questionsState>(initQuestions)
  const [timeOver, setTimeOver] = useState(false)
  const searchParams = useSearchParams()
  const paramParticipantId = searchParams.get('participantId')
  const [participantQuiz, loading, error, getParticipantQuiz] =
    useParticipantQuiz({ participantId: participant?.id ?? null })
  const [editSucceed, loadingEdit, errorEdit, editParticipantQuiz] =
    useEditParticipantQuiz()
  //get question & answers
  useEffect(() => {
    let participantId = participant?.id
    participant && getParticipantQuiz({ participantId: Number(participantId) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participant])

  //check quee and outOfTime questions
  useEffect(() => {
    console.log('useEff on participantQuiz changes', participantQuiz)

    if (participantQuiz.length !== 0) {
      const queue = participantQuiz.filter((participantQuizitem) => {
        const { secondsgone, time } = participantQuizitem
        const reamainTime = time! - secondsgone!
        return reamainTime >= 0
      })
      const ids: number[] = []
      const outOfTime = participantQuiz.filter((answerItem) => {
        const { secondsgone, time, participant_answer, id, status } = answerItem

        const outOfTime = time! - secondsgone! < 0
        const answer = participant_answer === null
        const isPending = outOfTime && answer
        if (isPending) ids.push(id!)
        return isPending
      })
      const isQueue = queue.length > 0
      const isOutOfTime = outOfTime.length > 0
      setQuestion({ queue, outOfTime, isQueue, isOutOfTime })
      if (!isQueue && isOutOfTime) {
        editParticipantQuiz({ ids })
      }
    }
  }, [participantQuiz])

  const handleAutocomplete = (participant: Participants) => {
    if (participant) setParticipant({ ...participant })
  }
  const handleCloseTimer = ({ timer }: fnCloseTimerType) => {
    if (timer === 0) {
      console.log('handleCloseTimer', timer)

      setTimeOver(true)
    } else {
      setQuestion(initQuestions)
    }
  }
  console.log('setTimeOver ', timeOver)

  console.log('currentAnswer ', {
    questions,
    part: participantQuiz.length,
    loading,
    loadingEdit,
    errorEdit,
  })
  // cargar titulo

  return (
    <div className="pt-8 grid place-items-center overflow-y-auto h-full w-full">
      <div className="w-full flex flex-col items-center gap-8 ">
        <AutocompleteParticipant
          participantId={paramParticipantId}
          participant={participant}
          onChange={handleAutocomplete}
        />
        {!questions.isOutOfTime && !questions.isQueue && (
          <Alert variant="outlined" severity="info">
            ¡Elige un participante y prepárate para la próxima pregunta!
          </Alert>
        )}

        {questions.isQueue && (
          <h1 className="text-xl text-emerald-100/90 uppercase">
            Tenemos una pregunta nueva para ti!!
          </h1>
        )}
        {questions.isQueue && // question in queue
          questions.queue!.map((question) => {
            return (
              <TimerCount
                key={question.id}
                delay={question.time!}
                timeGone={question.secondsgone!}
                onTimerEnd={handleCloseTimer}
                hasAnswers
              >
                <Questions questions={questions.queue!} autoAnswer={timeOver} />
              </TimerCount>
            )
          })}

        {questions.isOutOfTime && (
          <h1 className="text-2xl text-emerald-100/90 uppercase">
            Preguntas sin contestar
          </h1>
        )}
        {loadingEdit && (
          <div className="flex flex-col h-full w-full ">
            <h2 className="text-emerald-100/50">
              Actualizando preguntas sin contestar
            </h2>
          </div>
        )}
        {questions.isOutOfTime && //incorrect question O.ofT.
          editSucceed &&
          questions.outOfTime!.map((question) => {
            return (
              <QuizResult
                participant={[question.id!]}
                showDetails={false}
                key={question.id}
              />
            )
          })}
        <Toaster position="bottom-left" richColors closeButton />
      </div>
    </div>
  )
}
