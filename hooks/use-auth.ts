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
  avatar_url?: string
  bio?: string
  experience?: string
  location?: string
  created_at: string
  updated_at?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  const supabase = createClient()

  // Check if Supabase is properly configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const fetchProfile = useCallback(
    async (userId: string): Promise<boolean> => {
      if (!isSupabaseConfigured) {
        console.warn("Supabase not configured, skipping profile fetch")
        return false
      }

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
                console.error("Profile creation error:", createError)
                return false
              } else {
                setProfile(newProfile)
                return true
              }
            }
          } else {
            console.error("Profile fetch error:", error)
            return false
          }
        } else {
          setProfile(data)
          return true
        }
        return false
      } catch (err) {
        console.error("Profile fetch exception:", err)
        return false
      }
    },
    [supabase, isSupabaseConfigured],
  )

  useEffect(() => {
    let mounted = true
    const sessionTimeout: NodeJS.Timeout | null = null

    const initializeAuth = async () => {
      try {
        if (!isSupabaseConfigured) {
          console.warn("Supabase not configured. Please add environment variables:")
          console.warn("NEXT_PUBLIC_SUPABASE_URL")
          console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY")

          if (mounted) {
            setError("Supabase не настроен. Проверьте переменные окружения.")
            setUser(null)
            setProfile(null)
            setLoading(false)
            setInitialized(true)
          }
          return
        }

        // Получаем текущую сессию
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          if (mounted) {
            setError(sessionError.message)
            setUser(null)
            setProfile(null)
            setLoading(false)
            setInitialized(true)
          }
          return
        }

        if (mounted) {
          if (session?.user) {
            setUser(session.user)
            const profileSuccess = await fetchProfile(session.user.id)
            if (!profileSuccess) {
              // Если профиль не загрузился, создаем базовый профиль
              setProfile({
                id: session.user.id,
                email: session.user.email || "",
                role: "guard",
                full_name: "Пользователь",
                created_at: new Date().toISOString(),
              })
            }
          } else {
            setUser(null)
            setProfile(null)
          }
          setLoading(false)
          setInitialized(true)
        }
      } catch (err) {
        console.error("Auth initialization error:", err)
        if (mounted) {
          setError("Ошибка инициализации авторизации")
          setUser(null)
          setProfile(null)
          setLoading(false)
          setInitialized(true)
        }
      }
    }

    initializeAuth()

    // Подписываемся на изменения состояния авторизации только если Supabase настроен
    let subscription: any = null
    if (isSupabaseConfigured) {
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return

        console.log("Auth state change:", event, session?.user?.id)

        if (event === "SIGNED_OUT" || !session) {
          setUser(null)
          setProfile(null)
          setError(null)
          setLoading(false)
          return
        }

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setUser(session.user)
          setError(null)

          if (session.user) {
            const profileSuccess = await fetchProfile(session.user.id)
            if (!profileSuccess) {
              // Создаем базовый профиль если не удалось загрузить
              setProfile({
                id: session.user.id,
                email: session.user.email || "",
                role: "guard",
                full_name: "Пользователь",
                created_at: new Date().toISOString(),
              })
            }
          }
          setLoading(false)
        }
      })
      subscription = authSubscription
    }

    return () => {
      mounted = false
      if (subscription) {
        subscription.unsubscribe()
      }
      if (sessionTimeout) clearTimeout(sessionTimeout)
    }
  }, [fetchProfile, supabase.auth, isSupabaseConfigured])

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setError("Supabase не настроен")
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        setError(error.message)
      } else {
        setUser(null)
        setProfile(null)
        setError(null)
      }
    } catch (err) {
      setError("Ошибка при выходе из системы")
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: "Пользователь не авторизован" }
    if (!isSupabaseConfigured) return { error: "Supabase не настроен" }

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
    initialized,
    isSupabaseConfigured,
    signUp: async (email: string, password: string, fullName?: string, role?: string) => {
      if (!isSupabaseConfigured) {
        const errorMessage = "Supabase не настроен"
        setError(errorMessage)
        return { data: null, error: new Error(errorMessage) }
      }

      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: fullName
            ? {
                data: {
                  full_name: fullName,
                  role: role || "guard",
                },
              }
            : undefined,
        })

        if (error) {
          setError(error.message)
          return { data: null, error }
        }

        return { data, error: null }
      } catch (err) {
        const errorMessage = "Ошибка при регистрации"
        setError(errorMessage)
        return { data: null, error: new Error(errorMessage) }
      } finally {
        setLoading(false)
      }
    },
    signOut,
    updateProfile,
    isAdmin: profile?.role === "admin",
    isModerator: profile?.role === "moderator",
    isChopHR: profile?.role === "chop_hr",
  }
}
