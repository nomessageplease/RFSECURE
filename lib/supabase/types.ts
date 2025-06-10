export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: "user" | "guard" | "chop" | "chop_hr" | "moderator" | "admin"
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
          role?: "user" | "guard" | "chop" | "chop_hr" | "moderator" | "admin"
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
          role?: "user" | "guard" | "chop" | "chop_hr" | "moderator" | "admin"
          phone?: string | null
          city?: string | null
          company_name?: string | null
          company_inn?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      chops: {
        Row: {
          id: string
          name: string
          inn: string | null
          license_number: string | null
          address: string | null
          phone: string | null
          email: string | null
          website: string | null
          description: string | null
          logo_url: string | null
          status: "pending" | "verified" | "unverified" | "suspended"
          rating: number
          reviews_count: number
          employees_count: number
          founded_year: number | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          inn?: string | null
          license_number?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          description?: string | null
          logo_url?: string | null
          status?: "pending" | "verified" | "unverified" | "suspended"
          rating?: number
          reviews_count?: number
          employees_count?: number
          founded_year?: number | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          inn?: string | null
          license_number?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          description?: string | null
          logo_url?: string | null
          status?: "pending" | "verified" | "unverified" | "suspended"
          rating?: number
          reviews_count?: number
          employees_count?: number
          founded_year?: number | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      chop_connection_requests: {
        Row: {
          id: string
          user_id: string
          chop_id: string | null
          new_chop_name: string | null
          new_chop_inn: string | null
          new_chop_address: string | null
          new_chop_phone: string | null
          new_chop_email: string | null
          applicant_position: string
          applicant_phone: string | null
          documents_urls: string[] | null
          comment: string | null
          status: "pending" | "approved" | "rejected"
          rejection_reason: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          chop_id?: string | null
          new_chop_name?: string | null
          new_chop_inn?: string | null
          new_chop_address?: string | null
          new_chop_phone?: string | null
          new_chop_email?: string | null
          applicant_position: string
          applicant_phone?: string | null
          documents_urls?: string[] | null
          comment?: string | null
          status?: "pending" | "approved" | "rejected"
          rejection_reason?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          chop_id?: string | null
          new_chop_name?: string | null
          new_chop_inn?: string | null
          new_chop_address?: string | null
          new_chop_phone?: string | null
          new_chop_email?: string | null
          applicant_position?: string
          applicant_phone?: string | null
          documents_urls?: string[] | null
          comment?: string | null
          status?: "pending" | "approved" | "rejected"
          rejection_reason?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chop_hr_assignments: {
        Row: {
          id: string
          user_id: string
          chop_id: string
          role: "hr" | "admin" | "owner"
          permissions: string[]
          assigned_by: string | null
          assigned_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          chop_id: string
          role?: "hr" | "admin" | "owner"
          permissions?: string[]
          assigned_by?: string | null
          assigned_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          chop_id?: string
          role?: "hr" | "admin" | "owner"
          permissions?: string[]
          assigned_by?: string | null
          assigned_at?: string
          is_active?: boolean
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
      news: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          category: string
          author_id: string | null
          author_name: string
          image_url: string | null
          tags: string[]
          status: "draft" | "published" | "archived"
          featured: boolean
          views: number
          likes: number
          comments_count: number
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          category?: string
          author_id?: string | null
          author_name: string
          image_url?: string | null
          tags?: string[]
          status?: "draft" | "published" | "archived"
          featured?: boolean
          views?: number
          likes?: number
          comments_count?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          category?: string
          author_id?: string | null
          author_name?: string
          image_url?: string | null
          tags?: string[]
          status?: "draft" | "published" | "archived"
          featured?: boolean
          views?: number
          likes?: number
          comments_count?: number
          published_at?: string | null
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
export type Chop = Database["public"]["Tables"]["chops"]["Row"]
export type ChopConnectionRequest = Database["public"]["Tables"]["chop_connection_requests"]["Row"]
export type ChopHrAssignment = Database["public"]["Tables"]["chop_hr_assignments"]["Row"]
export type News = Database["public"]["Tables"]["news"]["Row"]
