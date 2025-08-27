"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Star,
  MapPin,
  Users,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react"

interface ChopCardsProps {
  role?: string
}

export default function ChopCards({ role = "Гость" }: ChopCardsProps) {
  const [favorites, setFavorites] = useState<number[]>([])

  const organizations = [
    {
      id: 1,
      name: "ЧОП Безопасность Плюс",
      logo: "/placeholder.svg?height=60&width=60&text=БП",
      rating: 4.8,
      reviewsCount: 156,
      city: "Москва",
      employees: 450,
      vacancies: 12,
      verified: true,
      hasComplaints: false,
      specializations: ["Банки", "Торговые центры", "Офисы"],
      founded: 2010,
      description: "Ведущая охранная организация с безупречной репутацией",
      salaryRange: "45,000 - 85,000 ₽",
      responseTime: "2 часа",
      hiringRate: 85,
      benefits: ["ДМС", "Обучение", "Карьерный рост"],
      recentActivity: "Разместил 3 вакансии сегодня",
    },
    {
      id: 2,
      name: "Охранное агентство Щит",
      logo: "/placeholder.svg?height=60&width=60&text=Щит",
      rating: 4.6,
      reviewsCount: 89,
      city: "Санкт-Петербург",
      employees: 280,
      vacancies: 8,
      verified: true,
      hasComplaints: false,
      specializations: ["Склады", "Производство", "Логистика"],
      founded: 2015,
      description: "Специализируемся на охране промышленных объектов",
      salaryRange: "40,000 - 70,000 ₽",
      responseTime: "4 часа",
      hiringRate: 78,
      benefits: ["Соцпакет", "Премии", "Отпуск"],
      recentActivity: "Обновил профиль вчера",
    },
    {
      id: 3,
      name: "Гарант Секьюрити",
      logo: "/placeholder.svg?height=60&width=60&text=ГС",
      rating: 4.4,
      reviewsCount: 203,
      city: "Екатеринбург",
      employees: 320,
      vacancies: 15,
      verified: false,
      hasComplaints: true,
      specializations: ["Мероприятия", "VIP охрана", "Консалтинг"],
      founded: 2008,
      description: "Комплексные услуги безопасности для бизнеса",
      salaryRange: "35,000 - 90,000 ₽",
      responseTime: "1 день",
      hiringRate: 65,
      benefits: ["Гибкий график", "Обучение"],
      recentActivity: "Активен 3 дня назад",
    },
  ]

  const toggleFavorite = (orgId: number) => {
    if (role === "Гость") {
      alert("Для добавления в избранное необходимо войти в систему")
      return
    }

    setFavorites((prev) => (prev.includes(orgId) ? prev.filter((id) => id !== orgId) : [...prev, orgId]))
  }

  const handleViewDetails = (orgId: number) => {
    console.log(`Просмотр деталей организации ${orgId}`)
    // Здесь будет навигация к детальной странице
  }

  const handleViewVacancies = (orgId: number) => {
    console.log(`Просмотр вакансий организации ${orgId}`)
    // Здесь будет навигация к вакансиям организации
  }

  const handleContact = (orgId: number) => {
    if (role === "Гость") {
      alert("Для связи с организацией необходимо войти в систему")
      return
    }
    console.log(`Связь с организацией ${orgId}`)
    // Здесь будет открытие чата или формы связи
  }

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">{rating}</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <Card key={org.id} className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200">
          <CardHeader className="pb-4">
            {/* Шапка карточки */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={org.logo || "/placeholder.svg"}
                  alt={org.name}
                  className="h-12 w-12 rounded-lg border-2 border-gray-200"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">{org.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{org.city}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleFavorite(org.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(org.id) ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </button>
            </div>

            {/* Статусы и бейджи */}
            <div className="flex items-center space-x-2 mt-3">
              {org.verified && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Проверен
                </Badge>
              )}
              {org.hasComplaints && role !== "Гость" && (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Жалобы
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                с {org.founded} года
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Рейтинг и отзывы */}
            <div className="flex items-center justify-between">
              {renderRatingStars(org.rating)}
              <span className="text-sm text-gray-500">({org.reviewsCount} отзывов)</span>
            </div>

            {/* Описание */}
            <p className="text-sm text-gray-600 line-clamp-2">{org.description}</p>

            {/* Специализации */}
            <div className="flex flex-wrap gap-1">
              {org.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>

            {/* Ключевые показатели */}
            <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-gray-900">{org.employees}</span>
                </div>
                <span className="text-xs text-gray-500">сотрудников</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Briefcase className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-gray-900">{org.vacancies}</span>
                </div>
                <span className="text-xs text-gray-500">вакансий</span>
              </div>
            </div>

            {/* Дополнительная информация для авторизованных */}
            {role !== "Гость" && (
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Зарплата:</span>
                  <span className="font-medium text-gray-900">{org.salaryRange}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Отклик:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="font-medium text-gray-900">{org.responseTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Принимают:</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="font-medium text-green-600">{org.hiringRate}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Льготы */}
            {role !== "Гость" && org.benefits.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Льготы:</span>
                <div className="flex flex-wrap gap-1">
                  {org.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      <Award className="h-3 w-3 mr-1" />
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Последняя активность */}
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{org.recentActivity}</span>
            </div>

            {/* Кнопки действий */}
            <div className="flex space-x-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => handleViewDetails(org.id)}
              >
                Подробнее
              </Button>

              {org.vacancies > 0 && (
                <Button size="sm" className="flex-1" onClick={() => handleViewVacancies(org.id)}>
                  Вакансии ({org.vacancies})
                </Button>
              )}
            </div>

            {/* Кнопка связи для авторизованных */}
            {role !== "Гость" && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 bg-transparent"
                onClick={() => handleContact(org.id)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Связаться
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
