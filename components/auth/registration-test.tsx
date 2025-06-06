"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"

export function RegistrationTest() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const supabase = createClient()

  const testRegistration = async () => {
    setLoading(true)
    setResult("")

    try {
      // Генерируем уникальный email
      const testEmail = email || `test-${Date.now()}@gmail.com`
      const testPassword = password || "TestPassword123!"

      console.log("Попытка регистрации:", testEmail)

      // Регистрируем пользователя
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })

      if (authError) {
        setResult(`❌ Ошибка регистрации: ${authError.message}`)
        return
      }

      console.log("Пользователь создан:", authData.user?.id)

      // Ждем немного для срабатывания триггера
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Проверяем создание профиля
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user?.id)
        .single()

      if (profileError) {
        setResult(`❌ Профиль не создался: ${profileError.message}`)
        return
      }

      setResult(`✅ Успешно! Пользователь: ${testEmail}, Профиль: ${profileData.id}`)
    } catch (error) {
      setResult(`❌ Неожиданная ошибка: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Тест регистрации</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="Email (необязательно)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль (необязательно)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={testRegistration} disabled={loading} className="w-full">
          {loading ? "Тестируем..." : "Тест регистрации"}
        </Button>

        {result && (
          <Alert>
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
