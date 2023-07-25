import type { Database as DB } from './types/supabase'

declare global {
  type Database = DB
  type SupabaseError = { data: null; status: number }
  type Participants = Database['public']['Tables']['participants']['Row']
  type Evidence = Database['public']['Tables']['evidence']['Row']
  type Questions = Database['public']['Tables']['questions']['Row']
  type participantEvidenceView =
    Database['public']['Views']['participantevidenceview']['Row']
  type participantsancionview =
    Database['public']['Views']['participantsancionview']['Row']
}
