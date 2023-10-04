import { editFinanceServer } from '@/app/actions/financeActions'
import { F_COMPLETED, F_INREVIEW } from '@/const'
import { useState } from 'react'
import { toast } from 'sonner'

type editType = { id: number; toBeCompleted?: boolean }
type EditParticipantQuizType = ({
  id,
  toBeCompleted,
}: editType) => Promise<void>
//type resetDataType = () => void
type ResponseType = [
  boolean | null,
  boolean,
  string | null,
  EditParticipantQuizType,
]

export function useEditFinance(): ResponseType {
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [errorEdit, setErrorEdit] = useState<string | ''>('')
  const [editSucceed, setEditSucceed] = useState<boolean | null>(null)
  const resetData = () => {
    editSucceed && setEditSucceed(null)
    errorEdit !== null && setErrorEdit('')
    loadingEdit && setLoadingEdit(false)
    //participantQuiz.length !== 0 && setParticipantQuiz([])
  }

  const editFinance = async ({ id, toBeCompleted = false }: editType) => {
    setLoadingEdit(true)
    const statusVal = toBeCompleted ? F_COMPLETED : F_INREVIEW
    const result = await editFinanceServer({ id, status: statusVal })
    const { data, status } = result[0]
    if (status === 204) {
      let statusMsg = toBeCompleted ? 'Deuda completada' : 'Deuda pagada'
      setEditSucceed(true)
      toast.success(statusMsg)
    } else {
      setErrorEdit('Algo salio mal, intenta mas terde')
      toast.error('Algo salio mal, intenta mas terde')
    }
    resetData()
  }

  return [editSucceed, loadingEdit, errorEdit, editFinance]
}
