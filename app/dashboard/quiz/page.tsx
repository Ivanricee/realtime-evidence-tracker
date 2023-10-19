'use client'
import { AutocompleteParticipant } from '@/components/AutocompleteParticipants'
import Button from '@mui/material/Button'
import { DynamicInputs } from '@/components/DynamicInputs'
import { Submit } from '@/components/Submit'
import TextField from '@mui/material/TextField'
import { useRef, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { Toaster, toast } from 'sonner'
import { addQuiz } from '@/app/actions/quizActions'
import type { quizAnswers, quizData } from '@/types'
import { TimerCount } from '@/components/TimerCount'
import { QuizResult } from './QuizResult'

type TautocompleteRef = {
  getOptionSelected: () => Participants[]
  reset: () => void
}
type TinputsRef = {
  getValues: () => React.RefObject<HTMLInputElement>[]
  reset: () => void
}
export default function Quiz() {
  const formRef = useRef<HTMLFormElement>(null)
  const inputsRef = useRef<TinputsRef>(null)
  const autocompleteRef = useRef<TautocompleteRef>(null)
  const [delay, setDelay] = useState('30')
  const initResults = {
    show: false, //results
    delay: 0, // show timerCount
    participantQuiz: [] as number[],
  }
  const [results, setResults] = useState(initResults)

  const handleSelectedDelay = (event: SelectChangeEvent) => {
    setDelay(event.target.value)
  }
  const handleResult = () => {
    setResults((currentResults) => ({
      ...currentResults,
      show: true,
      delay: 0,
    }))
  }
  //set delay
  const submitAddQuiz = async (formData: FormData) => {
    const question = formData.get('quiz') as string
    const answersArr = formData.getAll('answer') as string[]
    const answerSelected = formData.get('radio-answer')
    const answers: quizAnswers[] = answersArr.map((answerItm, index) => ({
      answer: answerItm,
      option: index,
      isCorrect: index === Number(answerSelected),
    }))
    const selectedParticipants = autocompleteRef.current?.getOptionSelected()

    const quizData: quizData = {
      question,
      answers,
      participants: selectedParticipants || [],
      time: Number(delay),
    }
    const response = await addQuiz(quizData)
    if (response) {
      const { data, status } = response
      if (status === 201) {
        inputsRef.current?.reset()
        formRef.current?.reset()
        const ids = data?.map((particQuiz) => particQuiz.id) || []
        setResults({
          show: false,
          delay: Number(delay),
          participantQuiz: ids,
        })
        //get participants after finishing delay
        //getParticipantQuiz({ ids })
        return toast.success('Quiz agregado con exito')
      }
      return toast.error('Algo salio mal, intenta mas terde')
    }
  }

  const showForm = results.delay === 0 && !results.show
  const showTimer = results.delay !== 0
  const showResult = results.show

  return (
    <article
      className="h-full w-full flex flex-col items-center rounded-xl shadow-2xl py-14 px-14
      bg-transparent bg-gradient-to-t from-zinc-800/20 from-20% to-65% overflow-auto  "
    >
      {showTimer && (
        <TimerCount delay={results.delay} onTimerEnd={handleResult} />
      )}
      {showResult && (
        <>
          <Button
            variant="outlined"
            className="mb-8"
            onClick={() => setResults(initResults)}
          >
            Nueva pregunta
          </Button>

          <QuizResult participant={results.participantQuiz} />
        </>
      )}
      {showForm && (
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
              <InputLabel id="delaySelect"> contestar</InputLabel>
              <Select
                labelId="delaySelect"
                id="delaySelectOpts"
                value={delay}
                label="Tiempo para contestar"
                onChange={handleSelectedDelay}
              >
                <MenuItem value={30}>
                  <em>30 segundos</em>
                </MenuItem>
                <MenuItem value={60}>60 segundos</MenuItem>
                <MenuItem value={90}>90 segundos</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="text-center pt-6">
            <Submit description="Crear Pregunta" />
          </div>
        </form>
      )}

      <Toaster position="bottom-left" richColors closeButton />
    </article>
  )
}
