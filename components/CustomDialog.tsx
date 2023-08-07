import { Dialog, DialogTitle, IconButton, styled } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {},
  '& .MuiDialogActions-root': {},
  '& .css-1q3oklk-MuiPaper-root-MuiDialog-paper': {
    backgroundImage: 'linear-gradient(70deg, #242224, #363436)',
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
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} className="text-emerald-50/95">
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
    <div className="w-full text-center ">
      <BootstrapDialog
        onClose={handleCloseBtn}
        aria-labelledby="Agregar participante"
        open={open}
      >
        <BootstrapDialogTitle
          id="Agregar participante"
          onClose={handleCloseBtn}
        >
          {title}
        </BootstrapDialogTitle>
        {children}
      </BootstrapDialog>
    </div>
  )
}
