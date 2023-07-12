import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import ParticipantMenu from './ParticipantMenu'
import { cookies } from 'next/headers'
type Props = {
  children: React.ReactNode
}
export default async function DashboardLayout({ children }: Props) {
  const supabase = createServerComponentClient({ cookies })
  const { data: participants, error } = await supabase
    .from('participants')
    .select()
  if (error) return <div>No se pudo obtener los participantes</div>

  return (
    <section className="h-full">
      <section className="flex gap-4 h-full">
        <div className="w-4/12 h-full border-2 border-gray-900 rounded-lg overflow-y-auto">
          <h1 className="text-gray-600 text-center py-8 pb-4 text-3xl">
            Participantes
          </h1>
          {<ParticipantMenu serverParticipants={participants} />}
        </div>
        <div className="w-8/12 border-2 border-gray-900 rounded-lg">
          <h2>2/2</h2>
          {children}
        </div>
      </section>
    </section>
  )
}
