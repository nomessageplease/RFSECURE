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
  Filter,
  Calendar,
  Clock,
  Briefcase,
  AlertCircle,
  FileText,
  BarChart3,
  Download,
  CheckSquare,
  Printer,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
  const [excludeWords, setExcludeWords] = useState("")
  const { jobs: realJobs, loading: jobsLoading, searchJobs } = useJobs()

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
    <div className="min-h-screen bg-gray-50">
      <Header />

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
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Исключить слова</h3>
                        <div className="relative">
                          <Input
                            placeholder="Введите слова через запятую"
                            value={excludeWords}
                            onChange={(e) => setExcludeWords(e.target.value)}
                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Уровень дохода</h3>
                        <RadioGroup defaultValue="any">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="any" id="any" />
                            <Label htmlFor="any" className="text-sm">
                              Не имеет значения
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="25000" id="25000" />
                            <Label htmlFor="25000" className="text-sm">
                              от 25 000 ₽
                            </Label>
                            <span className="text-xs text-gray-500 ml-auto">1 107</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="65000" id="65000" />
                            <Label htmlFor="65000" className="text-sm">
                              от 65 000 ₽
                            </Label>
                            <span className="text-xs text-gray-500 ml-auto">953</span>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Регион</h3>
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                          <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Город" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                              <span className="font-semibold">{Math.round((job.applications / job.views) * 100)}%</span>
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
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Briefcase className="h-12 w-12 text-gray-400" />
                      <h3 className="text-lg font-medium">У вас нет архивных вакансий</h3>
                      <p className="text-gray-500 max-w-md">
                        Здесь будут отображаться вакансии, которые вы архивировали
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Последние кандидаты</h3>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <Card key={candidate.id} className="overflow-hidden border border-gray-200 shadow-sm">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            <img
                              src={candidate.avatar || "/placeholder.svg"}
                              alt={candidate.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-lg font-semibold">{candidate.name}</div>
                                <div className="text-sm text-gray-600">
                                  {candidate.position} • {candidate.experience}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Отклик на вакансию:{" "}
                                  <Link href={`/job/1`} className="hover:text-blue-600">
                                    {candidate.jobTitle}
                                  </Link>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={candidate.statusClass}>{candidate.statusText}</Badge>
                                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                  Совпадение {candidate.match}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t p-3 bg-gray-50 flex flex-wrap justify-between items-center gap-2">
                        <div className="text-sm text-gray-500">Отклик от {candidate.appliedDate}</div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Просмотреть
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Написать
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Calendar className="h-4 w-4 mr-1" />
                            Пригласить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Вкладка резюме */}
          <TabsContent value="resumes" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {resumes.map((resume) => (
                <Card
                  key={resume.id}
                  className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-800 font-semibold text-lg">
                          {resume.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                            {resume.name}
                          </h3>
                          {resume.verified && (
                            <Badge className="bg-green-100 text-green-800 border-0 text-xs">Проверен</Badge>
                          )}
                          {(userRole === "moderator" || userRole === "admin") && (
                            <Badge
                              className={
                                resume.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }
                            >
                              {resume.status === "active" ? "Активно" : "На модерации"}
                            </Badge>
                          )}
                        </div>
                        <div className="text-gray-600 mb-2">{resume.position}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{resume.location}</span>
                          </div>
                          <span>{resume.experience} лет опыта</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(resume.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{resume.rating}</span>
                      <span className="text-gray-500 text-sm">({resume.recommendations} рекомендаций)</span>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{resume.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="font-semibold text-gray-900">{resume.salary}</div>
                        <div className="text-xs text-gray-500">Последняя активность: {resume.lastActivity}</div>
                      </div>
                      {getResumeActions(resume)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Вкладка модерации */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Модерация контента</h2>
                <p className="text-gray-600">Проверка и управление вакансиями и резюме</p>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Фильтр" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все элементы</SelectItem>
                    <SelectItem value="high">Высокий приоритет</SelectItem>
                    <SelectItem value="medium">Средний приоритет</SelectItem>
                    <SelectItem value="low">Низкий приоритет</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-0 shadow-sm bg-orange-50">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">{moderationItems.length}</div>
                    <div className="text-sm text-orange-800">Ожидают проверки</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-green-50">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">24</div>
                    <div className="text-sm text-green-800">Одобрено сегодня</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-red-50">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-red-600 mb-1">3</div>
                    <div className="text-sm text-red-800">Отклонено сегодня</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Элементы на модерации</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {moderationItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden border border-gray-200">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    className={
                                      item.type === "job"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-purple-100 text-purple-800"
                                    }
                                  >
                                    {item.type === "job" ? "Вакансия" : "Резюме"}
                                  </Badge>
                                  <Badge
                                    className={
                                      item.priority === "high"
                                        ? "bg-red-100 text-red-800"
                                        : item.priority === "medium"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-green-100 text-green-800"
                                    }
                                  >
                                    {item.priority === "high"
                                      ? "Высокий приоритет"
                                      : item.priority === "medium"
                                        ? "Средний приоритет"
                                        : "Низкий приоритет"}
                                  </Badge>
                                </div>
                                <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                                <div className="text-sm text-gray-600 mt-1">
                                  {item.type === "job" ? item.company : item.position}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">Отправлено: {item.submittedDate}</div>
                              </div>
                            </div>

                            {item.issues.length > 0 && (
                              <Alert className="mt-3 bg-red-50 border-red-100">
                                <AlertDescription>
                                  <h4 className="font-medium text-red-800 mb-1">Обнаружены проблемы:</h4>
                                  <ul className="list-disc pl-5 text-sm text-red-700">
                                    {item.issues.map((issue, index) => (
                                      <li key={index}>{issue}</li>
                                    ))}
                                  </ul>
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>

                          <div className="border-t p-3 bg-gray-50 flex justify-between items-center">
                            <div className="text-sm text-gray-500">ID: {item.id}</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Просмотреть
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Редактировать
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
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Статистика модерации</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Время обработки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Вакансии</span>
                          <span className="text-sm font-medium">4.2 часа</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Резюме</span>
                          <span className="text-sm font-medium">2.8 часа</span>
                        </div>
                        <Progress value={28} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Отзывы</span>
                          <span className="text-sm font-medium">1.5 часа</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Результаты модерации</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-[200px]">
                      <div className="w-[200px] h-[200px] rounded-full border-8 border-green-500 relative flex items-center justify-center">
                        <div className="w-[150px] h-[150px] rounded-full border-8 border-red-500 relative flex items-center justify-center">
                          <div className="w-[100px] h-[100px] rounded-full border-8 border-orange-500 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">89%</div>
                              <div className="text-xs text-gray-500">Одобрено</div>
                            </div>
                          </div>
                          <div className="absolute -bottom-4 text-xs text-gray-500">8% Отклонено</div>
                        </div>
                        <div className="absolute -bottom-4 text-xs text-gray-500">3% На доработке</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {userRole === "admin" && (
              <Card className="border-0 shadow-sm mt-6">
                <CardHeader>
                  <CardTitle>Настройки модерации</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Автоматическая модерация</h4>
                        <p className="text-sm text-gray-500">Использовать ИИ для предварительной проверки контента</p>
                      </div>
                      <div>
                        <Button variant="outline">Настроить</Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Правила модерации</h4>
                        <p className="text-sm text-gray-500">Управление правилами и критериями проверки</p>
                      </div>
                      <div>
                        <Button variant="outline">Редактировать</Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Команда модераторов</h4>
                        <p className="text-sm text-gray-500">Управление доступом и назначение задач</p>
                      </div>
                      <div>
                        <Button variant="outline">Управление</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Вкладка аналитики */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Аналитика вакансий</h2>
                <p className="text-gray-600">Статистика и эффективность ваших вакансий</p>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="week">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Период" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">За день</SelectItem>
                    <SelectItem value="week">За неделю</SelectItem>
                    <SelectItem value="month">За месяц</SelectItem>
                    <SelectItem value="year">За год</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Экспорт
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Печать
                </Button>
              </div>
            </div>

            {/* Основные метрики */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-sm">Просмотры вакансий</div>
                    <div className="bg-blue-100 text-blue-800 p-1 rounded">
                      <Eye className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">1,234</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-green-100 text-green-800 border-0">+12%</Badge>
                    <span className="text-xs text-gray-500 ml-2">vs прошлый период</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-sm">Отклики</div>
                    <div className="bg-purple-100 text-purple-800 p-1 rounded">
                      <UserPlus className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">175</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-green-100 text-green-800 border-0">+8%</Badge>
                    <span className="text-xs text-gray-500 ml-2">vs прошлый период</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-sm">Конверсия</div>
                    <div className="bg-yellow-100 text-yellow-800 p-1 rounded">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{analyticsData.conversionRate}%</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-green-100 text-green-800 border-0">+2%</Badge>
                    <span className="text-xs text-gray-500 ml-2">vs прошлый период</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-500 text-sm">Среднее время ответа</div>
                    <div className="bg-green-100 text-green-800 p-1 rounded">
                      <Clock className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{analyticsData.averageResponseTime}</div>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-red-100 text-red-800 border-0">+1ч</Badge>
                    <span className="text-xs text-gray-500 ml-2">vs прошлый период</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Графики и детальная аналитика */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <Card className="border-0 shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle>Активность по вакансиям</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-2">
                    {analyticsData.views.map((view, index) => (
                      <div key={index} className="relative flex flex-col items-center group">
                        <div className="text-xs text-gray-500 mb-1 opacity-0 group-hover:opacity-100 absolute -top-6 transition-opacity">
                          {view} / {analyticsData.applications[index]}
                        </div>
                        <div className="w-12 bg-blue-100 rounded-t" style={{ height: `${view / 3}px` }}></div>
                        <div
                          className="w-12 bg-blue-500 rounded-t absolute bottom-6"
                          style={{ height: `${analyticsData.applications[index] * 3}px` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-1">{analyticsData.periods[index]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-100 rounded"></div>
                      <span className="text-sm text-gray-600">Просмотры</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm text-gray-600">Отклики</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Популярные запросы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topSearches.map((search, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-800 font-medium">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{search.term}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{search.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Полный отчет
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Эффективность вакансий */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Эффективность вакансий</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 text-gray-600 font-medium">Вакансия</th>
                      <th className="text-center p-3 text-gray-600 font-medium">Просмотры</th>
                      <th className="text-center p-3 text-gray-600 font-medium">Отклики</th>
                      <th className="text-center p-3 text-gray-600 font-medium">Конверсия</th>
                      <th className="text-center p-3 text-gray-600 font-medium">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <Link href={`/job/${job.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                            {job.title}
                          </Link>
                        </td>
                        <td className="p-3 text-center">{job.views}</td>
                        <td className="p-3 text-center">{job.applications}</td>
                        <td className="p-3 text-center">{Math.round((job.applications / job.views) * 100)}%</td>
                        <td className="p-3 text-center">
                          <Badge
                            className={
                              job.status === "active" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                            }
                          >
                            {job.status === "active" ? "Активна" : "На модерации"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Рекомендации */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle>Рекомендации по улучшению</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Улучшите описание вакансии</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Добавьте больше деталей о требуемых навыках и обязанностях в вакансию "Охранник 6 разряд" для
                        повышения конверсии.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Хорошая конверсия</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Вакансия "Охранник в бизнес-центр" показывает высокую конверсию в 12.5%. Продолжайте
                        использовать этот формат.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Вкладка для охранников - мои отклики */}
          <TabsContent value="my-applications" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Фильтры */}
              <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Статус отклика</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="all-statuses" defaultChecked />
                            <Label htmlFor="all-statuses" className="text-sm">
                              Все статусы
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="reviewing" />
                            <Label htmlFor="reviewing" className="text-sm">
                              На рассмотрении
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="invited" />
                            <Label htmlFor="invited" className="text-sm">
                              Приглашения
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="rejected" />
                            <Label htmlFor="rejected" className="text-sm">
                              Отказы
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Период</h3>
                        <RadioGroup defaultValue="all">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="period-all" />
                            <Label htmlFor="period-all" className="text-sm">
                              За все время
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="week" id="period-week" />
                            <Label htmlFor="period-week" className="text-sm">
                              За неделю
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="month" id="period-month" />
                            <Label htmlFor="period-month" className="text-sm">
                              За месяц
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Список откликов */}
              <div className="flex-1">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Мои отклики ({myApplications.length})</h2>
                  <div className="flex gap-2">
                    <Select defaultValue="date">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Сортировка" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">По дате (сначала новые)</SelectItem>
                        <SelectItem value="status">По статусу</SelectItem>
                        <SelectItem value="company">По компании</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                              <div className="text-sm text-gray-600 mt-1">
                                <Link href={`/chop/1`} className="hover:text-blue-600">
                                  {application.company}
                                </Link>{" "}
                                • {application.location}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">Отклик от {application.appliedDate}</div>
                            </div>
                            <Badge className={application.statusClass}>{application.statusText}</Badge>
                          </div>

                          {application.message && (
                            <Alert className="mt-3 bg-gray-50">
                              <AlertDescription>
                                {application.hasNewMessages && (
                                  <Badge className="mb-2 bg-blue-100 text-blue-800">Новое сообщение</Badge>
                                )}
                                <p className="text-sm">{application.message}</p>
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>

                        <div className="border-t p-3 bg-gray-50 flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {application.status === "reviewing" ? (
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Ожидает ответа
                              </span>
                            ) : application.status === "invited" ? (
                              <span className="flex items-center gap-1 text-green-600">
                                <Calendar className="h-4 w-4" />
                                Требуется ваш ответ
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <CheckSquare className="h-4 w-4" />
                                Рассмотрено
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Сообщение
                            </Button>
                            {application.status === "reviewing" && (
                              <Button variant="outline" size="sm" className="text-red-600">
                                Отозвать
                              </Button>
                            )}
                            {application.status === "invited" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Принять
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {myApplications.length === 0 && (
                    <Card className="border-dashed border-2 p-8 text-center">
                      <CardContent>
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <Briefcase className="h-12 w-12 text-gray-400" />
                          <h3 className="text-lg font-medium">У вас пока нет откликов</h3>
                          <p className="text-gray-500 max-w-md">
                            Найдите интересные вакансии и откликнитесь на них, чтобы они появились здесь
                          </p>
                          <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Найти вакансии</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
