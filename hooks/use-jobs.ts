"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Job } from "@/lib/supabase/types"
import { useAuth } from "./use-auth"

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const { user, profile } = useAuth()

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase.from("jobs").select("*")

      if (!profile || !["moderator", "admin"].includes(profile?.role || "")) {
        query = query.eq("status", "active")
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setJobs(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки вакансий")
    } finally {
      setLoading(false)
    }
  }

  const fetchMyJobs = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("company_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      setJobs(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки ваших вакансий")
    } finally {
      setLoading(false)
    }
  }

  const createJob = async (
    jobData: Omit<Job, "id" | "company_id" | "created_at" | "updated_at" | "views" | "applications_count">,
  ) => {
    if (!user || !profile) {
      throw new Error("Необходимо войти в систему")
    }

    const newJob = {
      ...jobData,
      company_id: user.id,
      company_name: profile.company_name || profile.full_name || "Неизвестная компания",
    }

    const { data, error } = await supabase.from("jobs").insert([newJob]).select().single()

    if (error) throw error

    return data
  }

  const updateJob = async (jobId: string, updates: Partial<Job>) => {
    const { data, error } = await supabase.from("jobs").update(updates).eq("id", jobId).select().single()

    if (error) throw error

    return data
  }

  const deleteJob = async (jobId: string) => {
    const { error } = await supabase.from("jobs").delete().eq("id", jobId)

    if (error) throw error
  }

  const searchJobs = async (
    query: string,
    filters: {
      location?: string
      salaryFrom?: number
      category?: string
      schedule?: string
    } = {},
  ) => {
    setLoading(true)
    setError(null)

    try {
      let dbQuery = supabase.from("jobs").select("*")

      if (!profile || !["moderator", "admin"].includes(profile?.role || "")) {
        dbQuery = dbQuery.eq("status", "active")
      }

      if (query) {
        dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      }

      if (filters.location && filters.location !== "Все города") {
        dbQuery = dbQuery.eq("location", filters.location)
      }

      if (filters.salaryFrom) {
        dbQuery = dbQuery.gte("salary_from", filters.salaryFrom)
      }

      if (filters.category) {
        dbQuery = dbQuery.eq("category", filters.category)
      }

      if (filters.schedule) {
        dbQuery = dbQuery.eq("schedule", filters.schedule)
      }

      const { data, error } = await dbQuery.order("created_at", { ascending: false })

      if (error) throw error

      setJobs(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка поиска вакансий")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [profile])

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    fetchMyJobs,
    createJob,
    updateJob,
    deleteJob,
    searchJobs,
  }
}
