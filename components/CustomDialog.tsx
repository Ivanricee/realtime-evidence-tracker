import { Dialog, DialogTitle, IconButton, styled } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {},
  '& .MuiDialogActions-root': {},
  '& .css-1qxadfk-MuiPaper-root-MuiDialog-paper': {
    backgroundImage: 'linear-gradient(70deg, #1a1a1a, #252425)',
    borderRadius: '1rem',
    padding: '0.5rem',
  },
}))
export type DialogTitleProps = {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
export type Props = {
  children: React.ReactNode
  title: string
  open: boolean
  handleClose: () => void
}
export default function CustomDialog({
  children,
  title,
  open,
  handleClose,
}: Props) {
  const handleCloseBtn = () => {
    handleClose()
  }

  return (
    <div className="w-full text-center pb-4">
      <BootstrapDialog
        onClose={handleCloseBtn}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseBtn}
        >
          {title}
        </BootstrapDialogTitle>
        {children}
      </BootstrapDialog>
    </div>
  )
}
