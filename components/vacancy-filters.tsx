"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  RotateCcw,
  Clock,
  DollarSign,
  Shield,
  Building,
  MapPin,
  Utensils,
  Eye,
  Briefcase,
  Plus,
  Star,
} from "lucide-react"

interface VacancyFiltersProps {
  role?: string
  filters: {
    workSchedule: string[]
    salaryFrom: string
    salaryTo: string
    salaryPeriod: string
    securityLicense: string
    objectType: string[]
    region: string
    meals: string
    postType: string[]
    experience: string
    allowCriminalRecord: boolean
    paymentFrequency: string
    paymentType: string
    minEmployerRating: string
  }
  onFiltersChange: (filters: any) => void
}

export default function VacancyFilters({ role = "Гость", filters, onFiltersChange }: VacancyFiltersProps) {
  const workScheduleOptions = [
    { value: "shift", label: "Сменный" },
    { value: "rotation", label: "Вахта" },
    { value: "parttime", label: "Подработка" },
  ]

  const salaryPeriodOptions = [
    { value: "hour", label: "за час" },
    { value: "shift", label: "за смену" },
    { value: "month", label: "в месяц" },
  ]

  const securityLicenseOptions = [
    { value: "none", label: "не требуется" },
    { value: "4th", label: "4 разряд" },
    { value: "6th", label: "6 разряд" },
  ]

  const objectTypeOptions = [
    { value: "office", label: "Офисные здания и бизнес-центры" },
    { value: "retail", label: "Торговые объекты" },
    { value: "warehouse", label: "Склады и логистические комплексы" },
    { value: "industrial", label: "Промышленные объекты" },
    { value: "bank", label: "Банки и финансовые учреждения" },
    { value: "education", label: "Образовательные учреждения" },
    { value: "medical", label: "Медицинские учреждения" },
    { value: "residential", label: "Жилая недвижимость" },
    { value: "high-security", label: "Объекты с повышенными требованиями" },
    { value: "events", label: "Мероприятия и временные объекты" },
  ]

  const regionOptions = [
    { value: "all", label: "Все города" },
    { value: "moscow", label: "Москва" },
    { value: "spb", label: "Санкт-Петербург" },
    { value: "novosibirsk", label: "Новосибирск" },
    { value: "ekaterinburg", label: "Екатеринбург" },
    { value: "kazan", label: "Казань" },
    { value: "nizhny-novgorod", label: "Нижний Новгород" },
    { value: "chelyabinsk", label: "Челябинск" },
    { value: "samara", label: "Самара" },
    { value: "omsk", label: "Омск" },
    { value: "rostov", label: "Ростов-на-Дону" },
    { value: "ufa", label: "Уфа" },
    { value: "krasnoyarsk", label: "Красноярск" },
    { value: "voronezh", label: "Воронеж" },
    { value: "perm", label: "Пермь" },
    { value: "volgograd", label: "Волгоград" },
  ]

  const mealsOptions = [
    { value: "any", label: "Не важно" },
    { value: "yes", label: "Есть" },
    { value: "no", label: "Нет" },
  ]

  const postTypeOptions = [
    { value: "checkpoint", label: "КПП" },
    { value: "video", label: "Видеонаблюдение" },
    { value: "patrol", label: "Патруль" },
    { value: "stationary", label: "Стационарный" },
    { value: "transport", label: "Контроль транспорта" },
    { value: "inspection", label: "Досмотровый" },
    { value: "gbr", label: "ГБР" },
  ]

  const experienceOptions = [
    { value: "none", label: "не требуется" },
    { value: "1year", label: "от 1 года" },
    { value: "3years", label: "от 3 лет" },
    { value: "5years", label: "от 5 лет" },
  ]

  const paymentFrequencyOptions = [
    { value: "any", label: "не важно" },
    { value: "monthly", label: "1 раз в месяц" },
    { value: "biweekly", label: "2 раза в месяц" },
    { value: "on-completion", label: "по факту" },
  ]

  const paymentTypeOptions = [
    { value: "any", label: "не важно" },
    { value: "cash", label: "в руки" },
    { value: "official", label: "официально" },
  ]

  const employerRatingOptions = [
    { value: "any", label: "не важно" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "4.5", label: "4.5+" },
  ]

  const handleArrayFilterChange = (filterKey: string, value: string, checked: boolean) => {
    const currentArray = filters[filterKey as keyof typeof filters] as string[]
    let newArray: string[]

    if (checked) {
      newArray = [...currentArray, value]
    } else {
      newArray = currentArray.filter((item) => item !== value)
    }

    onFiltersChange({
      ...filters,
      [filterKey]: newArray,
    })
  }

  const handleSingleFilterChange = (filterKey: string, value: string | boolean) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
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

      <div className="space-y-6">
        {/* График работы */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            График работы
          </label>
          <div className="space-y-2">
            {workScheduleOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`schedule-${option.value}`}
                  checked={filters.workSchedule.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleArrayFilterChange("workSchedule", option.value, checked as boolean)
                  }
                />
                <label htmlFor={`schedule-${option.value}`} className="text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Зарплата */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Зарплата
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="от"
                value={filters.salaryFrom}
                onChange={(e) => handleSingleFilterChange("salaryFrom", e.target.value)}
                className="text-xs"
              />
              <span className="text-sm text-gray-500">—</span>
              <Input
                placeholder="до"
                value={filters.salaryTo}
                onChange={(e) => handleSingleFilterChange("salaryTo", e.target.value)}
                className="text-xs"
              />
            </div>
            <Select
              value={filters.salaryPeriod}
              onValueChange={(value) => handleSingleFilterChange("salaryPeriod", value)}
            >
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {salaryPeriodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Удостоверение ЧО */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-1" />
            Удостоверение ЧО
          </label>
          <Select
            value={filters.securityLicense}
            onValueChange={(value) => handleSingleFilterChange("securityLicense", value)}
          >
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {securityLicenseOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Тип объекта */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Building className="h-4 w-4 mr-1" />
            Тип объекта
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {objectTypeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`object-${option.value}`}
                  checked={filters.objectType.includes(option.value)}
                  onCheckedChange={(checked) => handleArrayFilterChange("objectType", option.value, checked as boolean)}
                />
                <label htmlFor={`object-${option.value}`} className="text-xs text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Регион */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Регион
          </label>
          <Select value={filters.region} onValueChange={(value) => handleSingleFilterChange("region", value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Питание */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Utensils className="h-4 w-4 mr-1" />
            Питание
          </label>
          <Select value={filters.meals} onValueChange={(value) => handleSingleFilterChange("meals", value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mealsOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Тип поста */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            Тип поста
          </label>
          <div className="space-y-2">
            {postTypeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`post-${option.value}`}
                  checked={filters.postType.includes(option.value)}
                  onCheckedChange={(checked) => handleArrayFilterChange("postType", option.value, checked as boolean)}
                />
                <label htmlFor={`post-${option.value}`} className="text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Опыт работы */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            Опыт работы
          </label>
          <Select value={filters.experience} onValueChange={(value) => handleSingleFilterChange("experience", value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {experienceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Дополнительно */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Дополнительно
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="criminal-record"
                checked={filters.allowCriminalRecord}
                onCheckedChange={(checked) => handleSingleFilterChange("allowCriminalRecord", checked as boolean)}
              />
              <label htmlFor="criminal-record" className="text-sm text-gray-700">
                можно с судимостями
              </label>
            </div>

            <div>
              <label className="text-xs text-gray-600 mb-1 block">Периодичность выплат</label>
              <Select
                value={filters.paymentFrequency}
                onValueChange={(value) => handleSingleFilterChange("paymentFrequency", value)}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentFrequencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-600 mb-1 block">Вид выплат</label>
              <Select
                value={filters.paymentType}
                onValueChange={(value) => handleSingleFilterChange("paymentType", value)}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Минимальный рейтинг работодателя */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Минимальный рейтинг работодателя
          </label>
          <Select
            value={filters.minEmployerRating}
            onValueChange={(value) => handleSingleFilterChange("minEmployerRating", value)}
          >
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {employerRatingOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
