"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Grid3X3,
  List,
  MapPin,
  Calendar,
  CheckCircle,
  RotateCcw,
  Clock,
  DollarSign,
  Shield,
  TrendingUp,
  Folder,
  Tag,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import ChopListCards from "@/components/chop-list-cards"
import VacancyCards from "@/components/vacancy-cards"
import ForumTopicsList from "@/components/forum-topics-list"
import NewsList from "@/components/news-list"

interface UniversalListSectionProps {
  type: "organizations" | "vacancies" | "forum" | "news"
  role?: string
}

export default function UniversalListSection({ type, role = "Гость" }: UniversalListSectionProps) {
  // Универсальные состояния
  const [filters, setFilters] = useState<any>({
    // Для организаций
    city: "all",
    foundedBefore: "all",
    hasRepresentative: "all",

    // Для вакансий
    workSchedule: [],
    salaryFrom: "",
    salaryTo: "",
    salaryPeriod: "month",
    securityLicense: "none",
    objectType: [],
    region: "all",
    meals: "any",
    postType: [],
    experience: "none",
    allowCriminalRecord: false,
    paymentFrequency: "any",
    paymentType: "any",
    minEmployerRating: "any",

    // Для форума
    sortType: "latest",

    // Для новостей
    category: "all",
    dateRange: "all",
    source: "all",
  })

  const [sort, setSort] = useState({
    field: type === "organizations" ? "rating" : type === "vacancies" ? "date" : type === "news" ? "date" : "latest",
    direction: "desc" as "asc" | "desc",
  })

  const [view, setView] = useState<"grid" | "list" | "large" | "small">(
    type === "organizations" ? "list" : type === "vacancies" ? "large" : "list",
  )

  // Получение конфигурации фильтров в зависимости от типа
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
              type: "select",
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
              type: "select",
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
              type: "select",
              options: [
                { value: "all", label: "Все статусы" },
                { value: "yes", label: "Есть представитель" },
                { value: "no", label: "Нет представителя" },
              ],
            },
          ],
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
              type: "checkbox",
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
              type: "salary",
            },
            {
              key: "securityLicense",
              label: "Удостоверение ЧО",
              icon: Shield,
              iconColor: "text-purple-600",
              type: "select",
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
              type: "select",
              options: [
                { value: "all", label: "Все города" },
                { value: "moscow", label: "Москва" },
                { value: "spb", label: "Санкт-Петербург" },
                { value: "novosibirsk", label: "Новосибирск" },
                { value: "ekaterinburg", label: "Екатеринбург" },
                { value: "kazan", label: "Казань" },
              ],
            },
          ],
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
              type: "buttons",
              options: [
                { value: "sections", label: "По разделам", icon: Folder },
                { value: "latest", label: "Последние", icon: Clock },
                { value: "popular", label: "Популярные", icon: TrendingUp },
              ],
            },
          ],
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
              type: "select",
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
              type: "select",
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
              type: "select",
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
              type: "select",
              options: [
                { value: "all", label: "Все источники" },
                { value: "official", label: "Официальные" },
                { value: "companies", label: "От компаний" },
                { value: "media", label: "СМИ" },
                { value: "platform", label: "Платформа" },
              ],
            },
          ],
        }

      default:
        return { title: "", icon: "", filters: [] }
    }
  }

  // Получение конфигурации сортировки
  const getSortConfig = () => {
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

  // Получение конфигурации видов отображения
  const getViewConfig = () => {
    switch (type) {
      case "organizations":
        return [
          { value: "grid" as const, label: "Плитка", icon: Grid3X3 },
          { value: "list" as const, label: "Список", icon: List },
        ]

      case "vacancies":
        return [
          { value: "large" as const, label: "Большой", icon: Grid3X3 },
          { value: "small" as const, label: "Маленький", icon: List },
        ]

      case "forum":
        return [] // Для форума вид фиксированный

      default:
        return []
    }
  }

  const filtersConfig = getFiltersConfig()
  const sortOptions = getSortConfig()
  const viewOptions = getViewConfig()

  // Обработчики
  const handleFilterChange = (key: string, value: any) => {
    if (key === "workSchedule" || key === "objectType" || key === "postType") {
      // Для массивов
      const currentArray = filters[key] || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value]

      setFilters({ ...filters, [key]: newArray })
    } else {
      setFilters({ ...filters, [key]: value })
    }
  }

  const clearFilters = () => {
    const defaultFilters = {
      // Организации
      city: "all",
      foundedBefore: "all",
      hasRepresentative: "all",

      // Вакансии
      workSchedule: [],
      salaryFrom: "",
      salaryTo: "",
      salaryPeriod: "month",
      securityLicense: "none",
      objectType: [],
      region: "all",
      meals: "any",
      postType: [],
      experience: "none",
      allowCriminalRecord: false,
      paymentFrequency: "any",
      paymentType: "any",
      minEmployerRating: "any",

      // Форум
      sortType: "latest",

      // Новости
      category: "all",
      dateRange: "all",
      source: "all",
    }
    setFilters(defaultFilters)
  }

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

  // Рендер фильтра
  const renderFilter = (filter: any) => {
    const IconComponent = filter.icon

    switch (filter.type) {
      case "select":
        return (
          <div key={filter.key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <IconComponent className={`h-4 w-4 ${filter.iconColor} mr-2`} />
              {filter.label}
            </label>
            <Select onValueChange={(value) => handleFilterChange(filter.key, value)} value={filters[filter.key]}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Выберите ${filter.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option: any) => (
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
              {filter.options.map((option: any) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${filter.key}-${option.value}`}
                    checked={(filters[filter.key] || []).includes(option.value)}
                    onCheckedChange={(checked) => handleFilterChange(filter.key, option.value)}
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
                  onChange={(e) => handleFilterChange("salaryFrom", e.target.value)}
                  className="text-xs"
                />
                <span className="text-sm text-gray-500">—</span>
                <Input
                  placeholder="до"
                  value={filters.salaryTo}
                  onChange={(e) => handleFilterChange("salaryTo", e.target.value)}
                  className="text-xs"
                />
              </div>
              <Select value={filters.salaryPeriod} onValueChange={(value) => handleFilterChange("salaryPeriod", value)}>
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
              {filter.options.map((option: any) => {
                const OptionIcon = option.icon
                return (
                  <Button
                    key={option.value}
                    variant={filters[filter.key] === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange(filter.key, option.value)}
                    className="flex items-center space-x-2"
                  >
                    <OptionIcon className="h-4 w-4" />
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

  // Рендер контента
  const renderContent = () => {
    switch (type) {
      case "organizations":
        return <ChopListCards role={role} view={view as "grid" | "list"} filters={filters} sort={sort} />

      case "vacancies":
        return <VacancyCards role={role} view={view as "large" | "small"} filters={filters} sort={sort} />

      case "forum":
        return <ForumTopicsList role={role} sortType={filters.sortType} />

      case "news":
        return <NewsList role={role} filters={filters} />

      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="flex gap-4 p-4">
        {/* Левая боковая панель с фильтрами */}
        <div className="w-80 flex-shrink-0">
          <div className="p-3 space-y-3 sticky top-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs">{filtersConfig.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{filtersConfig.title}</h3>
            </div>

            {/* Рендер фильтров */}
            <div className="space-y-3">{filtersConfig.filters.map(renderFilter)}</div>

            {/* Кнопка сброса */}
            <Button variant="outline" onClick={clearFilters} className="w-full">
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

        {/* Основной контент */}
        <div className="flex-1 min-w-0">
          {/* Панель управления сортировкой и видом (только для организаций и вакансий) */}
          {type !== "forum" && (
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

              {viewOptions.length > 0 && (
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
              )}
            </div>
          )}

          {/* Контент */}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
