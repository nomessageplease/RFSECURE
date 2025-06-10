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
  const [initialized, setInitialized] = useState(false)

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
    [supabase],
  )

  useEffect(() => {
    let mounted = true
    const sessionTimeout: NodeJS.Timeout | null = null

    const initializeAuth = async () => {
      try {
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

    // Подписываемся на изменения состояния авторизации
    const {
      data: { subscription },
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

    return () => {
      mounted = false
      subscription.unsubscribe()
      if (sessionTimeout) clearTimeout(sessionTimeout)
    }
  }, [fetchProfile, supabase.auth])

  const signOut = async () => {
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
    signOut,
    updateProfile,
    isAdmin: profile?.role === "admin",
    isModerator: profile?.role === "moderator",
    isChopHR: profile?.role === "chop_hr",
  }
}
