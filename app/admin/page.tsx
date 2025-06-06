"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  Shield,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash,
  Plus,
  Search,
  Download,
  Upload,
  Bell,
  Activity,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Ban,
  Unlock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/header"

const users = [
  {
    id: 1,
    name: "Иван Петрович Сидоров",
    email: "ivan.sidorov@example.com",
    role: "guard",
    status: "active",
    registeredAt: "2024-01-10",
    lastActivity: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    rating: 4.8,
    violations: 0,
  },
  {
    id: 2,
    name: "ООО Охранное Агентство Авангард",
    email: "info@avangard-security.ru",
    role: "chop",
    status: "active",
    registeredAt: "2023-12-15",
    lastActivity: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    rating: 4.9,
    violations: 0,
  },
  {
    id: 3,
    name: "Сергей Николаевич Козлов",
    email: "sergey.kozlov@example.com",
    role: "guard",
    status: "pending",
    registeredAt: "2024-01-14",
    lastActivity: "2024-01-14",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    rating: 0,
    violations: 0,
  },
  {
    id: 4,
    name: "Анна Владимировна Петрова",
    email: "anna.petrova@example.com",
    role: "moderator",
    status: "active",
    registeredAt: "2023-11-20",
    lastActivity: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    rating: 5.0,
    violations: 0,
  },
  {
    id: 5,
    name: "ЧОП Проблемный",
    email: "problem@chop.ru",
    role: "chop",
    status: "suspended",
    registeredAt: "2023-10-05",
    lastActivity: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    rating: 2.1,
    violations: 3,
  },
]

const systemStats = [
  { name: "Всего пользователей", value: 2456, change: +12, trend: "up" },
  { name: "Активных ЧОПов", value: 145, change: +8, trend: "up" },
  { name: "Охранников", value: 1890, change: +15, trend: "up" },
  { name: "Модераторов", value: 12, change: 0, trend: "neutral" },
]

const recentActivities = [
  {
    id: 1,
    type: "user_registered",
    description: "Новый пользователь зарегистрировался",
    user: "Михаил Иванов",
    timestamp: "5 минут назад",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "violation_reported",
    description: "Нарушение правил платформы",
    user: "ЧОП Сомнительный",
    timestamp: "15 минут назад",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    id: 3,
    type: "content_moderated",
    description: "Контент прошел модерацию",
    user: "Система",
    timestamp: "30 минут назад",
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    id: 4,
    type: "user_verified",
    description: "Пользователь прошел верификацию",
    user: "Елена Сергеева",
    timestamp: "1 час назад",
    icon: Shield,
    color: "text-green-600",
  },
]

const systemSettings = [
  { name: "Автоматическая модерация", enabled: true, description: "Автоматическая проверка контента" },
  { name: "Email уведомления", enabled: true, description: "Отправка уведомлений пользователям" },
  { name: "Регистрация новых пользователей", enabled: true, description: "Разрешить регистрацию" },
  { name: "Публичный доступ к каталогу", enabled: true, description: "Доступ без регистрации" },
  { name: "Система рейтингов", enabled: true, description: "Рейтинги и отзывы" },
  { name: "Геолокация", enabled: false, description: "Отслеживание местоположения" },
]

