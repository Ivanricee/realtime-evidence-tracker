'use server'

import type { quizData } from '@/types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
type Props = { ids?: number[] | null; participantId?: number | null }
export const getParticipantQuizByid = async ({
  ids = null,
  participantId = null,
}: Props) => {
  const supabase = createServerActionClient({ cookies })
  try {
    let query = supabase.from('quizresults').select('*')
    if (ids !== null) {
      query.in('id', ids)
    } else if (participantId !== null) {
      query.eq('participant_id', participantId)
    }
    const resultQuery = await query

    const { data, error } = resultQuery
    if (error) {
      return [{ data: null, status: 404 }]
    }
    return data
  } catch (error) {
    console.log('error de conexion ', error)
    return [{ data: null, status: 404 }]
  }
}
type editPQType = { ids: number[]; status: string; answer: string }
export const editParticipantQuizAction = async ({
  ids,
  status,
  answer,
}: editPQType) => {
  const supabase = createServerActionClient({ cookies })
  //console.log('edit answer', { ids, status, answer })

  try {
    const result = await supabase
      .from('participantQuiz')
      .update({ status, participant_answer: answer })
      .in('id', ids)
    //console.log('edit res', result)

    if (result.error) {
      return [{ data: null, status: 404 }]
    } else {
      //200
      const { data, status } = result
      if (status === 204) {
        console.log(
          '2--------------------------------------------es correcto ',
          status
        )

        return [{ data, status }]
      }
      return [{ data: null, status: 404 }]
    }
  } catch (error) {
    console.log('error al editar participantQuiz fuera de tiempo', error)
    return [{ data: null, status: 404 }]
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
