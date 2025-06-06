"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugAuth() {
  const { user, profile, loading } = useAuth()

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle className="text-lg">🔍 Отладка аутентификации</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div>
          <strong>Loading:</strong> {loading ? "Да" : "Нет"}
        </div>
        <div>
          <strong>User:</strong> {user ? user.email : "Не авторизован"}
        </div>
        <div>
          <strong>Profile:</strong> {profile ? `${profile.full_name} (${profile.role})` : "Нет профиля"}
        </div>
        <div>
          <strong>User ID:</strong> {user?.id || "Нет"}
        </div>

        <Button
          onClick={() => {
            console.log("🔍 Текущее состояние:", { user, profile, loading })
          }}
          variant="outline"
          size="sm"
          className="w-full mt-2"
        >
          Показать в консоли
        </Button>
      </CardContent>
    </Card>
  )
}
