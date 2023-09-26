'use server'
import { EVIDENCE, QUIZ } from '@/const'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
type EditProps = {
  id: number
  status: string
  type: string
}

export const editSancion = async ({ id, status, type }: EditProps) => {
  const supabase = createServerActionClient({ cookies })
  try {
    let query = supabase
      .from('sancion')
      .update({ status: status })
      .eq('participant_id', id)
      .eq('status', 'pending')

    if (type === EVIDENCE) query = query.not('evidence_id', 'is', null)
    if (type === QUIZ) query = query.not('participant_quiz_id', 'is', null)

    const result = await query

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
