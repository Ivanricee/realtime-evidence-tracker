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
    //console.log({ data, error });
    return { data, status }
  } catch (error) {
    console.log('error de conexion particpants', error)

    return { data: null, status: 404 }
  }
}
