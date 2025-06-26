"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RotateCcw } from "lucide-react"
import type { FilterConfig } from "@/hooks/use-list-config"

interface ListFiltersProps {
  role?: string
  filtersConfig: {
    title: string
    icon: string
    filters: FilterConfig[]
  }
  filters: any
  onFilterChange: (key: string, value: any) => void
  onClearFilters: () => void
}

export default function ListFilters({
  role = "Гость",
  filtersConfig,
  filters,
  onFilterChange,
  onClearFilters,
}: ListFiltersProps) {
  // Рендер фильтра
  const renderFilter = (filter: FilterConfig) => {
    const IconComponent = filter.icon

    switch (filter.type) {
      case "select":
        return (
          <div key={filter.key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <IconComponent className={`h-4 w-4 ${filter.iconColor} mr-2`} />
              {filter.label}
            </label>
            <Select onValueChange={(value) => onFilterChange(filter.key, value)} value={filters[filter.key]}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Выберите ${filter.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {filter.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case "checkbox":
        return (
          <div key={filter.key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <IconComponent className={`h-4 w-4 ${filter.iconColor} mr-2`} />
              {filter.label}
            </label>
            <div className="space-y-2">
              {filter.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${filter.key}-${option.value}`}
                    checked={(filters[filter.key] || []).includes(option.value)}
                    onCheckedChange={(checked) => onFilterChange(filter.key, option.value)}
                  />
                  <label htmlFor={`${filter.key}-${option.value}`} className="text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )

      case "salary":
        return (
          <div key={filter.key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <IconComponent className={`h-4 w-4 ${filter.iconColor} mr-2`} />
              {filter.label}
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="от"
                  value={filters.salaryFrom}
                  onChange={(e) => onFilterChange("salaryFrom", e.target.value)}
                  className="text-xs"
                />
                <span className="text-sm text-gray-500">—</span>
                <Input
                  placeholder="до"
                  value={filters.salaryTo}
                  onChange={(e) => onFilterChange("salaryTo", e.target.value)}
                  className="text-xs"
                />
              </div>
              <Select value={filters.salaryPeriod} onValueChange={(value) => onFilterChange("salaryPeriod", value)}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">за час</SelectItem>
                  <SelectItem value="shift">за смену</SelectItem>
                  <SelectItem value="month">в месяц</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "buttons":
        return (
          <div key={filter.key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <IconComponent className={`h-4 w-4 ${filter.iconColor} mr-2`} />
              {filter.label}
            </label>
            <div className="flex flex-wrap gap-2">
              {filter.options?.map((option) => {
                const OptionIcon = option.icon
                return (
                  <Button
                    key={option.value}
                    variant={filters[filter.key] === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFilterChange(filter.key, option.value)}
                    className="flex items-center space-x-2"
                  >
                    {OptionIcon && <OptionIcon className="h-4 w-4" />}
                    <span>{option.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-80 flex-shrink-0">
      <div className="p-3 space-y-3 sticky top-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs">{filtersConfig.icon}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Темы</h3>
        </div>

        {/* Рендер фильтров */}
        <div className="space-y-3">{filtersConfig.filters.map(renderFilter)}</div>

        {/* Кнопка сброса */}
        <Button variant="outline" onClick={onClearFilters} className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Сбросить
        </Button>

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
