"use client"

import { CheckCircle, Star } from "lucide-react"

interface ChopCardData {
  id: number
  name: string
  logo: string
  cities: string[]
  verified: boolean
  yearsInBusiness: number
  vacancies: number
  rating: number
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="inline-block w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mr-3 rounded-full"></span>
          <span className="text-lg font-semibold text-gray-700">Организации</span>
        </div>
        <button
          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center group"
          onClick={handleAllOrganizationsClick}
        >
          Все организации
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Горизонтальный скролл контейнер */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {chopCards.map((chop) => (
            <div
              key={chop.id}
              className="flex-shrink-0 w-64 h-56 rounded-lg bg-white hover:shadow-md transition-shadow overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200"
            >
              {/* Основная информация */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <img
                    src={chop.logo || "/placeholder.svg"}
                    alt={`Логотип ${chop.name}`}
                    className="h-10 w-10 rounded-full shadow-sm"
                  />
                  {chop.verified && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">Проверено</span>
                    </div>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-1">{chop.name}</h4>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-500 line-clamp-1">
                    <span className="font-medium">Города: </span>
                    {chop.cities.join(", ")}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Стаж: </span>
                    {chop.yearsInBusiness} лет
                  </p>
                </div>
              </div>

              {/* Статистика */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Рейтинг</p>
                    <div className="flex justify-center">{renderRatingStars(chop.rating)}</div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Вакансий</p>
                    <p className="font-medium text-gray-900">{chop.vacancies}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
