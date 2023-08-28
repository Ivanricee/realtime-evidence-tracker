'use client'
import { AutocompleteParticipant } from '@/components/AutocompleteParticipants'
import { DynamicInputs } from '@/components/DynamicInputs'
import { Submit } from '@/components/Submit'
import { useArrayState } from '@/hooks/useArrayState'
import { useParticipants } from '@/hooks/useParticipants'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useRef, useState } from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { Toaster, toast } from 'sonner'
import { addQuiz } from '@/app/actions/quizActions'
import type { quizAnswers, quizData } from '@/types'
import { useParticipantQuiz } from '@/hooks/useParticipantQuiz'
type TautocompleteRef = {
  getOptionSelected: () => Participants[]
}
type TinputsRef = {
  getValues: () => React.RefObject<HTMLInputElement>[]
  reset: () => void
}

export default function Quiz() {
  const [participantQuiz, loading, error, getParticipantQuiz] =
    useParticipantQuiz()
  const formRef = useRef<HTMLFormElement>(null)
  const inputsRef = useRef<TinputsRef>(null)
  const autocompleteRef = useRef<TautocompleteRef>(null)
  const [timer, setTimer] = useState('31')

  const handleChange = (event: SelectChangeEvent) => {
    setTimer(event.target.value)
  }
  //set timer
  const submitAddQuiz = async (formData: FormData) => {
    const question = formData.get('quiz') as string
    const answersArr = formData.getAll('answer') as string[]
    const optionAnswers = formData.get('radio-answer')
    const answers: quizAnswers[] = answersArr.map((answerItm, index) => ({
      answer: answerItm,
      option: index,
      isCorrect: index === Number(optionAnswers),
    }))
    const selectedParticipants = autocompleteRef.current?.getOptionSelected()
    const time = Number(timer)

    const quizData: quizData = {
      question,
      answers,
      participants: selectedParticipants || [],
      time,
    }
    const response = await addQuiz(quizData)
    if (response) {
      const { data, status } = response
      //console.log('result ', { data, status })

      if (status === 201) {
        //inputsRef.current?.reset()
        //formRef.current?.reset()
        const ids = data?.map((particQuiz) => particQuiz.id) || []
        //console.log('ids ', ids)
        getParticipantQuiz({ ids })
        return toast.success('Quiz agregado con exito')
      }

      return toast.error('Algo salio mal, intenta mas terde')
    }
    //se marcara automaticamente como error si no es presionado el boton con respuesta correcta
  }
  console.log('hook in component state ', { participantQuiz, loading, error })

  return (
    <div
      className="rounded-xl shadow-2xl  h-full gap-4 box-border w-full
      bg-transparent bg-gradient-to-t from-zinc-800/20 from-20% to-65% overflow-hidden"
    >
      <div className="overflow-auto flex flex-col items-center  h-full py-14 px-14">
        <form
          ref={formRef}
          action={submitAddQuiz}
          className="w-full flex flex-col"
        >
          <AutocompleteParticipant ref={autocompleteRef} isMultiple />
          <TextField
            autoFocus
            defaultValue={''}
            margin="dense"
            id="quiz"
            name="quiz"
            label="Escribe una pregunta"
            type="text"
            color="primary"
            fullWidth
            variant="outlined"
            required
          />
          <div className="text-center">
            <DynamicInputs ref={inputsRef} title="Agregar respuesta" />
          </div>
          <div className="mt-6 flex justify-center">
            <FormControl required className="min-w-[200px] w-1/2">
              <InputLabel id="timer">Tiempo para contestar</InputLabel>
              <Select
                labelId="timer"
                id="timer"
                value={timer}
                label="Tiempo para contestar"
                onChange={handleChange}
              >
                <MenuItem value={31}>
                  <em>30 segundos</em>
                </MenuItem>
                <MenuItem value={61}>60 segundos</MenuItem>
                <MenuItem value={91}>90 segundos</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="text-center pt-6">
            <Submit description="Crear Pregunta" />
          </div>
        </form>
      </div>
      <Toaster position="bottom-left" richColors closeButton />
    </div>
  )
}
