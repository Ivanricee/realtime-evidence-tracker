/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ButtonGroup, Divider, Fade } from '@mui/material'
import { useState } from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { useEditParticipantQuiz } from '@/hooks/useEditParticipantQuiz'
import { Toaster } from 'sonner'
import { TimerCount } from '@/components/TimerCount'

interface props {
  answers: AnswerType[]
  id: number
  time: number
  timeGone: number
}
type fnResponse = {
  isCorrect: boolean
  option: number
}
type btnstatusType = {
  isDisabled: boolean
  selected: null | number
  correctOpt: number | null
}
type fnCloseTimerType = {
  timer?: number
}

export default function Answer(props: props) {
  const { answers, id, time, timeGone } = props
  const [editSucceed, loadingEdit, errorEdit, editParticipantQuiz] =
    useEditParticipantQuiz()
  const [button, setButton] = useState<btnstatusType>({
    isDisabled: false,
    selected: null,
    correctOpt: null,
  })
  const [timeOver, setTimeOver] = useState(false)
  const handleResponse = ({ isCorrect, option }: fnResponse) => {
    if (!timeOver) {
      const answer = answers.find((itm) => itm.isCorrect)
      setButton({
        isDisabled: isCorrect,
        selected: option,
        correctOpt: answer?.option!,
      })

      if (button.selected === null) {
        const ids = [Number(id)]
        const answer = String(option)
        const statusPQ = isCorrect ? 'correct' : 'incorrect'
        editParticipantQuiz({ ids, answer, statusPQ })
      }
    }
  }
  const handleOnTimerEnd = ({ timer }: fnCloseTimerType) => {
    if (timer === 0) {
      setTimeOver(true)
      const ids = [Number(id)]
      editParticipantQuiz({ ids })
      //resetQuestion()
    }
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center rounded-lg xl:flex-row ">
      <div className="flex flex-col w-full min-w-[18rem] h-full justify-center items-center px-6 py-6 gap-4">
        <h2>Selecciona una opcion:</h2>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
          {answers.map((answerItm) => {
            const { answer, isCorrect, option } = answerItm
            const isSelected = button.selected === null
            const btnSelected = button.selected === option
            const icon = isCorrect ? <ThumbUpAltIcon /> : <ThumbDownIcon />
            const color = isCorrect ? 'primary' : 'error'

            const noEvent = !isSelected || timeOver ? 'pointer-events-none' : ''
            const isEnable = isSelected ? true : btnSelected
            const showColor = isSelected ? 'secondary' : color
            const showIcon = isEnable && btnSelected ? icon : null

            return (
              <Button
                key={option}
                size="large"
                className={`py-3 ${noEvent}`}
                color={showColor}
                disabled={!isEnable || timeOver}
                onClick={() =>
                  handleResponse({
                    isCorrect,
                    option: option,
                  })
                }
                startIcon={showIcon}
              >
                {`${option + 1}. ${answer}`}
              </Button>
            )
          })}
        </ButtonGroup>
        {editSucceed && !button.isDisabled && button.correctOpt !== null && (
          <Fade
            in={editSucceed && !button.isDisabled && button.correctOpt !== null}
            timeout={300}
          >
            <h4 className="pt-4">
              Respuesta correcta:{' '}
              <strong>Opcion {button.correctOpt! + 1} </strong>
            </h4>
          </Fade>
        )}
        {timeOver && (
          <Fade in={timeOver} timeout={300}>
            <h4 className="pt-4">
              Tiempo agotado, marcamos la pregunta como{' '}
              <strong className="text-red-300/80">incorrecta</strong>
            </h4>
          </Fade>
        )}
      </div>

      <Divider
        orientation="vertical"
        flexItem
        className={`${timeOver ? 'hidden' : ''}`}
      />

      <div
        className={`h-full flex flex-col justify-center items-center ${
          timeOver ? 'hidden' : ''
        }`}
      >
        <TimerCount
          delay={time} //question.time!
          stop={button.selected !== null}
          timeGone={timeGone} //question.secondsgone!
          onTimerEnd={handleOnTimerEnd}
          hasAnswers
        />
      </div>
      <Toaster position="bottom-left" richColors closeButton />
    </div>
  )
}
