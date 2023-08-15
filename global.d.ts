import type { Database as DB } from './types/supabase'

declare global {
  type Database = DB
  type SupabaseError = { data: null; status: number }
  type Participants = Database['public']['Tables']['participants']['Row']
  type Evidence = Database['public']['Tables']['evidence']['Row']
  type Questions = Database['public']['Tables']['quizz']['Row']
  type Sancion = Database['public']['Tables']['sancion']['Row']
  type participantEvidenceView =
    Database['public']['Views']['participantevidenceview']['Row']
  type participantsancionview =
    Database['public']['Views']['participantsancionview']['Row']
  type pendingSancionView =
    Database['public']['Views']['participantpendingsancionview']['Row']
}
