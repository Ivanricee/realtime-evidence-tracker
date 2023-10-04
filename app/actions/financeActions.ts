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
    const { data, error } = await supabase
      .from('finance')
      .select('*')
      .or(
        `fromParticipant.eq.${participantId},toParticipant.eq.${participantId}`
      )

    if (error) {
      return [{ data: null, status: 404 }]
    }
    return data
  } catch (error) {
    console.log('error de conexion ', error)

    return [{ data: null, status: 404 }]
  }
}
type editType = { id: number; status: string }
export const editFinanceServer = async ({ id, status }: editType) => {
  const supabase = createServerActionClient({ cookies })
  try {
    const result = await supabase
      .from('finance')
      .update({ status })
      .eq('id', id)

    if (result.error) {
      return [{ data: null, status: 404 }]
    } else {
      //200
      const { data, status } = result
      if (status === 204) {
        return [{ data, status }]
      }
      return [{ data: null, status: 404 }]
    }
  } catch (error) {
    console.log('error al editar finance fuera de tiempo', error)
    return [{ data: null, status: 404 }]
  }
}
