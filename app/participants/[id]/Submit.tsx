'use client'

import { Button } from '@mui/material'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import LoadingButton from '@mui/lab/LoadingButton'
type Props = {
  description: string
}
export function Submit({ description }: Props) {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <LoadingButton
        loading
        variant="outlined"
        color="inherit"
        className="border-stone-400 text-stone-300/95 my-6"
      >
        Submit
      </LoadingButton>
    )
  }
  return (
    <Button
      type="submit"
      variant="outlined"
      color="inherit"
      className="border-stone-400 text-stone-300/95 my-6"
    >
      {description}
    </Button>
  )
}
