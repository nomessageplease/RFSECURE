"use client"

import {
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  TrendingUp,
  Folder,
  Tag,
  Grid3X3,
  List,
} from "lucide-react"
import type { ListType } from "./use-list-data"

export interface FilterConfig {
  key: string
  label: string
  icon: any
  iconColor: string
  type: "select" | "checkbox" | "salary" | "buttons"
  options?: Array<{
    value: string
    label: string
    icon?: any
  }>
}

export interface SortConfig {
  field: string
  label: string
}

export interface ViewConfig {
  value: string
  label: string
  icon: any
}

export const useListConfig = (type: ListType) => {
  // Конфигурация фильтров
  const getFiltersConfig = () => {
    switch (type) {
      case "organizations":
        return {
          title: "Фильтры организаций",
          icon: "🔍",
          filters: [
            {
              key: "city",
              label: "Город",
              icon: MapPin,
              iconColor: "text-blue-600",
              type: "select" as const,
              options: [
                { value: "all", label: "Все города" },
                { value: "moscow", label: "Москва" },
                { value: "spb", label: "Санкт-Петербург" },
                { value: "kazan", label: "Казань" },
                { value: "ekaterinburg", label: "Екатеринбург" },
                { value: "novosibirsk", label: "Новосибирск" },
              ],
            },
            {
              key: "foundedBefore",
              label: "Год основания",
              icon: Calendar,
              iconColor: "text-green-600",
              type: "select" as const,
              options: [
                { value: "all", label: "Любой год основания" },
                { value: "2020", label: "Не позднее 2020" },
                { value: "2015", label: "Не позднее 2015" },
                { value: "2010", label: "Не позднее 2010" },
                { value: "2005", label: "Не позднее 2005" },
                { value: "2000", label: "Не позднее 2000" },
              ],
            },
            {
              key: "hasRepresentative",
              label: "Статус представителя",
              icon: CheckCircle,
              iconColor: "text-purple-600",
              type: "select" as const,
              options: [
                { value: "all", label: "Все статусы" },
                { value: "yes", label: "Есть представитель" },
                { value: "no", label: "Нет представителя" },
              ],
            },
          ] as FilterConfig[],
        }

      case "vacancies":
        return {
          title: "Фильтры вакансий",
          icon: "💼",
          filters: [
            {
              key: "workSchedule",
              label: "График работы",
              icon: Clock,
              iconColor: "text-blue-600",
              type: "checkbox" as const,
              options: [
                { value: "shift", label: "Сменный" },
                { value: "rotation", label: "Вахта" },
                { value: "parttime", label: "Подработка" },
              ],
            },
            {
              key: "salary",
              label: "Зарплата",
              icon: DollarSign,
              iconColor: "text-green-600",
              type: "salary" as const,
            },
            {
              key: "securityLicense",
              label: "Удостоверение ЧО",
              icon: Shield,
              iconColor: "text-purple-600",
              type: "select" as const,
              options: [
                { value: "none", label: "не требуется" },
                { value: "4th", label: "4 разряд" },
                { value: "6th", label: "6 разряд" },
              ],
            },
            {
              key: "region",
              label: "Регион",
              icon: MapPin,
              iconColor: "text-red-600",
              type: "select" as const,
              options: [
                { value: "all", label: "Все города" },
                { value: "moscow", label: "Москва" },
                { value: "spb", label: "Санкт-Петербург" },
                { value: "novosibirsk", label: "Новосибирск" },
                { value: "ekaterinburg", label: "Екатеринбург" },
                { value: "kazan", label: "Казань" },
              ],
            },
          ] as FilterConfig[],
        }

      case "forum":
        return {
          title: "Сортировка тем",
          icon: "💬",
          filters: [
            {
              key: "sortType",
              label: "Сортировка",
              icon: TrendingUp,
              iconColor: "text-blue-600",
              type: "buttons" as const,
              options: [
                { value: "sections", label: "По разделам", icon: Folder },
                { value: "latest", label: "Последние", icon: Clock },
                { value: "popular", label: "Популярные", icon: TrendingUp },
              ],
            },
          ] as FilterConfig[],
        }

      case "news":
        return {
          title: "Фильтры новостей",
          icon: "📰",
          filters: [
            {
              key: "category",
              label: "Категория",
              icon: Tag,
              iconColor: "text-blue-600",
              type: "select" as const,
              options: [
                { value: "all", label: "Все категории" },
                { value: "legislation", label: "Законодательство" },
                { value: "industry", label: "Отрасль" },
                { value: "technology", label: "Технологии" },
                { value: "companies", label: "Компании" },
                { value: "events", label: "Мероприятия" },
                { value: "education", label: "Обучение" },
              ],
            },
            {
              key: "region",
              label: "Регион",
              icon: MapPin,
              iconColor: "text-green-600",
              type: "select" as const,
              options: [
                { value: "all", label: "Все регионы" },
                { value: "moscow", label: "Москва" },
                { value: "spb", label: "Санкт-Петербург" },
                { value: "federal", label: "Федеральные" },
                { value: "regional", label: "Региональные" },
              ],
            },
            {
              key: "dateRange",
              label: "Период",
              icon: Calendar,
              iconColor: "text-purple-600",
              type: "select" as const,
              options: [
                { value: "all", label: "За все время" },
                { value: "today", label: "Сегодня" },
                { value: "week", label: "За неделю" },
                { value: "month", label: "За месяц" },
                { value: "quarter", label: "За квартал" },
              ],
            },
            {
              key: "source",
              label: "Источник",
              icon: CheckCircle,
              iconColor: "text-orange-600",
              type: "select" as const,
              options: [
                { value: "all", label: "Все источники" },
                { value: "official", label: "Официальные" },
                { value: "companies", label: "От компаний" },
                { value: "media", label: "СМИ" },
                { value: "platform", label: "Платформа" },
              ],
            },
          ] as FilterConfig[],
        }

      default:
        return { title: "", icon: "", filters: [] }
    }
  }

  // Конфигурация сортировки
  const getSortConfig = (): SortConfig[] => {
    switch (type) {
      case "organizations":
        return [
          { field: "name", label: "По названию" },
          { field: "rating", label: "По рейтингу" },
          { field: "vacancies", label: "По количеству вакансий" },
          { field: "city", label: "По городу" },
          { field: "founded", label: "По году основания" },
        ]

      case "vacancies":
        return [
          { field: "date", label: "По дате публикации" },
          { field: "salary", label: "По зарплате" },
          { field: "company", label: "По названию компании" },
          { field: "rating", label: "По рейтингу работодателя" },
          { field: "relevance", label: "По релевантности" },
        ]

      case "forum":
        return [] // Для форума сортировка встроена в фильтры

      case "news":
        return [
          { field: "date", label: "По дате публикации" },
          { field: "popularity", label: "По популярности" },
          { field: "category", label: "По категории" },
          { field: "source", label: "По источнику" },
        ]

      default:
        return []
    }
  }

  // Конфигурация видов отображения
  const getViewConfig = (): ViewConfig[] => {
    switch (type) {
      case "organizations":
        return [
          { value: "grid", label: "Плитка", icon: Grid3X3 },
          { value: "list", label: "Список", icon: List },
        ]

      case "vacancies":
        return [
          { value: "large", label: "Большой", icon: Grid3X3 },
          { value: "small", label: "Маленький", icon: List },
        ]

      case "forum":
        return [] // Для форума вид фиксированный

      case "news":
        return [] // Для новостей вид фиксированный

      default:
        return []
    }
  }

  return {
    filtersConfig: getFiltersConfig(),
    sortConfig: getSortConfig(),
    viewConfig: getViewConfig(),
  }
}
