"use client"

import { useState } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import {
  MapPin,
  Search,
  Building,
  Eye,
  Star,
  CheckCircle,
  Heart,
  MessageCircle,
  Plus,
  Settings,
  Shield,
  Users,
  XCircle,
  Edit,
  Trash,
  Clock,
  Briefcase,
  AlertCircle,
  BarChart3,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Header from "@/components/header"
import { useJobs } from "@/hooks/use-jobs"

const jobs = [
  {
    id: 1,
    title: "Охранник 6 разряд",
    company: "Охранное Агентство Авангард",
    companyId: 1,
    companyLogo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%201-pSoYbxeRfeKKzvB9MhQQpkC67sQnGz.jpeg",
    location: "Москва",
    address: "ТЦ Европейский",
    salary: "63 500 - 109 000 ₽",
    salaryPeriod: "за месяц, на руки",
    schedule: "2/2",
    experience: "Опыт от 1 года",
    requirements: ["Удостоверение охранника", "Опыт работы в ТЦ", "Ответственность"],
    description:
      "Требуется охранник для работы в крупном торговом центре. Обеспечение безопасности посетителей и персонала.",
    benefits: ["Официальное трудоустройство", "Соцпакет", "Обучение за счет компании"],
    postedAt: "2024-01-15",
    views: 234,
    applications: 12,
    urgent: true,
    verified: true,
    type: "full-time",
    category: "security",
    rating: 4.8,
    reviewCount: 4,
    paymentInfo: "Без оплаты",
    paymentSchedule: "Выплаты: два раза в месяц",
    viewerCount: 6,
    status: "active",
  },
  {
    id: 2,
    title: "Охранник (вахта)",
    company: "ЧОП Ильгория",
    companyId: 2,
    companyLogo: "/placeholder.svg?height=200&width=200",
    location: "Москва",
    address: "Дмитровская и еще 3",
    salary: "93 000 - 96 100 ₽",
    salaryPeriod: "за месяц, на руки",
    schedule: "Вахта",
    experience: "Опыт от 3 лет",
    requirements: ["Удостоверение охранника", "Опыт руководства", "Знание ПК"],
    description: "Ищем опытного старшего охранника для координации работы смены в бизнес-центре.",
    benefits: ["Высокая зарплата", "Премии", "Карьерный рост"],
    postedAt: "2024-01-14",
    views: 189,
    applications: 8,
    urgent: false,
    verified: true,
    type: "full-time",
    category: "senior",
    rating: 4.2,
    reviewCount: 7,
    paymentInfo: "Без опыта",
    paymentSchedule: "Вахта",
    viewerCount: 4,
    status: "pending",
  },
  {
    id: 3,
    title: "Охранник в бизнес-центр",
    company: "Частная Охранная организация Специальные Технологии Безопасности",
    companyId: 3,
    companyLogo: "/placeholder.svg?height=200&width=200",
    location: "Москва",
    address: "м. Тульская",
    salary: "45 000 - 55 000 ₽",
    salaryPeriod: "за месяц, на руки",
    schedule: "1/3",
    experience: "Без опыта",
    requirements: ["Удостоверение охранника 4-6 разряда", "Ответственность", "Пунктуальность"],
    description: "Требуется охранник для работы в бизнес-центре класса А. Контроль доступа, видеонаблюдение.",
    benefits: ["Своевременная оплата", "Комфортные условия", "Дружный коллектив"],
    postedAt: "2024-01-13",
    views: 156,
    applications: 5,
    urgent: false,
    verified: true,
    type: "full-time",
    category: "security",
    rating: 4.5,
    reviewCount: 12,
    paymentInfo: "Без опыта",
    paymentSchedule: "Выплаты: еженедельно",
    viewerCount: 2,
    status: "active",
  },
]

const resumes = [
  {
    id: 1,
    name: "Иван Петрович Сидоров",
    position: "Охранник",
    experience: 8,
    location: "Москва",
    salary: "от 40 000 ₽",
    lastActivity: "2024-01-15",
    skills: ["Удостоверение 4 разряда", "Опыт в ТЦ", "Знание ПК"],
    description: "Опытный охранник с 8-летним стажем работы в торговых центрах и офисных зданиях.",
    avatar: "/placeholder.svg?height=200&width=200",
    verified: true,
    rating: 4.8,
    recommendations: 5,
    status: "active",
  },
  {
    id: 2,
    name: "Сергей Николаевич Козлов",
    position: "Старший охранник",
    experience: 12,
    location: "Санкт-Петербург",
    salary: "от 55 000 ₽",
    lastActivity: "2024-01-14",
    skills: ["Удостоверение 6 разряда", "Управление командой", "Системы безопасности"],
    description: "Руководитель охранной службы с большим опытом управления персоналом.",
    avatar: "/placeholder.svg?height=200&width=200",
    verified: true,
    rating: 4.9,
    recommendations: 8,
    status: "pending",
  },
]

const cities = ["Все города", "Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск", "Казань"]
const experienceLevels = ["Любой", "Без опыта", "1-3 года", "3-5 лет", "Более 5 лет"]
const scheduleTypes = ["Любой", "Полный день", "Сменный график", "Вахта", "Гибкий график"]

// Добавим дополнительные данные для более полной демонстрации функциональности

// Добавим данные о моих откликах для роли охранника
const myApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Охранник 6 разряд",
    company: "Охранное Агентство Авангард",
    location: "Москва",
    appliedDate: "2024-01-20",
    status: "reviewing", // reviewing, invited, rejected, hired
    statusText: "На рассмотрении",
    statusClass: "bg-blue-100 text-blue-800",
    message: "Спасибо за отклик! Ваше резюме на рассмотрении.",
    hasNewMessages: true,
  },
  {
    id: 2,
    jobId: 3,
    jobTitle: "Охранник в бизнес-центр",
    company: "Частная Охранная организация Специальные Технологии Безопасности",
    location: "Москва",
    appliedDate: "2024-01-18",
    status: "invited",
    statusText: "Приглашение",
    statusClass: "bg-green-100 text-green-800",
    message: "Приглашаем вас на собеседование 25 января в 14:00.",
    hasNewMessages: true,
  },
  {
    id: 3,
    jobId: 2,
    jobTitle: "Охранник (вахта)",
    company: "ЧОП Ильгория",
    location: "Москва",
    appliedDate: "2024-01-15",
    status: "rejected",
    statusText: "Отказ",
    statusClass: "bg-red-100 text-red-800",
    message: "К сожалению, ваша кандидатура не подходит для данной вакансии.",
    hasNewMessages: false,
  },
]

