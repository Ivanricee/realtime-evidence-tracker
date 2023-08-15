'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
type Props = {
  participantId: string
}
type EditProps = {
  id: number
  status: string
}
export const getEvidence = async ({ participantId }: Props) => {
  const supabase = createServerActionClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('evidence')
      .select('*')
      .eq('participant_id', participantId)
    if (error) {
      return [{ data: null, status: 404 }]
    }
    return data
  } catch (error) {
    console.log('error de conexion ', error)

    return [{ data: null, status: 404 }]
  }
}

export const editEvidence = async ({ id, status }: EditProps) => {
  const supabase = createServerActionClient({ cookies })
  try {
    const result = await supabase
      .from('evidence')
      .update({ status: status })
      .eq('id', id)

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
