"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/lib/supabase/types"

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 минут в миллисекундах

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState<Record<string, { count: number; timestamp: number }>>({})

  const supabase = createClient()

  const isAccountLocked = useCallback((email: string) => {
    const attempt = loginAttempts[email]
    if (!attempt) return false

    if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - attempt.timestamp
      if (timeSinceLastAttempt < LOCKOUT_DURATION) {
        return true
      }
      // Сброс счетчика после истечения времени блокировки
      setLoginAttempts((prev) => {
        const newAttempts = { ...prev }
        delete newAttempts[email]
        return newAttempts
      })
    }
    return false
  }, [loginAttempts])

  const recordLoginAttempt = useCallback((email: string, success: boolean) => {
    setLoginAttempts((prev) => {
      const current = prev[email] || { count: 0, timestamp: Date.now() }
      return {
        ...prev,
        [email]: {
          count: success ? 0 : current.count + 1,
          timestamp: Date.now(),
        },
      }
    })
  }, [])

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
                    avatar_url: null,
                    phone: null,
                    city: null,
                    company_name: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    last_sign_in_at: null,
                    is_verified: false,
                    is_active: true,
                  },
                ])
                .select()
                .single()

              if (createError) {
                console.error("Ошибка создания профиля:", createError)
                return false
              } else {
                setProfile(newProfile)
                return true
              }
            }
          } else {
            console.error("Ошибка получения профиля:", error)
            return false
          }
        } else {
          setProfile(data)
          return true
        }
        return false
      } catch (err) {
        console.error("Исключение при получении профиля:", err)
        return false
      }
    },
    [supabase],
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        if (isAccountLocked(email)) {
          const attempt = loginAttempts[email]
          const remainingTime = Math.ceil((LOCKOUT_DURATION - (Date.now() - attempt.timestamp)) / 60000)
          throw new Error(`Аккаунт заблокирован. Попробуйте через ${remainingTime} минут.`)
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          recordLoginAttempt(email, false)
          throw error
        }

        recordLoginAttempt(email, true)
        return data
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка входа")
        throw err
      }
    },
    [isAccountLocked, loginAttempts, recordLoginAttempt],
  )

  const signUp = useCallback(
    async (email: string, password: string, fullName?: string, role?: string) => {
      try {
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

        if (error) throw error
        return data
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка регистрации")
        throw err
      }
    },
    [],
  )

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setProfile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка выхода")
      throw err
    }
  }, [supabase])

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Ошибка сессии:", sessionError)
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
              setProfile({
                id: session.user.id,
                email: session.user.email || "",
                role: "guard",
                full_name: "Пользователь",
                avatar_url: null,
                phone: null,
                city: null,
                company_name: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                last_sign_in_at: null,
                is_verified: false,
                is_active: true,
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
        console.error("Ошибка инициализации авторизации:", err)
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile, supabase])

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
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAdmin: profile?.role === "admin",
    isModerator: profile?.role === "moderator",
    isChopHR: profile?.role === "chop_hr",
  }
}