// Добавим данные о кандидатах для роли ЧОП
const candidates = [
  {
    id: 1,
    name: "Иван Петрович Сидоров",
    position: "Охранник",
    appliedDate: "2024-01-20",
    jobTitle: "Охранник 6 разряд",
    experience: "8 лет",
    status: "new", // new, reviewing, interviewed, hired, rejected
    statusText: "Новый",
    statusClass: "bg-blue-100 text-blue-800",
    match: 95,
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Алексей Иванович Смирнов",
    position: "Охранник",
    appliedDate: "2024-01-19",
    jobTitle: "Охранник 6 разряд",
    experience: "5 лет",
    status: "reviewing",
    statusText: "На рассмотрении",
    statusClass: "bg-purple-100 text-purple-800",
    match: 85,
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Петр Васильевич Кузнецов",
    position: "Охранник",
    appliedDate: "2024-01-18",
    jobTitle: "Охранник (вахта)",
    experience: "3 года",
    status: "interviewed",
    statusText: "Интервью",
    statusClass: "bg-green-100 text-green-800",
    match: 75,
    avatar: "/placeholder.svg?height=200&width=200",
  },
]

// Добавим данные для аналитики
const analyticsData = {
  views: [120, 150, 180, 220, 250, 280, 310],
  applications: [10, 15, 20, 25, 30, 35, 40],
  hires: [2, 3, 4, 5, 6, 7, 8],
  periods: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  topSearches: [
    { term: "Охранник ТЦ", count: 245 },
    { term: "Вахта", count: 189 },
    { term: "Охранник без опыта", count: 156 },
    { term: "Охранник 6 разряд", count: 132 },
    { term: "Ночной охранник", count: 98 },
  ],
  conversionRate: 12.5,
  averageResponseTime: "8 часов",
}

