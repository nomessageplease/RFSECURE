"use client"

import { Star, MapPin, Clock, Shield, Building, Calendar, Bookmark, Eye, Heart, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useVacancyActions } from "../hooks/use-vacancy-actions"

interface VacancyCardsProps {
  role?: string
  view?: "large" | "small"
  filters?: any
  sort?: {
    field: string
    direction: "asc" | "desc"
  }
}

interface VacancyData {
  id: number
  title: string
  company: string
  companyLogo: string
  companyRating: number
  salary: {
    from: number
    to: number
    period: string
  }
  location: string
  schedule: string
  postType: string
  experience: string
  securityLicense: string
  description: string
  tags: {
    meals: boolean
    allowCriminalRecord: boolean
    paymentType: string
    paymentFrequency: string
    urgent: boolean
    new: boolean
    closed: boolean
  }
  publishedDate: string
  requirements: string[]
  responsibilities: string[]
}

export default function VacancyCards({
  role = "Гость",
  view = "large",
  filters = {},
  sort = { field: "date", direction: "desc" },
}: VacancyCardsProps) {
  const vacancyActions = useVacancyActions(role)

  // Создаем массив из 12 вакансий
  const allVacancies: VacancyData[] = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: [
      "Охранник КПП",
      "Охранник-патрульный",
      "Оператор видеонаблюдения",
      "Охранник стационарного поста",
      "Охранник-контролер",
      "Старший охранник",
      "Охранник торгового центра",
      "Охранник склада",
      "Охранник офисного здания",
      "Охранник банка",
      "Охранник на объекте",
      "Охранник-водитель",
    ][index],
    company: `ЧОП "Безопасность ${index + 1}"`,
    companyLogo: `/placeholder.svg?height=40&width=40&query=company${index + 1}`,
    companyRating: Math.round((3 + Math.random() * 2) * 10) / 10,
    salary: {
      from: 35000 + index * 3000,
      to: 55000 + index * 3000,
      period: ["month", "shift", "hour"][index % 3],
    },
    location: ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск"][index % 5],
    schedule: ["Сменный", "Вахта", "Подработка", "Полный день"][index % 4],
    postType: ["КПП", "Патруль", "Видеонаблюдение", "Стационарный", "Контроль транспорта", "Досмотровый"][index % 6],
    experience: ["не требуется", "от 1 года", "от 3 лет", "от 5 лет"][index % 4],
    securityLicense: index % 3 === 0 ? "не требуется" : index % 2 === 0 ? "4 разряд" : "6 разряд",
    description: `Требуется ${["охранник на КПП", "патрульный охранник", "оператор видеонаблюдения"][index % 3]}. Обеспечение безопасности объекта, контроль доступа, ведение документации.`,
    tags: {
      meals: Math.random() > 0.5,
      allowCriminalRecord: Math.random() > 0.7,
      paymentType: ["официально", "в руки"][Math.floor(Math.random() * 2)],
      paymentFrequency: ["1 раз в месяц", "2 раза в месяц", "по факту"][index % 3],
      urgent: index % 7 === 0,
      new: index % 5 === 0,
      closed: index % 12 === 0,
    },
    publishedDate: `2025-01-${String(15 + (index % 15)).padStart(2, "0")}`,
    requirements: [
      "Удостоверение частного охранника",
      "Опыт работы в охране приветствуется",
      "Ответственность и пунктуальность",
      "Физическая подготовка",
    ],
    responsibilities: [
      "Контроль доступа на объект",
      "Обход территории по графику",
      "Ведение документации",
      "Взаимодействие с службами безопасности",
    ],
  }))

  // Применяем фильтры и исключаем закрытые вакансии
  const filteredVacancies = allVacancies.filter((vacancy) => {
    if (vacancy.tags.closed) return false
    if (filters.region && filters.region !== "all" && !vacancy.location.toLowerCase().includes(filters.region))
      return false
    if (
      filters.workSchedule &&
      filters.workSchedule.length > 0 &&
      !filters.workSchedule.some((s: string) => vacancy.schedule.includes(s))
    )
      return false
    if (filters.experience && filters.experience !== "none" && vacancy.experience !== filters.experience) return false
    return true
  })

  // Применяем сортировку
  const sortedVacancies = [...filteredVacancies].sort((a, b) => {
    let comparison = 0
    switch (sort.field) {
      case "date":
        comparison = new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        break
      case "salary":
        comparison = a.salary.from - b.salary.from
        break
      case "company":
        comparison = a.company.localeCompare(b.company)
        break
      case "rating":
        comparison = a.companyRating - b.companyRating
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
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    )
  }

  const getSalaryPeriodLabel = (period: string) => {
    const labels = {
      hour: "в час",
      shift: "за смену",
      month: "в месяц",
    }
    return labels[period as keyof typeof labels] || period
  }

  const getStatusBadges = (vacancy: VacancyData) => {
    const badges = []
    if (vacancy.tags.new) badges.push({ text: "Новая", variant: "default" as const })
    if (vacancy.tags.urgent) badges.push({ text: "Срочно", variant: "destructive" as const })
    return badges
  }

  const getTagBadges = (vacancy: VacancyData) => {
    const badges = []
    if (vacancy.tags.meals) badges.push("Питание")
    if (vacancy.tags.allowCriminalRecord) badges.push("Можно с судимостями")
    badges.push(`Выплаты: ${vacancy.tags.paymentType}`)
    return badges
  }

  const handleVacancyClick = (vacancyId: number) => {
    console.log(`Переход к вакансии ${vacancyId}`)
    // В реальном приложении здесь будет навигация к детальной странице
  }

  const handleAllVacanciesClick = () => {
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "vacancies" },
      }),
    )
  }

  const renderLargeCard = (vacancy: VacancyData) => (
    <div
      key={vacancy.id}
      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-white cursor-pointer group hover:border-blue-200"
      onClick={() => handleVacancyClick(vacancy.id)}
    >
      {/* Заголовок с статусами */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
              {vacancy.title}
            </h3>
            <div className="flex items-center space-x-1">
              {getStatusBadges(vacancy).map((badge, index) => (
                <Badge key={index} variant={badge.variant} className="text-xs">
                  {badge.text}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={vacancy.companyLogo || "/placeholder.svg"}
              alt={vacancy.company}
              className="h-6 w-6 rounded-full border"
            />
            <span className="text-gray-700 font-medium">{vacancy.company}</span>
            {renderRatingStars(vacancy.companyRating)}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-2xl font-bold text-green-600 mb-1">
            <DollarSign className="h-5 w-5 mr-1" />
            {vacancy.salary.from.toLocaleString()} - {vacancy.salary.to.toLocaleString()} ₽
          </div>
          <div className="text-sm text-gray-500">{getSalaryPeriodLabel(vacancy.salary.period)}</div>
        </div>
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-gray-700">{vacancy.location}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-gray-700">{vacancy.schedule}</span>
        </div>
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-gray-700">{vacancy.postType}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-gray-700">{new Date(vacancy.publishedDate).toLocaleDateString("ru-RU")}</span>
        </div>
      </div>

      {/* Требования */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Опыт: </span>
          <span className="text-gray-600">{vacancy.experience}</span>
        </div>
        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-gray-600">Удостоверение ЧО: {vacancy.securityLicense}</span>
        </div>
      </div>

      {/* Описание */}
      <p className="text-gray-700 mb-4 leading-relaxed">{vacancy.description}</p>

      {/* Теги */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {getTagBadges(vacancy).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            disabled={!vacancyActions.canApplyToVacancy()}
            onClick={(e) => {
              e.stopPropagation()
              vacancyActions.applyToVacancy(vacancy.id)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {vacancyActions.getApplyButtonText()}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!vacancyActions.canSaveVacancy()}
            onClick={(e) => {
              e.stopPropagation()
              vacancyActions.saveVacancy(vacancy.id)
            }}
          >
            <Bookmark className="h-4 w-4 mr-1" />
            {vacancyActions.getSaveButtonText()}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={!vacancyActions.canFavoriteVacancy()}
            onClick={(e) => {
              e.stopPropagation()
              vacancyActions.favoriteVacancy(vacancy.id)
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              vacancyActions.viewVacancyDetails(vacancy.id)
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="inline-block w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 mr-3 rounded-full"></span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Актуальные вакансии</h2>
            <p className="text-gray-600 text-sm mt-1">Найдено {sortedVacancies.length} предложений</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center group hover:bg-blue-50 transition-colors bg-transparent"
          onClick={handleAllVacanciesClick}
        >
          Все вакансии
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Button>
      </div>

      {sortedVacancies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">По выбранным фильтрам вакансии не найдены</p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={handleAllVacanciesClick}>
            Посмотреть все вакансии
          </Button>
        </div>
      ) : (
        <div className="space-y-6">{sortedVacancies.slice(0, 6).map(renderLargeCard)}</div>
      )}

      {role === "Гость" && (
        <div className="text-center py-8 border-t border-gray-200 mt-6 bg-blue-50 rounded-xl">
          <p className="text-gray-700 mb-4 text-lg">Зарегистрируйтесь, чтобы откликаться на вакансии</p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "register" } }))}
            >
              Зарегистрироваться
            </Button>
            <Button
              variant="outline"
              onClick={() => window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "login" } }))}
            >
              Войти
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
