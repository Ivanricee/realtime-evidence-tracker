'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
type Props = {
  participantId: string | null
}
export const getParticipantSancion = async ({ participantId }: Props) => {
  const supabase = createServerComponentClient({ cookies })

  try {
    let query = supabase.from('participantsancionview').select('*')

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
