export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      evidence: {
        Row: {
          created_at: string | null
          id: number
          participant_id: number | null
          status: string
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          participant_id?: number | null
          status?: string
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          participant_id?: number | null
          status?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'evidence_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'evidence_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantevidenceview'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'evidence_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantsancionview'
            referencedColumns: ['id']
          },
        ]
      }
      financialSanctions: {
        Row: {
          amount: number | null
          created_at: string | null
          id: number
          type: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: number
          type?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: number
          type?: string | null
        }
        Relationships: []
      }
      participantQuiz: {
        Row: {
          created_at: string
          id: number
          participant_answer: string | null
          participant_id: number
          quiz_id: number
          status: string
          time: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          participant_answer?: string | null
          participant_id: number
          quiz_id: number
          status?: string
          time?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          participant_answer?: string | null
          participant_id?: number
          quiz_id?: number
          status?: string
          time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'participantQuiz_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'participantQuiz_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantevidenceview'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'participantQuiz_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantsancionview'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'participantQuiz_quiz_id_fkey'
            columns: ['quiz_id']
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          },
        ]
      }
      participants: {
        Row: {
          created_at: string | null
          id: number
          imgProfile: string | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          imgProfile?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          imgProfile?: string | null
          name?: string | null
        }
        Relationships: []
      }
      quiz: {
        Row: {
          answers: Json[] | null
          created_at: string | null
          id: number
          question: string | null
        }
        Insert: {
          answers?: Json[] | null
          created_at?: string | null
          id?: number
          question?: string | null
        }
        Update: {
          answers?: Json[] | null
          created_at?: string | null
          id?: number
          question?: string | null
        }
        Relationships: []
      }
      sancion: {
        Row: {
          created_at: string | null
          evidence_id: number | null
          id: number
          participant_id: number | null
          participant_quiz_id: number | null
          status: string
        }
        Insert: {
          created_at?: string | null
          evidence_id?: number | null
          id?: number
          participant_id?: number | null
          participant_quiz_id?: number | null
          status?: string
        }
        Update: {
          created_at?: string | null
          evidence_id?: number | null
          id?: number
          participant_id?: number | null
          participant_quiz_id?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sancion_evidence_id_fkey'
            columns: ['evidence_id']
            referencedRelation: 'evidence'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sancion_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sancion_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantevidenceview'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sancion_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantsancionview'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sancion_participant_quiz_id_fkey'
            columns: ['participant_quiz_id']
            referencedRelation: 'participantQuiz'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sancion_participant_quiz_id_fkey'
            columns: ['participant_quiz_id']
            referencedRelation: 'quizresults'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      participantevidenceview: {
        Row: {
          id: number | null
          imgProfile: string | null
          name: string | null
          pendingevidence: number | null
        }
        Relationships: []
      }
      participantsancionview: {
        Row: {
          id: number | null
          imgProfile: string | null
          name: string | null
          sanciontotal: number | null
          totalfulfilled: number | null
        }
        Relationships: []
      }
      quizresults: {
        Row: {
          answers: Json[] | null
          created_at: string | null
          id: number | null
          imgProfile: string | null
          name: string | null
          participant_answer: string | null
          question: string | null
          remainingsec: number | null
          status: string | null
          time: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
