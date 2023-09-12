import type { Database as DB } from './types/supabase'

declare global {
  type Database = DB
  type SupabaseError = { data: null; status: number }
  type Participants = Database['public']['Tables']['participants']['Row']
  type Evidence = Database['public']['Tables']['evidence']['Row']
  type Quiz = Database['public']['Tables']['quiz']['Row']
  type participantQuiz = Database['public']['Tables']['participantQuiz']['Row']
  type quizResultsView = Database['public']['Views']['quizresults']['Row']
  type AnswerType = {
    answer: string
    option: number
    isCorrect: boolean
  }
  type Sancion = Database['public']['Tables']['sancion']['Row']
  type participantEvidenceView =
    Database['public']['Views']['participantevidenceview']['Row']
  type participantsancionview =
    Database['public']['Views']['participantsancionview']['Row']
  type pendingSancionView =
    Database['public']['Views']['participantpendingsancionview']['Row']
}
