export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: "user" | "guard" | "chop" | "moderator" | "admin"
          phone: string | null
          city: string | null
          company_name: string | null
          company_inn: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "guard" | "chop" | "moderator" | "admin"
          phone?: string | null
          city?: string | null
          company_name?: string | null
          company_inn?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "guard" | "chop" | "moderator" | "admin"
          phone?: string | null
          city?: string | null
          company_name?: string | null
          company_inn?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          company_id: string
          company_name: string
          description: string
          requirements: string[]
          benefits: string[]
          location: string
          address: string | null
          salary_from: number | null
          salary_to: number | null
          salary_period: string
          schedule: string | null
          experience_level: string | null
          job_type: string
          category: string
          is_urgent: boolean
          is_verified: boolean
          status: "pending" | "active" | "rejected" | "archived"
          views: number
          applications: number
          created_at: string
          updated_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          title: string
          company_id: string
          company_name: string
          description: string
          requirements?: string[]
          benefits?: string[]
          location: string
          address?: string | null
          salary_from?: number | null
          salary_to?: number | null
          salary_period?: string
          schedule?: string | null
          experience_level?: string | null
          job_type?: string
          category?: string
          is_urgent?: boolean
          is_verified?: boolean
          status?: "pending" | "active" | "rejected" | "archived"
          views?: number
          applications?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          company_id?: string
          company_name?: string
          description?: string
          requirements?: string[]
          benefits?: string[]
          location?: string
          address?: string | null
          salary_from?: number | null
          salary_to?: number | null
          salary_period?: string
          schedule?: string | null
          experience_level?: string | null
          job_type?: string
          category?: string
          is_urgent?: boolean
          is_verified?: boolean
          status?: "pending" | "active" | "rejected" | "archived"
          views?: number
          applications?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
      }
      job_applications: {
        Row: {
          id: string
          job_id: string
          applicant_id: string
          applicant_name: string | null
          applicant_email: string | null
          applicant_phone: string | null
          cover_letter: string | null
          status: "pending" | "reviewing" | "accepted" | "rejected"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          applicant_id: string
          applicant_name?: string | null
          applicant_email?: string | null
          applicant_phone?: string | null
          cover_letter?: string | null
          status?: "pending" | "reviewing" | "accepted" | "rejected"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          applicant_id?: string
          applicant_name?: string | null
          applicant_email?: string | null
          applicant_phone?: string | null
          cover_letter?: string | null
          status?: "pending" | "reviewing" | "accepted" | "rejected"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Job = Database["public"]["Tables"]["jobs"]["Row"]
export type JobApplication = Database["public"]["Tables"]["job_applications"]["Row"]