export default function AdminPage() {
  const { profile } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Проверяем, что пользователь имеет права администратора
  if (!profile || profile.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Доступ запрещен</h2>
            <p className="text-gray-600">У вас нет прав для доступа к панели администратора.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getUserActions = (user) => {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          Просмотр
        </Button>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-1" />
          Редактировать
        </Button>
        {user.status === "pending" && (
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
        {user.status === "active" && (
          <Button variant="outline" size="sm" className="text-orange-600">
            <Ban className="h-4 w-4 mr-1" />
            Заблокировать
          </Button>
        )}
        {user.status === "suspended" && (
          <Button variant="outline" size="sm" className="text-green-600">
            <Unlock className="h-4 w-4 mr-1" />
            Разблокировать
          </Button>
        )}
        <Button variant="outline" size="sm" className="text-red-600">
          <Trash className="h-4 w-4 mr-1" />
          Удалить
        </Button>
      </div>
    )
  }

  const getRoleName = (role) => {
    switch (role) {
      case "guard":
        return "Охранник"
      case "chop":
        return "ЧОП"
      case "moderator":
        return "Модератор"
      case "admin":
        return "Администратор"
      default:
        return "Неизвестно"
    }
  }

  const getStatusName = (status) => {
    switch (status) {
      case "active":
        return "Активен"
      case "pending":
        return "На модерации"
      case "suspended":
        return "Заблокирован"
      case "banned":
        return "Забанен"
      default:
        return "Неизвестно"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "banned":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Панель администратора</h1>
              <p className="text-lg text-gray-600">Полное управление платформой и пользователями</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Экспорт данных
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Импорт
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Settings className="h-4 w-4 mr-2" />
                Настройки системы
              </Button>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    {stat.trend === "up" && <TrendingUp className="h-4 w-4" />}
                    {stat.trend === "down" && <TrendingDown className="h-4 w-4" />}
                    {stat.change !== 0 && (
                      <span>
                        {stat.change > 0 ? "+" : ""}
                        {stat.change}%
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 h-11">
                <TabsTrigger value="users" className="text-sm font-medium">
                  Пользователи
                </TabsTrigger>
                <TabsTrigger value="content" className="text-sm font-medium">
                  Контент
                </TabsTrigger>
                <TabsTrigger value="reports" className="text-sm font-medium">
                  Жалобы
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-sm font-medium">
                  Аналитика
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-sm font-medium">
                  Настройки
                </TabsTrigger>
              </TabsList>

              {/* Управление пользователями */}
              <TabsContent value="users" className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Поиск пользователей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 border-gray-200"
                    />
                  </div>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Роль" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все роли</SelectItem>
                      <SelectItem value="guard">Охранники</SelectItem>
                      <SelectItem value="chop">ЧОПы</SelectItem>
                      <SelectItem value="moderator">Модераторы</SelectItem>
                      <SelectItem value="admin">Администраторы</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="active">Активные</SelectItem>
                      <SelectItem value="pending">На модерации</SelectItem>
                      <SelectItem value="suspended">Заблокированные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users List */}
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="border-0 shadow-sm bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                              <Badge variant="outline">{getRoleName(user.role)}</Badge>
                              <Badge className={getStatusColor(user.status)}>{getStatusName(user.status)}</Badge>
                              {user.verified && (
                                <Badge className="bg-green-100 text-green-800 border-0">Проверен</Badge>
                              )}
                              {user.violations > 0 && (
                                <Badge className="bg-red-100 text-red-800 border-0">{user.violations} нарушений</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span>{user.email}</span>
                              <span>Регистрация: {user.registeredAt}</span>
                              <span>Активность: {user.lastActivity}</span>
                              {user.rating > 0 && (
                                <div className="flex items-center gap-1">
                                  <span>Рейтинг: {user.rating}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">ID: {user.id}</div>
                              {getUserActions(user)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Управление контентом */}
              <TabsContent value="content" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Контент на модерации</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Новости</span>
                          <Badge className="bg-orange-100 text-orange-800">3</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Отзывы</span>
                          <Badge className="bg-orange-100 text-orange-800">12</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Вакансии</span>
                          <Badge className="bg-orange-100 text-orange-800">5</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Темы форума</span>
                          <Badge className="bg-orange-100 text-orange-800">8</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Статистика контента</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Всего новостей:</span>
                          <span className="font-semibold">156</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Всего отзывов:</span>
                          <span className="font-semibold">2,345</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Всего вакансий:</span>
                          <span className="font-semibold">234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Тем на форуме:</span>
                          <span className="font-semibold">1,824</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Жалобы */}
              <TabsContent value="reports" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Активные жалобы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <div>
                            <h4 className="font-medium">Спам в отзывах</h4>
                            <p className="text-sm text-gray-600">Жалоба на: ЧОП Проблемный • 2 часа назад</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">
                          Пользователь размещает фальшивые отзывы о конкурентах...
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Принять меры
                          </Button>
                          <Button variant="outline" size="sm">
                            Отклонить жалобу
                          </Button>
                          <Button variant="outline" size="sm">
                            Связаться с пользователем
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="h-5 w-5 text-orange-500" />
                          <div>
                            <h4 className="font-medium">Неподобающее поведение</h4>
                            <p className="text-sm text-gray-600">Жалоба на: Иван Грубый • 4 часа назад</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">
                          Пользователь использует нецензурную лексику в комментариях...
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            Предупреждение
                          </Button>
                          <Button variant="outline" size="sm">
                            Отклонить жалобу
                          </Button>
                          <Button variant="outline" size="sm">
                            Просмотреть профиль
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Аналитика */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Активность пользователей</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Ежедневная активность</span>
                            <span>78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Еженедельная активность</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Месячная активность</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Рост платформы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Новые пользователи (месяц):</span>
                          <span className="font-semibold text-green-600">+234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Новые ЧОПы (месяц):</span>
                          <span className="font-semibold text-green-600">+12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Удаленные аккаунты:</span>
                          <span className="font-semibold text-red-600">-8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Заблокированные:</span>
                          <span className="font-semibold text-orange-600">5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Качество контента</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Средний рейтинг ЧОПов:</span>
                          <span className="font-semibold">4.6</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Отзывов за месяц:</span>
                          <span className="font-semibold">+456</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Модерированного контента:</span>
                          <span className="font-semibold">89%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Жалоб за месяц:</span>
                          <span className="font-semibold text-orange-600">23</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Настройки системы */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Основные настройки</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {systemSettings.map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{setting.name}</span>
                            <p className="text-sm text-gray-600">{setting.description}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className={setting.enabled ? "text-green-600" : "text-red-600"}
                          >
                            {setting.enabled ? "Включено" : "Отключено"}
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Безопасность</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Двухфакторная аутентификация</span>
                        <Button variant="outline" size="sm" className="text-green-600">
                          Включено
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Логирование действий</span>
                        <Button variant="outline" size="sm" className="text-green-600">
                          Включено
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Автоматическое резервное копирование</span>
                        <Button variant="outline" size="sm" className="text-green-600">
                          Включено
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Защита от DDoS</span>
                        <Button variant="outline" size="sm" className="text-green-600">
                          Включено
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Управление ролями</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Охранники</h4>
                          <p className="text-sm text-gray-600 mb-3">Базовые права пользователя</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Настроить права
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">ЧОПы</h4>
                          <p className="text-sm text-gray-600 mb-3">Размещение вакансий и управление</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Настроить права
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Модераторы</h4>
                          <p className="text-sm text-gray-600 mb-3">Модерация контента</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Настроить права
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Администраторы</h4>
                          <p className="text-sm text-gray-600 mb-3">Полные права</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Настроить права
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Последняя активность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <IconComponent className={`h-5 w-5 ${activity.color} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Состояние системы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Сервер</span>
                  <Badge className="bg-green-100 text-green-800">Онлайн</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">База данных</span>
                  <Badge className="bg-green-100 text-green-800">Онлайн</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email сервис</span>
                  <Badge className="bg-green-100 text-green-800">Онлайн</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Файловое хранилище</span>
                  <Badge className="bg-green-100 text-green-800">Онлайн</Badge>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Использование CPU</span>
                    <span>23%</span>
                  </div>
                  <Progress value={23} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm mb-1">
                    <span>Использование RAM</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать пользователя
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Отправить уведомление
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Экспорт отчета
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки системы
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
