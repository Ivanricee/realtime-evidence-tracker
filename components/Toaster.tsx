import type { Toaster } from '@/types'
import { Alert, AlertColor, AlertTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'

type Props = {
  toaster: Toaster
  resetToaster: () => void
  width?: string
  linkSrc?: string
  linkTitle?: string
}

export function Toaster({
  toaster,
  resetToaster,
  width = 'w-3/6',
  linkTitle = '',
  linkSrc = '',
}: Props) {
  const statusTitle: { [key: string]: string } = {
    success: 'Exito',
    error: 'Error',
    info: 'Info',
  }
  return (
    <Alert
      variant="outlined"
      severity={toaster.connectionStatus as AlertColor}
      className={`${width} snap-center`}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            resetToaster()
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      <AlertTitle>{statusTitle[toaster.connectionStatus]}</AlertTitle>
      {toaster.message}{' '}
      <strong>
        {linkSrc.length !== 0 && <Link href={linkSrc}>{linkTitle}</Link>}
      </strong>
    </Alert>
  )
}
