"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown, Grid3X3, List, MapPin, Calendar, CheckCircle, RotateCcw } from "lucide-react"
import ChopListCards from "@/components/chop-list-cards"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChopListSectionProps {
  role?: string
}

export default function ChopListSection({ role = "Гость" }: ChopListSectionProps) {
  const [filters, setFilters] = useState({
    city: "all",
    foundedBefore: "all",
    hasRepresentative: "all",
  })

  const [sort, setSort] = useState({
    field: "rating",
    direction: "desc" as "asc" | "desc",
  })

  const [view, setView] = useState<"grid" | "list">("list")

  // Фильтры
  const cities = [
    { value: "all", label: "Все города" },
    { value: "moscow", label: "Москва" },
    { value: "spb", label: "Санкт-Петербург" },
    { value: "kazan", label: "Казань" },
    { value: "ekaterinburg", label: "Екатеринбург" },
    { value: "novosibirsk", label: "Новосибирск" },
  ]

  const foundedYears = [
    { value: "all", label: "Любой год основания" },
    { value: "2020", label: "Не позднее 2020" },
    { value: "2015", label: "Не позднее 2015" },
    { value: "2010", label: "Не позднее 2010" },
    { value: "2005", label: "Не позднее 2005" },
    { value: "2000", label: "Не позднее 2000" },
  ]

  const representativeOptions = [
    { value: "all", label: "Все статусы" },
    { value: "yes", label: "Есть представитель" },
    { value: "no", label: "Нет представителя" },
  ]

  // Сортировка
  const sortOptions = [
    { field: "name", label: "По названию" },
    { field: "rating", label: "По рейтингу" },
    { field: "vacancies", label: "По количеству вакансий" },
    { field: "city", label: "По городу" },
    { field: "founded", label: "По году основания" },
  ]

  // Виды отображения
  const viewOptions = [
    { value: "grid" as const, label: "Плитка", icon: Grid3X3 },
    { value: "list" as const, label: "Список", icon: List },
  ]

  // Обработчики фильтров
  const handleCityChange = (city: string) => {
    setFilters({
      ...filters,
      city: city,
    })
  }

  const handleFoundedYearChange = (year: string) => {
    setFilters({
      ...filters,
      foundedBefore: year,
    })
  }

  const handleRepresentativeChange = (status: string) => {
    setFilters({
      ...filters,
      hasRepresentative: status,
    })
  }

  const clearFilters = () => {
    setFilters({
      city: "all",
      foundedBefore: "all",
      hasRepresentative: "all",
    })
  }

  // Обработчики сортировки
  const handleSortChange = (field: string) => {
    if (sort.field === field) {
      setSort({
        field,
        direction: sort.direction === "asc" ? "desc" : "asc",
      })
    } else {
      setSort({
        field,
        direction: "desc",
      })
    }
  }

  const getSortIcon = (field: string) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="h-3 w-3 ml-1" />
    }
    return sort.direction === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
  }

  return (
    <div className="bg-white rounded-lg">
      {/* Боковая панель с фильтрами и основной контент */}
      <div className="flex gap-4 p-4">
        {/* Левая боковая панель с фильтрами */}
        <div className="w-80 flex-shrink-0">
          <div className="p-3 space-y-3 sticky top-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-900">Фильтры</h3>
            </div>

            {/* Фильтр по городу */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                Город
              </label>
              <Select onValueChange={handleCityChange} value={filters.city}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Фильтр по году основания */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 text-green-600 mr-2" />
                Год основания
              </label>
              <Select onValueChange={handleFoundedYearChange} value={filters.foundedBefore}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите период" />
                </SelectTrigger>
                <SelectContent>
                  {foundedYears.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Фильтр по статусу представителя */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                Статус представителя
              </label>
              <Select onValueChange={handleRepresentativeChange} value={filters.hasRepresentative}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  {representativeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Кнопка сброса */}
            <Button variant="outline" onClick={clearFilters} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Сбросить фильтры
            </Button>
          </div>
        </div>

        {/* Основной контент */}
        <div className="flex-1 min-w-0">
          {/* Панель управления сортировкой и видом */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Сортировка:</span>
              <Select onValueChange={handleSortChange} value={sort.field}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.field} value={option.field}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => handleSortChange(sort.field)}>
                {getSortIcon(sort.field)}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Вид:</span>
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {viewOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <Button
                      key={option.value}
                      variant={view === option.value ? "default" : "ghost"}
                      size="sm"
                      className="p-2"
                      onClick={() => setView(option.value)}
                      title={option.label}
                    >
                      <IconComponent className="h-4 w-4" />
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Список карточек */}
          <ChopListCards role={role} view={view} filters={filters} sort={sort} />
        </div>
      </div>
    </div>
  )
}
