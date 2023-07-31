import type { AlertToast } from '@/types'
import { Alert, AlertColor, AlertTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'

type Props = {
  alertToast: AlertToast
  resetAlertToast: () => void
  width?: string
  description?: string
  closeBtn?: boolean
  linkSrc?: string
  linkTitle?: string
}

export function AlertToast({
  alertToast,
  resetAlertToast,
  width = 'w-3/6',
  description = '',
  closeBtn = true,
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
      severity={alertToast.connectionStatus as AlertColor}
      className={`${width} snap-center`}
      action={
        closeBtn && (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              resetAlertToast()
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )
      }
      sx={{ mb: 2 }}
    >
      <AlertTitle>{statusTitle[alertToast.connectionStatus]}</AlertTitle>
      {alertToast.message}
      {description}{' '}
      <strong>
        {linkSrc.length !== 0 && (
          <Link href={linkSrc} target="_blank" className="underline">
            {linkTitle}
          </Link>
        )}
      </strong>
    </Alert>
  )
}
