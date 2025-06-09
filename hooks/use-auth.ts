"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/lib/supabase/types"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Получаем текущего пользователя
    const getUser = async () => {
      try {
        console.log("Проверка текущего пользователя...")
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          console.error("Ошибка получения пользователя:", error)
          setLoading(false)
          return
        }

        console.log("Текущий пользователь:", user?.email || "не авторизован")
        setUser(user)

        if (user) {
          // Получаем профиль пользователя
          console.log("Получение профиля для", user.id)
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()

          if (profileError && profileError.code !== "PGRST116") {
            console.error("Ошибка получения профиля:", profileError)
          } else {
            console.log("Профиль получен:", profile?.role || "нет профиля")
            setProfile(profile)
          }
        }
      } catch (error) {
        console.error("Неожиданная ошибка:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Слушаем изменения аутентификации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      setUser(session?.user ?? null)

      if (session?.user) {
        // Ждем создания профиля через триггер
        let attempts = 0
        const maxAttempts = 5

        const checkProfile = async (): Promise<void> => {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (error && error.code !== "PGRST116") {
            console.error("Ошибка получения профиля:", error)
            setProfile(null)
          } else if (profile) {
            console.log("Профиль получен после смены состояния:", profile.role)
            setProfile(profile)

            // Если это новый пользователь с ролью chop_hr, перенаправляем на форму заявки
            if (event === "SIGNED_UP" && profile.role === "chop_hr") {
              console.log("Перенаправление HR ЧОПа на форму заявки")
              setTimeout(() => {
                window.location.href = "/chop-connection-request"
              }, 2000)
            }
          } else if (attempts < maxAttempts) {
            // Профиль еще не создался, ждем
            attempts++
            setTimeout(checkProfile, 1000)
            return
          } else {
            console.warn("Профиль не был создан автоматически")
            setProfile(null)
          }
        }

        await checkProfile()
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  const signUp = async (email: string, password: string, fullName?: string, role?: string) => {
    try {
      console.log("Попытка регистрации:", { email, fullName, role })

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || "Пользователь",
            role: role || "guard",
          },
        },
      })

      console.log("Результат регистрации:", { data, error })

      // Профиль создастся автоматически через триггер
      return { data, error }
    } catch (error) {
      console.error("Неожиданная ошибка при регистрации:", error)
      return { data: null, error: error as Error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Попытка входа:", email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("Результат входа:", { user: data.user?.email, error })

      return { data, error }
    } catch (error) {
      console.error("Ошибка при входе:", error)
      return { data: null, error: error as Error }
    }
  }

  const signOut = async () => {
    try {
      console.log("Выполняется выход...")
      const { error } = await supabase.auth.signOut()

      if (!error) {
        setUser(null)
        setProfile(null)
      }

      return { error }
    } catch (error) {
      console.error("Ошибка при выходе:", error)
      return { error: error as Error }
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("Не авторизован") }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single()

    if (data) setProfile(data)
    return { data, error }
  }

  // Создание профиля вручную (если триггер не сработал)
  const createProfile = async (profileData: Partial<Profile>) => {
    if (!user) return { error: new Error("Не авторизован") }

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email || "",
        full_name: profileData.full_name || "Пользователь",
        role: profileData.role || "guard",
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...profileData,
      })
      .select()
      .single()

    if (data) setProfile(data)
    return { data, error }
  }

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    createProfile,
  }
}
