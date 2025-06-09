"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createClient } from "@/lib/supabase/client"
import type { Chop } from "@/lib/supabase/types"
import { AlertCircle, Building2, Upload, CheckCircle, Search } from "lucide-react"
import Header from "@/components/header"

export default function ChopConnectionRequestPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [chops, setChops] = useState<Chop[]>([])
  const [filteredChops, setFilteredChops] = useState<Chop[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Форма
  const [requestType, setRequestType] = useState<"existing" | "new">("existing")
  const [selectedChopId, setSelectedChopId] = useState("")
  const [chopSearch, setChopSearch] = useState("")
  const [position, setPosition] = useState("")
  const [phone, setPhone] = useState("")
  const [comment, setComment] = useState("")

  // Данные нового ЧОПа
  const [newChopName, setNewChopName] = useState("")
  const [newChopInn, setNewChopInn] = useState("")
  const [newChopAddress, setNewChopAddress] = useState("")
  const [newChopPhone, setNewChopPhone] = useState("")
  const [newChopEmail, setNewChopEmail] = useState("")

  // Загрузка списка ЧОПов
  useEffect(() => {
    const loadChops = async () => {
      const { data, error } = await supabase.from("chops").select("*").eq("status", "verified").order("name")

      if (error) {
        console.error("Ошибка загрузки ЧОПов:", error)
      } else {
        setChops(data || [])
        setFilteredChops(data || [])
      }
    }

    loadChops()
  }, [supabase])

  // Фильтрация ЧОПов по поиску
  useEffect(() => {
    if (!chopSearch.trim()) {
      setFilteredChops(chops)
    } else {
      const filtered = chops.filter(
        (chop) =>
          chop.name.toLowerCase().includes(chopSearch.toLowerCase()) || (chop.inn && chop.inn.includes(chopSearch)),
      )
      setFilteredChops(filtered)
    }
  }, [chopSearch, chops])

  // Проверка доступа
  useEffect(() => {
    if (!authLoading && (!user || !profile)) {
      router.push("/auth/sign-in")
      return
    }

    if (!authLoading && profile && profile.role !== "chop_hr") {
      router.push("/")
      return
    }
  }, [user, profile, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!user) {
      setError("Необходимо войти в систему")
      setLoading(false)
      return
    }

    // Валидация
    if (!position.trim()) {
      setError("Укажите вашу должность")
      setLoading(false)
      return
    }

    if (requestType === "existing" && !selectedChopId) {
      setError("Выберите ЧОП из списка")
      setLoading(false)
      return
    }

    if (requestType === "new") {
      if (!newChopName.trim()) {
        setError("Укажите название организации")
        setLoading(false)
        return
      }
      if (!newChopInn.trim()) {
        setError("Укажите ИНН организации")
        setLoading(false)
        return
      }
      if (newChopInn.length !== 10 && newChopInn.length !== 12) {
        setError("ИНН должен содержать 10 или 12 цифр")
        setLoading(false)
        return
      }
    }

    try {
      // Проверяем, нет ли уже активной заявки от этого пользователя
      const { data: existingRequest } = await supabase
        .from("chop_connection_requests")
        .select("id, status")
        .eq("user_id", user.id)
        .eq("status", "pending")
        .single()

      if (existingRequest) {
        setError("У вас уже есть активная заявка на рассмотрении")
        setLoading(false)
        return
      }

      const requestData = {
        user_id: user.id,
        applicant_position: position.trim(),
        applicant_phone: phone.trim() || null,
        comment: comment.trim() || null,
        ...(requestType === "existing"
          ? { chop_id: selectedChopId }
          : {
              new_chop_name: newChopName.trim(),
              new_chop_inn: newChopInn.trim(),
              new_chop_address: newChopAddress.trim() || null,
              new_chop_phone: newChopPhone.trim() || null,
              new_chop_email: newChopEmail.trim() || null,
            }),
      }

      const { error } = await supabase.from("chop_connection_requests").insert(requestData)

      if (error) {
        throw error
      }

      setSuccess(true)

      // Перенаправляем через 3 секунды
      setTimeout(() => {
        router.push("/profile")
      }, 3000)
    } catch (error) {
      console.error("Ошибка отправки заявки:", error)
      setError("Произошла ошибка при отправке заявки. Попробуйте еще раз.")
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile || profile.role !== "chop_hr") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              Заявка на подключение к ЧОПу
            </CardTitle>
            <CardDescription>
              Для получения доступа к управлению профилем организации необходимо подать заявку на модерацию
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Заявка успешно отправлена!</strong>
                  <br />
                  Ваша заявка передана на рассмотрение модераторам. Вы получите уведомление о результате рассмотрения на
                  email. Сейчас вы будете перенаправлены в профиль.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Личные данные */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Личные данные</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Должность *</Label>
                      <Input
                        id="position"
                        placeholder="HR-менеджер, Директор по персоналу"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Выбор типа заявки */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Организация</h3>

                  <RadioGroup value={requestType} onValueChange={(value: "existing" | "new") => setRequestType(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="existing" id="existing" />
                      <Label htmlFor="existing">Моя организация есть в реестре</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new">Моей организации нет в реестре</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Выбор существующего ЧОПа */}
                {requestType === "existing" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="chopSearch">Поиск организации</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="chopSearch"
                          placeholder="Введите название или ИНН организации"
                          value={chopSearch}
                          onChange={(e) => setChopSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chop">Выберите организацию *</Label>
                      <Select value={selectedChopId} onValueChange={setSelectedChopId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Найдите вашу организацию" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredChops.length === 0 ? (
                            <div className="p-2 text-sm text-gray-500">
                              {chopSearch ? "Организации не найдены" : "Загрузка..."}
                            </div>
                          ) : (
                            filteredChops.map((chop) => (
                              <SelectItem key={chop.id} value={chop.id}>
                                <div>
                                  <div className="font-medium">{chop.name}</div>
                                  {chop.inn && <div className="text-sm text-gray-500">ИНН: {chop.inn}</div>}
                                  {chop.address && <div className="text-sm text-gray-500">{chop.address}</div>}
                                </div>
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {chopSearch && filteredChops.length === 0 && (
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          Не нашли свою организацию? Выберите "Моей организации нет в реестре" и добавьте её.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                {/* Данные новой организации */}
                {requestType === "new" && (
                  <div className="space-y-4">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        Новая организация будет добавлена в реестр только после проверки модераторами
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newChopName">Название организации *</Label>
                        <Input
                          id="newChopName"
                          placeholder="ООО 'Название ЧОПа'"
                          value={newChopName}
                          onChange={(e) => setNewChopName(e.target.value)}
                          required={requestType === "new"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newChopInn">ИНН *</Label>
                        <Input
                          id="newChopInn"
                          placeholder="1234567890"
                          value={newChopInn}
                          onChange={(e) => setNewChopInn(e.target.value.replace(/\D/g, ""))}
                          maxLength={12}
                          required={requestType === "new"}
                        />
                        <div className="text-xs text-gray-500">10 цифр для юридических лиц, 12 для ИП</div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="newChopAddress">Адрес</Label>
                        <Input
                          id="newChopAddress"
                          placeholder="г. Москва, ул. Примерная, д. 1"
                          value={newChopAddress}
                          onChange={(e) => setNewChopAddress(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newChopPhone">Телефон</Label>
                        <Input
                          id="newChopPhone"
                          type="tel"
                          placeholder="+7 (495) 123-45-67"
                          value={newChopPhone}
                          onChange={(e) => setNewChopPhone(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newChopEmail">Email</Label>
                        <Input
                          id="newChopEmail"
                          type="email"
                          placeholder="info@chop.ru"
                          value={newChopEmail}
                          onChange={(e) => setNewChopEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Комментарий */}
                <div className="space-y-2">
                  <Label htmlFor="comment">Дополнительная информация</Label>
                  <Textarea
                    id="comment"
                    placeholder="Укажите дополнительную информацию, которая поможет модераторам рассмотреть вашу заявку..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Информация о документах */}
                <Alert className="bg-yellow-50 border-yellow-200">
                  <Upload className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Документы для подтверждения:</strong>
                    <br />
                    После отправки заявки модератор может запросить документы, подтверждающие ваше право представлять
                    организацию (доверенность, трудовой договор, справка с работы и т.д.)
                  </AlertDescription>
                </Alert>

                {error && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Отправка..." : "Отправить заявку"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.push("/")}>
                    Отмена
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
