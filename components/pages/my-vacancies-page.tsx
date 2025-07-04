"use client"

import { useEffect, useState } from "react"
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Send,
  CheckCircle,
  XCircle,
  Pause,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyVacanciesPage() {
  const [currentRole, setCurrentRole] = useState("Гость")
  const [searchQuery, setSearchQuery] = useState("")

  // Загружаем роль из localStorage
  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      const roles = [
        "Гость",
        "Новичок",
        "Сотрудник охраны",
        "Управляющий ЧОПа",
        "Менеджер ЧОПа",
        "Модератор",
        "Саппорт",
        "Суперадмин",
      ]
      const index = Number.parseInt(savedRoleIndex, 10)
      setCurrentRole(roles[index])
    }
  }, [])

  // Слушаем изменения роли
  useEffect(() => {
    const handleRoleChange = (event: CustomEvent) => {
      setCurrentRole(event.detail.role)
    }

    window.addEventListener("roleChanged", handleRoleChange as EventListener)
    return () => {
      window.removeEventListener("roleChanged", handleRoleChange as EventListener)
    }
  }, [])

  const isEmployer = currentRole === "Управляющий ЧОПа" || currentRole === "Менеджер ЧОПа"
  const isEmployee = currentRole === "Сотрудник охраны" || currentRole === "Новичок"

  // Мокданные для работодателей
  const employerVacancies = [
    {
      id: 1,
      title: "Охранник 4 разряда",
      location: "Москва, ЦАО",
      salary: "45,000 - 65,000 ₽",
      status: "active",
      views: 234,
      applications: 12,
      publishedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Старший охранник",
      location: "Москва, СВАО",
      salary: "55,000 - 75,000 ₽",
      status: "paused",
      views: 156,
      applications: 8,
      publishedAt: "2024-01-10",
    },
    {
      id: 3,
      title: "Охранник-контролер",
      location: "Москва, ЗАО",
      salary: "40,000 - 55,000 ₽",
      status: "closed",
      views: 89,
      applications: 5,
      publishedAt: "2024-01-05",
    },
  ]

  // Мокданные для сотрудников
  const employeeApplications = [
    {
      id: 1,
      title: "Охранник 4 разряда",
      company: "ЧОП Безопасность Плюс",
      location: "Москва, ЦАО",
      salary: "45,000 - 65,000 ₽",
      status: "pending",
      appliedAt: "2024-01-16",
    },
    {
      id: 2,
      title: "Старший охранник",
      company: "ЧОП Надежная Охрана",
      location: "Москва, СВАО",
      salary: "55,000 - 75,000 ₽",
      status: "viewed",
      appliedAt: "2024-01-14",
    },
    {
      id: 3,
      title: "Охранник-контролер",
      company: "ЧОП Защита",
      location: "Москва, ЗАО",
      salary: "40,000 - 55,000 ₽",
      status: "accepted",
      appliedAt: "2024-01-12",
    },
    {
      id: 4,
      title: "Охранник объекта",
      company: "ЧОП Стражи",
      location: "Москва, ЮАО",
      salary: "42,000 - 58,000 ₽",
      status: "rejected",
      appliedAt: "2024-01-10",
    },
  ]

  const getStatusBadge = (status: string, isEmployer: boolean) => {
    if (isEmployer) {
      switch (status) {
        case "active":
          return (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Активна
            </Badge>
          )
        case "paused":
          return (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Pause className="h-3 w-3 mr-1" />
              Приостановлена
            </Badge>
          )
        case "closed":
          return (
            <Badge className="bg-gray-100 text-gray-800">
              <XCircle className="h-3 w-3 mr-1" />
              Закрыта
            </Badge>
          )
        default:
          return null
      }
    } else {
      switch (status) {
        case "pending":
          return (
            <Badge className="bg-blue-100 text-blue-800">
              <Clock className="h-3 w-3 mr-1" />
              На рассмотрении
            </Badge>
          )
        case "viewed":
          return (
            <Badge className="bg-purple-100 text-purple-800">
              <Eye className="h-3 w-3 mr-1" />
              Просмотрен
            </Badge>
          )
        case "accepted":
          return (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Принят
            </Badge>
          )
        case "rejected":
          return (
            <Badge className="bg-red-100 text-red-800">
              <XCircle className="h-3 w-3 mr-1" />
              Отклонен
            </Badge>
          )
        default:
          return null
      }
    }
  }

  const getStats = () => {
    if (isEmployer) {
      const active = employerVacancies.filter((v) => v.status === "active").length
      const totalViews = employerVacancies.reduce((sum, v) => sum + v.views, 0)
      const totalApplications = employerVacancies.reduce((sum, v) => sum + v.applications, 0)
      return { active, totalViews, totalApplications }
    } else {
      const pending = employeeApplications.filter((a) => a.status === "pending").length
      const accepted = employeeApplications.filter((a) => a.status === "accepted").length
      const total = employeeApplications.length
      return { pending, accepted, total }
    }
  }

  const stats = getStats()

  if (currentRole === "Гость") {
    return (
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Вход требуется</h2>
            <p className="text-gray-600 mb-4">Для просмотра вакансий необходимо войти в систему</p>
            <Button>Войти в систему</Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-gray-50">
      {/* Шапка */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{isEmployer ? "Мои вакансии" : "Мои отклики"}</h1>
              <p className="text-gray-600">
                {isEmployer ? "Управление размещенными вакансиями" : "Отслеживание статуса откликов на вакансии"}
              </p>
            </div>

            <div className="flex gap-3">
              {isEmployer && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать вакансию
                </Button>
              )}
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </div>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {isEmployer ? (
              <>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Активных вакансий</p>
                        <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Всего просмотров</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalViews}</p>
                      </div>
                      <Eye className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Всего откликов</p>
                        <p className="text-2xl font-bold text-purple-600">{stats.totalApplications}</p>
                      </div>
                      <Send className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">На рассмотрении</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Принято</p>
                        <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Всего откликов</p>
                        <p className="text-2xl font-bold text-gray-600">{stats.total}</p>
                      </div>
                      <Send className="h-8 w-8 text-gray-600" />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Поиск */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={isEmployer ? "Поиск по вакансиям..." : "Поиск по откликам..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isEmployer ? (
            /* Вакансии работодателя */
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="paused">Приостановленные</TabsTrigger>
                <TabsTrigger value="closed">Закрытые</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {employerVacancies
                  .filter((v) => v.status === "active")
                  .map((vacancy) => (
                    <Card key={vacancy.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{vacancy.title}</h3>
                              {getStatusBadge(vacancy.status, true)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{vacancy.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{vacancy.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Опубликовано {new Date(vacancy.publishedAt).toLocaleDateString("ru-RU")}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{vacancy.views} просмотров</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Send className="h-4 w-4" />
                                <span>{vacancy.applications} откликов</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="paused" className="space-y-4">
                {employerVacancies
                  .filter((v) => v.status === "paused")
                  .map((vacancy) => (
                    <Card key={vacancy.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{vacancy.title}</h3>
                              {getStatusBadge(vacancy.status, true)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{vacancy.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{vacancy.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Опубликовано {new Date(vacancy.publishedAt).toLocaleDateString("ru-RU")}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{vacancy.views} просмотров</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Send className="h-4 w-4" />
                                <span>{vacancy.applications} откликов</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="closed" className="space-y-4">
                {employerVacancies
                  .filter((v) => v.status === "closed")
                  .map((vacancy) => (
                    <Card key={vacancy.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{vacancy.title}</h3>
                              {getStatusBadge(vacancy.status, true)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{vacancy.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{vacancy.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Опубликовано {new Date(vacancy.publishedAt).toLocaleDateString("ru-RU")}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{vacancy.views} просмотров</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Send className="h-4 w-4" />
                                <span>{vacancy.applications} откликов</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          ) : (
            /* Отклики сотрудника */
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">Все отклики</TabsTrigger>
                <TabsTrigger value="pending">На рассмотрении</TabsTrigger>
                <TabsTrigger value="accepted">Принятые</TabsTrigger>
                <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {employeeApplications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{application.title}</h3>
                            {getStatusBadge(application.status, false)}
                          </div>

                          <p className="text-blue-600 font-medium mb-3">{application.company}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{application.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              <span>{application.salary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Отклик отправлен {new Date(application.appliedAt).toLocaleDateString("ru-RU")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {employeeApplications
                  .filter((a) => a.status === "pending")
                  .map((application) => (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{application.title}</h3>
                              {getStatusBadge(application.status, false)}
                            </div>

                            <p className="text-blue-600 font-medium mb-3">{application.company}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{application.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  Отклик отправлен {new Date(application.appliedAt).toLocaleDateString("ru-RU")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="accepted" className="space-y-4">
                {employeeApplications
                  .filter((a) => a.status === "accepted")
                  .map((application) => (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{application.title}</h3>
                              {getStatusBadge(application.status, false)}
                            </div>

                            <p className="text-blue-600 font-medium mb-3">{application.company}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{application.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  Отклик отправлен {new Date(application.appliedAt).toLocaleDateString("ru-RU")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4">
                {employeeApplications
                  .filter((a) => a.status === "rejected")
                  .map((application) => (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{application.title}</h3>
                              {getStatusBadge(application.status, false)}
                            </div>

                            <p className="text-blue-600 font-medium mb-3">{application.company}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{application.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  Отклик отправлен {new Date(application.appliedAt).toLocaleDateString("ru-RU")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </main>
  )
}
