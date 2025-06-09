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
import { put } from "@vercel/blob"
import { getCompanyByInn, validateInn } from "@/lib/dadata/dadata-service"

export function CreateChopForm() {
  const [formData, setFormData] = useState({
    inn: "",
    website: "",
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
    ogrn: "",
    status: "",
    manager: "",
    registration_date: "",
    okved: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [showOptionalFields, setShowOptionalFields] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)
  const [innError, setInnError] = useState<string | null>(null)
  const [innExists, setInnExists] = useState(false)

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

  const handleInnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12)
    setFormData({ ...formData, inn: value })
    setInnError(null)
    setInnExists(false)
  }

  const checkInnExists = async (inn: string) => {
    try {
      const { data } = await supabase.from("chops").select("id").eq("inn", inn).single()
      return !!data
    } catch (error) {
      return false
    }
  }

  const fetchCompanyData = async () => {
    setFetchingData(true)
    setMessage(null)
    setInnError(null)

    try {
      // Проверка валидности ИНН
      if (!validateInn(formData.inn)) {
        setInnError("Некорректный ИНН. Проверьте правильность ввода.")
        return
      }

      // Проверка существования ЧОПа с таким ИНН
      const exists = await checkInnExists(formData.inn)
      if (exists) {
        setInnExists(true)
        setInnError("ЧОП с таким ИНН уже зарегистрирован в системе.")
        return
      }

      // Получение данных из DaData
      const companyData = await getCompanyByInn(formData.inn)

      if (!companyData) {
        setInnError("Организация с таким ИНН не найдена в ЕГРЮЛ.")
        return
      }

      // Заполнение формы полученными данными
      setFormData({
        ...formData,
        name: companyData.name.full_with_opf || "",
        address: companyData.address?.value || "",
        ogrn: companyData.ogrn || "",
        status: companyData.state?.status || "",
        manager: companyData.management?.name || "",
        registration_date: companyData.state?.registration_date || "",
        okved: companyData.okved || "",
        employees: companyData.employee_count?.toString() || "",
        phone: companyData.phones?.length ? companyData.phones[0] : "",
        email: companyData.emails?.length ? companyData.emails[0] : "",
      })

      // Показать дополнительные поля, так как они теперь заполнены
      setShowOptionalFields(true)

      setMessage({
        type: "success",
        text: "Данные успешно загружены из ЕГРЮЛ.",
      })
    } catch (error) {
      console.error("Ошибка при получении данных:", error)
      setMessage({
        type: "error",
        text: "Произошла ошибка при получении данных. Попробуйте позже.",
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
      // Проверка валидности ИНН
      if (!validateInn(formData.inn)) {
        setInnError("Некорректный ИНН. Проверьте правильность ввода.")
        setLoading(false)
        return
      }

      // Проверка существования ЧОПа с таким ИНН
      const exists = await checkInnExists(formData.inn)
      if (exists) {
        setInnExists(true)
        setInnError("ЧОП с таким ИНН уже зарегистрирован в системе.")
        setLoading(false)
        return
      }

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
        inn: formData.inn,
        website: formData.website,
        name: formData.name || null,
        description: formData.description || null,
        location: formData.location || null,
        address: formData.address || null,
        phone: formData.phone || null,
        email: formData.email || null,
        license_number: formData.license || null,
        specialization: specializationArray.length > 0 ? specializationArray : null,
        employees_count: formData.employees ? Number.parseInt(formData.employees) : null,
        experience: formData.experience ? Number.parseInt(formData.experience) : null,
        price: formData.price || null,
        logo_url: logoUrl || null,
        status: "verified",
        rating: 0,
        reviews_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ogrn: formData.ogrn || null,
        manager: formData.manager || null,
        registration_date: formData.registration_date || null,
        okved: formData.okved || null,
      })

      if (error) {
        throw error
      }

      setMessage({
        type: "success",
        text: `ЧОП "${formData.name || formData.inn}" успешно создан!`,
      })

      // Очищаем форму
      setFormData({
        inn: "",
        website: "",
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
        ogrn: "",
        status: "",
        manager: "",
        registration_date: "",
        okved: "",
      })
      setShowOptionalFields(false)
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
          {/* Обязательные поля */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Обязательные поля</h3>

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
                      Загрузка...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Подтянуть данные
                    </>
                  )}
                </Button>
              </div>
              {innError && <p className="text-sm text-red-500 mt-1">{innError}</p>}
              {innExists && (
                <Alert className="mt-2 border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    ЧОП уже зарегистрирован — вы можете{" "}
                    <a href="/chop-connection-request" className="font-medium underline">
                      подать заявку на присоединение
                    </a>
                    .
                  </AlertDescription>
                </Alert>
              )}
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
                disabled={fetchingData}
              />
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
                  disabled={fetchingData}
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
                      disabled={fetchingData}
                    >
                      Удалить
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Кнопка для показа дополнительных полей */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            className="w-full"
            disabled={fetchingData}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ogrn">ОГРН</Label>
                  <Input
                    id="ogrn"
                    type="text"
                    value={formData.ogrn}
                    onChange={(e) => setFormData({ ...formData, ogrn: e.target.value })}
                    placeholder="1234567890123"
                    disabled={fetchingData}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Статус</Label>
                  <Input
                    id="status"
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="Действующая"
                    disabled={fetchingData}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="manager">Руководитель</Label>
                  <Input
                    id="manager"
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                    disabled={fetchingData}
                  />
                </div>
                <div>
                  <Label htmlFor="registration_date">Дата регистрации</Label>
                  <Input
                    id="registration_date"
                    type="text"
                    value={formData.registration_date}
                    onChange={(e) => setFormData({ ...formData, registration_date: e.target.value })}
                    placeholder="01.01.2000"
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
                  <Label htmlFor="location">Город</Label>
                  <Input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Москва"
                    disabled={fetchingData}
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
                    disabled={fetchingData}
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
                    disabled={fetchingData}
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
                    disabled={fetchingData}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="okved">Основной ОКВЭД</Label>
                <Input
                  id="okved"
                  type="text"
                  value={formData.okved}
                  onChange={(e) => setFormData({ ...formData, okved: e.target.value })}
                  placeholder="80.10 Деятельность частных охранных служб"
                  disabled={fetchingData}
                />
              </div>

              <div>
                <Label htmlFor="specialization">Специализация (через запятую)</Label>
                <Input
                  id="specialization"
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Объекты, VIP-охрана, Мероприятия"
                  disabled={fetchingData}
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
                    disabled={fetchingData}
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
                    disabled={fetchingData}
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
                    disabled={fetchingData}
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

          <Button type="submit" disabled={loading || uploadingLogo || fetchingData || innExists} className="w-full">
            {uploadingLogo ? "Загрузка логотипа..." : loading ? "Создание..." : "Создать ЧОП"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
