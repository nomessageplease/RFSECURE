"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function SupabaseConfigWarning() {
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (isConfigured) return null

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Supabase не настроен</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">Для работы приложения необходимо настроить подключение к Supabase:</p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>
            Создайте файл <code className="bg-muted px-1 rounded">.env.local</code> в корне проекта
          </li>
          <li>Добавьте переменные окружения:</li>
        </ol>
        <pre className="bg-muted p-2 rounded mt-2 text-xs overflow-x-auto">
          {`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
        </pre>
        <p className="mt-2 text-sm">
          Найти эти значения можно в{" "}
          <a
            href="https://supabase.com/dashboard/project/_/settings/api"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            настройках API вашего проекта Supabase
          </a>
        </p>
      </AlertDescription>
    </Alert>
  )
}
