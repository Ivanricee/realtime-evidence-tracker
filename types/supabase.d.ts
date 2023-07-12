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
          status: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          participant_id?: number | null
          status?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          participant_id?: number | null
          status?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'evidence_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participants'
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
        ]
      }
    }
    Views: {
      [_ in never]: never
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
