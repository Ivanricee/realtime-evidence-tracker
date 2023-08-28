'use server'

import type { quizData } from '@/types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const getParticipantQuizByid = async ({ ids }: { ids: [number] }) => {
  const supabase = createServerActionClient({ cookies })
  try {
    const { data, error } = await supabase
      .from('participantQuiz')
      .select('*')
      .in('id', ids)
    console.log('action fn ', { data, error })
    if (error) {
      return [{ data: null, status: 404 }]
    }
    return data
  } catch (error) {
    console.log('error de conexion ', error)
    return [{ data: null, status: 404 }]
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
export const addQuiz = async (quizData: quizData) => {
  const supabase = createServerActionClient({ cookies })
  try {
    const { answers, question, participants, time } = quizData
    interface Quiz {
      id: number
    }
    const response: PostgrestSingleResponse<Quiz[]> = await supabase
      .from('quiz')
      .insert([{ question, answers }])
      .select('id')

    if (response.error) {
      console.error(response.error)
      return { data: null, status: 404 }
    } else {
      const { data, status } = response
      if (status === 201) {
        const quizId = data[0].id
        const resPartQuiz = await addParticipantQuiz({
          participants,
          quizId,
          time,
        })
        return { data: resPartQuiz!.data, status: resPartQuiz!.status }
        //revalidatePath(`/dashboard`);
      }
    }
  } catch (error) {
    console.log('error de conexion ', error)
    return { data: null, status: 404 }
  }
}
type addParticipantQuiz = {
  participants: Participants[]
  quizId: number
  time: number
}
type ParticipantQuizMap = {
  participant_id: number
  quiz_id: number
  time: number
}
export const addParticipantQuiz = async ({
  participants,
  quizId,
  time,
}: addParticipantQuiz) => {
  const participantQuiz: ParticipantQuizMap[] = participants?.map(
    (participantItm) => ({
      participant_id: participantItm.id,
      quiz_id: quizId,
      time: Number(time),
    })
  )
  const supabase = createServerActionClient({ cookies })
  try {
    const response = await supabase
      .from('participantQuiz')
      .insert(participantQuiz)
      .select('id')
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
