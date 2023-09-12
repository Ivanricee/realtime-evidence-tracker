import { editParticipantQuizAction } from '@/app/actions/quizActions'
import { useState } from 'react'
import { toast } from 'sonner'

type editPQType = { ids: number[]; statusPQ?: string; answer?: string }
type EditParticipantQuizType = ({
  ids,
  statusPQ,
  answer,
}: editPQType) => Promise<void>
type resetDataType = () => void
type ResponseType = [boolean, boolean, string | null, EditParticipantQuizType]

export function useEditParticipantQuiz(): ResponseType {
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [errorEdit, setErrorEdit] = useState<string | ''>('')
  const [editSucceed, setEditSucceed] = useState(Boolean)
  /* const resetData = () => {
     editSucceed && setEditSucceed(true)
    error !== null && setError(null)
    !loading && setLoading(true)
    participantQuiz.length !== 0 && setParticipantQuiz([])
  }*/

  const editParticipantQuiz = async ({
    ids,
    statusPQ = 'incorrect',
    answer = '-1',
  }: editPQType) => {
    setLoadingEdit(true)
    const result = await editParticipantQuizAction({
      ids,
      status: statusPQ,
      answer,
    })
    const { data, status } = result[0]
    if (status === 204) {
      let statusMsg = 'Preguntas contestada correctamente'
      setEditSucceed(true)
      toast.success(statusMsg)
    } else {
      setErrorEdit('Algo salio mal, intenta mas terde')
      toast.error('Algo salio mal, intenta mas terde')
    }
    setLoadingEdit(false)
  }

  return [editSucceed, loadingEdit, errorEdit, editParticipantQuiz]
}
