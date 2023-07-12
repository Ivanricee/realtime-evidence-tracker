import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import ParticipantList from './ParticipantList'

export default async function Participants() {
  const supabase = createServerComponentClient({ cookies })
  const { data: participants, error } = await supabase
    .from('participants')
    .select()

  console.log({ participants })

  return (
    <>
      <ParticipantList serverParticipants={participants ?? []} />
    </>
  )
}
