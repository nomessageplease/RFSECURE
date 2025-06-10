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

  // Выносим fetchProfile в useCallback, чтобы можно было повторно использовать
  const fetchProfile = useCallback(
    async (userId: string) => {
      try {
        console.log("useAuth: Получение профиля для пользователя:", userId)

        // Попытка получить профиль
        const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

        if (error) {
          console.error("useAuth: Ошибка получения профиля:", error)

          // Если профиль не найден, попробуем создать его
          if (error.code === "PGRST116") {
            console.log("useAuth: Профиль не найден, пробуем создать")

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
                console.error("useAuth: Ошибка создания профиля:", createError)
                setError("Не удалось создать профиль")
                return false
              } else {
                console.log("useAuth: Профиль создан:", newProfile)
                setProfile(newProfile)
                return true
              }
            }
          } else {
            setError("Ошибка загрузки профиля")
            return false
          }
        } else {
          console.log("useAuth: Профиль загружен:", data)
          setProfile(data)
          return true
        }
      } catch (err) {
        console.error("useAuth: Ошибка при загрузке профиля:", err)
        setError("Ошибка загрузки профиля")
        return false
      }
    },
    [supabase],
  )

  // Функция для повторной попытки получения сессии
  const retrySession = useCallback(async () => {
    if (retryCount >= 3) {
      console.log("useAuth: Достигнуто максимальное количество попыток")
      setLoading(false)
      return
    }

    setRetryCount((prev) => prev + 1)
    console.log(`useAuth: Повторная попытка получения сессии (${retryCount + 1}/3)`)

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("useAuth: Ошибка получения сессии при повторе:", sessionError)
        setError(sessionError.message)
        setLoading(false)
        return
      }

      if (session?.user) {
        setUser(session.user)
        const profileSuccess = await fetchProfile(session.user.id)
        if (!profileSuccess && retryCount < 2) {
          // Если профиль не получен, но еще есть попытки - пробуем снова через 1 секунду
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
      console.error("useAuth: Неожиданная ошибка при повторе:", err)
      setError("Произошла ошибка при проверке авторизации")
      setLoading(false)
    }
  }, [retryCount, supabase, fetchProfile])

  useEffect(() => {
    let mounted = true
    let sessionTimeout: NodeJS.Timeout | null = null

    const getSession = async () => {
      try {
        console.log("useAuth: Получение сессии...")
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("useAuth: Ошибка получения сессии:", sessionError)
          setError(sessionError.message)

          // Если ошибка связана с сетью, пробуем снова через 2 секунды
          if (sessionError.message.includes("network") || sessionError.message.includes("fetch")) {
            sessionTimeout = setTimeout(retrySession, 2000)
          } else {
            setLoading(false)
          }
          return
        }

        if (mounted) {
          setUser(session?.user ?? null)
          console.log("useAuth: Пользователь:", session?.user?.email || "не авторизован")

          if (session?.user) {
            const profileSuccess = await fetchProfile(session.user.id)
            if (!profileSuccess) {
              // Если профиль не получен, пробуем снова через 1 секунду
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
        console.error("useAuth: Неожиданная ошибка:", err)
        if (mounted) {
          setError("Произошла ошибка при проверке авторизации")
          // Пробуем снова через 2 секунды
          sessionTimeout = setTimeout(retrySession, 2000)
        }
      }
    }

    getSession()

    // Настраиваем периодическую проверку сессии каждые 5 минут
    const sessionCheckInterval = setInterval(
      () => {
        console.log("useAuth: Периодическая проверка сессии")
        getSession()
      },
      5 * 60 * 1000,
    )

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("useAuth: Изменение состояния авторизации:", event)

      if (mounted) {
        setUser(session?.user ?? null)
        setError(null)
        setRetryCount(0) // Сбрасываем счетчик попыток при изменении состояния

        if (session?.user) {
          const profileSuccess = await fetchProfile(session.user.id)
          if (!profileSuccess) {
            // Если профиль не получен, пробуем снова через 1 секунду
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
      console.log("useAuth: Выход из системы...")
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("useAuth: Ошибка выхода:", error)
        setError(error.message)
      } else {
        setUser(null)
        setProfile(null)
        console.log("useAuth: Успешный выход")
      }
    } catch (err) {
      console.error("useAuth: Неожиданная ошибка при выходе:", err)
      setError("Ошибка при выходе из системы")
    } finally {
      setLoading(false)
    }
  }

  // Функция для обновления профиля
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: "Пользователь не авторизован" }

    try {
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single()

      if (error) {
        console.error("useAuth: Ошибка обновления профиля:", error)
        return { error: error.message }
      }

      setProfile(data)
      return { data }
    } catch (err) {
      console.error("useAuth: Ошибка при обновлении профиля:", err)
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
