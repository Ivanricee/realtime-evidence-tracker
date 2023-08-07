import { DialogContent, DialogActions, Button } from '@mui/material'
import CustomDialog from '@/components/CustomDialog'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { deleteParticipant } from '@/app/actions/participantActions'
type PropsEditDelete = {
  isOpen: boolean
  closeModal: () => void
  participant: participantEvidenceView
}

export function DeleteParticipant({
  isOpen,
  closeModal,
  participant,
}: PropsEditDelete) {
  const router = useRouter()
  const handleClickDelete = async (participantId: number) => {
    const result = await deleteParticipant({
      participantId: String(participant.id),
    })
    if (result === 204) {
      toast.success('Partcipante eliminado')
      return router.push('/dashboard')
    }
    closeModal()
    return toast.error('Algo salio mal, intenta mas terde')
  }
  return (
    <CustomDialog title="Confirmación" open={isOpen} handleClose={closeModal}>
      <DialogContent className="pb-0">
        <h1 className="my-4 text-emerald-50/80">
          Estas seguro de borrar a <strong>{participant.name}</strong>
        </h1>
      </DialogContent>
      <DialogActions className="justify-center py-0">
        <Button
          variant="outlined"
          className="mb-2"
          color="primary"
          onClick={() => handleClickDelete(Number(participant.id))}
        >
          Borrar
        </Button>
      </DialogActions>
      <Toaster position="bottom-left" richColors closeButton />
    </CustomDialog>
  )
}
