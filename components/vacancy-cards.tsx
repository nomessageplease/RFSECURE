"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Clock,
  RussianRubleIcon as Ruble,
  Users,
  Shield,
  Star,
  Heart,
  Send,
  Eye,
  Calendar,
  Briefcase,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
} from "lucide-react"

interface VacancyCardsProps {
  role?: string
}

export default function VacancyCards({ role = "Гость" }: VacancyCardsProps) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [applied, setApplied] = useState<number[]>([])

  const vacancies = [
    {
      id: 1,
      title: "Охранник 4 разряда",
      company: "ЧОП Безопасность Плюс",
      companyLogo: "/placeholder.svg?height=40&width=40&text=БП",
      companyRating: 4.8,
      location: "Москва, ЦАО",
      salary: {
        from: 55000,
        to: 75000,
        currency: "₽",
      },
      schedule: "Сменный график 2/2",
      experience: "От 2 лет",
      education: "Среднее специальное",
      requirements: [
        "Удостоверение ЧО 4 разряда",
        "Опыт работы в банковской сфере",
        "Знание основ охранной деятельности",
        "Физическая подготовка",
      ],
      responsibilities: [
        "Охрана банковского отделения",
        "Контроль доступа посетителей",
        "Обеспечение безопасности персонала",
        "Ведение документации",
      ],
      benefits: ["ДМС", "Обучение за счет компании", "Премии", "Карьерный рост"],
      publishedDate: "2024-01-15",
      viewsCount: 156,
      applicantsCount: 23,
      responseRate: 85,
      isUrgent: true,
      isVerified: true,
      workType: "Полная занятость",
      objectType: "Банк",
      shiftDuration: "12 часов",
    },
    {
      id: 2,
      title: "Старший охранник торгового центра",
      company: "Охранное агентство Щит",
      companyLogo: "/placeholder.svg?height=40&width=40&text=Щит",
      companyRating: 4.6,
      location: "Санкт-Петербург",
      salary: {
        from: 48000,
        to: 65000,
        currency: "₽",
      },
      schedule: "График 5/2",
      experience: "От 3 лет",
      education: "Среднее",
      requirements: [
        "Удостоверение ЧО",
        "Опыт руководства группой",
        "Знание систем видеонаблюдения",
        "Ответственность",
      ],
      responsibilities: [
        "Координация работы смены",
        "Контроль торгового центра",
        "Работа с посетителями",
        "Составление отчетов",
      ],
      benefits: ["Соцпакет", "Обучение", "Стабильная зарплата"],
      publishedDate: "2024-01-12",
      viewsCount: 89,
      applicantsCount: 15,
      responseRate: 78,
      isUrgent: false,
      isVerified: true,
      workType: "Полная занятость",
      objectType: "ТЦ",
      shiftDuration: "8 часов",
    },
    {
      id: 3,
      title: "Охранник-водитель VIP",
      company: "Гарант Секьюрити",
      companyLogo: "/placeholder.svg?height=40&width=40&text=ГС",
      companyRating: 4.4,
      location: "Москва",
      salary: {
        from: 80000,
        to: 120000,
        currency: "₽",
      },
      schedule: "Гибкий график",
      experience: "От 5 лет",
      education: "Среднее специальное",
      requirements: [
        "Удостоверение ЧО 6 разряда",
        "Водительские права категории B",
        "Опыт VIP охраны",
        "Знание иностранного языка",
      ],
      responsibilities: [
        "Личная охрана клиента",
        "Сопровождение на мероприятия",
        "Обеспечение безопасности передвижения",
        "Планирование маршрутов",
      ],
      benefits: ["Высокая зарплата", "Премии", "Служебный автомобиль"],
      publishedDate: "2024-01-10",
      viewsCount: 234,
      applicantsCount: 8,
      responseRate: 65,
      isUrgent: true,
      isVerified: false,
      workType: "Полная занятость",
      objectType: "VIP",
      shiftDuration: "По ситуации",
    },
  ]

  const toggleFavorite = (vacancyId: number) => {
    if (role === "Гость") {
      alert("Для добавления в избранное необходимо войти в систему")
      return
    }

    setFavorites((prev) => (prev.includes(vacancyId) ? prev.filter((id) => id !== vacancyId) : [...prev, vacancyId]))
  }

  const handleApply = (vacancyId: number) => {
    if (role === "Гость") {
      alert("Для отклика на вакансию необходимо войти в систему")
      return
    }

    if (role === "Представитель организации") {
      alert("Представители организаций не могут откликаться на вакансии")
      return
    }

    setApplied((prev) => [...prev, vacancyId])
    alert("Ваш отклик отправлен!")
  }

  const handleViewDetails = (vacancyId: number) => {
    console.log(`Просмотр деталей вакансии ${vacancyId}`)
    // Здесь будет навигация к детальной странице
  }

  const formatSalary = (salary: { from: number; to: number; currency: string }) => {
    return `${salary.from.toLocaleString()} - ${salary.to.toLocaleString()} ${salary.currency}`
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "вчера"
    if (diffDays < 7) return `${diffDays} дня назад`
    return `${Math.floor(diffDays / 7)} недель назад`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {vacancies.map((vacancy) => (
        <Card key={vacancy.id} className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200">
          <CardHeader className="pb-4">
            {/* Шапка вакансии */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {vacancy.isUrgent && (
                    <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Срочно
                    </Badge>
                  )}
                  {vacancy.isVerified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Проверено
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {vacancy.objectType}
                  </Badge>
                </div>

                <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">{vacancy.title}</h3>

                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <img
                    src={vacancy.companyLogo || "/placeholder.svg"}
                    alt={vacancy.company}
                    className="h-6 w-6 rounded"
                  />
                  <span className="font-medium">{vacancy.company}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span>{vacancy.companyRating}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleFavorite(vacancy.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(vacancy.id) ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Основная информация */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Ruble className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-gray-900">{formatSalary(vacancy.salary)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{vacancy.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{vacancy.schedule}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  <span>{vacancy.experience}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>{vacancy.shiftDuration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{vacancy.workType}</span>
                </div>
              </div>
            </div>

            {/* Требования (краткий список) */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 text-sm">Основные требования:</h4>
              <div className="space-y-1">
                {vacancy.requirements.slice(0, 2).map((req, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{req}</span>
                  </div>
                ))}
                {vacancy.requirements.length > 2 && (
                  <span className="text-xs text-gray-500">+{vacancy.requirements.length - 2} требований</span>
                )}
              </div>
            </div>

            {/* Льготы */}
            {vacancy.benefits.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">Льготы:</h4>
                <div className="flex flex-wrap gap-1">
                  {vacancy.benefits.slice(0, 3).map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      <Award className="h-3 w-3 mr-1" />
                      {benefit}
                    </Badge>
                  ))}
                  {vacancy.benefits.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{vacancy.benefits.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Статистика для авторизованных */}
            {role !== "Гость" && (
              <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-gray-900">{vacancy.viewsCount}</span>
                  </div>
                  <span className="text-xs text-gray-500">просмотров</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Send className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-gray-900">{vacancy.applicantsCount}</span>
                  </div>
                  <span className="text-xs text-gray-500">откликов</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-gray-900">{vacancy.responseRate}%</span>
                  </div>
                  <span className="text-xs text-gray-500">ответов</span>
                </div>
              </div>
            )}

            {/* Дата публикации */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Опубликовано {getDaysAgo(vacancy.publishedDate)}</span>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex space-x-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => handleViewDetails(vacancy.id)}
              >
                Подробнее
              </Button>

              {!applied.includes(vacancy.id) ? (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleApply(vacancy.id)}
                  disabled={role === "Представитель организации"}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Откликнуться
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-green-50 text-green-700 border-green-200"
                  disabled
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Отклик отправлен
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
