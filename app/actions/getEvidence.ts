'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
type Props = {
  participantId: string
}
export const getEvidence = async ({ participantId }: Props) => {
  const supabase = createServerComponentClient({ cookies })

  try {
    /* const { count, error } = await supabase
      .from('evidence')
      .select('status', { count: 'exact', head: true })
      .eq('status', 'pending')
      .eq('participant_id', participantId)*/
    let evidenceGby = {}
    const { data, error } = await supabase
      .from('evidence')
      .select('participant_id')
      .eq('status', 'pending')
    if (data) {
      data.forEach((participant) => {
        if (evidenceGby[participant.participant_id]) {
          evidenceGby[participant.participant_id] += 1
        } else {
          evidenceGby[participant.participant_id] = 1
        }
        //return {[participantId]: evidenceGby[participantId] + 1}
      })
      console.log({ evidenceGby })
    }
    if (error) throw new Error('error al obtener evidence')

    return evidenceGby
  } catch (error) {
    console.log('error de conexion ', error)

    return { data: null, status: 404 }
  }
}
