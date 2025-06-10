"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Users,
  Shield,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Building2,
  MessageSquare,
  Settings,
  Newspaper,
  User,
  Briefcase,
  Map,
  Bell,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/header"
import { CreateModeratorForm } from "@/components/admin/create-moderator-form"
import { CreateChopForm } from "@/components/admin/create-chop-form"
import { createClient } from "@/lib/supabase/client"

const stats = [
  {
    title: "Всего пользователей",
    value: "0",
    change: "0%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    loading: true,
  },
  {
    title: "На модерации",
    value: "0",
    change: "0%",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    loading: true,
  },
  {
    title: "Одобрено сегодня",
    value: "0",
    change: "0%",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    loading: true,
  },
  {
    title: "Активность",
    value: "0%",
    change: "0%",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    loading: true,
  },
]

const adminSections = [
  {
    id: "users",
    title: "Пользователи",
    icon: Users,
    description: "Управление пользователями и ролями",
    link: "/admin/users",
  },
  {
    id: "chops",
    title: "ЧОПы",
    icon: Building2,
    description: "Управление охранными предприятиями",
    link: "/admin/chops",
  },
  {
    id: "jobs",
    title: "Вакансии",
    icon: Briefcase,
    description: "Управление вакансиями и заявками",
    link: "/admin/jobs",
  },
  {
    id: "news",
    title: "Новости",
    icon: Newspaper,
    description: "Управление новостями и категориями",
    link: "/news",
  },
  {
    id: "forum",
    title: "Форум",
    icon: MessageSquare,
    description: "Управление разделами и темами форума",
    link: "/forum",
  },
  {
    id: "map",
    title: "Карта",
    icon: Map,
    description: "Управление картой объектов",
    link: "/map",
  },
  {
    id: "requests",
    title: "Заявки",
    icon: Bell,
    description: "Управление заявками на подключение",
    link: "/admin/requests",
  },
  {
    id: "support",
    title: "Поддержка",
    icon: HelpCircle,
    description: "Управление обращениями в поддержку",
    link: "/support",
  },
  {
    id: "settings",
    title: "Настройки",
    icon: Settings,
    description: "Настройки платформы",
    link: "/admin/settings",
  },
]

