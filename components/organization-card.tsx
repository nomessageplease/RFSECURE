"use client"

import { Star, Users, MapPin, CheckCircle, AlertTriangle } from "lucide-react"

interface ChopData {
  id: number
  name: string
  logo: string
  rating: {
    overall: number
    reliability: number
    salary: number
    conditions: number
    career: number
    management: number
  }
  city: string
  vacancies: number
  salaryRange?: string
  verified: boolean
  hasComplaints?: boolean
  position: number
}

interface OrganizationCardProps {
  chop: ChopData
  currentRating: number
  role: string
  onClick: (id: number) => void
}

export default function OrganizationCard({ chop, currentRating, role, onClick }: OrganizationCardProps) {
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

  return (
    <div
      className={`
        flex-shrink-0 w-80 relative rounded-xl p-4 transition-all duration-300 cursor-pointer group
        ${
          chop.position === 1
            ? "bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-2 border-yellow-400 shadow-lg hover:shadow-xl"
            : chop.position === 2
              ? "bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 border-2 border-gray-400 shadow-lg hover:shadow-xl"
              : chop.position === 3
                ? "bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-2 border-orange-400 shadow-lg hover:shadow-xl"
                : "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
        }
        hover:scale-[1.02] hover:-translate-y-1
      `}
      onClick={() => onClick(chop.id)}
    >
      {/* Декоративный элемент для топ-3 */}
      {chop.position <= 3 && (
        <div
          className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-lg ${
            chop.position === 1
              ? "bg-gradient-to-br from-yellow-400/30 to-amber-400/30"
              : chop.position === 2
                ? "bg-gradient-to-br from-gray-400/30 to-slate-400/30"
                : "bg-gradient-to-br from-orange-400/30 to-amber-400/30"
          }`}
        ></div>
      )}

      {/* Индикатор позиции для топ-3 */}
      {chop.position <= 3 && (
        <div
          className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
            chop.position === 1
              ? "bg-gradient-to-br from-yellow-500 to-amber-600"
              : chop.position === 2
                ? "bg-gradient-to-br from-gray-500 to-slate-600"
                : "bg-gradient-to-br from-orange-500 to-amber-600"
          }`}
        >
          <span className="text-white font-bold text-xs">
            {chop.position === 1 ? "🥇" : chop.position === 2 ? "🥈" : "🥉"}
          </span>
        </div>
      )}

      {/* Заголовок с логотипом и позицией */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={chop.logo || "/placeholder.svg"}
              alt={chop.name}
              className="h-10 w-10 rounded-full border-2 border-white shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">#{chop.position}</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{chop.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">Основан в {2000 + (chop.id % 20)}</span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-gray-500">{150 + chop.id * 25} сотрудников</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {chop.verified && (
            <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-700 font-medium">Проверен</span>
            </div>
          )}
          {chop.hasComplaints && role !== "Гость" && (
            <div className="flex items-center space-x-1 bg-red-100 px-2 py-1 rounded-full">
              <AlertTriangle className="h-3 w-3 text-red-600" />
              <span className="text-xs text-red-700 font-medium">Жалобы</span>
            </div>
          )}
        </div>
      </div>

      {/* Краткое описание */}
      <div className="mb-3">
        <p className="text-xs text-gray-600 line-clamp-2">
          {chop.position <= 3
            ? "Ведущая охранная организация с безупречной репутацией и высокими стандартами обслуживания клиентов."
            : "Надежная охранная компания, предоставляющая качественные услуги безопасности для различных объектов."}
        </p>
      </div>

      {/* Основные показатели */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-blue-50 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center mb-1">{renderRatingStars(currentRating)}</div>
          <span className="text-xs text-blue-700 font-medium">Рейтинг</span>
        </div>
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Users className="h-3 w-3 text-green-600" />
            <span className="text-sm font-bold text-green-700">{chop.vacancies}</span>
          </div>
          <span className="text-xs text-green-700 font-medium">Вакансий</span>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-600">{chop.city}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">Объектов:</span>
            <span className="text-xs font-medium text-gray-700">{50 + chop.id * 15}</span>
          </div>
        </div>

        {role !== "Гость" && chop.salaryRange && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Зарплата:</span>
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{chop.salaryRange}</span>
          </div>
        )}

        {/* Специализации */}
        <div className="flex flex-wrap gap-1 mt-2">
          {chop.position <= 5 && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Банки</span>
          )}
          {chop.position <= 7 && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Торговля</span>
          )}
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Офисы</span>
        </div>
      </div>

      {/* Индикатор активности */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${chop.position <= 5 ? "bg-green-500" : "bg-yellow-500"}`}></div>
            <span className="text-xs text-gray-500">{chop.position <= 5 ? "Очень активен" : "Активен"}</span>
          </div>
          <span className="text-xs text-gray-400">Обновлено сегодня</span>
        </div>
      </div>
    </div>
  )
}
