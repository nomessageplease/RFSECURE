"use client"

import { Star, MapPin, Clock, Shield, Building, Calendar, Bookmark, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VacancyCardsProps {
  role?: string
  view: "large" | "small"
  filters: any
  sort: {
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

export default function VacancyCards({ role = "Гость", view, filters, sort }: VacancyCardsProps) {
  // Создаем массив из 15 вакансий
  const allVacancies: VacancyData[] = Array.from({ length: 15 }, (_, index) => ({
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
    ][index % 10],
    company: `ЧОП "Безопасность ${index + 1}"`,
    companyLogo: `/placeholder.svg?height=40&width=40&query=company${index + 1}`,
    companyRating: Math.round((3 + Math.random() * 2) * 10) / 10,
    salary: {
      from: 35000 + index * 3000,
      to: 55000 + index * 3000,
      period: ["month", "shift", "hour"][index % 3],
    },
    location: ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск"][index % 5],
    schedule: ["Сменный", "Вахта", "Подработка"][index % 3],
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
    publishedDate: `2025-06-${16 - (index % 15)}`,
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
    // Исключаем закрытые вакансии из общего списка
    if (vacancy.tags.closed) return false

    if (filters.region !== "all" && !vacancy.location.toLowerCase().includes(filters.region)) return false
    if (filters.workSchedule.length > 0 && !filters.workSchedule.some((s: string) => vacancy.schedule.includes(s)))
      return false
    if (filters.experience !== "none" && vacancy.experience !== filters.experience) return false
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
    badges.push(`Периодичность: ${vacancy.tags.paymentFrequency}`)
    return badges
  }

  const handleAction = (action: string, vacancyId: number) => {
    if (role === "Гость") {
      alert("Для выполнения действия необходимо войти в систему")
      return
    }
    if (role === "Представитель организации" && action === "apply") {
      alert("Представители организаций не могут откликаться на вакансии")
      return
    }
    console.log(`Action: ${action}, Vacancy ID: ${vacancyId}`)
  }

  const canApplyToVacancy = (role: string) => {
    return role !== "Гость" && role !== "Представитель организации"
  }

  const getApplyButtonText = (role: string) => {
    if (role === "Гость") return "Войдите для отклика"
    if (role === "Представитель организации") return "Недоступно для представителей"
    return "Откликнуться"
  }

  const renderLargeCard = (vacancy: VacancyData) => (
    <div key={vacancy.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      {/* Заголовок с статусами */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{vacancy.title}</h3>
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
              className="h-6 w-6 rounded-full"
            />
            <span className="text-gray-700 font-medium">{vacancy.company}</span>
            {renderRatingStars(vacancy.companyRating)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-green-600 mb-1">
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
          <span className="text-gray-700">{vacancy.publishedDate}</span>
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
      <p className="text-gray-700 mb-4">{vacancy.description}</p>

      {/* Требования и обязанности */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Требования:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {vacancy.requirements.slice(0, 3).map((req, index) => (
              <li key={index}>• {req}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Обязанности:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {vacancy.responsibilities.slice(0, 3).map((resp, index) => (
              <li key={index}>• {resp}</li>
            ))}
          </ul>
        </div>
      </div>

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
          <Button size="sm" disabled={!canApplyToVacancy(role)} onClick={() => handleAction("apply", vacancy.id)}>
            {getApplyButtonText(role)}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={role === "Гость"}
            onClick={() => handleAction("save", vacancy.id)}
          >
            <Bookmark className="h-4 w-4 mr-1" />
            Сохранить
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={role === "Гость"}
            onClick={() => handleAction("favorite", vacancy.id)}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction("details", vacancy.id)}>
            <Eye className="h-4 w-4 mr-1" />
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  )

  const renderSmallCard = (vacancy: VacancyData) => (
    <div key={vacancy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <img
            src={vacancy.companyLogo || "/placeholder.svg"}
            alt={vacancy.company}
            className="h-8 w-8 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-medium text-gray-900 truncate">{vacancy.title}</h3>
              <div className="flex items-center space-x-1">
                {getStatusBadges(vacancy).map((badge, index) => (
                  <Badge key={index} variant={badge.variant} className="text-xs">
                    {badge.text}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-700 truncate">{vacancy.company}</span>
              {renderRatingStars(vacancy.companyRating)}
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{vacancy.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{vacancy.schedule}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-3 w-3 mr-1" />
                <span>{vacancy.postType}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
              <span>Опыт: {vacancy.experience}</span>
              <div className="flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                <span>ЧО: {vacancy.securityLicense}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">{vacancy.description}</p>
            <div className="flex flex-wrap gap-1">
              {getTagBadges(vacancy)
                .slice(0, 2)
                .map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <div className="text-sm font-semibold text-green-600 mb-1">
            {vacancy.salary.from.toLocaleString()} - {vacancy.salary.to.toLocaleString()} ₽
          </div>
          <div className="text-xs text-gray-500 mb-3">{getSalaryPeriodLabel(vacancy.salary.period)}</div>
          <div className="flex flex-col space-y-1">
            <Button
              size="sm"
              disabled={!canApplyToVacancy(role)}
              onClick={() => handleAction("apply", vacancy.id)}
              className="text-xs px-2 py-1"
            >
              {role === "Гость" ? "Войти" : role === "Представитель организации" ? "Недоступно" : "Откликнуться"}
            </Button>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={role === "Гость"}
                onClick={() => handleAction("save", vacancy.id)}
                className="p-1"
              >
                <Bookmark className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleAction("details", vacancy.id)} className="p-1">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCards = () => {
    switch (view) {
      case "large":
        return <div className="space-y-6">{sortedVacancies.map(renderLargeCard)}</div>
      case "small":
        return <div className="space-y-3">{sortedVacancies.map(renderSmallCard)}</div>
      default:
        return null
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Найдено вакансий: {sortedVacancies.length}</h3>
        {role === "Гость" && <div className="text-xs text-gray-500">Зарегистрируйтесь для отклика на вакансии</div>}
        {role === "Представитель организации" && (
          <div className="text-xs text-gray-500">Представители организаций не могут откликаться на вакансии</div>
        )}
      </div>

      {sortedVacancies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">По выбранным фильтрам вакансии не найдены</p>
        </div>
      ) : (
        renderCards()
      )}
    </div>
  )
}
