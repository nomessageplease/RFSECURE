"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Building2, Clock, CheckCircle, XCircle, Edit, Save, X } from "lucide-react"
import Header from "@/components/header"
import type { ChopConnectionRequest, ChopHrAssignment, Chop } from "@/lib/supabase/types"

interface RequestWithChop extends ChopConnectionRequest {
  chops?: Chop
}

interface AssignmentWithChop extends ChopHrAssignment {
  chops: Chop
}

export default function ProfilePage() {
  const { user, profile, loading: authLoading, updateProfile } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState<RequestWithChop[]>([])
  const [assignments, setAssignments] = useState<AssignmentWithChop[]>([])

  // Форма редактирования
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")

  // Проверка доступа
  useEffect(() => {
    if (!authLoading && (!user || !profile)) {
      router.push("/auth/sign-in")
      return
    }
  }, [user, profile, authLoading, router])

  // Загрузка данных профиля
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "")
      setPhone(profile.phone || "")
      setCity(profile.city || "")
    }
  }, [profile])

  // Загрузка заявок и назначений для HR ЧОПа
  useEffect(() => {
    const loadChopData = async () => {
      if (!user || !profile || profile.role !== "chop_hr") return

      try {
        // Загружаем заявки
        const { data: requestsData, error: requestsError } = await supabase
          .from("chop_connection_requests")
          .select(`
            *,
            chops(*)
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (requestsError) throw requestsError
        setRequests(requestsData || [])

        // Загружаем назначения
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from("chop_hr_assignments")
          .select(`
            *,
            chops(*)
          `)
          .eq("user_id", user.id)
          .eq("is_active", true)

        if (assignmentsError) throw assignmentsError
        setAssignments(assignmentsData || [])
      } catch (error) {
        console.error("Ошибка загрузки данных ЧОПа:", error)
      }
    }

    loadChopData()
  }, [user, profile, supabase])

  const handleSave = async () => {
    if (!profile) return

    setLoading(true)

    try {
      const { error } = await updateProfile({
        full_name: fullName.trim() || null,
        phone: phone.trim() || null,
        city: city.trim() || null,
      })

      if (error) throw error

      setEditing(false)
      alert("Профиль обновлен успешно!")
    } catch (error) {
      console.error("Ошибка обновления профиля:", error)
      alert("Произошла ошибка при обновлении профиля")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFullName(profile.full_name || "")
      setPhone(profile.phone || "")
      setCity(profile.city || "")
    }
    setEditing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            На рассмотрении
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Одобрено
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className="w-3 h-3 mr-1" />
            Отклонено
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "guard":
        return "Охранник"
      case "chop_hr":
        return "HR представитель ЧОПа"
      case "moderator":
        return "Модератор"
      case "admin":
        return "Администратор"
      default:
        return role
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

  if (!user || !profile) {
    return null
  }

  return (
    <>
      <Header />
      <main role="main" className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
            <p className="text-gray-600 mt-2">Управление профилем и настройками</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Основная информация */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Основная информация
                    </CardTitle>
                    {!editing ? (
                      <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave} disabled={loading}>
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? "Сохранение..." : "Сохранить"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Отмена
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Полное имя</Label>
                      {editing ? (
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Введите ваше имя"
                        />
                      ) : (
                        <p className="text-sm text-gray-600 mt-1">{profile.full_name || "Не указано"}</p>
                      )}
                    </div>

                    <div>
                      <Label>Email</Label>
                      <p className="text-sm text-gray-600 mt-1">{profile.email}</p>
                    </div>

                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      {editing ? (
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 (999) 123-45-67"
                        />
                      ) : (
                        <p className="text-sm text-gray-600 mt-1">{profile.phone || "Не указан"}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="city">Город</Label>
                      {editing ? (
                        <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Москва" />
                      ) : (
                        <p className="text-sm text-gray-600 mt-1">{profile.city || "Не указан"}</p>
                      )}
                    </div>

                    <div>
                      <Label>Роль</Label>
                      <p className="text-sm text-gray-600 mt-1">{getRoleName(profile.role)}</p>
                    </div>

                    <div>
                      <Label>Статус верификации</Label>
                      <div className="mt-1">
                        {profile.is_verified ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Верифицирован
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            <Clock className="w-3 h-3 mr-1" />
                            Не верифицирован
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Боковая панель */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {profile.role === "guard" && (
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/jobs")}>
                      Найти работу
                    </Button>
                  )}
                  {profile.role === "chop_hr" && assignments.length > 0 && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => router.push("/jobs/create")}
                    >
                      Создать вакансию
                    </Button>
                  )}
                  {["admin", "moderator"].includes(profile.role) && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => router.push("/admin/requests")}
                    >
                      Заявки ЧОПов
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Статистика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>Дата регистрации: {new Date(profile.created_at).toLocaleDateString("ru-RU")}</p>
                    <p>Последнее обновление: {new Date(profile.updated_at).toLocaleDateString("ru-RU")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Заявки и назначения для HR ЧОПа */}
          {profile.role === "chop_hr" && (
            <div className="mt-8 space-y-6">
              {/* Активные назначения */}
              {assignments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Мои организации
                    </CardTitle>
                    <CardDescription>Организации, к которым вы подключены</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{assignment.chops.name}</h4>
                              {assignment.chops.inn && (
                                <p className="text-sm text-gray-500">ИНН: {assignment.chops.inn}</p>
                              )}
                              <p className="text-sm text-gray-500">
                                Роль: {assignment.role === "hr" ? "HR-менеджер" : assignment.role}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Активно
                            </Badge>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" onClick={() => router.push("/jobs/create")}>
                              Создать вакансию
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/chop/${assignment.chop_id}`)}
                            >
                              Профиль ЧОПа
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Заявки */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Мои заявки
                  </CardTitle>
                  <CardDescription>История заявок на подключение к ЧОПам</CardDescription>
                </CardHeader>
                <CardContent>
                  {requests.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">У вас пока нет заявок</p>
                      <Button onClick={() => router.push("/chop-connection-request")}>Подать заявку</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {requests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{request.chops?.name || request.new_chop_name}</h4>
                              <p className="text-sm text-gray-500">Должность: {request.applicant_position}</p>
                            </div>
                            {getStatusBadge(request.status)}
                          </div>

                          {request.rejection_reason && (
                            <Alert className="mt-2 bg-red-50 border-red-200">
                              <XCircle className="h-4 w-4 text-red-600" />
                              <AlertDescription className="text-red-800">
                                <strong>Причина отклонения:</strong> {request.rejection_reason}
                              </AlertDescription>
                            </Alert>
                          )}

                          <p className="text-xs text-gray-500 mt-2">
                            Подана: {new Date(request.created_at).toLocaleString("ru-RU")}
                          </p>

                          {request.status === "rejected" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2"
                              onClick={() => router.push("/chop-connection-request")}
                            >
                              Подать новую заявку
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
