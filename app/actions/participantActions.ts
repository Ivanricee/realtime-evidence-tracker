'use server'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
type Props = {
  participantId: string | null
}
export const getParticipants = async () => {
  const supabase = createServerActionClient({ cookies })
  try {
    const { data, error } = await supabase
      .from('participants')
      .select()
      .order('name', { ascending: true })
    if (error) {
      return [{ data: null, status: 404 }]
    }
    return data
  } catch (error) {
    console.log('error de conexion ', error)
    return [{ data: null, status: 404 }]
  }
}
export const getParticipantStats = async () => {
  const supabase = createServerActionClient({ cookies })
  try {
    const { data, error } = await supabase.from('participant_stats').select()

    if (error) {
      return [{ data: null, status: 404 }]
    }
    return data
  } catch (error) {
    console.log('error de conexion ', error)
    return [{ data: null, status: 404 }]
  }
}
export const getParticipantsById = async ({ participantId }: Props) => {
  const supabase = createServerActionClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('participants')
      .select('name')
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

export const addParticipantAction = async (formData: FormData) => {
  const name = formData.get('name')
  const imgProfile = formData.get('imgProfile')

  const supabase = createServerActionClient({ cookies })
  try {
    const { data, status } = await supabase
      .from('participants')
      .insert([{ name, imgProfile }])
    //revalidatePath('/dashboard/[participant]')
    return { data, status }
  } catch (error) {
    console.log('error de conexion particpants', error)

    return { data: null, status: 404 }
  }
}

export const editParticipantAction = async (formData: FormData) => {
  const id = formData.get('id')
  const name = formData.get('name')
  const imgProfile = formData.get('imgProfile')
  const supabase = createServerActionClient({ cookies })
  try {
    const { data, status } = await supabase
      .from('participants')
      .update({ name, imgProfile })
      .eq('id', id)
    return { data, status }
  } catch (error) {
    console.log('error de conexion particpants', error)

    return { data: null, status: 404 }
  }
}
export const deleteParticipant = async ({ participantId }: Props) => {
  const supabase = createServerActionClient({
    cookies,
  })

  try {
    const { data, status } = await supabase
      .from('participants')
      .delete()
      .eq('id', participantId)
    if (status !== 204) {
      return [{ data: null, status: 404 }]
    }
    return status
  } catch (error) {
    console.log('error de conexion ', error)

    return [{ data: null, status: 404 }]
  }
}
