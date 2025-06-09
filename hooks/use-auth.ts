"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  role: "user" | "admin" | "moderator" | "chop_hr"
  name?: string
  phone?: string
  created_at: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    let mounted = true

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
          return
        }

        if (mounted) {
          setUser(session?.user ?? null)
          console.log("useAuth: Пользователь:", session?.user?.email || "не авторизован")

          if (session?.user) {
            await fetchProfile(session.user.id)
          } else {
            setProfile(null)
          }
        }
      } catch (err) {
        console.error("useAuth: Неожиданная ошибка:", err)
        if (mounted) {
          setError("Произошла ошибка при проверке авторизации")
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    const fetchProfile = async (userId: string) => {
      try {
        console.log("useAuth: Получение профиля для пользователя:", userId)
        const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

        if (error && error.code !== "PGRST116") {
          console.error("useAuth: Ошибка получения профиля:", error)
          setError("Ошибка загрузки профиля")
          return
        }

        if (mounted) {
          setProfile(data)
          console.log("useAuth: Профиль загружен:", data?.role || "профиль не найден")
        }
      } catch (err) {
        console.error("useAuth: Ошибка при загрузке профиля:", err)
        if (mounted) {
          setError("Ошибка загрузки профиля")
        }
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("useAuth: Изменение состояния авторизации:", event)

      if (mounted) {
        setUser(session?.user ?? null)
        setError(null)

        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      console.log("useAuth: Выход из системы...")
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
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    signOut,
    isAdmin: profile?.role === "admin",
    isModerator: profile?.role === "moderator",
    isChopHR: profile?.role === "chop_hr",
  }
}
