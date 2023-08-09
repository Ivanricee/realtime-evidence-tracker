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
      quizz: {
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
            foreignKeyName: 'quizz_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quizz_participant_id_fkey'
            columns: ['participant_id']
            referencedRelation: 'participantevidenceview'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quizz_participant_id_fkey'
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
          quizz_id: number | null
          status: string
        }
        Insert: {
          created_at?: string | null
          evidence_id?: number | null
          id?: number
          participant_id?: number | null
          quizz_id?: number | null
          status?: string
        }
        Update: {
          created_at?: string | null
          evidence_id?: number | null
          id?: number
          participant_id?: number | null
          quizz_id?: number | null
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
            foreignKeyName: 'sancion_quizz_id_fkey'
            columns: ['quizz_id']
            referencedRelation: 'quizz'
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
