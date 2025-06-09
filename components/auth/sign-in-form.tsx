"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("🔄 Начинаем процесс входа...")
    setLoading(true)
    setError(null)
    setSuccess(null)
    setDebugInfo(null)

    try {
      console.log("📧 Попытка входа с email:", email)

      // Шаг 1: Попытка входа
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("🔐 Результат аутентификации:", {
        user: authData?.user?.email,
        session: !!authData?.session,
        error: authError,
      })

      if (authError) {
        console.error("❌ Ошибка аутентификации:", authError)
        setError(`Ошибка входа: ${authError.message}`)
        setDebugInfo({ step: "auth", error: authError })
        return
      }

      if (!authData?.user) {
        console.error("❌ Пользователь не получен")
        setError("Не удалось получить данные пользователя")
        setDebugInfo({ step: "auth", error: "No user data" })
        return
      }

      console.log("✅ Аутентификация успешна, получаем профиль...")

      // Шаг 2: Получение профиля
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single()

      console.log("👤 Результат получения профиля:", { profile, error: profileError })

      if (profileError) {
        if (profileError.code === "PGRST116") {
          console.warn("⚠️ Профиль не найден, создаем новый...")

          // Создаем профиль
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert({
              id: authData.user.id,
              email: authData.user.email || "",
              full_name: authData.user.user_metadata?.full_name || "Пользователь",
              role: "user",
              is_verified: false,
            })
            .select()
            .single()

          if (createError) {
            console.error("❌ Ошибка создания профиля:", createError)
            setError(`Ошибка создания профиля: ${createError.message}`)
            setDebugInfo({ step: "profile_create", error: createError })
            return
          }

          console.log("✅ Профиль создан:", newProfile)
          setDebugInfo({ step: "profile_created", profile: newProfile })
        } else {
          console.error("❌ Ошибка получения профиля:", profileError)
          setError(`Ошибка загрузки профиля: ${profileError.message}`)
          setDebugInfo({ step: "profile_fetch", error: profileError })
          return
        }
      } else {
        console.log("✅ Профиль получен:", profile)
        setDebugInfo({ step: "profile_loaded", profile })
      }

      // Шаг 3: Успешный вход
      setSuccess("Успешный вход! Перенаправляем...")
      console.log("🎉 Вход выполнен успешно")

      // Перенаправление
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 1500)
    } catch (err) {
      console.error("💥 Критическая ошибка:", err)
      setError(`Неожиданная ошибка: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`)
      setDebugInfo({ step: "critical_error", error: err })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Вход</CardTitle>
        <CardDescription>Войдите в свой аккаунт</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Вход...
              </>
            ) : (
              "Войти"
            )}
          </Button>
        </form>

        {/* Отладочная информация */}
        {debugInfo && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <div className="font-semibold mb-2">Отладочная информация:</div>
            <div>Шаг: {debugInfo.step}</div>
            {debugInfo.profile && <div>Роль: {debugInfo.profile.role}</div>}
            {debugInfo.error && <div className="text-red-600">Ошибка: {JSON.stringify(debugInfo.error, null, 2)}</div>}
          </div>
        )}

        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <div>Email: {email}</div>
          <div>Loading: {loading ? "Да" : "Нет"}</div>
          <div>Error: {error || "Нет"}</div>
        </div>
      </CardContent>
    </Card>
  )
}
