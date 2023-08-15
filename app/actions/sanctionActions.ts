'use server'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
type EditProps = {
  id: number
  status: string
}
export const editSancion = async ({ id, status }: EditProps) => {
  const supabase = createServerActionClient({ cookies })
  try {
    const result = await supabase
      .from('sancion')
      .update({ status: status })
      .eq('participant_id', id)
    if (result.error) {
      return [{ data: null, status: 404 }]
    }
    //204
    return result.status
  } catch (error) {
    console.log('no pudo actualizar: ', error)

    return [{ data: null, status: 404 }]
  }
}
