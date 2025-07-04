"use client"

import { useEffect, useState } from "react"
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Eye,
  Heart,
  Send,
  Phone,
  Mail,
  Building,
  Shield,
  Star,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VacancyDetailPageProps {
  vacancyId: string
}

export default function VacancyDetailPage({ vacancyId }: VacancyDetailPageProps) {
  const [currentRole, setCurrentRole] = useState("Гость")
  const [isSaved, setIsSaved] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

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

  // Мокданные вакансии
  const vacancy = {
    id: vacancyId,
    title: "Охранник 4 разряда",
    company: {
      name: "ЧОП Безопасность Плюс",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      verified: true,
    },
    salary: {
      from: 45000,
      to: 65000,
      currency: "₽",
    },
    location: "Москва, ЦАО",
    schedule: "Сменный график 2/2",
    experience: "От 1 года",
    employment: "Полная занятость",
    publishedAt: "2024-01-15",
    views: 234,
    applications: 12,
    description: `Приглашаем на работу опытного охранника 4 разряда для работы на престижных объектах в центре Москвы.

Обязанности:
• Обеспечение безопасности объекта
• Контроль доступа посетителей и сотрудников
• Ведение документации
• Взаимодействие с службами экстренного реагирования
• Патрулирование территории

Требования:
• Удостоверение охранника 4 разряда
• Опыт работы от 1 года
• Ответственность и внимательность
• Физическая подготовка
• Отсутствие судимости`,
    requirements: [
      "Удостоверение охранника 4 разряда",
      "Опыт работы от 1 года",
      "Ответственность и внимательность",
      "Физическая подготовка",
      "Отсутствие судимости",
    ],
    conditions: [
      "Официальное трудоустройство",
      "Социальный пакет",
      "Форменная одежда",
      "Обучение за счет компании",
      "Карьерный рост",
    ],
    contacts: {
      phone: "+7 (495) 123-45-67",
      email: "hr@security-plus.ru",
      manager: "Иванов Сергей Петрович",
    },
    object: {
      type: "Офисное здание",
      address: "ул. Тверская, д. 15",
      description: "Современный бизнес-центр класса А",
    },
  }

  const toggleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleApply = () => {
    setHasApplied(true)
  }

  const canApply = currentRole === "Сотрудник охраны" || currentRole === "Новичок"
  const canViewContacts = currentRole !== "Гость"

  return (
    <main className="flex-1 bg-gray-50">
      {/* Шапка вакансии */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Основная информация */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={vacancy.company.logo || "/placeholder.svg"}
                  alt={vacancy.company.name}
                  className="h-16 w-16 rounded-xl border-2 border-white shadow-lg"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{vacancy.title}</h1>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg font-semibold text-blue-600">{vacancy.company.name}</span>
                    {vacancy.company.verified && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Проверен
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{vacancy.company.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>
                        {vacancy.salary.from.toLocaleString()} - {vacancy.salary.to.toLocaleString()}{" "}
                        {vacancy.salary.currency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{vacancy.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{vacancy.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{vacancy.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Статистика */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{vacancy.views} просмотров</span>
                </div>
                <div className="flex items-center gap-1">
                  <Send className="h-4 w-4" />
                  <span>{vacancy.applications} откликов</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Опубликовано {new Date(vacancy.publishedAt).toLocaleDateString("ru-RU")}</span>
                </div>
              </div>
            </div>

            {/* Действия */}
            <div className="flex flex-col gap-3 lg:w-64">
              {canApply && !hasApplied && (
                <Button onClick={handleApply} size="lg" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Откликнуться
                </Button>
              )}

              {hasApplied && (
                <Button disabled size="lg" className="w-full bg-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Отклик отправлен
                </Button>
              )}

              {currentRole !== "Гость" && (
                <Button onClick={toggleSave} variant="outline" size="lg" className="w-full bg-transparent">
                  <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current text-red-500" : ""}`} />
                  {isSaved ? "Сохранено" : "Сохранить"}
                </Button>
              )}

              {canViewContacts && (
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-blue-900">Контакты для связи</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-blue-600" />
                      <span>{vacancy.contacts.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-blue-600" />
                      <span>{vacancy.contacts.email}</span>
                    </div>
                    <p className="text-blue-700 font-medium">{vacancy.contacts.manager}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="description" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="requirements">Требования</TabsTrigger>
              <TabsTrigger value="conditions">Условия</TabsTrigger>
              <TabsTrigger value="object">Объект</TabsTrigger>
            </TabsList>

            {/* Описание */}
            <TabsContent value="description">
              <Card>
                <CardHeader>
                  <CardTitle>Описание вакансии</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                      {vacancy.description}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Требования */}
            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Требования к кандидату</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {vacancy.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Условия */}
            <TabsContent value="conditions">
              <Card>
                <CardHeader>
                  <CardTitle>Условия работы</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {vacancy.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{condition}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Заработная плата</h4>
                    <p className="text-2xl font-bold text-green-700">
                      {vacancy.salary.from.toLocaleString()} - {vacancy.salary.to.toLocaleString()}{" "}
                      {vacancy.salary.currency}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {vacancy.employment} • {vacancy.schedule}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Объект */}
            <TabsContent value="object">
              <Card>
                <CardHeader>
                  <CardTitle>Информация об объекте</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Тип объекта
                    </h4>
                    <p className="text-gray-700">{vacancy.object.type}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Адрес
                    </h4>
                    <p className="text-gray-700">{vacancy.object.address}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Описание
                    </h4>
                    <p className="text-gray-700">{vacancy.object.description}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Особенности работы</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Работа в современном бизнес-центре</li>
                      <li>• Комфортные условия труда</li>
                      <li>• Престижное место работы</li>
                      <li>• Удобная транспортная доступность</li>
                    </ul>
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