// Добавим данные для модерации
const moderationItems = [
  {
    id: 1,
    type: "job", // job, resume
    title: "Охранник (вахта)",
    company: "ЧОП Ильгория",
    submittedDate: "2024-01-21",
    status: "pending",
    issues: [],
    priority: "high",
  },
  {
    id: 2,
    type: "job",
    title: "Охранник в офис",
    company: "ЧОП Защита",
    submittedDate: "2024-01-20",
    status: "pending",
    issues: ["Недостаточное описание", "Отсутствует информация о зарплате"],
    priority: "medium",
  },
  {
    id: 3,
    type: "resume",
    title: "Сергей Николаевич Козлов",
    position: "Старший охранник",
    submittedDate: "2024-01-19",
    status: "pending",
    issues: [],
    priority: "low",
  },
]

export default function JobsPage() {
  const { userRole } = useUserRole()
  const [activeTab, setActiveTab] = useState(getDefaultTab())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Все города")
  const [viewMode, setViewMode] = useState("list")
  const { jobs: realJobs, loading: jobsLoading, searchJobs } = useJobs()
  const [ratingFilter, setRatingFilter] = useState("any")

  function getDefaultTab() {
    switch (userRole) {
      case "guard":
        return "jobs"
      case "chop":
        return "my-jobs"
      case "moderator":
        return "moderation"
      case "admin":
        return "moderation"
      default:
        return "jobs"
    }
  }

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Поиск работы"
      case "chop":
        return "Управление вакансиями"
      case "moderator":
        return "Модерация вакансий"
      case "admin":
        return "Администрирование вакансий"
      default:
        return "Вакансии"
    }
  }

  const getPageDescription = () => {
    switch (userRole) {
      case "guard":
        return `Найдено ${jobs.length} вакансий в сфере охраны`
      case "chop":
        return "Размещайте вакансии и находите лучших кандидатов"
      case "moderator":
        return "Проверка и модерация вакансий и резюме"
      case "admin":
        return "Полное управление платформой вакансий и резюме"
      default:
        return `Найдено ${jobs.length} вакансий в сфере охраны`
    }
  }

  const getTabsForRole = () => {
    switch (userRole) {
      case "guard":
        return (
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="jobs">Вакансии</TabsTrigger>
            <TabsTrigger value="my-applications">Мои отклики</TabsTrigger>
          </TabsList>
        )
      case "chop":
        return (
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="my-jobs">Мои вакансии</TabsTrigger>
            <TabsTrigger value="resumes">Резюме</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>
        )
      case "moderator":
        return (
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="moderation">Модерация</TabsTrigger>
            <TabsTrigger value="jobs">Все вакансии</TabsTrigger>
            <TabsTrigger value="resumes">Все резюме</TabsTrigger>
          </TabsList>
        )
      case "admin":
        return (
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="moderation">Модерация</TabsTrigger>
            <TabsTrigger value="jobs">Все вакансии</TabsTrigger>
            <TabsTrigger value="resumes">Все резюме</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>
        )
      default:
        return null
    }
  }

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Избранные
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Просмотренные
            </Button>
          </div>
        )
      case "chop":
        return (
          <div className="flex items-center gap-2">
            <Link href="/jobs/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Разместить вакансию
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Панель модерации
            </Button>
            <Badge className="bg-orange-100 text-orange-800 border-0">На модерации: 5</Badge>
          </div>
        )
      case "admin":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Управление пользователями
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Настройки системы
            </Button>
            <Badge className="bg-red-100 text-red-800 border-0">Админ</Badge>
          </div>
        )
      default:
        return null
    }
  }

  const getJobActions = (job) => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
              <Heart className="h-5 w-5" />
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Откликнуться</Button>
          </div>
        )
      case "chop":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Статистика
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              <Trash className="h-4 w-4 mr-1" />
              Удалить
            </Button>
          </div>
        )
      case "moderator":
      case "admin":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            {job.status === "pending" && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Одобрить
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <XCircle className="h-4 w-4 mr-1" />
                  Отклонить
                </Button>
              </>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const getResumeActions = (resume) => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Eye className="h-4 w-4 mr-1" />
              Просмотр
            </Button>
          </div>
        )
      case "chop":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Просмотр
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="h-4 w-4 mr-1" />
              Связаться
            </Button>
          </div>
        )
      case "moderator":
      case "admin":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            {resume.status === "pending" && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Одобрить
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <XCircle className="h-4 w-4 mr-1" />
                  Отклонить
                </Button>
              </>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const filteredJobs = realJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = selectedCity === "Все города" || job.location === selectedCity

    // Для модераторов и админов показываем все вакансии
    if (userRole === "moderator" || userRole === "admin") {
      return matchesSearch && matchesCity
    }

    // Для обычных пользователей показываем только активные
    return matchesSearch && matchesCity && job.status === "active"
  })

  const handleSearch = () => {
    searchJobs(searchQuery, {
      location: selectedCity !== "Все города" ? selectedCity : undefined,
    })
  }

  return (
    <>
      <Header />
      <main role="main" className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
                <p className="text-gray-600 mt-1">{getPageDescription()}</p>
              </div>
              {getRoleSpecificActions()}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {getTabsForRole()}

            {/* Вкладка для охранников - поиск вакансий */}
            <TabsContent value="jobs" className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-6">
                        {/* График работы */}
                        <div>
                          <h3 className="font-medium mb-3">График работы</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="schedule-shift" />
                              <Label htmlFor="schedule-shift" className="text-sm">
                                Сменный
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="schedule-rotation" />
                              <Label htmlFor="schedule-rotation" className="text-sm">
                                Вахта
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="schedule-part-time" />
                              <Label htmlFor="schedule-part-time" className="text-sm">
                                Подработка
                              </Label>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Зарплата */}
                        <div>
                          <h3 className="font-medium mb-3">Зарплата</h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor="salary-from" className="text-xs text-gray-500">
                                  От
                                </Label>
                                <Input id="salary-from" placeholder="25000" className="h-8" />
                              </div>
                              <div>
                                <Label htmlFor="salary-to" className="text-xs text-gray-500">
                                  До
                                </Label>
                                <Input id="salary-to" placeholder="80000" className="h-8" />
                              </div>
                            </div>
                            <Select defaultValue="month">
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hour">За час</SelectItem>
                                <SelectItem value="shift">За смену</SelectItem>
                                <SelectItem value="month">В месяц</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Separator />

                        {/* Наличие УЧО */}
                        <div>
                          <h3 className="font-medium mb-3">Удостоверение ЧО</h3>
                          <RadioGroup defaultValue="any">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="any" id="uco-any" />
                              <Label htmlFor="uco-any" className="text-sm">
                                Не требуется
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="4" id="uco-4" />
                              <Label htmlFor="uco-4" className="text-sm">
                                4 разряд
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="6" id="uco-6" />
                              <Label htmlFor="uco-6" className="text-sm">
                                6 разряд
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        {/* Тип объекта */}
                        <div>
                          <h3 className="font-medium mb-3">Тип объекта</h3>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-office" />
                              <Label htmlFor="object-office" className="text-sm">
                                Офисные здания и бизнес-центры
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-retail" />
                              <Label htmlFor="object-retail" className="text-sm">
                                Торговые объекты
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-warehouse" />
                              <Label htmlFor="object-warehouse" className="text-sm">
                                Склады и логистические комплексы
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-industrial" />
                              <Label htmlFor="object-industrial" className="text-sm">
                                Промышленные объекты
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-bank" />
                              <Label htmlFor="object-bank" className="text-sm">
                                Банки и финансовые учреждения
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-education" />
                              <Label htmlFor="object-education" className="text-sm">
                                Образовательные учреждения
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-medical" />
                              <Label htmlFor="object-medical" className="text-sm">
                                Медицинские учреждения
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-residential" />
                              <Label htmlFor="object-residential" className="text-sm">
                                Жилая недвижимость
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-special" />
                              <Label htmlFor="object-special" className="text-sm">
                                Объекты с повышенными требованиями
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="object-events" />
                              <Label htmlFor="object-events" className="text-sm">
                                Мероприятия и временные объекты
                              </Label>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Регион */}
                        <div>
                          <h3 className="font-medium mb-3">Регион</h3>
                          <Select value={selectedCity} onValueChange={setSelectedCity}>
                            <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="Выберите город" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                              <SelectItem value="all-russia">Вся Россия</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        {/* Питание */}
                        <div>
                          <h3 className="font-medium mb-3">Питание</h3>
                          <RadioGroup defaultValue="any">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="any" id="food-any" />
                              <Label htmlFor="food-any" className="text-sm">
                                Не важно
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="food-yes" />
                              <Label htmlFor="food-yes" className="text-sm">
                                Есть
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="food-no" />
                              <Label htmlFor="food-no" className="text-sm">
                                Нет
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        {/* Тип поста */}
                        <div>
                          <h3 className="font-medium mb-3">Тип поста</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="post-kpp" />
                              <Label htmlFor="post-kpp" className="text-sm">
                                КПП
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="post-video" />
                              <Label htmlFor="post-video" className="text-sm">
                                Видеонаблюдение
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="post-patrol" />
                              <Label htmlFor="post-patrol" className="text-sm">
                                Патруль
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="post-stationary" />
                              <Label htmlFor="post-stationary" className="text-sm">
                                Стационарный
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="post-transport" />
                              <Label htmlFor="post-transport" className="text-sm">
                                Контроль транспорта
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="post-inspection" />
                              <Label htmlFor="post-inspection" className="text-sm">
                                Досмотровый
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="post-gbr" />
                              <Label htmlFor="post-gbr" className="text-sm">
                                ГБР
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="post-lcn" />
                              <Label htmlFor="post-lcn" className="text-sm">
                                ЛЦН
                              </Label>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Опыт работы */}
                        <div>
                          <h3 className="font-medium mb-3">Опыт работы</h3>
                          <RadioGroup defaultValue="any">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="any" id="exp-any" />
                              <Label htmlFor="exp-any" className="text-sm">
                                Не требуется
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="exp-1" />
                              <Label htmlFor="exp-1" className="text-sm">
                                От 1 года
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3" id="exp-3" />
                              <Label htmlFor="exp-3" className="text-sm">
                                От 3 лет
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="5" id="exp-5" />
                              <Label htmlFor="exp-5" className="text-sm">
                                От 5 лет
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        {/* Дополнительные параметры */}
                        <div>
                          <h3 className="font-medium mb-3">Дополнительно</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="criminal-record" />
                              <Label htmlFor="criminal-record" className="text-sm">
                                Можно с судимостями
                              </Label>
                            </div>

                            <div>
                              <Label className="text-sm text-gray-600 mb-2 block">Периодичность выплат</Label>
                              <Select defaultValue="any">
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="any">Не важно</SelectItem>
                                  <SelectItem value="monthly">Раз в месяц</SelectItem>
                                  <SelectItem value="bi-monthly">Два раза в месяц</SelectItem>
                                  <SelectItem value="after-work">По окончанию работы</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-sm text-gray-600 mb-2 block">Вид выплат</Label>
                              <Select defaultValue="any">
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="any">Не важно</SelectItem>
                                  <SelectItem value="cash">В руки</SelectItem>
                                  <SelectItem value="official">Официально</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Рейтинг работодателя */}
                        <div>
                          <h3 className="font-medium mb-3">Минимальный рейтинг работодателя</h3>
                          <RadioGroup value={ratingFilter} onValueChange={setRatingFilter}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="any" id="rating-any" />
                              <Label htmlFor="rating-any" className="text-sm">
                                Не важно
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="rating-1" />
                              <Label htmlFor="rating-1" className="text-sm flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                                1+
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="2" id="rating-2" />
                              <Label htmlFor="rating-2" className="text-sm flex items-center">
                                <div className="flex mr-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                </div>
                                2+
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3" id="rating-3" />
                              <Label htmlFor="rating-3" className="text-sm flex items-center">
                                <div className="flex mr-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                </div>
                                3+
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="4" id="rating-4" />
                              <Label htmlFor="rating-4" className="text-sm flex items-center">
                                <div className="flex mr-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                </div>
                                4+
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="4.5" id="rating-4.5" />
                              <Label htmlFor="rating-4.5" className="text-sm flex items-center">
                                <div className="flex mr-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                </div>
                                4.5
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        {/* Кнопки действий */}
                        <div className="space-y-2">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Применить фильтры</Button>
                          <Button variant="outline" className="w-full">
                            Сбросить все
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  {/* Search and Filters */}
                  <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Поиск вакансий..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 flex-1 md:flex-none">
                            Найти
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Jobs List */}
                  <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <Card
                        key={job.id}
                        className="group hover:shadow-md transition-all duration-200 border border-gray-200 shadow-sm bg-white cursor-pointer overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="relative">
                            {job.viewerCount > 0 && userRole === "guard" && (
                              <div className="absolute top-2 right-2 text-xs text-gray-500 flex items-center gap-1 bg-white/80 backdrop-blur-sm py-1 px-2 rounded-full">
                                <Eye className="h-3 w-3" />
                                <span>
                                  Сейчас смотрит {job.viewerCount} {job.viewerCount === 1 ? "человек" : "человека"}
                                </span>
                              </div>
                            )}

                            {(userRole === "moderator" || userRole === "admin") && (
                              <div className="absolute top-2 right-2 flex gap-2">
                                <Badge
                                  className={
                                    job.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-orange-100 text-orange-800"
                                  }
                                >
                                  {job.status === "active" ? "Активна" : "На модерации"}
                                </Badge>
                              </div>
                            )}

                            <div className="p-4">
                              <div className="flex flex-col gap-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {job.title}
                                    </h3>
                                    {job.urgent && (
                                      <Badge className="bg-red-100 text-red-800 border-0 text-xs">Срочно</Badge>
                                    )}
                                  </div>
                                  <div className="text-xl font-bold text-gray-900">{job.salary}</div>
                                  <div className="text-sm text-gray-500">{job.salaryPeriod}</div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <Building className="h-4 w-4 text-gray-400" />
                                    <Link href={`/chop/${job.companyId}`} className="text-gray-700 hover:text-blue-600">
                                      {job.company_name}
                                    </Link>
                                    {job.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-700">{job.location}</span>
                                  </div>
                                  {job.address && <span className="text-gray-500 text-sm">{job.address}</span>}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="bg-gray-50">
                                    {job.paymentInfo}
                                  </Badge>
                                  <Badge variant="outline" className="bg-gray-50">
                                    {job.paymentSchedule}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t p-4">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Star
                                    className={`h-4 w-4 ${
                                      job.rating > 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                  <span>{job.rating}</span>
                                  <span>
                                    • {job.reviewCount} {job.reviewCount === 1 ? "отзыв" : "отзыва"}
                                  </span>
                                </div>
                              </div>

                              {getJobActions(job)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Вкладка для ЧОПов - управление вакансиями */}
            <TabsContent value="my-jobs" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Мои вакансии</h2>
                  <p className="text-gray-600">Управляйте своими вакансиями и откликами кандидатов</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Разместить вакансию
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Создание новой вакансии</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="job-title">Название вакансии</Label>
                        <Input id="job-title" placeholder="Например: Охранник торгового центра" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="salary-from">Зарплата от</Label>
                          <Input id="salary-from" placeholder="50000" />
                        </div>
                        <div>
                          <Label htmlFor="salary-to">Зарплата до</Label>
                          <Input id="salary-to" placeholder="80000" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="job-location">Местоположение</Label>
                        <Input id="job-location" placeholder="Москва" />
                      </div>
                      <div>
                        <Label htmlFor="job-schedule">График работы</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите график" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Полный день</SelectItem>
                            <SelectItem value="shift">Сменный график</SelectItem>
                            <SelectItem value="rotation">Вахта</SelectItem>
                            <SelectItem value="flexible">Гибкий график</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="job-description">Описание вакансии</Label>
                        <Textarea
                          id="job-description"
                          placeholder="Опишите требования и обязанности..."
                          className="min-h-[120px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="job-requirements">Требования</Label>
                        <Textarea id="job-requirements" placeholder="Укажите необходимые навыки и опыт..." />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="urgent-job" />
                        <Label htmlFor="urgent-job">Срочная вакансия</Label>
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <Button variant="outline">Отмена</Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">Опубликовать</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Активные (2)</TabsTrigger>
                  <TabsTrigger value="moderation">На модерации (1)</TabsTrigger>
                  <TabsTrigger value="archived">Архивные (0)</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                  {jobs
                    .filter((job) => job.status === "active")
                    .map((job) => (
                      <Card key={job.id} className="overflow-hidden border border-gray-200 shadow-sm">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <Link
                                  href={`/job/${job.id}`}
                                  className="text-lg font-semibold hover:text-blue-600 transition-colors"
                                >
                                  {job.title}
                                </Link>
                                <div className="text-xl font-bold text-gray-900 mt-1">{job.salary}</div>
                                <div className="text-sm text-gray-500">{job.salaryPeriod}</div>
                              </div>
                              <Badge className="bg-green-100 text-green-800">Активна</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Просмотры</span>
                                <span className="font-semibold">{job.views}</span>
                                <Progress value={job.views / 10} className="h-1 mt-1" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Отклики</span>
                                <span className="font-semibold">{job.applications}</span>
                                <Progress value={job.applications * 5} className="h-1 mt-1" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Конверсия</span>
                                <span className="font-semibold">
                                  {Math.round((job.applications / job.views) * 100)}%
                                </span>
                                <Progress value={(job.applications / job.views) * 100} className="h-1 mt-1" />
                              </div>
                            </div>
                          </div>

                          <div className="border-t p-3 bg-gray-50 flex flex-wrap justify-between items-center gap-2">
                            <div className="text-sm text-gray-500">Опубликовано: {job.postedAt}</div>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Редактировать
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Просмотры
                              </Button>
                              <Button variant="outline" size="sm">
                                <UserPlus className="h-4 w-4 mr-1" />
                                Кандидаты ({job.applications})
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <Trash className="h-4 w-4 mr-1" />
                                Архивировать
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="moderation" className="space-y-4">
                  {jobs
                    .filter((job) => job.status === "pending")
                    .map((job) => (
                      <Card key={job.id} className="overflow-hidden border border-gray-200 shadow-sm">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <Link
                                  href={`/job/${job.id}`}
                                  className="text-lg font-semibold hover:text-blue-600 transition-colors"
                                >
                                  {job.title}
                                </Link>
                                <div className="text-xl font-bold text-gray-900 mt-1">{job.salary}</div>
                                <div className="text-sm text-gray-500">{job.salaryPeriod}</div>
                              </div>
                              <Badge className="bg-orange-100 text-orange-800">На модерации</Badge>
                            </div>

                            <Alert className="mt-4 bg-blue-50 text-blue-800 border-blue-100">
                              <AlertDescription className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                <span>Вакансия проходит проверку модератором. Обычно это занимает до 24 часов.</span>
                              </AlertDescription>
                            </Alert>
                          </div>

                          <div className="border-t p-3 bg-gray-50 flex flex-wrap justify-between items-center gap-2">
                            <div className="text-sm text-gray-500">Отправлено на модерацию: {job.postedAt}</div>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Редактировать
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <Trash className="h-4 w-4 mr-1" />
                                Удалить
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="archived" className="space-y-4">
                  <Card className="border-dashed border-2 p-8 text-center">
                    <CardContent>
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="rounded-full bg-gray-100 p-3">
                          <Briefcase className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Нет архивных вакансий</h3>
                          <p className="text-gray-500 mt-1">Здесь будут отображаться ваши завершенные вакансии</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Вкладка для охранников - мои отклики */}
            <TabsContent value="my-applications" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Мои отклики</h2>
                <p className="text-gray-600">Отслеживайте статус ваших откликов на вакансии</p>
              </div>

              <div className="space-y-4">
                {myApplications.map((application) => (
                  <Card key={application.id} className="overflow-hidden border border-gray-200 shadow-sm">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link
                              href={`/job/${application.jobId}`}
                              className="text-lg font-semibold hover:text-blue-600 transition-colors"
                            >
                              {application.jobTitle}
                            </Link>
                            <div className="text-gray-600 mt-1">{application.company}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {application.location}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={application.statusClass}>{application.statusText}</Badge>
                            {application.hasNewMessages && (
                              <Badge className="bg-red-100 text-red-800 text-xs">Новое сообщение</Badge>
                            )}
                          </div>
                        </div>

                        {application.message && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{application.message}</p>
                          </div>
                        )}
                      </div>

                      <div className="border-t p-3 bg-gray-50 flex flex-wrap justify-between items-center gap-2">
                        <div className="text-sm text-gray-500">Отклик отправлен: {application.appliedDate}</div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Сообщения
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Просмотреть вакансию
                          </Button>
                          {application.status === "invited" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Принять приглашение
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Вкладка для ЧОПов - резюме */}
            <TabsContent value="resumes" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold">База резюме</h2>
                <p className="text-gray-600">Найдите подходящих кандидатов для ваших вакансий</p>
              </div>

              <div className="space-y-4">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="overflow-hidden border border-gray-200 shadow-sm">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            <img
                              src={resume.avatar || "/placeholder.svg"}
                              alt={resume.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=64&width=64"
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{resume.name}</h3>
                                <div className="text-gray-600">{resume.position}</div>
                                <div className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                                  <span>Опыт: {resume.experience} лет</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {resume.location}
                                  </span>
                                  <span>Зарплата: {resume.salary}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium">{resume.rating}</span>
                                </div>
                                {resume.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="text-sm text-gray-700">{resume.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {resume.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t p-3 bg-gray-50 flex flex-wrap justify-between items-center gap-2">
                        <div className="text-sm text-gray-500">
                          Последняя активность: {resume.lastActivity} • {resume.recommendations} рекомендаций
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Просмотреть
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Связаться
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Вкладка для ЧОПов - аналитика */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Аналитика</h2>
                <p className="text-gray-600">Статистика по вашим вакансиям и откликам</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Всего просмотров</p>
                        <p className="text-2xl font-bold">1,847</p>
                      </div>
                      <Eye className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="mt-2 text-sm text-green-600">+12% за неделю</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Всего откликов</p>
                        <p className="text-2xl font-bold">231</p>
                      </div>
                      <UserPlus className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="mt-2 text-sm text-green-600">+8% за неделю</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Конверсия</p>
                        <p className="text-2xl font-bold">{analyticsData.conversionRate}%</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-purple-500" />
                    </div>
                    <div className="mt-2 text-sm text-green-600">+2.1% за неделю</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Время отклика</p>
                        <p className="text-2xl font-bold">{analyticsData.averageResponseTime}</p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-500" />
                    </div>
                    <div className="mt-2 text-sm text-red-600">+1ч за неделю</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Популярные поисковые запросы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsData.topSearches.map((search, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{search.term}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(search.count / 245) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">{search.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Активные вакансии</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobs
                        .filter((job) => job.status === "active")
                        .map((job) => (
                          <div key={job.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-sm">{job.title}</div>
                              <div className="text-xs text-gray-500">{job.postedAt}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{job.views} просмотров</div>
                              <div className="text-xs text-gray-500">{job.applications} откликов</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Вкладка для модераторов - модерация */}
            <TabsContent value="moderation" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Модерация</h2>
                <p className="text-gray-600">Проверка и одобрение вакансий и резюме</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">На модерации</p>
                        <p className="text-2xl font-bold">5</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Одобрено сегодня</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Отклонено сегодня</p>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {moderationItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border border-gray-200 shadow-sm">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-gray-50">
                                {item.type === "job" ? "Вакансия" : "Резюме"}
                              </Badge>
                              <Badge
                                className={
                                  item.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : item.priority === "medium"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {item.priority === "high"
                                  ? "Высокий"
                                  : item.priority === "medium"
                                    ? "Средний"
                                    : "Низкий"}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                            {item.company && <div className="text-gray-600">{item.company}</div>}
                            {item.position && <div className="text-gray-600">{item.position}</div>}
                            <div className="text-sm text-gray-500 mt-1">Отправлено: {item.submittedDate}</div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">На модерации</Badge>
                        </div>

                        {item.issues.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-red-600 mb-2">Обнаруженные проблемы:</h4>
                            <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                              {item.issues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="border-t p-3 bg-gray-50 flex flex-wrap justify-between items-center gap-2">
                        <div className="text-sm text-gray-500">
                          Приоритет:{" "}
                          {item.priority === "high" ? "Высокий" : item.priority === "medium" ? "Средний" : "Низкий"}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Просмотреть
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Одобрить
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            Отклонить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
