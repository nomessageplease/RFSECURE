"use client"

import { useMemo } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import {
  Search,
  Shield,
  Star,
  Users,
  TrendingUp,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Header from "@/components/header"
import { ChopCard } from "@/components/chop-card"
import { ModulesSection } from "@/components/modules/modules-section"
import { featuredChops } from "@/data/featured-chops"

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
  const { role } = useUserRole()

  const heroTitle = useMemo(() => {
    switch (role) {
      case "admin":
        return "Панель управления платформой"
      case "chop":
        return "Управление вашим ЧОПом"
      case "user":
        return "Найдите надежную охрану"
      default:
        return "Добро пожаловать в RFSECURE"
    }
  }, [role])

  const heroDescription = useMemo(() => {
    switch (role) {
      case "admin":
        return "Полный контроль над платформой, модерация и аналитика"
      case "chop":
        return "Управляйте рейтингом, отзывами и вакансиями"
      case "user":
        return "Выберите надежную охрану из проверенных ЧОПов"
      default:
        return "Платформа для поиска и управления охранными услугами"
    }
  }, [role])

  const roleSpecificActions = useMemo(() => {
    switch (role) {
      case "admin":
        return [
          { text: "Модерация", href: "/admin/moderation" },
          { text: "Аналитика", href: "/admin/analytics" },
        ]
      case "chop":
        return [
          { text: "Управление ЧОПом", href: "/profile/chop" },
          { text: "Вакансии", href: "/jobs" },
        ]
      case "user":
        return [
          { text: "Найти ЧОП", href: "/search" },
          { text: "Оставить отзыв", href: "/reviews/new" },
        ]
      default:
        return [
          { text: "Регистрация", href: "/auth/register" },
          { text: "Вход", href: "/auth/login" },
        ]
    }
  }, [role])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {heroTitle}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                {heroDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {roleSpecificActions.map((action) => (
                  <Button key={action.href} asChild>
                    <a href={action.href}>{action.text}</a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ModulesSection />

        <section className="py-12">
          <div className="container">
            <h2 className="mb-8 text-3xl font-bold">Популярные ЧОПы</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredChops.map((chop) => (
                <ChopCard key={chop.id} {...chop} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
