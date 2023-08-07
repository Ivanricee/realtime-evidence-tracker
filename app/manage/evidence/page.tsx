import { cookies } from 'next/headers'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { AddEvidence } from './AddEvidence'

type Props = {
  searchParams: { participantId: string }
}

export default async function Evidence({ searchParams }: Props) {
  const supabase = createServerComponentClient({ cookies })
  const participantId = searchParams?.participantId
  const { data, error } = await supabase.from('participants').select()
  const participants = data as Participants[] | []

  if (error)
    return (
      <div>
        Error no se pudo obtener obtener el menu de participantes{participantId}
      </div>
    )

  return (
    <>
      <AddEvidence participantId={participantId} participants={participants} />
    </>
  )
}
