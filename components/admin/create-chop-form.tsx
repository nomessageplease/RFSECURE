"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, AlertCircle, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { put } from "@vercel/blob"

export function CreateChopForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    license: "",
    specialization: "",
    employees: "",
    experience: "",
    price: "",
    logo: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)

  const supabase = createClient()

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Преобразуем специализации в массив
      const specializationArray = formData.specialization
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      let logoUrl = ""
      if (logoFile) {
        setUploadingLogo(true)
        try {
          const blob = await put(`chops/logos/${Date.now()}-${logoFile.name}`, logoFile, {
            access: "public",
          })
          logoUrl = blob.url
        } catch (error) {
          throw new Error("Ошибка при загрузке логотипа")
        } finally {
          setUploadingLogo(false)
        }
      }

      // Создаем ЧОП в базе данных
      const { error } = await supabase.from("chops").insert({
        name: formData.name,
        description: formData.description,
        location: formData.location,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        license: formData.license,
        specialization: specializationArray,
        employees: Number.parseInt(formData.employees) || 0,
        experience: Number.parseInt(formData.experience) || 0,
        price: formData.price,
        logo_url: logoUrl || null,
        verified: true, // Админ создает уже проверенные ЧОПы
        rating: 0,
        review_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) {
        throw error
      }

      setMessage({
        type: "success",
        text: `ЧОП "${formData.name}" успешно создан!`,
      })

      // Очищаем форму
      setFormData({
        name: "",
        description: "",
        location: "",
        address: "",
        phone: "",
        email: "",
        license: "",
        specialization: "",
        employees: "",
        experience: "",
        price: "",
        logo: "",
      })

      setLogoFile(null)
      setLogoPreview(null)
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Ошибка при создании ЧОПа",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Создать новый ЧОП
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Название ЧОПа</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Охранное Агентство Пример"
              />
            </div>
            <div>
              <Label htmlFor="license">Номер лицензии</Label>
              <Input
                id="license"
                type="text"
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                required
                placeholder="ЧО-123456"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Краткое описание деятельности компании"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Город</Label>
              <Input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                placeholder="Москва"
              />
            </div>
            <div>
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                placeholder="ул. Примерная, д. 1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="+7 (495) 123-45-67"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="info@example.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specialization">Специализация (через запятую)</Label>
            <Input
              id="specialization"
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              required
              placeholder="Объекты, VIP-охрана, Мероприятия"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="employees">Количество сотрудников</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                required
                placeholder="100"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="experience">Опыт работы (лет)</Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
                placeholder="5"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="price">Цена (от)</Label>
              <Input
                id="price"
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="от 25 000 ₽/мес"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="logo">Логотип компании *</Label>
            <div className="space-y-3">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                required
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {logoPreview && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Предпросмотр логотипа"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{logoFile?.name}</p>
                    <p className="text-xs text-gray-500">
                      {logoFile ? (logoFile.size / 1024 / 1024).toFixed(2) : 0} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setLogoFile(null)
                      setLogoPreview(null)
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              )}
            </div>
          </div>

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

          <Button type="submit" disabled={loading || uploadingLogo} className="w-full">
            {uploadingLogo ? "Загрузка логотипа..." : loading ? "Создание..." : "Создать ЧОП"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
