"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function CheckSupabaseConnection() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<{ url?: string; keyExists?: boolean }>({})
  const [pingResult, setPingResult] = useState<number | null>(null)

  useEffect(() => {
    async function checkConnection() {
      try {
        // Проверяем наличие переменных окружения
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        setEnvVars({
          url: url || undefined,
          keyExists: !!key,
        })

        if (!url || !key) {
          throw new Error("Отсутствуют переменные окружения NEXT_PUBLIC_SUPABASE_URL или NEXT_PUBLIC_SUPABASE_ANON_KEY")
        }

        // Создаем клиент Supabase
        const supabase = createClient()

        // Замеряем время запроса
        const startTime = Date.now()

        // Простой запрос для проверки соединения
        const { data, error } = await supabase.from("profiles").select("count()", { count: "exact" }).limit(1)

        const endTime = Date.now()
        setPingResult(endTime - startTime)

        if (error) {
          throw error
        }

        setStatus("success")
      } catch (error) {
        setStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Неизвестная ошибка")
        console.error("Ошибка подключения к Supabase:", error)
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold mb-4">Проверка подключения к Supabase</h1>

      <div className="mb-4">
        <h2 className="font-semibold">Переменные окружения:</h2>
        <div className="mt-2 p-3 bg-gray-100 rounded">
          <p>
            <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL:</span>{" "}
            {envVars.url ? (
              <span className="text-green-600">{envVars.url}</span>
            ) : (
              <span className="text-red-600">Отсутствует</span>
            )}
          </p>
          <p>
            <span className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>{" "}
            {envVars.keyExists ? (
              <span className="text-green-600">Присутствует</span>
            ) : (
              <span className="text-red-600">Отсутствует</span>
            )}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">Статус подключения:</h2>
        <div className="mt-2 p-3 bg-gray-100 rounded flex items-center">
          {status === "loading" && (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              <span>Проверка подключения...</span>
            </>
          )}

          {status === "success" && (
            <>
              <div className="text-green-600 mr-2">✓</div>
              <span>Подключение успешно! Ping: {pingResult}ms</span>
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-red-600 mr-2">✗</div>
              <span>Ошибка подключения</span>
            </>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4">
          <h2 className="font-semibold">Детали ошибки:</h2>
          <div className="mt-2 p-3 bg-red-50 text-red-700 rounded">{errorMessage}</div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-semibold">Рекомендации:</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>
            Проверьте файл <span className="font-mono">.env.local</span> в корне проекта
          </li>
          <li>Убедитесь, что переменные окружения правильно настроены</li>
          <li>Проверьте доступность Supabase API (https://status.supabase.com)</li>
          <li>Проверьте настройки CORS в проекте Supabase</li>
        </ul>
      </div>
    </div>
  )
}
