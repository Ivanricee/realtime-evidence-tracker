'use server'

import { financeDataType } from '@/types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const addFinance = async (financeData: financeDataType) => {
  const supabase = createServerActionClient({ cookies })
  try {
    const { from, to, bits, subs } = financeData
    const finance = to.map((toParticipant) => ({
      fromParticipant: from,
      toParticipant: toParticipant,
      bits,
      subscription: subs,
    }))
    const response = await supabase.from('finance').insert(finance)
    if (response.error) {
      console.error(response.error)
      return { data: null, status: 404 }
    } else {
      const { data, status } = response
      if (status === 201) {
        return { data, status }
      }
    }
  } catch (error) {
    console.log('error de conexion ', error)
    return { data: null, status: 404 }
  }
}
type getFinanceT = {
  participantId: number
}
export const getFinance = async ({ participantId }: getFinanceT) => {
  const supabase = createServerActionClient({ cookies })
  try {
    const response = await supabase.rpc('query', {
      sql: `
        SELECT * FROM finance
        UNION ALL
        SELECT * FROM participants
      `,
    })
  } catch (error) {
    console.log('error de conexión', error)
    return { data: null, status: 404 }
  }
}
