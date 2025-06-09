"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { dadataService } from "@/lib/dadata/dadata-service"

interface CreateChopFormProps {
  onSuccess?: () => void
}

export function CreateChopForm({ onSuccess }: CreateChopFormProps) {
  const [formData, setFormData] = useState({
    inn: "",
    name: "",
    website: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    license_number: "",
    employees_count: "",
    founded_year: "",
  })

  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showAllFields, setShowAllFields] = useState(false)

  const supabase = createClient()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Проверка типа файла
    if (!file.type.startsWith("image/")) {
      setError("Пожалуйста, выберите файл изображения")
      return
    }

    // Проверка размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Размер файла не должен превышать 5MB")
      return
    }

    setLogo(file)

    // Создаем превью
    const reader = new FileReader()
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setError(null)
  }

  const fetchCompanyData = async () => {
    if (!formData.inn) {
      setError("Введите ИНН для получения данных")
      return
    }

    if (!dadataService.validateInn(formData.inn)) {
      setError("Введите корректный ИНН")
      return
    }

    setIsFetchingData(true)
    setError(null)

    try {
      const companyData = await dadataService.getCompanyByInn(formData.inn)

      if (companyData) {
        setFormData((prev) => ({
          ...prev,
          name: companyData.name.full_with_opf || prev.name,
          address: companyData.address.unrestricted_value || prev.address,
          phone: companyData.phones?.[0] || prev.phone,
          email: companyData.emails?.[0] || prev.email,
          employees_count: companyData.employee_count?.toString() || prev.employees_count,
        }))
        setSuccess("Данные успешно загружены из DaData")
        setShowAllFields(true)
      } else {
        setError("Организация с таким ИНН не найдена")
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error)
      setError("Ошибка при получении данных из DaData")
    } finally {
      setIsFetchingData(false)
    }
  }

  const uploadLogo = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Ошибка загрузки файла")
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error("Ошибка загрузки логотипа:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.inn) {
      setError("ИНН обязателен для заполнения")
      return
    }

    if (!dadataService.validateInn(formData.inn)) {
      setError("Введите корректный ИНН")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Получаем текущего пользователя
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Пользователь не авторизован")
      }

      // Загружаем логотип, если он выбран
      let logoUrl: string | null = null
      if (logo) {
        logoUrl = await uploadLogo(logo)
      }

      // Подготавливаем данные для вставки
      const chopData = {
        inn: formData.inn,
        name: formData.name || null,
        website: formData.website || null,
        description: formData.description || null,
        address: formData.address || null,
        phone: formData.phone || null,
        email: formData.email || null,
        license_number: formData.license_number || null,
        logo_url: logoUrl,
        employees_count: formData.employees_count ? Number.parseInt(formData.employees_count) : null,
        founded_year: formData.founded_year ? Number.parseInt(formData.founded_year) : null,
        status: "active",
        rating: 0,
        reviews_count: 0,
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      console.log("Отправляем данные:", chopData)

      // Создаем ЧОП в базе данных
      const { data, error: insertError } = await supabase.from("chops").insert([chopData]).select()

      if (insertError) {
        console.error("Ошибка при создании ЧОПа:", insertError)
        throw insertError
      }

      console.log("ЧОП успешно создан:", data)

      setSuccess("ЧОП успешно создан!")

      // Сбрасываем форму
      setFormData({
        inn: "",
        name: "",
        website: "",
        description: "",
        address: "",
        phone: "",
        email: "",
        license_number: "",
        employees_count: "",
        founded_year: "",
      })
      setLogo(null)
      setLogoPreview(null)
      setShowAllFields(false)

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error("Ошибка при создании ЧОПа:", error)
      setError(error.message || "Произошла ошибка при создании ЧОПа")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Создать новый ЧОП</CardTitle>
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

          {/* Основные поля */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="inn">ИНН *</Label>
                <Input
                  id="inn"
                  name="inn"
                  value={formData.inn}
                  onChange={handleInputChange}
                  placeholder="Введите ИНН организации"
                  required
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={fetchCompanyData}
                  disabled={isFetchingData || !formData.inn}
                  variant="outline"
                >
                  {isFetchingData ? <Loader2 className="h-4 w-4 animate-spin" /> : "Подтянуть данные"}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="logo">Логотип</Label>
              <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} />
              {logoPreview && (
                <div className="mt-2">
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Превью логотипа"
                    className="w-20 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            {!showAllFields && (
              <Button type="button" variant="outline" onClick={() => setShowAllFields(true)} className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Показать все поля
              </Button>
            )}
          </div>

          {/* Дополнительные поля */}
          {showAllFields && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Дополнительная информация</h3>
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowAllFields(false)}>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Скрыть
                </Button>
              </div>

              <div>
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Полное название организации"
                />
              </div>

              <div>
                <Label htmlFor="website">Веб-сайт</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Краткое описание деятельности"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Юридический адрес"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (xxx) xxx-xx-xx"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="info@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="license_number">Номер лицензии</Label>
                <Input
                  id="license_number"
                  name="license_number"
                  value={formData.license_number}
                  onChange={handleInputChange}
                  placeholder="Номер лицензии на охранную деятельность"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employees_count">Количество сотрудников</Label>
                  <Input
                    id="employees_count"
                    name="employees_count"
                    type="number"
                    value={formData.employees_count}
                    onChange={handleInputChange}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="founded_year">Год основания</Label>
                  <Input
                    id="founded_year"
                    name="founded_year"
                    type="number"
                    value={formData.founded_year}
                    onChange={handleInputChange}
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Создание...
              </>
            ) : (
              "Создать ЧОП"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
