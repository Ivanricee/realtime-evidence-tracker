import { editEvidence } from '@/app/actions/evidenceActions'
import { E_REJECTED } from '@/const'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
type Props = {
  evidences: Evidence[]
  status: string
}
type returnEvidenceEdit = [
  evidenceFilter: Evidence[],
  editEvidenceStatus: ({ id, status }: { id: number; status: string }) => void,
  loadEdit: boolean,
]
export const useEvidenceEdit = ({
  evidences,
  status,
}: Props): returnEvidenceEdit => {
  const filterEvidence: () => Evidence[] = useCallback(() => {
    return evidences.filter((evidenceItem) => evidenceItem.status === status)
  }, [evidences, status])
  const evidenceFilter = filterEvidence()

  const [loadEdit, setLoadEdit] = useState(false)

  type editProps = {
    id: number
    status: string
  }
  const editEvidenceStatus = async ({ id, status }: editProps) => {
    setLoadEdit(true)
    const res = await editEvidence({ id, status })
    if (res === 204) {
      let statusMsg = 'Evidencia aceptada'
      if (status === E_REJECTED) statusMsg = 'Evidencia rechazada.'
      toast.success(statusMsg)
    } else {
      toast.error('Algo salio mal, intenta mas terde')
    }
    setLoadEdit(false)
  }

  return [evidenceFilter, editEvidenceStatus, loadEdit]
}
