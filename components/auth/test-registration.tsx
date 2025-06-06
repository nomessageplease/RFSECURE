"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function TestRegistration() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<
    Array<{
      test: string
      status: "success" | "error" | "pending"
      message: string
    }>
  >([])

  const addResult = (test: string, status: "success" | "error", message: string) => {
    setResults((prev) => [...prev, { test, status, message }])
  }

  const runTests = async () => {
    setTesting(true)
    setResults([])

    const supabase = createClient()

    // Тест 1: Подключение к Supabase
    try {
      const { data, error } = await supabase.from("profiles").select("count").limit(1)
      if (error) throw error
      addResult("Подключение к базе", "success", "Успешно подключились к Supabase")
    } catch (error: any) {
      addResult("Подключение к базе", "error", `Ошибка: ${error.message}`)
    }

    // Тест 2: Проверка таблицы profiles
    try {
      const { data, error } = await supabase.from("profiles").select("id, email, role").limit(1)

      if (error) throw error
      addResult("Таблица profiles", "success", "Таблица существует и доступна")
    } catch (error: any) {
      addResult("Таблица profiles", "error", `Ошибка: ${error.message}`)
    }

    // Тест 3: Тестовая регистрация
    const testEmail = `test-${Date.now()}@gmail.com`
    const testPassword = "test123456"

    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })

      if (error) throw error

      if (data.user) {
        addResult("Регистрация пользователя", "success", "Пользователь успешно зарегистрирован")
      }
    } catch (error: any) {
      addResult("Регистрация пользователя", "error", `Ошибка: ${error.message}`)
    }

    setTesting(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Тест системы регистрации</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runTests} disabled={testing} className="w-full">
          {testing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Тестирование...
            </>
          ) : (
            "Запустить тесты"
          )}
        </Button>

        <div className="space-y-2">
          {results.map((result, index) => (
            <Alert
              key={index}
              className={result.status === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
            >
              {result.status === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={result.status === "success" ? "text-green-800" : "text-red-800"}>
                <strong>{result.test}:</strong> {result.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>

        {results.length > 0 && !testing && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Результаты тестирования:</h3>
            <p className="text-blue-800">
              Успешно: {results.filter((r) => r.status === "success").length} / {results.length}
            </p>
            {results.some((r) => r.status === "error") && (
              <p className="text-red-600 mt-2">
                ⚠️ Обнаружены проблемы. Проверьте настройки Supabase и переменные окружения.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
