'use server'

import { EVIDENCE } from '@/const'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
type Props = {
  participantId: string | null
  sancionType: string | null
}
export const getParticipantSancion = async ({
  participantId,
  sancionType,
}: Props) => {
  const supabase = createServerActionClient({ cookies })
  try {
    let query = supabase.from('participantsancionview').select('*')

    //if (sancionType && sancionType === EVIDENCE) query = query.eq('')
    if (participantId) query = query.eq('id', participantId)
    const { data, error } = await query
    if (error) {
      return [{ data: null, status: 404 }]
    }

    return data
  } catch (error) {
    console.log('error de conexion ', error)

    return [{ data: null, status: 404 }]
  }
}
