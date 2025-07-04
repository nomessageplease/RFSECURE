"use client"

import { CheckCircle, Star, MapPin, Users, TrendingUp, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ChopCardData {
  id: number
  name: string
  logo: string
  cities: string[]
  verified: boolean
  yearsInBusiness: number
  vacancies: number
  rating: number
  employees: number
  specializations: string[]
}

export default function ChopCards() {
  // Создаем массив из 10 карточек с данными
  const chopCards: ChopCardData[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `ЧОП "Безопасность ${index + 1}"`,
    logo: `/placeholder.svg?height=40&width=40&query=logo${index + 1}`,
    cities:
      index % 3 === 0
        ? ["Москва", "Санкт-Петербург", "Казань"]
        : index % 2 === 0
          ? ["Москва", "Екатеринбург"]
          : ["Москва"],
    verified: index % 3 === 0,
    yearsInBusiness: 5 + index,
    vacancies: index * 2 + 1,
    rating: 3 + (index % 3),
    employees: 50 + index * 25,
    specializations: index % 2 === 0 ? ["Банки", "Офисы"] : ["Торговля", "Склады"],
  }))

  // Функция для отображения звезд рейтинга
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const handleAllOrganizationsClick = () => {
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "organizations" },
      }),
    )
  }

  const handleCardClick = (chopId: number) => {
    console.log(`Переход к организации ${chopId}`)
    // В реальном приложении здесь будет навигация к детальной странице
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "organizations" },
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="inline-block w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mr-3 rounded-full"></span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Лучшие организации</h2>
            <p className="text-gray-600 text-sm mt-1">Проверенные охранные предприятия</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center group hover:bg-blue-50 transition-colors bg-transparent"
          onClick={handleAllOrganizationsClick}
        >
          Все организации
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Button>
      </div>

      {/* Горизонтальный скролл контейнер */}
      <div className="overflow-x-auto">
        <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
          {chopCards.map((chop) => (
            <div
              key={chop.id}
              className="flex-shrink-0 w-80 rounded-xl bg-white hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200 group"
              onClick={() => handleCardClick(chop.id)}
            >
              {/* Заголовок карточки */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={chop.logo || "/placeholder.svg"}
                    alt={`Логотип ${chop.name}`}
                    className="h-12 w-12 rounded-full shadow-sm border-2 border-white"
                  />
                  {chop.verified && (
                    <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Проверено</span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                  {chop.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{chop.cities.join(", ")}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{chop.employees} сотрудников</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-gray-400" />
                    <span>На рынке {chop.yearsInBusiness} лет</span>
                  </div>
                </div>

                {/* Специализации */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {chop.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Статистика */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">{renderRatingStars(chop.rating)}</div>
                    <div className="text-xs text-gray-500">Рейтинг</div>
                    <div className="text-sm font-semibold text-gray-900">{chop.rating}.0/5.0</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{chop.vacancies}</div>
                    <div className="text-xs text-gray-500">Активных</div>
                    <div className="text-xs text-gray-600">вакансий</div>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardClick(chop.id)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Подробнее
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 hover:bg-gray-50 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.dispatchEvent(
                        new CustomEvent("pageChanged", {
                          detail: { page: "vacancies" },
                        }),
                      )
                    }}
                  >
                    Вакансии
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">
          Показано {chopCards.length} из {chopCards.length * 5} организаций
        </p>
      </div>
    </div>
  )
}
