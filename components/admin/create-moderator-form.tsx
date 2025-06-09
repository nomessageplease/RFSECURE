"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CreateModeratorFormProps {
  onSuccess?: () => void
}

export function CreateModeratorForm({ onSuccess }: CreateModeratorFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!formData.email) {
      setError("Email обязателен для заполнения")
      return false
    }

    if (!formData.password) {
      setError("Пароль обязателен для заполнения")
      return false
    }

    if (formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Введите корректный email адрес")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Создаем пользователя
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        throw authError
      }

      if (!authData.user) {
        throw new Error("Не удалось создать пользователя")
      }

      // Обновляем роль пользователя на модератора
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: "moderator" })
        .eq("id", authData.user.id)

      if (updateError) {
        console.error("Ошибка при обновлении роли:", updateError)
        // Не прерываем процесс, так как пользователь уже создан
      }

      setSuccess("Модератор успешно создан!")

      // Сбрасываем форму
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error("Ошибка при создании модератора:", error)
      setError(error.message || "Произошла ошибка при создании модератора")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Создать модератора</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription className="text-green-600">{success}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="moderator@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Пароль *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Минимум 6 символов"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Повторите пароль"
              required
              className={
                formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? "border-red-500"
                  : ""
              }
            />
            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">Пароли не совпадают</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Создание...
              </>
            ) : (
              "Создать модератора"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
