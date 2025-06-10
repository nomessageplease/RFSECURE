"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, Building2, User, Phone, Mail, MapPin } from "lucide-react"
import Header from "@/components/header"

interface RequestWithProfile {
  id: string
  user_id: string
  chop_id: string | null
  new_chop_name: string | null
  new_chop_inn: string | null
  new_chop_address: string | null
  new_chop_phone: string | null
  new_chop_email: string | null
  applicant_position: string
  applicant_phone: string | null
  comment: string | null
  status: "pending" | "approved" | "rejected"
  rejection_reason: string | null
  created_at: string
  profiles: {
    full_name: string | null
    email: string
  }
  chops?: {
    name: string
    inn: string | null
  }
}

export default function AdminRequestsPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [requests, setRequests] = useState<RequestWithProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<RequestWithProfile | null>(null)

  // Проверка доступа
  useEffect(() => {
    if (!authLoading && (!user || !profile)) {
      router.push("/auth/sign-in")
      return
    }

    if (!authLoading && profile && !["admin", "moderator"].includes(profile.role)) {
      router.push("/")
      return
    }
  }, [user, profile, authLoading, router])

  // Загрузка заявок
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const { data, error } = await supabase
          .from("chop_connection_requests")
          .select(`
            *,
            profiles!inner(full_name, email),
            chops(name, inn)
          `)
          .order("created_at", { ascending: false })

        if (error) throw error

        console.log("Loaded requests:", data)
        setRequests(data || [])
      } catch (error) {
        console.error("Ошибка загрузки заявок:", error)
      } finally {
        setLoading(false)
      }
    }

    if (profile && ["admin", "moderator"].includes(profile.role)) {
      loadRequests()
    }
  }, [supabase, profile])

  const handleApprove = async (request: RequestWithProfile) => {
    if (!user) return

    setProcessingId(request.id)

    try {
      // Начинаем транзакцию
      let chopId = request.chop_id

      // Если это новый ЧОП, создаем его
      if (!chopId && request.new_chop_name) {
        const { data: newChop, error: chopError } = await supabase
          .from("chops")
          .insert({
            name: request.new_chop_name,
            inn: request.new_chop_inn,
            address: request.new_chop_address,
            phone: request.new_chop_phone,
            email: request.new_chop_email,
            status: "verified",
            created_by: user.id,
          })
          .select()
          .single()

        if (chopError) throw chopError
        chopId = newChop.id
      }

      // Обновляем статус заявки
      const { error: requestError } = await supabase
        .from("chop_connection_requests")
        .update({
          status: "approved",
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", request.id)

      if (requestError) throw requestError

      // Создаем назначение HR
      if (chopId) {
        const { error: assignmentError } = await supabase.from("chop_hr_assignments").insert({
          user_id: request.user_id,
          chop_id: chopId,
          role: "hr",
          permissions: ["manage_jobs", "view_applications", "manage_profile"],
          assigned_by: user.id,
        })

        if (assignmentError) throw assignmentError
      }

      // Обновляем локальное состояние
      setRequests((prev) =>
        prev.map((r) =>
          r.id === request.id
            ? { ...r, status: "approved" as const, reviewed_by: user.id, reviewed_at: new Date().toISOString() }
            : r,
        ),
      )

      alert("Заявка одобрена успешно!")
    } catch (error) {
      console.error("Ошибка одобрения заявки:", error)
      alert("Произошла ошибка при одобрении заявки")
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (request: RequestWithProfile) => {
    if (!user || !rejectionReason.trim()) {
      alert("Укажите причину отклонения")
      return
    }

    setProcessingId(request.id)

    try {
      const { error } = await supabase
        .from("chop_connection_requests")
        .update({
          status: "rejected",
          rejection_reason: rejectionReason.trim(),
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", request.id)

      if (error) throw error

      // Обновляем локальное состояние
      setRequests((prev) =>
        prev.map((r) =>
          r.id === request.id
            ? {
                ...r,
                status: "rejected" as const,
                rejection_reason: rejectionReason.trim(),
                reviewed_by: user.id,
                reviewed_at: new Date().toISOString(),
              }
            : r,
        ),
      )

      setRejectionReason("")
      setSelectedRequest(null)
      alert("Заявка отклонена")
    } catch (error) {
      console.error("Ошибка отклонения заявки:", error)
      alert("Произошла ошибка при отклонении заявки")
    } finally {
      setProcessingId(null)
    }
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !profile || !["admin", "moderator"].includes(profile.role)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Заявки на подключение к ЧОПам</h1>
          <p className="text-gray-600 mt-2">Управление заявками от HR представителей</p>
        </div>

        {requests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Заявок пока нет</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {request.profiles.full_name || "Без имени"}
                      </CardTitle>
                      <CardDescription>
                        {request.profiles.email} • {request.applicant_position}
                      </CardDescription>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Организация
                      </h4>
                      {request.chop_id ? (
                        <div>
                          <p className="font-medium">{request.chops?.name}</p>
                          {request.chops?.inn && <p className="text-sm text-gray-500">ИНН: {request.chops.inn}</p>}
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium">{request.new_chop_name}</p>
                          {request.new_chop_inn && <p className="text-sm text-gray-500">ИНН: {request.new_chop_inn}</p>}
                          {request.new_chop_address && (
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {request.new_chop_address}
                            </p>
                          )}
                          <Badge variant="outline" className="mt-1 text-blue-600 border-blue-600">
                            Новая организация
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Контакты</h4>
                      {request.applicant_phone && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {request.applicant_phone}
                        </p>
                      )}
                      {request.new_chop_email && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {request.new_chop_email}
                        </p>
                      )}
                    </div>
                  </div>

                  {request.comment && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Комментарий</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{request.comment}</p>
                    </div>
                  )}

                  {request.rejection_reason && (
                    <Alert className="mb-4 bg-red-50 border-red-200">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Причина отклонения:</strong> {request.rejection_reason}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="text-xs text-gray-500 mb-4">
                    Подана: {new Date(request.created_at).toLocaleString("ru-RU")}
                  </div>

                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(request)}
                        disabled={processingId === request.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {processingId === request.id ? "Обработка..." : "Одобрить"}
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Отклонить
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Отклонить заявку</DialogTitle>
                            <DialogDescription>
                              Укажите причину отклонения заявки от {request.profiles.full_name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="rejection-reason">Причина отклонения *</Label>
                              <Textarea
                                id="rejection-reason"
                                placeholder="Укажите причину отклонения заявки..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => selectedRequest && handleReject(selectedRequest)}
                                disabled={!rejectionReason.trim() || processingId === request.id}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {processingId === request.id ? "Обработка..." : "Отклонить заявку"}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setRejectionReason("")
                                  setSelectedRequest(null)
                                }}
                              >
                                Отмена
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
