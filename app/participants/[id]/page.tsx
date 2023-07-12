import { cookies } from 'next/headers'
import { ClipForm } from './ClipForm'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

type Props = {
  params: { id: string }
}

export default async function ParticipantId({ params }: Props) {
  const supabase = createServerComponentClient({ cookies })
  const { data: participants, error } = await supabase
    .from('participants')
    .select()
  if (error)
    return (
      <div>Error no se pudo obtener el nombre del participante {params.id}</div>
    )

  return (
    <section
      aria-label="form clips"
      className="min-h-screen grid place-items-center f"
    >
      <ClipForm
        id={Number(params.id)}
        serverParticipants={participants ?? []}
      />
    </section>
  )
}
