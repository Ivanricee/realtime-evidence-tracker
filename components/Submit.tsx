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
        color="primary"
        className="my-6"
      >
        Submit
      </LoadingButton>
    )
  }
  return (
    <Button type="submit" variant="outlined" color="primary" className=" my-6">
      {description}
    </Button>
  )
}
