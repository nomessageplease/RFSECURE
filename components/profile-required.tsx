"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, AlertCircle } from "lucide-react"

interface ProfileRequiredProps {
  children: React.ReactNode
  message?: string
}

export function ProfileRequired({
  children,
  message = "Для доступа к этой странице необходимо заполнить профиль",
}: ProfileRequiredProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && !profile) {
      // Если пользователь авторизован, но профиль не создан
      // Можно либо перенаправить, либо показать предупреждение
    }
  }, [user, profile, loading])

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    router.push("/auth/sign-in")
    return null
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>Профиль не заполнен</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/profile/create")} className="w-full">
              <User className="h-4 w-4 mr-2" />
              Создать профиль
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
