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
import { useToaster } from '@/hooks/useToaster'
import { INSERT, PARTICIPANTS } from '@/const'
import { addParticipantAction } from '../actions/addParticipantAction'
import { Toaster } from '@/components/Toaster'
import { Submit } from '../participants/[id]/Submit'
import CustomDialog from '@/components/CustomDialog'

export default function AddParticipant() {
  const [toaster, openToaster, resetToaster] = useToaster()
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useRef<null | HTMLFormElement>(null)
  const openModal = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    if (toaster.isOpen) resetToaster()
    setIsOpen(false)
  }
  const addParticipant = async (formData: FormData) => {
    if (formRef.current) formRef.current.reset()
    if (toaster.isOpen) resetToaster()
    const { data, status } = await addParticipantAction(formData)
    openToaster({ feature: PARTICIPANTS, action: INSERT, status })
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

          {toaster.isOpen && (
            <div className="flex justify-center px-6">
              <Toaster
                toaster={toaster}
                resetToaster={resetToaster}
                width="6/6"
              />
            </div>
          )}
        </form>
      </CustomDialog>
    </div>
  )
}
