"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Users, Star, CheckCircle } from "lucide-react"

interface ChopListFiltersProps {
  role?: string
  selectedFilters: {
    city: string
    verified: boolean
    hasVacancies: boolean
    minRating: number
  }
  onFiltersChange: (filters: any) => void
}

export default function ChopListFilters({ role = "Гость", selectedFilters, onFiltersChange }: ChopListFiltersProps) {
  const cities = ["Все города", "Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск"]
  const ratings = [
    { value: 0, label: "Любой рейтинг" },
    { value: 3, label: "От 3 звезд" },
    { value: 4, label: "От 4 звезд" },
    { value: 5, label: "Только 5 звезд" },
  ]

  const handleCityChange = (city: string) => {
    onFiltersChange({
      ...selectedFilters,
      city: city === "Все города" ? "" : city,
    })
  }

  const handleVerifiedToggle = () => {
    onFiltersChange({
      ...selectedFilters,
      verified: !selectedFilters.verified,
    })
  }

  const handleVacanciesToggle = () => {
    onFiltersChange({
      ...selectedFilters,
      hasVacancies: !selectedFilters.hasVacancies,
    })
  }

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...selectedFilters,
      minRating: rating,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      city: "",
      verified: false,
      hasVacancies: false,
      minRating: 0,
    })
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Сбросить
        </Button>
      </div>

      <div className="space-y-4">
        {/* Фильтр по городу */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Город
          </label>
          <div className="grid grid-cols-2 gap-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant={
                  (selectedFilters.city === "" && city === "Все города") || selectedFilters.city === city
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="text-xs"
                onClick={() => handleCityChange(city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Фильтр по рейтингу */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Рейтинг
          </label>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <Button
                key={rating.value}
                variant={selectedFilters.minRating === rating.value ? "default" : "outline"}
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleRatingChange(rating.value)}
              >
                {rating.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Дополнительные фильтры */}
        <div className="space-y-2">
          <Button
            variant={selectedFilters.verified ? "default" : "outline"}
            size="sm"
            className="w-full justify-start text-xs"
            onClick={handleVerifiedToggle}
          >
            <CheckCircle className="h-3 w-3 mr-2" />
            Только проверенные
          </Button>

          <Button
            variant={selectedFilters.hasVacancies ? "default" : "outline"}
            size="sm"
            className="w-full justify-start text-xs"
            onClick={handleVacanciesToggle}
          >
            <Users className="h-3 w-3 mr-2" />С открытыми вакансиями
          </Button>
        </div>

        {role === "Гость" && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-2">
              Зарегистрируйтесь для доступа к расширенным фильтрам
            </p>
            <Button variant="outline" size="sm" className="w-full text-xs">
              Зарегистрироваться
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
