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

export function CreateChopForm() {
  const [formData, setFormData] = useState({
    inn: "",
    website: "",
    logo: "",
    // Опциональные поля
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
  })
  const [showOptionalFields, setShowOptionalFields] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Преобразуем специализации в массив только если поле заполнено
      const specializationArray = formData.specialization
        ? formData.specialization
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        : []

      // Создаем объект данных только с заполненными полями
      const chopData: any = {
        inn: formData.inn,
        website: formData.website,
        logo: formData.logo,
        verified: true,
        rating: 0,
        review_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // Добавляем опциональные поля только если они заполнены
      if (formData.name) chopData.name = formData.name
      if (formData.description) chopData.description = formData.description
      if (formData.location) chopData.location = formData.location
      if (formData.address) chopData.address = formData.address
      if (formData.phone) chopData.phone = formData.phone
      if (formData.email) chopData.email = formData.email
      if (formData.license) chopData.license = formData.license
      if (specializationArray.length > 0) chopData.specialization = specializationArray
      if (formData.employees) chopData.employees = Number.parseInt(formData.employees) || 0
      if (formData.experience) chopData.experience = Number.parseInt(formData.experience) || 0
      if (formData.price) chopData.price = formData.price

      // Создаем ЧОП в базе данных
      const { error } = await supabase.from("chops").insert(chopData)

      if (error) {
        throw error
      }

      setMessage({
        type: "success",
        text: `ЧОП с ИНН ${formData.inn} успешно создан!`,
      })

      // Очищаем форму
      setFormData({
        inn: "",
        website: "",
        logo: "",
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
      })
      setShowOptionalFields(false)
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
          {/* Обязательные поля */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Обязательные поля</h3>

            <div>
              <Label htmlFor="inn">ИНН *</Label>
              <Input
                id="inn"
                type="text"
                value={formData.inn}
                onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
                required
                placeholder="1234567890"
                pattern="[0-9]{10,12}"
              />
            </div>

            <div>
              <Label htmlFor="website">Сайт *</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                required
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label htmlFor="logo">URL логотипа *</Label>
              <Input
                id="logo"
                type="url"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                required
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          {/* Кнопка для показа дополнительных полей */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            className="w-full"
          >
            {showOptionalFields ? "Скрыть дополнительные поля" : "+ Добавить дополнительные поля"}
          </Button>

          {/* Опциональные поля */}
          {showOptionalFields && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Дополнительные поля</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Название ЧОПа</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    placeholder="от 25 000 ₽/мес"
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Создание..." : "Создать ЧОП"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
