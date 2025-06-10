"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Users, Shield, BarChart3, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/header"
import { CreateModeratorForm } from "@/components/admin/create-moderator-form"
import { CreateChopForm } from "@/components/admin/create-chop-form"

const stats = [
  {
    title: "Всего пользователей",
    value: "15,678",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "На модерации",
    value: "23",
    change: "-5%",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Одобрено сегодня",
    value: "156",
    change: "+8%",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Активность",
    value: "98.5%",
    change: "+2%",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const moderationQueue = [
  {
    id: 1,
    type: "review",
    title: "Отзыв о компании Авангард",
    author: "Иван Петров",
    time: "5 мин назад",
    priority: "high",
  },
  {
    id: 2,
    type: "job",
    title: "Вакансия охранника в ТЦ",
    author: "ООО Барс-Охрана",
    time: "15 мин назад",
    priority: "medium",
  },
  {
    id: 3,
    type: "company",
    title: "Регистрация новой компании",
    author: "Щит-Безопасность",
    time: "1 час назад",
    priority: "low",
  },
]

const recentActivity = [
  {
    action: "Пользователь зарегистрирован",
    user: "Алексей Сидоров",
    time: "2 мин назад",
    type: "user",
  },
  {
    action: "Отзыв одобрен",
    user: "Модератор Иванов",
    time: "5 мин назад",
    type: "moderation",
  },
  {
    action: "Вакансия опубликована",
    user: "ООО Авангард",
    time: "10 мин назад",
    type: "job",
  },
  {
    action: "Компания верифицирована",
    user: "Админ Петров",
    time: "15 мин назад",
    type: "verification",
  },
]

export default function AdminPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

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
    <>
      <Header />
      <main role="main" className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Админ-панель</h1>
                <p className="text-lg text-gray-600">Управление платформой и модерация контента</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"} mt-1`}>
                        {stat.change} за месяц
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="users">Пользователи</TabsTrigger>
              <TabsTrigger value="moderation">Модерация</TabsTrigger>
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
                    <div className="space-y-4">
                      {moderationQueue.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                            <Button size="sm" variant="outline">
                              Отклонить
                            </Button>
                            <Button size="sm">Одобрить</Button>
                          </div>
                        </div>
                      ))}
                    </div>
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
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.user}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Управление пользователями</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Здесь будет список всех пользователей с возможностью управления.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderation">
              <Card>
                <CardHeader>
                  <CardTitle>Модерация контента</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Здесь будут инструменты для модерации отзывов, вакансий и другого контента.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Управление контентом</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Здесь будут инструменты для управления новостями, статьями и другим контентом.
                  </p>
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
                  <p className="text-gray-600">Здесь будут общие настройки платформы.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
