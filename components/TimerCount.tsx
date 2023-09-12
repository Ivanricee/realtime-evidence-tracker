import { useState, useEffect, Children } from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'

type fnTimerCEndT = ({ timer }: { timer?: number }) => void
type Props = {
  delay: number
  timeGone?: number
  onTimerEnd: fnTimerCEndT
  hasAnswers?: boolean
  children?: React.ReactNode
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
  timeGone = 0,
  onTimerEnd,
  hasAnswers = false,
  children,
}: Props) {
  const remainingTime = delay - timeGone
  const [timer, setTimer] = useState(remainingTime)
  console.log({ delay, timeGone, timer, timerFloor: Math.floor(timer) })

  useEffect(() => {
    let idInterval: number | null = null
    if (Math.floor(timer) > 0) {
      idInterval = window.setInterval(() => {
        setTimer((cTime) => cTime - 1)
      }, 1000)
    } else {
      console.log('entra aqui al instante?', Math.floor(timer))

      onTimerEnd({ timer: Math.floor(timer) })
    }
    return () => {
      idInterval !== null && clearInterval(idInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])
  const percent = (100 / delay) * timer
  return (
    <div className="flex w-full h-full items-center bg-orange-50/5 gap-4  py-4">
      {children}

      <div
        className={`h-full flex flex-col justify-center items-center
        ${hasAnswers ? 'w-2/6' : 'w-full'}`}
      >
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
    </div>
  )
}
