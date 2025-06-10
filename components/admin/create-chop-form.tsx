"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, AlertCircle, CheckCircle, Loader2, Search } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface FormData {
  inn: string
  website: string
  name: string
  description: string
  address: string
  phone: string
  email: string
  license: string
  employees: string
}

interface Message {
  type: "success" | "error"
  text: string
}

export function CreateChopForm() {
  const [formData, setFormData] = useState<FormData>({
    inn: "",
    website: "",
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    license: "",
    employees: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [showOptionalFields, setShowOptionalFields] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)
  const [innError, setInnError] = useState<string | null>(null)

  const supabase = createClient()

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setMessage({
            type: "error",
            text: "Размер файла не должен превышать 5MB",
          })
          return
        }

        if (!file.type.startsWith("image/")) {
          setMessage({
            type: "error",
            text: "Можно загружать только изображения",
          })
          return
        }

        setLogoFile(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          setLogoPreview(e.target?.result as string)
        }
        reader.onerror = () => {
          setMessage({
            type: "error",
            text: "Ошибка при чтении файла",
          })
        }
        reader.readAsDataURL(file)
        setMessage(null)
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Ошибка при обработке файла",
      })
    }
  }

  const handleInnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value.replace(/\D/g, "").slice(0, 12)
      setFormData({ ...formData, inn: value })
      setInnError(null)
    } catch (error) {
      // Handle error silently
    }
  }

  const checkInnExists = async (inn: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.from("chops").select("id, inn, name").eq("inn", inn)

      if (error) {
        return false
      }

      return data && data.length > 0
    } catch (error) {
      return false
    }
  }

  const uploadLogo = async (file: File): Promise<string> => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        let errorText = "Неизвестная ошибка"
        try {
          const errorData = await response.json()
          errorText = errorData.error || errorText
        } catch {
          errorText = await response.text()
        }
        throw new Error(`Ошибка загрузки файла: ${errorText}`)
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      throw error
    }
  }

  const fetchCompanyData = async () => {
    setFetchingData(true)
    setMessage(null)
    setInnError(null)

    try {
      if (formData.inn.length !== 10 && formData.inn.length !== 12) {
        setInnError("ИНН должен содержать 10 или 12 цифр")
        return
      }

      const exists = await checkInnExists(formData.inn)
      if (exists) {
        setInnError("ЧОП с таким ИНН уже зарегистрирован в системе.")
        return
      }

      setShowOptionalFields(true)
      setMessage({
        type: "success",
        text: "ИНН проверен, можно заполнять дополнительные поля.",
      })
    } catch (error) {
      setMessage({
        type: "error",
        text: `Произошла ошибка при проверке ИНН: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      })
    } finally {
      setFetchingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (!formData.inn || (formData.inn.length !== 10 && formData.inn.length !== 12)) {
        setInnError("ИНН должен содержать 10 или 12 цифр")
        setLoading(false)
        return
      }

      const exists = await checkInnExists(formData.inn)
      if (exists) {
        setInnError("ЧОП с таким ИНН уже зарегистрирован в системе.")
        setLoading(false)
        return
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        throw new Error(`Ошибка аутентификации: ${userError.message}`)
      }

      if (!user) {
        throw new Error("Пользователь не авторизован")
      }

      let logoUrl = ""
      if (logoFile) {
        setUploadingLogo(true)
        try {
          logoUrl = await uploadLogo(logoFile)
        } catch (error) {
          throw new Error(
            `Ошибка при загрузке логотипа: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
          )
        } finally {
          setUploadingLogo(false)
        }
      }

      const insertData = {
        inn: formData.inn,
        name: formData.name || null,
        website: formData.website || null,
        description: formData.description || null,
        address: formData.address || null,
        phone: formData.phone || null,
        email: formData.email || null,
        license_number: formData.license || null,
        logo_url: logoUrl || null,
        status: "active",
        rating: 0,
        reviews_count: 0,
        employees_count: formData.employees ? Number.parseInt(formData.employees) : null,
        created_by: user.id,
      }

      const { data, error } = await supabase.from("chops").insert(insertData).select()

      if (error) {
        throw new Error(`Ошибка базы данных: ${error.message} (код: ${error.code})`)
      }

      if (!data || data.length === 0) {
        throw new Error("ЧОП не был создан - нет данных в ответе")
      }

      setMessage({
        type: "success",
        text: `ЧОП "${formData.name || formData.inn}" успешно создан! ID: ${data[0].id}`,
      })

      setFormData({
        inn: "",
        website: "",
        name: "",
        description: "",
        address: "",
        phone: "",
        email: "",
        license: "",
        employees: "",
      })
      setShowOptionalFields(false)
      setLogoFile(null)
      setLogoPreview(null)
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Произошла неожиданная ошибка при создании ЧОПа",
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
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Основные поля</h3>

            <div>
              <Label htmlFor="inn">ИНН *</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="inn"
                  type="text"
                  value={formData.inn}
                  onChange={handleInnChange}
                  required
                  placeholder="1234567890"
                  className={innError ? "border-red-500" : ""}
                  disabled={fetchingData}
                />
                <Button
                  type="button"
                  onClick={fetchCompanyData}
                  disabled={!formData.inn || formData.inn.length < 10 || fetchingData}
                  className="whitespace-nowrap"
                >
                  {fetchingData ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Проверка...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Проверить ИНН
                    </>
                  )}
                </Button>
              </div>
              {innError && <p className="text-sm text-red-500 mt-1">{innError}</p>}
            </div>

            <div>
              <Label htmlFor="website">Сайт</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
                disabled={fetchingData}
              />
            </div>

            <div>
              <Label htmlFor="logo">Логотип компании</Label>
              <div className="space-y-3">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={fetchingData}
                />
                <p className="text-xs text-gray-500">
                  Максимальный размер файла: 5MB. Поддерживаемые форматы: JPG, PNG, GIF
                </p>
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
                      disabled={fetchingData}
                    >
                      Удалить
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            className="w-full"
            disabled={fetchingData}
          >
            {showOptionalFields ? "Скрыть дополнительные поля" : "+ Добавить дополнительные поля"}
          </Button>

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
                    disabled={fetchingData}
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
                    disabled={fetchingData}
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
                  disabled={fetchingData}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="ул. Примерная, д. 1"
                    disabled={fetchingData}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (495) 123-45-67"
                    disabled={fetchingData}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@example.com"
                  disabled={fetchingData}
                />
              </div>

              <div>
                <Label htmlFor="employees">Количество сотрудников</Label>
                <Input
                  id="employees"
                  type="number"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  placeholder="100"
                  min="1"
                  disabled={fetchingData}
                />
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

          <Button type="submit" disabled={loading || uploadingLogo || fetchingData} className="w-full">
            {uploadingLogo ? "Загрузка логотипа..." : loading ? "Создание..." : "Создать ЧОП"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
