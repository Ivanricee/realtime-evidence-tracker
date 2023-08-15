import { editSancion } from '@/app/actions/sanctionActions'
import { useState } from 'react'
import { toast } from 'sonner'

type returnSanctionEdit = [
  editSanctionStatus: ({ id, status }: { id: number; status: string }) => void,
  loadEdit: boolean,
]
type editProps = {
  id: number
  status: string
}
export const useSanctionEdit = (): returnSanctionEdit => {
  const [loading, setLoading] = useState(false)

  const editSanctionStatus = async ({ id, status }: editProps) => {
    setLoading(true)
    const res = await editSancion({ id, status })
    if (res === 204) {
      toast.success('Sancion cumplida')
    } else {
      toast.error('Algo salio mal, intenta mas terde')
    }
    await setLoading(false)
  }

  return [editSanctionStatus, loading]
}
