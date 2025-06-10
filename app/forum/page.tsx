"use client"

import { useState, useEffect } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Pin,
  Clock,
  Eye,
  Search,
  Shield,
  Bell,
  Award,
  ArrowRight,
  Plus,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
  AlertTriangle,
  Settings,
  ThumbsUp,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import { useRouter } from "next/navigation"

interface ForumCategory {
  id: number
  name: string
  description: string
  topics: number
  posts: number
  icon: string
  color: string
  lastPost?: {
    title: string
    author: string
    time: string
    avatar: string
  } | null
}

interface ForumTopic {
  id: number
  title: string
  author: string
  authorAvatar: string
  replies: number
  views: number
  lastReply: string
  isPinned: boolean
  isHot: boolean
  status: string
}

const activeUsers = [
  { name: "Михаил К.", posts: 234, reputation: 1250, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Елена С.", posts: 189, reputation: 980, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Дмитрий П.", posts: 156, reputation: 750, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Анна В.", posts: 142, reputation: 680, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Сергей Н.", posts: 128, reputation: 590, avatar: "/placeholder.svg?height=40&width=40" },
]

export default function ForumPage() {
  const { userRole } = useUserRole()
  const [activeTab, setActiveTab] = useState("categories")
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchForumData()
  }, [])

  const fetchForumData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Загружаем категории
      try {
        const categoriesResponse = await fetch("/api/forum/categories")
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          setCategories(categoriesData.categories || [])
        } else {
          console.log("Categories API returned error, using fallback")
          setCategories([])
        }
      } catch (categoriesError) {
        console.log("Failed to load categories:", categoriesError)
        setCategories([])
      }

      // Загружаем последние темы
      try {
        const topicsResponse = await fetch("/api/forum/topics?limit=10")
        if (topicsResponse.ok) {
          const topicsData = await topicsResponse.json()
          setTopics(topicsData.topics || [])
        } else {
          console.log("Topics API returned error, using fallback")
          setTopics([])
        }
      } catch (topicsError) {
        console.log("Failed to load topics:", topicsError)
        setTopics([])
      }
    } catch (error) {
      console.error("Ошибка загрузки данных форума:", error)
      setError("Не удалось загрузить данные форума")
    } finally {
      setLoading(false)
    }
  }

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Форум охранников"
      case "chop":
        return "Форум для ЧОПов"
      case "moderator":
        return "Модерация форума"
      case "admin":
        return "Управление форумом"
      default:
        return "Форум"
    }
  }

  const getPageDescription = () => {
    switch (userRole) {
      case "guard":
        return "Обсуждайте вопросы работы, делитесь опытом и получайте советы от коллег"
      case "chop":
        return "Общайтесь с клиентами, отвечайте на вопросы и улучшайте репутацию компании"
      case "moderator":
        return "Модерируйте темы и сообщения, следите за соблюдением правил форума"
      case "admin":
        return "Полное управление форумом, категориями и пользователями"
      default:
        return "Обсуждайте вопросы безопасности, делитесь опытом и получайте экспертные советы"
    }
  }

  const getTabsForRole = () => {
    switch (userRole) {
      case "guard":
      case "chop":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-11">
            <TabsTrigger value="categories" className="text-sm font-medium">
              Разделы
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="hot" className="text-sm font-medium">
              Популярные
            </TabsTrigger>
          </TabsList>
        )
      case "moderator":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-4 h-11">
            <TabsTrigger value="moderation" className="text-sm font-medium">
              Модерация
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-sm font-medium">
              Разделы
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm font-medium">
              Жалобы
            </TabsTrigger>
          </TabsList>
        )
      case "admin":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-5 h-11">
            <TabsTrigger value="moderation" className="text-sm font-medium">
              Модерация
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-sm font-medium">
              Разделы
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm font-medium">
              Жалобы
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm font-medium">
              Настройки
            </TabsTrigger>
          </TabsList>
        )
      default:
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-11">
            <TabsTrigger value="categories" className="text-sm font-medium">
              Разделы
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="hot" className="text-sm font-medium">
              Популярные
            </TabsTrigger>
          </TabsList>
        )
    }
  }

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case "guard":
        return (
          <Button className="bg-gray-900 hover:bg-gray-800 ml-4 hidden md:flex text-sm" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Новая тема
          </Button>
        )
      case "chop":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bell className="h-4 w-4 mr-2" />
              Подписки
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800 hidden md:flex text-sm" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Новая тема
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-800 border-0">На модерации: 0</Badge>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Shield className="h-4 w-4 mr-2" />
              Правила
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Настройки форума
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 hidden md:flex text-sm" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Новый раздел
            </Button>
          </div>
        )
      default:
        return (
          <Button className="bg-gray-900 hover:bg-gray-800 ml-4 hidden md:flex text-sm" size="sm">
            Новая тема
          </Button>
        )
    }
  }

  const getTopicActions = (topic: ForumTopic) => {
    switch (userRole) {
      case "guard":
      case "chop":
        return null
      case "moderator":
        return (
          <div className="flex gap-2 mt-2">
            {topic.status === "pending" ? (
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
            ) : (
              <>
                <Button variant="outline" size="sm">
                  <Pin className="h-4 w-4 mr-1" />
                  {topic.isPinned ? "Открепить" : "Закрепить"}
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Скрыть
                </Button>
              </>
            )}
          </div>
        )
      case "admin":
        return (
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm">
              <Pin className="h-4 w-4 mr-1" />
              {topic.isPinned ? "Открепить" : "Закрепить"}
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              <Trash className="h-4 w-4 mr-1" />
              Удалить
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка форума...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchForumData}>Попробовать снова</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main role="main" className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Page Content */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{getPageTitle()}</h1>
                <p className="text-lg text-gray-600 max-w-2xl">{getPageDescription()}</p>
              </div>
              {getRoleSpecificActions()}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs
                defaultValue={userRole === "moderator" || userRole === "admin" ? "moderation" : "categories"}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {getTabsForRole()}
                </div>

                {/* Модерация - только для модераторов и админов */}
                {(userRole === "moderator" || userRole === "admin") && (
                  <TabsContent value="moderation" className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Темы на модерации</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Нет тем на модерации</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Сообщения на модерации</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Нет сообщений на модерации</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}

                {/* Разделы форума */}
                <TabsContent value="categories" className="space-y-6">
                  <div className="grid gap-6">
                    {categories.length > 0 ? (
                      categories.map((category) => {
                        // Определяем иконку на основе строкового представления
                        let IconComponent = MessageSquare
                        if (category.icon === "Shield") IconComponent = Shield
                        else if (category.icon === "ThumbsUp") IconComponent = ThumbsUp
                        else if (category.icon === "Filter") IconComponent = Filter
                        else if (category.icon === "Bell") IconComponent = Bell

                        return (
                          <Card
                            key={category.id}
                            className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer"
                            onClick={() => router.push(`/forum/${category.id}`)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${category.color} flex-shrink-0`}>
                                  <IconComponent className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {category.name}
                                    </h3>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                  </div>
                                  <p className="text-gray-600 mb-4">{category.description}</p>
                                  <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="h-4 w-4" />
                                      <span>{category.topics} тем</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      <span>{category.posts} сообщений</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block text-right">
                                  {category.lastPost ? (
                                    <>
                                      <div className="text-sm font-medium text-gray-900 mb-1">
                                        {category.lastPost.title}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {category.lastPost.author} • {category.lastPost.time}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-sm text-gray-500">Нет сообщений</div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Форум настраивается</h3>
                        <p className="text-gray-500 mb-4">Разделы форума будут доступны после настройки базы данных</p>
                        {userRole === "admin" && (
                          <Button onClick={fetchForumData}>
                            <Settings className="h-4 w-4 mr-2" />
                            Обновить
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Последние темы */}
                <TabsContent value="recent" className="space-y-6">
                  <div className="space-y-4">
                    {topics.length > 0 ? (
                      topics.map((topic) => (
                        <Card
                          key={topic.id}
                          className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer"
                          onClick={() => router.push(`/forum/topic/${topic.id}`)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 flex-shrink-0">
                                <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} alt={topic.author} />
                                <AvatarFallback>
                                  {(topic.author || "U")
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  {topic.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                                  {topic.isHot && <TrendingUp className="h-4 w-4 text-red-500" />}
                                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {topic.title}
                                  </h3>
                                  {(userRole === "moderator" || userRole === "admin") && (
                                    <Badge
                                      className={
                                        topic.status === "active"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-orange-100 text-orange-800"
                                      }
                                    >
                                      {topic.status === "active" ? "Активна" : "На модерации"}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                  <span>Автор: {topic.author}</span>
                                  <div className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{topic.replies}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{topic.views}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{topic.lastReply}</span>
                                  </div>
                                </div>
                                {getTopicActions(topic)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет тем</h3>
                        <p className="text-gray-500 mb-4">Станьте первым, кто создаст тему для обсуждения</p>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Создать тему
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Популярные темы */}
                <TabsContent value="hot" className="space-y-6">
                  <div className="space-y-4">
                    {topics.filter((topic) => topic.isHot).length > 0 ? (
                      topics
                        .filter((topic) => topic.isHot)
                        .map((topic) => (
                          <Card
                            key={topic.id}
                            className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 flex-shrink-0">
                                  <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} alt={topic.author} />
                                  <AvatarFallback>
                                    {(topic.author || "U")
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="h-4 w-4 text-red-500" />
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {topic.title}
                                    </h3>
                                    <Badge className="bg-red-100 text-red-800 border-0">Популярно</Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>Автор: {topic.author}</span>
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="h-4 w-4" />
                                      <span>{topic.replies}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Eye className="h-4 w-4" />
                                      <span>{topic.views}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{topic.lastReply}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <div className="text-center py-12">
                        <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Нет популярных тем</h3>
                        <p className="text-gray-500">Популярные темы появятся после активного обсуждения</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Жалобы - только для модераторов и админов */}
                {(userRole === "moderator" || userRole === "admin") && (
                  <TabsContent value="reports" className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Жалобы пользователей</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Нет активных жалоб</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}

                {/* Настройки - только для админов */}
                {userRole === "admin" && (
                  <TabsContent value="settings" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle>Настройки форума</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Модерация новых тем</span>
                            <Button variant="outline" size="sm">
                              Включено
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Автоматическое удаление спама</span>
                            <Button variant="outline" size="sm">
                              Выключено
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Уведомления модераторам</span>
                            <Button variant="outline" size="sm">
                              Включено
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle>Статистика форума</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between">
                            <span>Всего тем:</span>
                            <span className="font-semibold">{topics.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Всего сообщений:</span>
                            <span className="font-semibold">
                              {topics.reduce((sum, topic) => sum + topic.replies, 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Активных категорий:</span>
                            <span className="font-semibold">{categories.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>На модерации:</span>
                            <span className="font-semibold text-orange-600">0</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Search */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Поиск по форуму..." className="pl-9 border-gray-200" />
                  </div>
                </CardContent>
              </Card>

              {/* Forum Stats */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Статистика форума</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Всего тем:</span>
                    <span className="font-semibold">{topics.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Сообщений:</span>
                    <span className="font-semibold">{topics.reduce((sum, topic) => sum + topic.replies, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Категорий:</span>
                    <span className="font-semibold">{categories.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Онлайн:</span>
                    <span className="font-semibold text-green-600">1</span>
                  </div>
                </CardContent>
              </Card>

              {/* Active Users */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Активные участники</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeUsers.map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.posts} сообщений</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-gray-600">{user.reputation}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
