import { cookies } from 'next/headers'
import { EvidenceForm } from './EvidenceForm'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

type Props = {
  params: { id: string }
}

export default async function ParticipantId({ params }: Props) {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase
    .from('participants')
    .select()
    .eq('id', Number(params.id))
  const participants = data as Participants[] | []

  if (error)
    return (
      <div>Error no se pudo obtener el nombre del participante {params.id}</div>
    )
  participants
  return (
    <section
      aria-label="form evidence"
      className="min-h-screen grid place-items-center f"
    >
      <EvidenceForm serverParticipants={participants} />
    </section>
  )
}
