'use client' // Error components must be Client Components

import { Button } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h2 className="">Algo salio mal</h2>

      <Button
        variant="outlined"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Intenta de nuevo
      </Button>
    </div>
  )
}
