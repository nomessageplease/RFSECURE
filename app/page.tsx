"use client"

import { useUserRole } from "@/components/user-role-switcher"
import {
  Search,
  Shield,
  Star,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  Newspaper,
  Briefcase,
  Map,
  Bell,
  MessageSquare,
  BarChart3,
  HelpCircle,
  AlertTriangle,
  UserCheck,
  Building2,
  Award,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  Plus,
  Settings,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Header from "@/components/header"

const modules = [
  {
    id: "ratings",
    title: "Система рейтинга",
    description: "Алгоритмический расчет рейтинга по 5 параметрам с визуализацией",
    icon: BarChart3,
    href: "/ratings",
    color: "bg-green-100 text-green-700",
    stats: "Топ-100 ЧОПов",
    featured: true,
    submodules: ["Параметры расчёта", "Механизм оценки", "Визуализация рейтинга"],
  },
  {
    id: "reviews",
    title: "Отзывы и жалобы",
    description: "Структурированные отзывы, модерация и система жалоб",
    icon: MessageSquare,
    href: "/reviews",
    color: "bg-purple-100 text-purple-700",
    stats: "8,934 отзыва",
    featured: true,
    submodules: ["Оставление отзыва", "Просмотр и модерация", "Ответы на отзывы"],
  },
  {
    id: "jobs",
    title: "Вакансии и резюме",
    description: "Полноценная биржа труда с откликами и управлением",
    icon: Briefcase,
    href: "/jobs",
    color: "bg-orange-100 text-orange-700",
    stats: "234 вакансии",
    featured: true,
    submodules: ["Вакансии от ЧОПов", "Поиск вакансий", "Резюме сотрудников"],
  },
  {
    id: "search",
    title: "Поиск и фильтрация",
    description: "Универсальный поиск по всем разделам с умными фильтрами",
    icon: Search,
    href: "/search",
    color: "bg-gray-100 text-gray-700",
    stats: "AI-поиск",
    featured: false,
    submodules: ["Универсальный поиск", "Фильтрация по категориям"],
  },
  {
    id: "profiles",
    title: "Профили и кабинеты",
    description: "Личные кабинеты пользователей и ЧОПов с управлением",
    icon: UserCheck,
    href: "/profile",
    color: "bg-pink-100 text-pink-700",
    stats: "Персонализация",
    featured: false,
    submodules: ["Кабинет пользователя", "Кабинет ЧОПа", "Привязка сотрудников"],
  },
  {
    id: "admin",
    title: "Админ-панель",
    description: "Полное управление платформой, модерация и аналитика",
    icon: Shield,
    href: "/admin",
    color: "bg-slate-100 text-slate-700",
    stats: "Модерация",
    featured: false,
    submodules: ["Управление пользователями", "Управление отзывами", "Редактирование рейтинга"],
  },
  {
    id: "news",
    title: "Новости и статьи",
    description: "Лента новостей отрасли с комментариями и обсуждениями",
    icon: Newspaper,
    href: "/news",
    color: "bg-red-100 text-red-700",
    stats: "Ежедневно",
    featured: false,
    submodules: ["Публикация контента", "Комментарии"],
  },
  {
    id: "forum",
    title: "Форум",
    description: "Тематические разделы для обсуждения отраслевых вопросов",
    icon: Users,
    href: "/forum",
    color: "bg-indigo-100 text-indigo-700",
    stats: "456 тем",
    featured: false,
    submodules: ["Тематические разделы", "Темы и сообщения"],
  },
  {
    id: "map",
    title: "Интерактивная карта",
    description: "Геолокация ЧОПов с фильтрацией и быстрым переходом",
    icon: Map,
    href: "/map",
    color: "bg-teal-100 text-teal-700",
    stats: "Все регионы РФ",
    featured: false,
    submodules: ["Отображение ЧОПов", "Фильтрация на карте"],
  },
  {
    id: "notifications",
    title: "Уведомления и подписки",
    description: "Персональные уведомления и подписки на объекты",
    icon: Bell,
    href: "/notifications",
    color: "bg-yellow-100 text-yellow-700",
    stats: "Smart-alerts",
    featured: false,
    submodules: ["Настройки уведомлений", "Подписка на объекты"],
  },
  {
    id: "support",
    title: "Обратная связь и поддержка",
    description: "Центр помощи, FAQ и система обращений",
    icon: HelpCircle,
    href: "/support",
    color: "bg-emerald-100 text-emerald-700",
    stats: "24/7",
    featured: false,
    submodules: ["Форма обращения", "Центр помощи"],
  },
]

const featuredChops = [
  {
    id: 1,
    name: "Охранное Агентство Авангард",
    rating: 4.8,
    reviewCount: 156,
    location: "Москва",
    verified: true,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%201-pSoYbxeRfeKKzvB9MhQQpkC67sQnGz.jpeg",
    specialization: ["VIP-охрана", "Объекты"],
    employees: 450,
    experience: 15,
    activeJobs: 12,
    recentReview: "Отличная работа, рекомендую!",
  },
  {
    id: 2,
    name: "Щит-Безопасность",
    rating: 4.7,
    reviewCount: 134,
    location: "Москва",
    verified: true,
    logo: "/placeholder.svg?height=200&width=200",
    specialization: ["Мероприятия", "VIP"],
    employees: 180,
    experience: 10,
    activeJobs: 8,
    recentReview: "Профессиональный подход",
  },
  {
    id: 3,
    name: "Барс-Охрана",
    rating: 4.6,
    reviewCount: 89,
    location: "СПб",
    verified: true,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%202-LPcWjTR8tqF96i00nlQSHBA3vXRfbt.jpeg",
    specialization: ["ТЦ", "Склады"],
    employees: 280,
    experience: 8,
    activeJobs: 5,
    recentReview: "Надежная компания",
  },
]

const stats = [
  { label: "ЧОПов в реестре", value: "1,247", icon: Building2, change: "+12%", subtext: "Верифицированных: 1,156" },
  { label: "Проверенных отзывов", value: "8,934", icon: MessageSquare, change: "+5%", subtext: "Средний рейтинг: 4.2" },
  { label: "Активных вакансий", value: "234", icon: Briefcase, change: "+23%", subtext: "Новых за неделю: 54" },
  { label: "Пользователей", value: "15,678", icon: Users, change: "+18%", subtext: "Активных: 12,456" },
]

const recentActivity = [
  {
    type: "review",
    title: "Новый отзыв о компании Авангард",
    time: "2 мин назад",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  {
    type: "job",
    title: "Добавлена вакансия охранника в ТЦ",
    time: "15 мин назад",
    icon: Briefcase,
    color: "text-green-600",
  },
  {
    type: "company",
    title: "Новая компания прошла верификацию",
    time: "1 час назад",
    icon: Shield,
    color: "text-purple-600",
  },
  {
    type: "forum",
    title: "Горячая тема: Новые требования к ЧОП",
    time: "2 часа назад",
    icon: Users,
    color: "text-orange-600",
  },
]

const quickActions = [
  { title: "Найти ЧОП", href: "/chops", icon: Search },
  { title: "Сравнить ЧОПы", href: "/chops/compare", icon: BarChart3 },
  { title: "Разместить вакансию", href: "/jobs/create", icon: Briefcase },
  { title: "Оставить отзыв", href: "/reviews/create", icon: MessageSquare },
  { title: "Подать жалобу", href: "/complaints/create", icon: AlertTriangle },
  { title: "Проверить лицензию", href: "/verification", icon: Shield },
]

export default function HomePage() {
  const { userRole } = useUserRole()

  const getHeroTitle = () => {
    switch (userRole) {
      case "guard":
        return "Найдите работу в сфере охраны"
      case "chop":
        return "Управляйте своей охранной компанией"
      case "moderator":
        return "Модерируйте контент платформы"
      case "admin":
        return "Администрируйте платформу"
      default:
        return "Платформа охранной отрасли России"
    }
  }

  const getHeroDescription = () => {
    switch (userRole) {
      case "guard":
        return "Найдите лучшие вакансии, изучите рейтинги компаний и получите работу мечты в сфере безопасности"
      case "chop":
        return "Размещайте вакансии, управляйте репутацией, находите лучших сотрудников и развивайте бизнес"
      case "moderator":
        return "Обеспечивайте качество контента, модерируйте отзывы и поддерживайте порядок на платформе"
      case "admin":
        return "Полное управление платформой, аналитика, настройки и администрирование всех разделов"
      default:
        return "Поиск охранных компаний, вакансий, рейтинги, отзывы и всё для работы в сфере безопасности"
    }
  }

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobs">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Briefcase className="h-5 w-5 mr-2" />
                Найти работу
              </Button>
            </Link>
            <Link href="/chops">
              <Button variant="outline" size="lg">
                <Building2 className="h-5 w-5 mr-2" />
                Изучить ЧОПы
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="lg">
                <UserCheck className="h-5 w-5 mr-2" />
                Создать резюме
              </Button>
            </Link>
          </div>
        )
      case "chop":
        return (
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobs">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-5 w-5 mr-2" />
                Разместить вакансию
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="outline" size="lg">
                <Star className="h-5 w-5 mr-2" />
                Управлять отзывами
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="lg">
                <Settings className="h-5 w-5 mr-2" />
                Настроить профиль
              </Button>
            </Link>
          </div>
        )
      case "moderator":
        return (
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admin">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Shield className="h-5 w-5 mr-2" />
                Панель модерации
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="outline" size="lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                Модерировать отзывы
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" size="lg">
                <Briefcase className="h-5 w-5 mr-2" />
                Проверить вакансии
              </Button>
            </Link>
          </div>
        )
      case "admin":
        return (
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admin">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Settings className="h-5 w-5 mr-2" />
                Админ-панель
              </Button>
            </Link>
            <Link href="/ratings">
              <Button variant="outline" size="lg">
                <BarChart3 className="h-5 w-5 mr-2" />
                Аналитика
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" size="lg">
                <HelpCircle className="h-5 w-5 mr-2" />
                Управление поддержкой
              </Button>
            </Link>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              {userRole === "guard" && "Платформа для поиска работы"}
              {userRole === "chop" && "Платформа для работодателей"}
              {userRole === "moderator" && "Панель модерации"}
              {userRole === "admin" && "Административная панель"}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {getHeroTitle()}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">{getHeroDescription()}</p>

            {getRoleSpecificActions()}
          </div>

          {/* Role-specific search */}
          {userRole === "guard" && (
            <div className="max-w-4xl mx-auto mb-8">
              <Tabs defaultValue="jobs" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white shadow-lg">
                  <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Вакансии
                  </TabsTrigger>
                  <TabsTrigger value="chops" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    <Building2 className="h-4 w-4 mr-2" />
                    ЧОПы
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="jobs">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Поиск вакансий: должность, зарплата, график..."
                        className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 shadow-lg"
                      />
                    </div>
                    <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700">
                      Найти работу
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="chops">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Поиск ЧОПов по названию, ИНН, лицензии, городу..."
                        className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 shadow-lg"
                      />
                    </div>
                    <Button size="lg" className="h-14 px-8 bg-green-600 hover:bg-green-700">
                      Найти ЧОП
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {userRole === "chop" && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-12 bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Новая вакансия
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Users className="h-4 w-4 mr-2" />
                    Найти сотрудников
                  </Button>
                  <Button variant="outline" className="h-12">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Статистика
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Star className="h-4 w-4 mr-2" />
                    Отзывы
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Stats - адаптированные под роль */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {userRole === "guard" && (
              <>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">234</div>
                    <div className="text-sm text-gray-600">Активных вакансий</div>
                    <div className="text-xs text-green-600 mt-1">+23% за месяц</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Building2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">1,247</div>
                    <div className="text-sm text-gray-600">Проверенных ЧОПов</div>
                    <div className="text-xs text-green-600 mt-1">+12% за месяц</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">45,000 ₽</div>
                    <div className="text-sm text-gray-600">Средняя зарплата</div>
                    <div className="text-xs text-green-600 mt-1">+5% за месяц</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">89%</div>
                    <div className="text-sm text-gray-600">Успешных трудоустройств</div>
                    <div className="text-xs text-green-600 mt-1">+2% за месяц</div>
                  </CardContent>
                </Card>
              </>
            )}

            {userRole === "chop" && (
              <>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Briefcase className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-sm text-gray-600">Ваших вакансий</div>
                    <div className="text-xs text-green-600 mt-1">+3 за месяц</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-600">Откликов получено</div>
                    <div className="text-xs text-green-600 mt-1">+45 за неделю</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">4.8</div>
                    <div className="text-sm text-gray-600">Рейтинг компании</div>
                    <div className="text-xs text-green-600 mt-1">+0.2 за месяц</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">23</div>
                    <div className="text-sm text-gray-600">Новых отзывов</div>
                    <div className="text-xs text-green-600 mt-1">+8 за неделю</div>
                  </CardContent>
                </Card>
              </>
            )}

            {(userRole === "moderator" || userRole === "admin") && (
              <>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">23</div>
                    <div className="text-sm text-gray-600">На модерации</div>
                    <div className="text-xs text-orange-600 mt-1">Требует внимания</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-600">Одобрено сегодня</div>
                    <div className="text-xs text-green-600 mt-1">+12% эффективность</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">15,678</div>
                    <div className="text-sm text-gray-600">Активных пользователей</div>
                    <div className="text-xs text-green-600 mt-1">+18% за месяц</div>
                  </CardContent>
                </Card>
                <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">98.5%</div>
                    <div className="text-sm text-gray-600">Uptime системы</div>
                    <div className="text-xs text-green-600 mt-1">Стабильно</div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Топ охранных компаний</h2>
              <p className="text-xl text-gray-600">Лидеры отрасли по рейтингам и отзывам</p>
            </div>
            <Link href="/ratings">
              <Button variant="outline" className="bg-white shadow-sm hover:shadow-lg">
                Все рейтинги
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredChops.map((chop, index) => (
              <Card
                key={chop.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                        <img
                          src={chop.logo || "/placeholder.svg"}
                          alt={chop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 leading-tight">{chop.name}</h3>
                        <div className="flex items-center gap-2 text-blue-100">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{chop.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-500 text-white border-0">
                        <Award className="h-3 w-3 mr-1" />
                        #1
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(chop.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-2xl text-gray-900">{chop.rating}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">отзывов</div>
                      <div className="font-semibold text-lg text-gray-900">{chop.reviewCount}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{chop.employees} сотр.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">Проверена</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Специализация</div>
                    <div className="flex flex-wrap gap-2">
                      {chop.specialization.map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="text-xs text-gray-500 mb-1">Последний отзыв:</div>
                    <div className="text-sm text-gray-700 italic">"{chop.recentReview}"</div>
                  </div>

                  <Link href={`/catalog/${chop.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-[1.02]">
                      Подробнее о компании
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Recent Activity */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Активность платформы</h3>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center ${activity.color}`}
                        >
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{activity.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/activity">
                  <Button variant="outline" className="w-full">
                    Вся активность
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Platform Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Преимущества платформы</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Проверенная информация</h4>
                    <p className="text-gray-600 text-sm">Все данные о компаниях проходят модерацию и верификацию</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Честные рейтинги</h4>
                    <p className="text-gray-600 text-sm">Независимые рейтинги на основе реальных отзывов клиентов</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Активное сообщество</h4>
                    <p className="text-gray-600 text-sm">Форум профессионалов отрасли для обмена опытом</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Рынок труда</h4>
                    <p className="text-gray-600 text-sm">Актуальные вакансии и резюме в сфере охранной деятельности</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <span className="text-2xl font-bold">Охрана РФ</span>
                  <p className="text-sm text-gray-400">Модульная платформа</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Единая экосистема охранной отрасли России. 12 интегрированных модулей для поиска ЧОПов, работы,
                рейтингов и управления безопасностью.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Подписаться
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Основные модули</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link href="/chops" className="hover:text-white transition-colors">
                    Каталог ЧОПов
                  </Link>
                </li>
                <li>
                  <Link href="/ratings" className="hover:text-white transition-colors">
                    Рейтинги
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-white transition-colors">
                    Отзывы и жалобы
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-white transition-colors">
                    Работа и резюме
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="hover:text-white transition-colors">
                    Карта
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Сервисы</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link href="/forum" className="hover:text-white transition-colors">
                    Форум
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-white transition-colors">
                    Новости
                  </Link>
                </li>
                <li>
                  <Link href="/notifications" className="hover:text-white transition-colors">
                    Уведомления
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-white transition-colors">
                    Поиск
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Поддержка
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Контакты</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@ohrana-rf.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+7 (495) 123-45-67</span>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Центр поддержки
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-white transition-colors">
                    Обратная связь
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Охрана РФ. Модульная платформа охранной отрасли. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
