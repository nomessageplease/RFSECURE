"use client"

import { useState } from "react"
import {
  FileText,
  Download,
  Shield,
  MapPin,
  Edit,
  Check,
  X,
  Eye,
  Award,
  Briefcase,
  Clock,
  AlertCircle,
  Plus,
  Trash,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { UserRoleSwitcher, useUserRole } from "@/components/user-role-switcher"
import Header from "@/components/header"

const documents = [
  {
    id: 1,
    name: "Удостоверение частного охранника",
    type: "license",
    number: "123456789",
    issueDate: "2023-01-15",
    expiryDate: "2026-01-15",
    status: "active",
    file: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    name: "Медицинская справка",
    type: "medical",
    number: "МС-2023-001",
    issueDate: "2023-06-01",
    expiryDate: "2024-06-01",
    status: "expiring",
    file: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    name: "Справка о несудимости",
    type: "criminal",
    number: "СН-2023-456",
    issueDate: "2023-05-15",
    expiryDate: "2024-05-15",
    status: "active",
    file: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    name: "Сертификат повышения квалификации",
    type: "certificate",
    number: "СПК-2023-789",
    issueDate: "2023-09-10",
    expiryDate: "2026-09-10",
    status: "active",
    file: "/placeholder.svg?height=600&width=800",
  },
]

const workHistory = [
  {
    id: 1,
    company: "Охранное Агентство Авангард",
    position: "Старший охранник",
    startDate: "2022-01-15",
    endDate: "2024-01-15",
    location: "ТЦ Европейский, Москва",
    description: "Обеспечение безопасности торгового центра, контроль доступа, работа с посетителями",
    rating: 4.8,
    current: false,
  },
  {
    id: 2,
    company: "Щит-Безопасность",
    position: "Охранник",
    startDate: "2020-03-01",
    endDate: "2021-12-31",
    location: "Бизнес-центр Москва-Сити",
    description: "Охрана офисного здания, контроль пропускного режима",
    rating: 4.5,
    current: false,
  },
  {
    id: 3,
    company: "Элит-Охрана",
    position: "Охранник",
    startDate: "2024-02-01",
    endDate: null,
    location: "Жилой комплекс Премиум",
    description: "Охрана жилого комплекса, работа с жильцами и гостями",
    rating: null,
    current: true,
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const { userRole } = useUserRole()

  const getProfileData = () => {
    switch (userRole) {
      case "guard":
        return {
          type: "guard",
          name: "Иван Петрович Сидоров",
          phone: "+7 (495) 123-45-67",
          email: "ivan.sidorov@example.com",
          rating: 4.7,
          completedJobs: 156,
          experience: 8,
          status: "active",
          profileCompletion: 85,
        }
      case "chop":
        return {
          type: "chop",
          name: "ООО 'Охранное Агентство Авангард'",
          phone: "+7 (495) 987-65-43",
          email: "info@avangard-security.ru",
          rating: 4.9,
          employees: 245,
          experience: 12,
          status: "verified",
          profileCompletion: 92,
        }
      case "moderator":
        return {
          type: "moderator",
          name: "Анна Викторовна Козлова",
          phone: "+7 (495) 555-12-34",
          email: "a.kozlova@moderator.ru",
          rating: 5.0,
          moderatedPosts: 1247,
          experience: 3,
          status: "active",
          profileCompletion: 100,
        }
      case "admin":
        return {
          type: "admin",
          name: "Системный Администратор",
          phone: "+7 (495) 000-00-00",
          email: "admin@system.ru",
          rating: 5.0,
          systemActions: 9999,
          experience: 10,
          status: "active",
          profileCompletion: 100,
        }
    }
  }

  const profileData = getProfileData()

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expiring":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDocumentStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Действует"
      case "expiring":
        return "Истекает"
      case "expired":
        return "Просрочен"
      default:
        return "Неизвестно"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserRoleSwitcher />

      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col xl:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="h-24 w-24 border-2 border-gray-200 mx-auto sm:mx-0">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Award
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(profileData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{profileData.rating}</span>
                    <span className="text-gray-500">({profileData.completedJobs} работ)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{profileData.experience} лет опыта</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Москва</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Заполненность профиля</div>
                  <Progress value={profileData.profileCompletion} className="w-32 mx-auto" />
                  <div className="text-sm font-medium mt-1">{profileData.profileCompletion}%</div>
                </div>
                <Badge
                  className={`text-center ${
                    profileData.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  } border-0`}
                >
                  {profileData.status === "active" ? "Активен" : "Неактивен"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            {userRole === "guard" && <TabsTrigger value="documents">Документы</TabsTrigger>}
            {userRole === "guard" && <TabsTrigger value="history">История работы</TabsTrigger>}
            {userRole === "chop" && <TabsTrigger value="employees">Сотрудники</TabsTrigger>}
            {userRole === "chop" && <TabsTrigger value="licenses">Лицензии</TabsTrigger>}
            {(userRole === "moderator" || userRole === "admin") && (
              <TabsTrigger value="moderation">Модерация</TabsTrigger>
            )}
            {userRole === "guard" && <TabsTrigger value="applications">Отклики</TabsTrigger>}
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Личная информация</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Отменить" : "Редактировать"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">ФИО</Label>
                      <Input id="name" defaultValue={profileData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" defaultValue={profileData.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={profileData.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Дата рождения</Label>
                      <Input id="birthDate" type="date" defaultValue={profileData.birthDate} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Адрес</Label>
                      <Input id="address" defaultValue={profileData.address} />
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4 mr-2" />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Отменить
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-600">ФИО</Label>
                      <div className="font-medium">{profileData.name}</div>
                    </div>
                    <div>
                      <Label className="text-gray-600">Телефон</Label>
                      <div className="font-medium">{profileData.phone}</div>
                    </div>
                    <div>
                      <Label className="text-gray-600">Email</Label>
                      <div className="font-medium">{profileData.email}</div>
                    </div>
                    <div>
                      <Label className="text-gray-600">Дата рождения</Label>
                      <div className="font-medium">{new Date(profileData.birthDate).toLocaleDateString("ru-RU")}</div>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-gray-600">Адрес</Label>
                      <div className="font-medium">{profileData.address}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Документы</CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить документ
                  </Button>
                </CardHeader>
                <CardContent>
                  {/* Document expiry alerts */}
                  <div className="mb-6 space-y-3">
                    {documents
                      .filter((doc) => doc.status === "expiring")
                      .map((doc) => (
                        <Alert key={doc.id} className="bg-yellow-50 text-yellow-800 border-yellow-200">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Документ истекает</AlertTitle>
                          <AlertDescription>
                            {doc.name} истекает {new Date(doc.expiryDate).toLocaleDateString("ru-RU")}
                          </AlertDescription>
                        </Alert>
                      ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-blue-100 rounded-lg">
                                <FileText className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{doc.name}</h3>
                                <div className="text-sm text-gray-600">
                                  № {doc.number} • Выдан {new Date(doc.issueDate).toLocaleDateString("ru-RU")}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Действует до {new Date(doc.expiryDate).toLocaleDateString("ru-RU")}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={`${getDocumentStatusColor(doc.status)} border-0`}>
                                {getDocumentStatusText(doc.status)}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Просмотр
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Скачать
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>История работы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {workHistory.map((job) => (
                    <div key={job.id} className="border-l-4 border-blue-500 pl-6 pb-6">
                      <div className="flex flex-col md:flex-row items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{job.position}</h3>
                          <div className="text-blue-600 font-medium">{job.company}</div>
                          <div className="text-gray-600">{job.location}</div>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <div className="text-sm text-gray-600">
                            {new Date(job.startDate).toLocaleDateString("ru-RU")} -{" "}
                            {job.endDate ? new Date(job.endDate).toLocaleDateString("ru-RU") : "настоящее время"}
                          </div>
                          {job.current && (
                            <Badge className="bg-green-100 text-green-800 border-0 mt-1">Текущая работа</Badge>
                          )}
                          {job.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Award className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{job.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700">{job.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Мои отклики</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет откликов</h3>
                  <p className="text-gray-600 mb-4">Начните искать работу в разделе вакансий</p>
                  <Link href="/jobs">
                    <Button className="bg-blue-600 hover:bg-blue-700">Найти работу</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {userRole === "chop" && (
            <TabsContent value="employees">
              <Card>
                <CardHeader>
                  <CardTitle>Сотрудники ({profileData.employees})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Управление сотрудниками</h3>
                    <p className="text-gray-600 mb-4">Здесь будет список всех сотрудников организации</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {userRole === "chop" && (
            <TabsContent value="licenses">
              <Card>
                <CardHeader>
                  <CardTitle>Лицензии и разрешения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Лицензии организации</h3>
                    <p className="text-gray-600 mb-4">Управление лицензиями и разрешениями ЧОП</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {(userRole === "moderator" || userRole === "admin") && (
            <TabsContent value="moderation">
              <Card>
                <CardHeader>
                  <CardTitle>Модерация</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {userRole === "admin" ? "Системное управление" : "Инструменты модерации"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {userRole === "admin"
                        ? "Управление системой и пользователями"
                        : "Модерация контента и пользователей"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
