"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { AlertCircle, User, UserCheck } from "lucide-react"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState<"guard" | "chop_hr">("guard")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Валидация
    if (!email || !password || !fullName) {
      setError("Пожалуйста, заполните все обязательные поля")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      setLoading(false)
      return
    }

    console.log("Отправка формы регистрации:", { email, fullName, role })

    const { data, error } = await signUp(email, password, fullName, role)

    if (error) {
      console.error("Ошибка регистрации:", error)
      setError(
        error.message === "User already registered" ? "Пользователь с таким email уже зарегистрирован" : error.message,
      )
      setLoading(false)
      return
    }

    console.log("Регистрация успешна:", data)
    setSuccess(true)
    setLoading(false)

    // Добавляем прямое перенаправление здесь для HR ЧОПа
    if (role === "chop_hr") {
      setTimeout(() => {
        window.location.href = "/chop-connection-request"
      }, 3000)
    } else {
      setTimeout(() => {
        router.push("/auth/sign-in")
      }, 2000)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Регистрация</CardTitle>
        <CardDescription className="text-center">Создайте аккаунт для доступа к платформе</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              {role === "chop_hr"
                ? "Регистрация успешна! Сейчас вы будете перенаправлены на форму заявки для подключения к ЧОПу."
                : "Регистрация успешна! Проверьте вашу почту для подтверждения аккаунта."}
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Полное имя *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Иван Иванов"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Тип аккаунта *</Label>
              <Select value={role} onValueChange={(value: "guard" | "chop_hr") => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип аккаунта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guard">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Охранник</div>
                        <div className="text-sm text-gray-500">Ищу работу в сфере охраны</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="chop_hr">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      <div>
                        <div className="font-medium">HR представитель ЧОПа</div>
                        <div className="text-sm text-gray-500">Представляю интересы охранной организации</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {role === "chop_hr" && (
                <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                  <strong>Внимание:</strong> После регистрации вам нужно будет подать заявку на подключение к ЧОПу.
                  Доступ к функциям управления будет предоставлен только после одобрения модератором.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль *</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>

            <div className="text-center text-sm">
              Уже есть аккаунт?{" "}
              <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
                Войти
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
