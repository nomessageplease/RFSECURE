"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Tag, Building, MapPin, RotateCcw } from "lucide-react"

interface NewsFiltersProps {
  role?: string
  filters: {
    category: string
    region: string
    dateRange: string
    source: string
  }
  onFiltersChange: (filters: any) => void
}

export default function NewsFilters({ role = "Гость", filters, onFiltersChange }: NewsFiltersProps) {
  const categories = [
    { value: "all", label: "Все категории" },
    { value: "legislation", label: "Законодательство" },
    { value: "industry", label: "Отрасль" },
    { value: "technology", label: "Технологии" },
    { value: "companies", label: "Компании" },
    { value: "events", label: "Мероприятия" },
    { value: "education", label: "Обучение" },
  ]

  const regions = [
    { value: "all", label: "Все регионы" },
    { value: "moscow", label: "Москва" },
    { value: "spb", label: "Санкт-Петербург" },
    { value: "federal", label: "Федеральные" },
    { value: "regional", label: "Региональные" },
  ]

  const dateRanges = [
    { value: "all", label: "За все время" },
    { value: "today", label: "Сегодня" },
    { value: "week", label: "За неделю" },
    { value: "month", label: "За месяц" },
    { value: "quarter", label: "За квартал" },
  ]

  const sources = [
    { value: "all", label: "Все источники" },
    { value: "official", label: "Официальные" },
    { value: "companies", label: "От компаний" },
    { value: "media", label: "СМИ" },
    { value: "platform", label: "Платформа" },
  ]

  const handleFilterChange = (filterKey: string, value: string) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      category: "all",
      region: "all",
      dateRange: "all",
      source: "all",
    })
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Сбросить
        </Button>
      </div>

      <div className="space-y-4">
        {/* Категория */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            Категория
          </label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Регион */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Регион
          </label>
          <Select value={filters.region} onValueChange={(value) => handleFilterChange("region", value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Период */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Период
          </label>
          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Источник */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Building className="h-4 w-4 mr-1" />
            Источник
          </label>
          <Select value={filters.source} onValueChange={(value) => handleFilterChange("source", value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sources.map((source) => (
                <SelectItem key={source.value} value={source.value}>
                  {source.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {role === "Гость" && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-2">Зарегистрируйтесь для лайков и сохранения новостей</p>
            <Button variant="outline" size="sm" className="w-full text-xs">
              Зарегистрироваться
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