export default function AdminDashboardPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [statsData, setStatsData] = useState(stats)
  const [moderationQueue, setModerationQueue] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading) {
      if (!user) {
        router.push("/auth/sign-in")
        return
      }

      if (profile?.role !== "admin") {
        router.push("/")
        return
      }
    }
  }, [user, profile, loading, mounted, router])

  useEffect(() => {
    const fetchStats = async () => {
      if (!user || profile?.role !== "admin") return

      try {
        // Получаем статистику по пользователям
        const { count: usersCount, error: usersError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })

        // Получаем статистику по заявкам на модерации
        const { data: moderationData, error: moderationError } = await supabase
          .from("chop_connection_requests")
          .select("*")
          .eq("status", "pending")

        // Получаем статистику по одобренным сегодня заявкам
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const { data: approvedToday, error: approvedError } = await supabase
          .from("chop_connection_requests")
          .select("*")
          .eq("status", "approved")
          .gte("reviewed_at", today.toISOString())

        // Обновляем статистику
        const newStats = [...statsData]

        if (!usersError) {
          newStats[0] = {
            ...newStats[0],
            value: usersCount.toString(),
            change: "+12%", // В реальном приложении здесь будет расчет изменения
            loading: false,
          }
        }

        if (!moderationError) {
          newStats[1] = {
            ...newStats[1],
            value: moderationData.length.toString(),
            change: "-5%", // В реальном приложении здесь будет расчет изменения
            loading: false,
          }
        }

        if (!approvedError) {
          newStats[2] = {
            ...newStats[2],
            value: approvedToday.length.toString(),
            change: "+8%", // В реальном приложении здесь будет расчет изменения
            loading: false,
          }
        }

        // Активность (в реальном приложении здесь будет расчет на основе реальных данных)
        newStats[3] = {
          ...newStats[3],
          value: "98.5%",
          change: "+2%",
          loading: false,
        }

        setStatsData(newStats)

        // Загружаем очередь модерации
        const { data: queueData, error: queueError } = await supabase
          .from("chop_connection_requests")
          .select(`
            id,
            user_id,
            chop_id,
            new_chop_name,
            applicant_position,
            status,
            created_at,
            profiles!inner(full_name, email)
          `)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(5)

        if (!queueError && queueData) {
          const formattedQueue = queueData.map((item) => ({
            id: item.id,
            type: item.chop_id ? "connection" : "registration",
            title: item.chop_id ? `Заявка на подключение к ЧОП` : `Регистрация нового ЧОП ${item.new_chop_name}`,
            author: item.profiles.full_name || item.profiles.email,
            time: new Date(item.created_at).toLocaleString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "numeric",
            }),
            priority: "high",
          }))
          setModerationQueue(formattedQueue)
        }

        // Загружаем последние действия
        const { data: activityData, error: activityError } = await supabase
          .from("profiles")
          .select("id, full_name, email, created_at, role")
          .order("created_at", { ascending: false })
          .limit(5)

        if (!activityError && activityData) {
          const formattedActivity = activityData.map((item) => ({
            action: "Пользователь зарегистрирован",
            user: item.full_name || item.email,
            time: new Date(item.created_at).toLocaleString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "numeric",
            }),
            type: "user",
            role: item.role,
          }))
          setRecentActivity(formattedActivity)
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error)
      }
    }

    if (mounted && user && profile?.role === "admin") {
      fetchStats()
    }
  }, [mounted, user, profile, supabase])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || profile?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Админ-панель</h1>
                <p className="text-lg text-gray-600">Управление платформой и модерация контента</p>
              </div>
            </div>

            <div className="md:hidden">
              <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block">
            <div className="space-y-2 sticky top-20">
              {adminSections.map((section) => (
                <Link href={section.link} key={section.id}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{section.title}</h3>
                      <p className="text-xs text-gray-500">{section.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-white p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Меню администратора</h2>
                <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X />
                </Button>
              </div>
              <div className="space-y-2">
                {adminSections.map((section) => (
                  <Link href={section.link} key={section.id} onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <section.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{section.title}</h3>
                        <p className="text-xs text-gray-500">{section.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        {stat.loading ? (
                          <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                        ) : (
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        )}
                        {stat.loading ? (
                          <div className="h-4 w-12 bg-gray-200 animate-pulse rounded mt-1"></div>
                        ) : (
                          <p
                            className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"} mt-1`}
                          >
                            {stat.change} за месяц
                          </p>
                        )}
                      </div>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Dashboard Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-white shadow-sm">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="moderation">Модерация</TabsTrigger>
                <TabsTrigger value="users">Пользователи</TabsTrigger>
                <TabsTrigger value="content">Контент</TabsTrigger>
                <TabsTrigger value="create">Создание</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Moderation Queue */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        Очередь модерации
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {moderationQueue.length > 0 ? (
                        <div className="space-y-4">
                          {moderationQueue.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                                  <Badge
                                    variant={
                                      item.priority === "high"
                                        ? "destructive"
                                        : item.priority === "medium"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {item.priority === "high"
                                      ? "Высокий"
                                      : item.priority === "medium"
                                        ? "Средний"
                                        : "Низкий"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{item.author}</p>
                                <p className="text-xs text-gray-500">{item.time}</p>
                              </div>
                              <div className="flex gap-2">
                                <Link href={`/admin/requests`}>
                                  <Button size="sm">Просмотреть</Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                          <p className="text-gray-600">Нет заявок на модерации</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        Последняя активность
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {recentActivity.length > 0 ? (
                        <div className="space-y-4">
                          {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm text-gray-600">{activity.user}</p>
                                  {activity.role && (
                                    <Badge variant="outline" className="text-xs">
                                      {activity.role === "admin"
                                        ? "Администратор"
                                        : activity.role === "moderator"
                                          ? "Модератор"
                                          : activity.role === "chop"
                                            ? "ЧОП"
                                            : "Пользователь"}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500">{activity.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600">Нет недавней активности</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* System Health */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      Состояние системы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Производительность</span>
                          <span className="text-sm text-gray-600">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Использование памяти</span>
                          <span className="text-sm text-gray-600">67%</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Активные пользователи</span>
                          <span className="text-sm text-gray-600">1,234</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="moderation">
                <Card>
                  <CardHeader>
                    <CardTitle>Модерация контента</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/admin/requests">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                            <Building2 className="h-5 w-5 text-orange-600" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Заявки на подключение ЧОП</h3>
                          <p className="text-sm text-gray-600">Модерация заявок на подключение к ЧОПам</p>
                        </div>
                      </Link>

                      <Link href="/news">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                            <Newspaper className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Модерация новостей</h3>
                          <p className="text-sm text-gray-600">Управление новостями и публикациями</p>
                        </div>
                      </Link>

                      <Link href="/forum">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                            <MessageSquare className="h-5 w-5 text-purple-600" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Модерация форума</h3>
                          <p className="text-sm text-gray-600">Управление темами и сообщениями форума</p>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление пользователями</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/admin/users">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Все пользователи</h3>
                          <p className="text-sm text-gray-600">Управление пользователями платформы</p>
                        </div>
                      </Link>

                      <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Модераторы</h3>
                        <p className="text-sm text-gray-600">Управление модераторами платформы</p>
                      </div>

                      <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                          <Shield className="h-5 w-5 text-red-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Администраторы</h3>
                        <p className="text-sm text-gray-600">Управление администраторами платформы</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление контентом</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/news">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                            <Newspaper className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Новости</h3>
                          <p className="text-sm text-gray-600">Управление новостями и категориями</p>
                        </div>
                      </Link>

                      <Link href="/forum">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                            <MessageSquare className="h-5 w-5 text-purple-600" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Форум</h3>
                          <p className="text-sm text-gray-600">Управление разделами и темами форума</p>
                        </div>
                      </Link>

                      <Link href="/jobs">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                            <Briefcase className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Вакансии</h3>
                          <p className="text-sm text-gray-600">Управление вакансиями и заявками</p>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <CreateModeratorForm />
                  <CreateChopForm />
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки системы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                          <Settings className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Общие настройки</h3>
                        <p className="text-sm text-gray-600">Основные настройки платформы</p>
                      </div>

                      <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                          <Shield className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Безопасность</h3>
                        <p className="text-sm text-gray-600">Настройки безопасности и доступа</p>
                      </div>

                      <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                          <Bell className="h-5 w-5 text-gray-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Уведомления</h3>
                        <p className="text-sm text-gray-600">Настройки уведомлений и рассылок</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
