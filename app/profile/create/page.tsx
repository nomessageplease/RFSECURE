"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { User, Building2, MapPin, Phone, AlertCircle, CheckCircle } from "lucide-react"

export default function CreateProfilePage() {
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("guard")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companyInn, setCompanyInn] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const { user, profile, createProfile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Если пользователь не авторизован, перенаправляем на вход
    if (!user) {
      router.push("/auth/sign-in")
      return
    }

    // Если профиль уже создан, перенаправляем на профиль
    if (profile) {
      router.push("/profile")
      return
    }
  }, [user, profile, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim()) {
      setMessage({ type: "error", text: "Введите ваше имя" })
      return
    }

    if (role === "chop" && !companyName.trim()) {
      setMessage({ type: "error", text: "Введите название организации" })
      return
    }

    setLoading(true)
    setMessage(null)

    const profileData = {
      email: user?.email || "",
      full_name: fullName,
      role: role as "guard" | "chop",
      phone: phone || null,
      city: city || null,
      company_name: role === "chop" ? companyName : null,
      company_inn: role === "chop" ? companyInn : null,
      is_verified: false,
    }

    const { data, error } = await createProfile(profileData)

    if (error) {
      setMessage({ type: "error", text: error.message })
    } else {
      setMessage({
        type: "success",
        text: "Профиль успешно создан!",
      })

      // Перенаправляем на главную через 1 секунду
      setTimeout(() => {
        router.push("/")
      }, 1000)
    }

    setLoading(false)
  }

  if (!user) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Создание профиля</CardTitle>
          <CardDescription>Заполните информацию о себе для завершения регистрации</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Полное имя *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Введите ваше имя"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Кто вы? *</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <Building2 className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Выберите тип аккаунта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guard">Охранник</SelectItem>
                    <SelectItem value="chop">Представитель ЧОП</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Город</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="city"
                    type="text"
                    placeholder="Москва"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {role === "chop" && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">Информация об организации</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Название организации *</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="ООО 'Охранное агентство'"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required={role === "chop"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyInn">ИНН организации</Label>
                    <Input
                      id="companyInn"
                      type="text"
                      placeholder="1234567890"
                      value={companyInn}
                      onChange={(e) => setCompanyInn(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {message && (
              <Alert className={message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                {message.type === "error" ? (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Создание профиля..." : "Создать профиль"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
