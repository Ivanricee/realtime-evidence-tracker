import { Button, ButtonGroup, Divider, Fade } from '@mui/material'
import { useEffect, useState } from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { useEditParticipantQuiz } from '@/hooks/useEditParticipantQuiz'
import { Toaster } from 'sonner'
interface props {
  answers: AnswerType[]
  id: number
  autoAnswer: boolean
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

export default function Answer({ answers, id, autoAnswer }: props) {
  const [editSucceed, loadingEdit, errorEdit, editParticipantQuiz] =
    useEditParticipantQuiz()
  const [button, setButton] = useState<btnstatusType>({
    isDisabled: false,
    selected: null,
    correctOpt: null,
  })
  useEffect(() => {
    if (autoAnswer) {
      console.log('answer --> useEffect --> autoAnswer changes', autoAnswer)
      const ids = [Number(id)]
      editParticipantQuiz({ ids })
    }
  }, [autoAnswer])
  console.log('auto answered? ', { editSucceed, loadingEdit, errorEdit })

  const handleResponse = ({ isCorrect, option }: fnResponse) => {
    console.log('button', { isCorrect, option })
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

  return (
    <>
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

          const noEvent = !isSelected ? 'pointer-events-none' : ''
          const isEnable = isSelected ? true : btnSelected
          const showColor = isSelected ? 'secondary' : color
          const showIcon = isEnable && btnSelected ? icon : null
          return (
            <Button
              key={option}
              size="large"
              className={`py-3 ${noEvent}`}
              color={showColor}
              disabled={!isEnable}
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
          <h4 className="py-4">
            Respuesta correcta:{' '}
            <strong>Opcion {button.correctOpt! + 1} </strong>
          </h4>
        </Fade>
      )}
      <Toaster position="bottom-left" richColors closeButton />
    </>
  )
}
