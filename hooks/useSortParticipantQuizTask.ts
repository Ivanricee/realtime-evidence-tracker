/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useEditParticipantQuiz } from './useEditParticipantQuiz'
type questionsState = {
  queue: quizResultsView[] | null
  outOfTime: quizResultsView[] | null
  isQueue: boolean
  isOutOfTime: boolean
}
interface props {
  participantQuiz: quizResultsView[]
}
export const useSortParticipantQuizTask = ({ participantQuiz }: props) => {
  const initQuestions = {
    queue: null,
    outOfTime: null,
    isQueue: false,
    isOutOfTime: false,
  }
  const [editSucceed, loadingEdit, errorEdit, editParticipantQuiz] =
    useEditParticipantQuiz()
  const [questions, setQuestion] = useState<questionsState>(initQuestions)
  const resetQuestion = () => {
    setQuestion(initQuestions)
  }

  useEffect(() => {
    if (participantQuiz.length !== 0) {
      const queue = participantQuiz.filter((participantQuizitem) => {
        const { secondsgone, time } = participantQuizitem
        const reamainTime = time! - secondsgone!
        return reamainTime >= 0 && participantQuizitem.status === 'pending'
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

  return { questions, resetQuestion, editSucceed, loadingEdit }
}
