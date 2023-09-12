import Answer from './Answer'
import { Divider } from '@mui/material'
const answersA: AnswerType[] = [
  {
    answer: 'respuesta a',
    option: 0,
    isCorrect: true,
  },
  {
    answer: 'respuesta b',
    option: 1,
    isCorrect: false,
  },
  {
    answer: 'respuesta c',
    option: 2,
    isCorrect: false,
  },
]
const questionA = [
  {
    id: 67,
    imgProfile: '¿Pregunta pregunta ?',
    answers: answersA,
  },
]

interface Props {
  questions: quizResultsView[]
  autoAnswer: boolean
}

export default function Questions({ questions, autoAnswer }: Props) {
  console.log('question autoAnswer', autoAnswer)
  return (
    <div className="flex w-4/6 justify-center rounded-lgp-4 ">
      <div className="grid place-content-center text-purple-50/60 w-full">
        {questions &&
          questions.map((question) => {
            return (
              <>
                <h3 className="text-lg  pb-4">¿Pregunta pregunta ?</h3>
                <Answer
                  answers={question.answers!}
                  id={question.id!}
                  autoAnswer={autoAnswer}
                />
              </>
            )
          })}
      </div>
      <div>
        <Divider orientation="vertical" />
      </div>
    </div>
  )
}
