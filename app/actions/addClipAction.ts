'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const addClipAction = async (formData: FormData) => {
  const participantId = formData.get('participant_id')
  const url = formData.get('url')
  const supabase = createServerActionClient({ cookies })
  try {
    const { data, status } = await supabase
      .from('clips')
      .insert([{ participant_id: participantId, url, status: 'pending' }])
    //revalidatePath(`/dashboard`);
    //console.log({ data, error });
    return { data, status }
  } catch (error) {
    console.log('error de conexion ', error)

    return { data: null, status: 404 }
  }
}
