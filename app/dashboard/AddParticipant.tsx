import {
  DialogActions,
  DialogContent,
  Fab,
  InputAdornment,
  TextField,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add'
import { useRef, useState } from 'react'
import { useAlertToast } from '@/hooks/useAlertToast'
import { INSERT, PARTICIPANTS } from '@/const'
import { addParticipantAction } from '../actions/addParticipantAction'
import { AlertToast } from '@/components/AlertToast'
import { Submit } from '../participants/[id]/Submit'
import CustomDialog from '@/components/CustomDialog'

export default function AddParticipant() {
  const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useRef<null | HTMLFormElement>(null)
  const openModal = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    if (alertToast.isOpen) resetAlertToast()
    setIsOpen(false)
  }
  const addParticipant = async (formData: FormData) => {
    if (formRef.current) formRef.current.reset()
    if (alertToast.isOpen) resetAlertToast()
    const { data, status } = await addParticipantAction(formData)
    openAlertToast({ feature: PARTICIPANTS, action: INSERT, status })
  }

  return (
    <div className="w-full text-center pb-4">
      <div className="w-full ">
        <Fab
          color="inherit"
          aria-label="add participant"
          className="border-solid border-2 border-purple-300/40 text-purple-300/90 hover:bg-slate-900"
          onClick={openModal}
        >
          <AddIcon />
        </Fab>
        <h3 className="text-gray-500 text-xs pt-2"> </h3>
      </div>

      <CustomDialog
        title="Agregar participante"
        open={isOpen}
        handleClose={handleClose}
      >
        <form ref={formRef} action={addParticipant}>
          <DialogContent className="pb-0">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Nombre del participante"
              type="text"
              fullWidth
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              id="imgProfile"
              name="imgProfile"
              label="Imagen de perfil"
              type="url"
              fullWidth
              variant="outlined"
              required
            />
          </DialogContent>
          <DialogActions className="justify-center py-0">
            <Submit description="Agregar participante" />
          </DialogActions>

          {alertToast.isOpen && (
            <div className="flex justify-center px-6">
              <AlertToast
                alertToast={alertToast}
                resetAlertToast={resetAlertToast}
                width="6/6"
              />
            </div>
          )}
        </form>
      </CustomDialog>
    </div>
  )
}
