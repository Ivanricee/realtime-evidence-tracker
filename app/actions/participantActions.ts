'use server'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

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
