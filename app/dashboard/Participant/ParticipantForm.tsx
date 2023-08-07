import CustomDialog from '@/components/CustomDialog'
import { useRef, useState } from 'react'
import {
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Submit } from '@/components/Submit'
import { toast } from 'sonner'
import {
  addParticipantAction,
  editParticipantAction,
} from '@/app/actions/participantActions'
type PropsEditDelete = {
  isOpen: boolean
  closeModal: () => void
  participant?: participantEvidenceView | null
}
export function ParticipantForm({
  isOpen,
  closeModal,
  participant = null,
}: PropsEditDelete) {
  const formRef = useRef<null | HTMLFormElement>(null)
  const addParticipant = async (formData: FormData) => {
    if (formRef.current) formRef.current.reset()
    const { data, status } = await addParticipantAction(formData)
    if (status === 201) return toast.success('Partcipante agregado con exito')
    return toast.error('Algo salio mal, intenta mas terde')
  }
  const editParticipant = async (formData: FormData) => {
    const { data, status } = await editParticipantAction(formData)
    closeModal()
    if (status === 204) return toast.success('Partcipante editado con exito')
    return toast.error('Algo salio mal, intenta mas terde')
  }
  const name = participant ? participant.name : ''
  const url = participant ? participant.imgProfile : ''
  const action = participant ? editParticipant : addParticipant
  const title = participant ? 'Editar Participante' : 'Agregar Participante'
  if (formRef.current) formRef.current.reset()

  return (
    <CustomDialog title={title} open={isOpen} handleClose={closeModal}>
      <form ref={formRef} action={action}>
        <DialogContent className="pb-0">
          {participant && (
            <TextField value={participant.id} id="id" name="id" hidden />
          )}
          <TextField
            autoFocus
            defaultValue={name}
            margin="dense"
            id="name"
            name="name"
            label="Nombre del participante"
            type="text"
            color="primary"
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
            defaultValue={url}
            id="imgProfile"
            name="imgProfile"
            label="Imagen de perfil"
            type="url"
            color="primary"
            fullWidth
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions className="justify-center py-0">
          <Submit description={title} />
        </DialogActions>
      </form>
    </CustomDialog>
  )
}
