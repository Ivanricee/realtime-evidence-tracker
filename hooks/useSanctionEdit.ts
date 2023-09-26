import { editSancion } from '@/app/actions/sanctionActions'
import { useState } from 'react'
import { toast } from 'sonner'

type editProps = {
  id: number
  status: string
  type: string
}
type returnSanctionEdit = [
  editSanctionStatus: ({ id, status, type }: editProps) => void,
  loadEdit: boolean,
]

export const useSanctionEdit = (): returnSanctionEdit => {
  const [loading, setLoading] = useState(false)

  const editSanctionStatus = async ({ id, status, type }: editProps) => {
    setLoading(true)
    const res = await editSancion({ id, status, type })

    if (res === 204) {
      toast.success('Sancion cumplida')
    } else {
      toast.error('Algo salio mal, intenta mas terde')
    }
    await setLoading(false)
  }

  return [editSanctionStatus, loading]
}
