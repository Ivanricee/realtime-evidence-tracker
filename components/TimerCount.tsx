/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Children } from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'

type fnTimerCEndT = ({ timer }: { timer?: number }) => void
type Props = {
  delay: number
  stop?: boolean
  timeGone?: number
  onTimerEnd: fnTimerCEndT
  hasAnswers?: boolean
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number; label: number; size: string }
) {
  const { value, label, size } = props
  const text = size === 'xl' ? 'text-6xl' : 'text-5xl'
  return (
    <div className="relative flex max-w-sm w-full aspect-square justify-center items-center">
      <CircularProgress variant="determinate" value={value} size="80%" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className={`${text} text-emerald-50/60`}>{label}</h1>
      </div>
    </div>
  )
}
export function TimerCount({
  delay,
  stop = false,
  timeGone = 0,
  onTimerEnd,
  hasAnswers = false,
}: Props) {
  const remainingTime = delay - timeGone
  const [timer, setTimer] = useState(remainingTime)

  useEffect(() => {
    let idInterval: number | null = null
    if (Math.floor(timer) > 0 && !stop) {
      idInterval = window.setInterval(() => {
        idInterval !== null && setTimer((cTime) => cTime - 1)
      }, 1000)
    } else {
      if (Math.floor(timer) === 0 || idInterval !== null) {
        onTimerEnd({ timer: Math.floor(timer) })
        clearInterval(Number(idInterval))
      }
    }
    return () => {
      idInterval !== null && clearInterval(idInterval)
    }
  }, [timer])
  const percent = (100 / delay) * timer
  return (
    <div className="flex flex-col w-full min-w-[15.5rem] h-full items-center  justify-center p-3">
      <CircularProgressWithLabel
        value={percent}
        label={Math.floor(timer)}
        color="primary"
        size={`${hasAnswers ? 'md' : 'xl'}`}
      />
      <h1
        className={` text-emerald-100/40
          ${hasAnswers ? 'text-base' : 'text-xl'}`}
      >
        {hasAnswers
          ? '¡Tiempo en marcha, responde!'
          : 'Esperando respuestas... tic-tac, tic-tac!'}
      </h1>
    </div>
  )
}
