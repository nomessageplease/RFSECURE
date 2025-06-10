"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  role: "guard" | "admin" | "moderator" | "chop_hr"
  full_name?: string
  phone?: string
  created_at: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const supabase = createClient()

  const fetchProfile = useCallback(
    async (userId: string): Promise<boolean> => {
      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

        if (error) {
          if (error.code === "PGRST116") {
            const { data: userData } = await supabase.auth.getUser()

            if (userData?.user) {
              const { data: newProfile, error: createError } = await supabase
                .from("profiles")
                .insert([
                  {
                    id: userId,
                    email: userData.user.email,
                    role: "guard",
                    full_name: "Пользователь",
                  },
                ])
                .select()
                .single()

              if (createError) {
                setError("Не удалось создать профиль")
                return false
              } else {
                setProfile(newProfile)
                return true
              }
            }
          } else {
            setError("Ошибка загрузки профиля")
            return false
          }
        } else {
          setProfile(data)
          return true
        }
        return false
      } catch (err) {
        setError("Ошибка загрузки профиля")
        return false
      }
    },
    [supabase],
  )

  const retrySession = useCallback(async () => {
    if (retryCount >= 3) {
      setLoading(false)
      return
    }

    setRetryCount((prev) => prev + 1)

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        setError(sessionError.message)
        setLoading(false)
        return
      }

      if (session?.user) {
        setUser(session.user)
        const profileSuccess = await fetchProfile(session.user.id)
        if (!profileSuccess && retryCount < 2) {
          setTimeout(retrySession, 1000)
        } else {
          setLoading(false)
        }
      } else {
        setUser(null)
        setProfile(null)
        setLoading(false)
      }
    } catch (err) {
      setError("Произошла ошибка при проверке авторизации")
      setLoading(false)
    }
  }, [retryCount, supabase, fetchProfile])

  useEffect(() => {
    let mounted = true
    let sessionTimeout: NodeJS.Timeout | null = null

    const getSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          setError(sessionError.message)

          if (sessionError.message.includes("network") || sessionError.message.includes("fetch")) {
            sessionTimeout = setTimeout(retrySession, 2000)
          } else {
            setLoading(false)
          }
          return
        }

        if (mounted) {
          setUser(session?.user ?? null)

          if (session?.user) {
            const profileSuccess = await fetchProfile(session.user.id)
            if (!profileSuccess) {
              sessionTimeout = setTimeout(retrySession, 1000)
            } else {
              setLoading(false)
            }
          } else {
            setProfile(null)
            setLoading(false)
          }
        }
      } catch (err) {
        if (mounted) {
          setError("Произошла ошибка при проверке авторизации")
          sessionTimeout = setTimeout(retrySession, 2000)
        }
      }
    }

    getSession()

    const sessionCheckInterval = setInterval(getSession, 5 * 60 * 1000)

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
        setError(null)
        setRetryCount(0)

        if (session?.user) {
          const profileSuccess = await fetchProfile(session.user.id)
          if (!profileSuccess) {
            sessionTimeout = setTimeout(retrySession, 1000)
          } else {
            setLoading(false)
          }
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
      clearInterval(sessionCheckInterval)
      if (sessionTimeout) clearTimeout(sessionTimeout)
    }
  }, [fetchProfile, retrySession, supabase.auth])

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        setError(error.message)
      } else {
        setUser(null)
        setProfile(null)
      }
    } catch (err) {
      setError("Ошибка при выходе из системы")
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: "Пользователь не авторизован" }

    try {
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single()

      if (error) {
        return { error: error.message }
      }

      setProfile(data)
      return { data }
    } catch (err) {
      return { error: "Ошибка при обновлении профиля" }
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    signOut,
    updateProfile,
    isAdmin: profile?.role === "admin",
    isModerator: profile?.role === "moderator",
    isChopHR: profile?.role === "chop_hr",
  }
}
