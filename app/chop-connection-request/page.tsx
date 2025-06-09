"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Search } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

export default function ChopConnectionRequestPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [chops, setChops] = useState<any[]>([])
  const [filteredChops, setFilteredChops] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChop, setSelectedChop] = useState<any | null>(null)
  const [newChopName, setNewChopName] = useState("")
  const [newChopInn, setNewChopInn] = useState("")
  const [position, setPosition] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [documents, setDocuments] = useState("")
  const [comment, setComment] = useState("")
  const [isNewChop, setIsNewChop] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [existingRequest, setExistingRequest] = useState<any | null>(null)

  // Проверяем, что пользователь авторизован и имеет роль chop_hr
  useEffect(() => {
    if (!loading && (!user || (profile && profile.role !== "chop_hr"))) {
      router.push("/auth/sign-in")
    }
  }, [user, profile, loading, router])

  // Загружаем список ЧОПов
  useEffect(() => {
    const fetchChops = async () => {
      const { data, error } = await supabase.from("chops").select("*").eq("status", "verified").order("name")

      if (error) {
        console.error("Ошибка при загрузке ЧОПов:", error)
        return
      }

      setChops(data || [])
      setFilteredChops(data || [])
    }

    // Проверяем, есть ли уже заявка от этого пользователя
    const checkExistingRequest = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from("chop_connection_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)

      if (error) {
        console.error("Ошибка при проверке существующих заявок:", error)
        return
      }

      if (data && data.length > 0) {
        setExistingRequest(data[0])
      }
    }

    fetchChops()
    if (user) {
      checkExistingRequest()
    }
  }, [supabase, user])

  // Фильтрация ЧОПов при вводе в поле поиска
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredChops(chops)
    } else {
      const filtered = chops.filter((chop) => chop.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredChops(filtered)
    }
  }, [searchTerm, chops])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading2(true)
    setError(null)

    if (!user) {
      setError("Вы должны быть авторизованы для подачи заявки")
      setLoading2(false)
      return
    }

    // Валидация
    if (isNewChop) {
      if (!newChopName || !newChopInn) {
        setError("Пожалуйста, укажите название и ИНН организации")
        setLoading2(false)
        return
      }

      // Проверка формата ИНН (10 или 12 цифр)
      if (!/^\d{10}$|^\d{12}$/.test(newChopInn)) {
        setError("ИНН должен содержать 10 или 12 цифр")
        setLoading2(false)
        return
      }
    } else if (!selectedChop) {
      setError("Пожалуйста, выберите организацию из списка")
      setLoading2(false)
      return
    }

    if (!position || !contactPhone) {
      setError("Пожалуйста, укажите должность и контактный телефон")
      setLoading2(false)
      return
    }

    try {
      // Создаем заявку
      const { data, error } = await supabase.from("chop_connection_requests").insert({
        user_id: user.id,
        chop_id: isNewChop ? null : selectedChop.id,
        new_chop_name: isNewChop ? newChopName : null,
        new_chop_inn: isNewChop ? newChopInn : null,
        position,
        contact_phone: contactPhone,
        documents,
        comment,
        status: "pending",
      })

      if (error) {
        console.error("Ошибка при создании заявки:", error)
        setError(error.message)
        setLoading2(false)
        return
      }

      console.log("Заявка успешно создана:", data)
      setSuccess(true)
      setLoading2(false)

      // Обновляем страницу через 3 секунды
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (err) {
      console.error("Неожиданная ошибка:", err)
      setError("Произошла ошибка при отправке заявки")
      setLoading2(false)
    }
  }

  // Если пользователь не авторизован или загрузка не завершена
  if (loading) {
    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Загрузка...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Если у пользователя уже есть заявка
  if (existingRequest) {
    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Заявка на подключение к ЧОПу</CardTitle>
            <CardDescription>У вас уже есть активная заявка на подключение к ЧОПу</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">
                  Статус вашей заявки:{" "}
                  {existingRequest.status === "pending"
                    ? "На рассмотрении"
                    : existingRequest.status === "approved"
                      ? "Одобрена"
                      : "Отклонена"}
                </h3>

                <div className="space-y-2">
                  <p>
                    <strong>Дата подачи:</strong> {new Date(existingRequest.created_at).toLocaleDateString()}
                  </p>

                  {existingRequest.chop_id ? (
                    <p>
                      <strong>ЧОП:</strong> {chops.find((c) => c.id === existingRequest.chop_id)?.name || "Загрузка..."}
                    </p>
                  ) : (
                    <p>
                      <strong>Новый ЧОП:</strong> {existingRequest.new_chop_name}
                    </p>
                  )}

                  {existingRequest.status === "rejected" && existingRequest.rejection_reason && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded p-3">
                      <p>
                        <strong>Причина отклонения:</strong> {existingRequest.rejection_reason}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {existingRequest.status === "rejected" && (
                <Button onClick={() => setExistingRequest(null)} className="w-full">
                  Подать новую заявку
                </Button>
              )}

              <Button variant="outline" onClick={() => router.push("/profile")} className="w-full">
                Вернуться в профиль
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Заявка на подключение к ЧОПу</CardTitle>
          <CardDescription>Заполните форму для подачи заявки на подключение к охранной организации</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Заявка успешно отправлена! Она будет рассмотрена модератором в ближайшее время. Вы получите уведомление
                о результате рассмотрения.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="chopType">Выберите тип организации</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      variant={!isNewChop ? "default" : "outline"}
                      onClick={() => setIsNewChop(false)}
                      className="flex-1"
                    >
                      Выбрать из списка
                    </Button>
                    <Button
                      type="button"
                      variant={isNewChop ? "default" : "outline"}
                      onClick={() => setIsNewChop(true)}
                      className="flex-1"
                    >
                      Добавить новую
                    </Button>
                  </div>
                </div>

                {!isNewChop ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Label htmlFor="chopSearch">Поиск организации</Label>
                      <div className="relative mt-1">
                        <Input
                          id="chopSearch"
                          type="text"
                          placeholder="Введите название ЧОПа"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="border rounded-md p-3 max-h-60 overflow-y-auto">
                      {filteredChops.length > 0 ? (
                        <div className="space-y-2">
                          {filteredChops.map((chop) => (
                            <div
                              key={chop.id}
                              className={`p-3 rounded-md cursor-pointer ${
                                selectedChop?.id === chop.id
                                  ? "bg-blue-50 border border-blue-200"
                                  : "hover:bg-gray-50 border border-gray-200"
                              }`}
                              onClick={() => setSelectedChop(chop)}
                            >
                              <div className="font-medium">{chop.name}</div>
                              {chop.inn && <div className="text-sm text-gray-500">ИНН: {chop.inn}</div>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          {searchTerm ? "Ничего не найдено" : "Список пуст"}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newChopName">Название организации *</Label>
                      <Input
                        id="newChopName"
                        type="text"
                        placeholder="ООО ЧОП 'Защита'"
                        value={newChopName}
                        onChange={(e) => setNewChopName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newChopInn">ИНН организации *</Label>
                      <Input
                        id="newChopInn"
                        type="text"
                        placeholder="1234567890"
                        value={newChopInn}
                        onChange={(e) => setNewChopInn(e.target.value)}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        ИНН должен содержать 10 цифр для юридических лиц или 12 цифр для ИП
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Информация о представителе</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="position">Должность *</Label>
                      <Input
                        id="position"
                        type="text"
                        placeholder="HR-менеджер"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Контактный телефон *</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="documents">Подтверждающие документы</Label>
                      <Input
                        id="documents"
                        type="text"
                        placeholder="Ссылка на документы или описание"
                        value={documents}
                        onChange={(e) => setDocuments(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Укажите ссылку на документы, подтверждающие ваше право представлять организацию (например,
                        доверенность, приказ о назначении)
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="comment">Комментарий</Label>
                      <Textarea
                        id="comment"
                        placeholder="Дополнительная информация"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading2}>
                  {loading2 ? "Отправка..." : "Отправить заявку"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
