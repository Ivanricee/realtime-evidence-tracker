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
      questions: {
        Row: {
          created_at: string | null
          id: number
          participant_id: number | null
          question: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          participant_id?: number | null
          question?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          participant_id?: number | null
          question?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'questions_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'questions_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantevidenceview'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'questions_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantsancionview'
            referencedColumns: ['id']
          },
        ]
      }
      sancion: {
        Row: {
          created_at: string | null
          evidence_id: number | null
          id: number
          participant_id: number | null
          question_id: number | null
        }
        Insert: {
          created_at?: string | null
          evidence_id?: number | null
          id?: number
          participant_id?: number | null
          question_id?: number | null
        }
        Update: {
          created_at?: string | null
          evidence_id?: number | null
          id?: number
          participant_id?: number | null
          question_id?: number | null
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
            foreignKeyName: 'sancion_question_id_fkey'
            columns: ['question_id']
            referencedRelation: 'questions'
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
