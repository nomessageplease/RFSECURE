"use client"

import { useEffect, useState } from "react"
import {
  Star,
  MapPin,
  Users,
  Phone,
  Mail,
  Globe,
  Shield,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Building,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrganizationDetailPageProps {
  organizationId: string
}

export default function OrganizationDetailPage({ organizationId }: OrganizationDetailPageProps) {
  const [currentRole, setCurrentRole] = useState("Гость")
  const [isFavorite, setIsFavorite] = useState(false)

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

  // Мокданные организации
  const organization = {
    id: organizationId,
    name: "ЧОП Безопасность Плюс",
    logo: "/placeholder.svg?height=120&width=120",
    rating: {
      overall: 4.7,
      reliability: 4.8,
      salary: 4.5,
      conditions: 4.6,
      career: 4.4,
      management: 4.7,
    },
    city: "Москва",
    address: "ул. Тверская, д. 15, стр. 2",
    phone: "+7 (495) 123-45-67",
    email: "info@security-plus.ru",
    website: "www.security-plus.ru",
    founded: 2010,
    employees: 450,
    objects: 120,
    vacancies: 15,
    verified: true,
    hasComplaints: false,
    license: "№ 12345 от 15.03.2020",
    description:
      "Ведущая охранная организация с безупречной репутацией и высокими стандартами обслуживания клиентов. Специализируемся на охране банков, торговых центров и офисных зданий.",
    services: [
      "Физическая охрана объектов",
      "Техническая охрана",
      "Пультовая охрана",
      "Личная охрана",
      "Инкассация",
      "Консультации по безопасности",
    ],
    specializations: ["Банки", "Торговые центры", "Офисы", "Склады"],
    achievements: ["Лучший ЧОП года 2023", "Сертификат ISO 9001", "Партнер Росгвардии"],
  }

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating}</span>
      </div>
    )
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <main className="flex-1 bg-gray-50">
      {/* Шапка организации */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Основная информация */}
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <img
                  src={organization.logo || "/placeholder.svg"}
                  alt={organization.name}
                  className="h-20 w-20 rounded-xl border-2 border-white shadow-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{organization.name}</h1>
                    {organization.verified && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Проверен
                      </Badge>
                    )}
                    {organization.hasComplaints && currentRole !== "Гость" && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Жалобы
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{organization.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Основан в {organization.founded}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{organization.employees} сотрудников</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {renderRatingStars(organization.rating.overall)}
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{organization.objects} объектов</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{organization.vacancies} вакансий</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Действия */}
            <div className="flex flex-col gap-3">
              {currentRole !== "Гость" && (
                <Button
                  onClick={toggleFavorite}
                  variant={isFavorite ? "default" : "outline"}
                  className="w-full lg:w-auto"
                >
                  <Star className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "В избранном" : "В избранное"}
                </Button>
              )}

              {(currentRole === "Сотрудник охраны" || currentRole === "Новичок") && (
                <Button className="w-full lg:w-auto">
                  <Users className="h-4 w-4 mr-2" />
                  Смотреть вакансии
                </Button>
              )}

              {currentRole !== "Гость" && (
                <Button variant="outline" className="w-full lg:w-auto bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Написать
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              <TabsTrigger value="vacancies">Вакансии</TabsTrigger>
              <TabsTrigger value="contacts">Контакты</TabsTrigger>
              <TabsTrigger value="gallery">Галерея</TabsTrigger>
            </TabsList>

            {/* Обзор */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Основная информация */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>О компании</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-4">{organization.description}</p>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Услуги:</h4>
                          <div className="flex flex-wrap gap-2">
                            {organization.services.map((service, index) => (
                              <Badge key={index} variant="secondary">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Специализация:</h4>
                          <div className="flex flex-wrap gap-2">
                            {organization.specializations.map((spec, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Достижения:</h4>
                          <div className="space-y-2">
                            {organization.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Детальные рейтинги */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Детальные рейтинги</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(organization.rating).map(([key, value]) => {
                          const labels = {
                            overall: "Общий рейтинг",
                            reliability: "Надежность",
                            salary: "Зарплата",
                            conditions: "Условия работы",
                            career: "Карьерный рост",
                            management: "Руководство",
                          }

                          return (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm font-medium">{labels[key as keyof typeof labels]}</span>
                              <div className="flex items-center gap-2">{renderRatingStars(value)}</div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Боковая панель */}
                <div className="space-y-6">
                  {/* Ключевые показатели */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ключевые показатели</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Сотрудников</span>
                        <span className="font-semibold">{organization.employees}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Объектов</span>
                        <span className="font-semibold">{organization.objects}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Открытых вакансий</span>
                        <span className="font-semibold">{organization.vacancies}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Год основания</span>
                        <span className="font-semibold">{organization.founded}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Лицензия */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Лицензия
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">{organization.license}</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">Действующая</Badge>
                    </CardContent>
                  </Card>

                  {/* Быстрые контакты */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Быстрые контакты</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{organization.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{organization.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{organization.website}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Отзывы */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Отзывы сотрудников</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Отзывы будут доступны в следующем обновлении</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Вакансии */}
            <TabsContent value="vacancies">
              <Card>
                <CardHeader>
                  <CardTitle>Открытые вакансии</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Список вакансий будет доступен в следующем обновлении</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Контакты */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Адрес офиса</h4>
                    <p className="text-gray-700">{organization.address}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Телефон</h4>
                    <p className="text-gray-700">{organization.phone}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Email</h4>
                    <p className="text-gray-700">{organization.email}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Веб-сайт</h4>
                    <p className="text-gray-700">{organization.website}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Галерея */}
            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <CardTitle>Фотогалерея</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Фотогалерея будет доступна в следующем обновлении</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
