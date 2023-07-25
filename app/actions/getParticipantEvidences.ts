'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
type Props = {
  participantId: string
}
export const getParticipantEvidences = async ({ participantId }: Props) => {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('participantevidenceview')
      .select('*')
    if (error) {
      return [{ data: null, status: 404 }]
    }

    return data
  } catch (error) {
    console.log('error de conexion ', error)

    return [{ data: null, status: 404 }]
  }
}
