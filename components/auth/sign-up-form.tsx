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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес.",
  }),
  password: z.string().min(8, {
    message: "Пароль должен содержать минимум 8 символов.",
  }),
  confirmPassword: z.string(),
  fullName: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа.",
  }),
  role: z.enum(["guard", "chop_hr"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
})

export function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { signUp } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      role: "guard",
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError(null)
      setLoading(true)
      await signUp(values.email, values.password, values.fullName, values.role)
      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/sign-in")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка регистрации")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <UserCheck className="h-12 w-12 text-green-500" />
            <h3 className="text-lg font-medium">Регистрация успешна!</h3>
            <p className="text-sm text-gray-500">
              Проверьте вашу почту для подтверждения аккаунта. Вы будете перенаправлены на страницу входа...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создание аккаунта</CardTitle>
        <CardDescription>Заполните форму для регистрации</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Полное имя</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Иван Иванов"
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName && (
              <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Роль</Label>
            <Select
              onValueChange={(value) => form.setValue("role", value as "guard" | "chop_hr")}
              defaultValue={form.getValues("role")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guard">Охранник</SelectItem>
                <SelectItem value="chop_hr">HR ЧОП</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>

          <div className="text-center text-sm text-gray-500">
            Уже есть аккаунт?{" "}
            <Link href="/auth/sign-in" className="text-blue-600 hover:text-blue-800 font-medium">
              Войти
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
