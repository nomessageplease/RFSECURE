import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/lib/supabase/types"

const supabase = createClient()

export async function signUp(email: string, password: string, fullName?: string, role?: string) {
  try {
    console.log("Попытка регистрации:", { email, fullName, role })

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

    console.log("Результат регистрации:", { data, error })
    return { data, error }
  } catch (error) {
    console.error("Неожиданная ошибка при регистрации:", error)
    return { data: null, error: error as Error }
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function createProfile(profileData: Omit<Profile, "id" | "created_at" | "updated_at">) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: new Error("Не авторизован") }

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      ...profileData,
    })
    .select()
    .single()

  return { data, error }
}

export async function updateProfile(updates: Partial<Profile>) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: new Error("Не авторизован") }

  const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single()

  return { data, error }
}

export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { data: null, error: new Error("Не авторизован") }

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return { data, error }
}
