"use client"

import { Star, MapPin, Users, CheckCircle, AlertTriangle, Calendar } from "lucide-react"

interface ChopListCardsProps {
  role?: string
  view: "grid" | "list"
  filters: {
    city: string
    foundedBefore: string
    hasRepresentative: string
  }
  sort: {
    field: string
    direction: "asc" | "desc"
  }
}

interface ChopCardData {
  id: number
  name: string
  logo: string
  rating: number
  city: string
  cityKey: string
  vacancies: number
  hasRepresentative: boolean
  hasComplaints: boolean
  founded: number
  description: string
  salaryRange: string
}

export default function ChopListCards({ role = "Гость", view, filters, sort }: ChopListCardsProps) {
  // Создаем массив из 20 карточек ЧОПов
  const allChops: ChopCardData[] = Array.from({ length: 20 }, (_, index) => {
    const cities = [
      { name: "Москва", key: "moscow" },
      { name: "Санкт-Петербург", key: "spb" },
      { name: "Казань", key: "kazan" },
      { name: "Екатеринбург", key: "ekaterinburg" },
      { name: "Новосибирск", key: "novosibirsk" },
    ]
    const cityData = cities[index % 5]

    return {
      id: index + 1,
      name: `ЧОП "Безопасность ${index + 1}"`,
      logo: `/placeholder.svg?height=40&width=40&query=chop${index + 1}`,
      rating: Math.round((3 + Math.random() * 2) * 10) / 10,
      city: cityData.name,
      cityKey: cityData.key,
      vacancies: Math.floor(Math.random() * 20) + 1,
      hasRepresentative: Math.random() > 0.3,
      hasComplaints: Math.random() > 0.8,
      founded: 1995 + Math.floor(Math.random() * 28), // от 1995 до 2023
      description: `Надежная охранная организация с многолетним опытом работы. Предоставляем полный спектр услуг безопасности.`,
      salaryRange: `${40 + Math.floor(Math.random() * 40)}-${60 + Math.floor(Math.random() * 60)}к`,
    }
  })

  // Применяем фильтры
  const filteredChops = allChops.filter((chop) => {
    if (filters.city !== "all" && chop.cityKey !== filters.city) return false
    if (filters.foundedBefore !== "all") {
      const yearLimit = Number.parseInt(filters.foundedBefore)
      if (chop.founded > yearLimit) return false
    }
    if (filters.hasRepresentative === "yes" && !chop.hasRepresentative) return false
    if (filters.hasRepresentative === "no" && chop.hasRepresentative) return false
    return true
  })

  // Применяем сортировку
  const sortedChops = [...filteredChops].sort((a, b) => {
    let comparison = 0
    switch (sort.field) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "rating":
        comparison = a.rating - b.rating
        break
      case "vacancies":
        comparison = a.vacancies - b.vacancies
        break
      case "city":
        comparison = a.city.localeCompare(b.city)
        break
      case "founded":
        comparison = a.founded - b.founded
        break
      default:
        comparison = 0
    }
    return sort.direction === "asc" ? comparison : -comparison
  })

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">{rating}</span>
      </div>
    )
  }

  const renderGridCard = (chop: ChopCardData) => (
    <div key={chop.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img src={chop.logo || "/placeholder.svg"} alt={chop.name} className="h-10 w-10 rounded-full" />
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{chop.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              {chop.hasRepresentative && <CheckCircle className="h-3 w-3 text-green-600" />}
              {chop.hasComplaints && role !== "Гость" && <AlertTriangle className="h-3 w-3 text-red-600" />}
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{chop.description}</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Рейтинг:</span>
          {renderRatingStars(chop.rating)}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Город:</span>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-700">{chop.city}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Вакансий:</span>
          <div className="flex items-center">
            <Users className="h-3 w-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-700">{chop.vacancies}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Основан:</span>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-700">{chop.founded}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Статус:</span>
          <span className="text-xs text-gray-700">
            {chop.hasRepresentative ? "Есть представитель" : "Нет представителя"}
          </span>
        </div>

        {role !== "Гость" && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Зарплата:</span>
            <span className="text-xs text-gray-700">{chop.salaryRange}</span>
          </div>
        )}
      </div>
    </div>
  )

  const renderListCard = (chop: ChopCardData) => (
    <div key={chop.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start space-x-4">
        <img src={chop.logo || "/placeholder.svg"} alt={chop.name} className="h-12 w-12 rounded-full flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-gray-900">{chop.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                {chop.hasRepresentative && <CheckCircle className="h-4 w-4 text-green-600" />}
                {chop.hasComplaints && role !== "Гость" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                <span className="text-xs text-gray-500">Основан: {chop.founded}</span>
              </div>
            </div>
            {renderRatingStars(chop.rating)}
          </div>

          <p className="text-sm text-gray-600 mb-3">{chop.description}</p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-700">{chop.city}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-700">{chop.vacancies} вакансий</span>
              </div>
              <span className="text-gray-700">
                {chop.hasRepresentative ? "Есть представитель" : "Нет представителя"}
              </span>
            </div>
            {role !== "Гость" && <span className="text-gray-700">{chop.salaryRange}</span>}
          </div>
        </div>
      </div>
    </div>
  )

  const renderCards = () => {
    switch (view) {
      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{sortedChops.map(renderGridCard)}</div>
        )
      case "list":
        return <div className="space-y-4">{sortedChops.map(renderListCard)}</div>
      default:
        return null
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg p-6">
      {role === "Гость" && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            Зарегистрируйтесь для просмотра полной информации об организациях
          </p>
        </div>
      )}

      {sortedChops.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">По выбранным фильтрам организации не найдены</p>
        </div>
      ) : (
        renderCards()
      )}
    </div>
  )
}
