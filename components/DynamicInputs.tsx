'use client'
import AddIcon from '@mui/icons-material/Add'
import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  createRef,
} from 'react'
import TextField from '@mui/material/TextField'
import { Button, RadioGroup } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

type Props = {
  title: string
}
type Ref = {
  getValues: () => React.RefObject<HTMLInputElement>[]
  reset: () => void
}

const DynamicInputs = forwardRef<Ref, Props>(({ title }: Props, ref) => {
  const [inputCount, setInputCount] = useState(1)
  const [selectedValue, setSelectedValue] = useState(0)

  const inputsRef = useRef<React.RefObject<HTMLInputElement>[]>([])

  const handleAddInput = () => {
    inputsRef.current.push(createRef<HTMLInputElement>())
    inputCount <= 3 && setInputCount((currentInput) => currentInput + 1)
  }
  useImperativeHandle(ref, () => {
    return {
      getValues: () => inputsRef.current,
      reset: () => {
        inputsRef.current = []
        setInputCount(1)
        setSelectedValue(0)
      },
    }
  })

  return (
    <div>
      <RadioGroup
        name="radio-answer"
        value={selectedValue}
        onChange={(event) => setSelectedValue(+event.target.value)}
      >
        {Array.from({ length: inputCount }).map((_, index) => (
          <div key={index} className="flex first:overflow-hidden px-2">
            <div className="border-l-2 border-b-2 border-violet-400/20 w-5 -translate-y-1/2 "></div>
            <TextField
              autoFocus
              margin="dense"
              id={'answer'}
              name={'answer'}
              label={`Escribe respuesta ${index + 1}`}
              type="text"
              color="primary"
              fullWidth
              variant="outlined"
              required
              ref={inputsRef.current[index]}
              InputProps={{
                endAdornment: (
                  <FormControlLabel
                    value={index}
                    label="correcta"
                    control={<Radio />}
                  />
                ),
              }}
            />
          </div>
        ))}
      </RadioGroup>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleAddInput}
        startIcon={<AddIcon />}
        className="mt-2 mb-4 "
        disabled={inputCount === 4}
      >
        {title}
      </Button>
    </div>
  )
})
DynamicInputs.displayName = 'DynamicInputs'
export { DynamicInputs }
