"use client"

import { useState } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import {
  Calendar,
  Eye,
  MessageSquare,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  User,
  Tag,
  Search,
  Plus,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Settings,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"

const newsCategories = [
  { id: "all", name: "Все новости", count: 156 },
  { id: "industry", name: "Отрасль", count: 45 },
  { id: "legislation", name: "Законодательство", count: 32 },
  { id: "technology", name: "Технологии", count: 28 },
  { id: "companies", name: "Компании", count: 51 },
]

const news = [
  {
    id: 1,
    title: "Новые требования к лицензированию частных охранных организаций",
    excerpt:
      "Росгвардия утвердила новые требования к получению лицензий на осуществление частной охранной деятельности...",
    content: "Полный текст новости с подробным описанием изменений в законодательстве...",
    category: "legislation",
    author: "Редакция",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-15T10:00:00Z",
    views: 1234,
    comments: 23,
    likes: 45,
    image: "/placeholder.svg?height=200&width=400",
    tags: ["лицензирование", "росгвардия", "ЧОП"],
    featured: true,
    status: "published",
  },
  {
    id: 2,
    title: "Рынок охранных услуг показал рост на 15% в 2024 году",
    excerpt: "Аналитики отмечают значительный рост рынка частных охранных услуг в России...",
    content: "Подробный анализ рынка охранных услуг за 2024 год...",
    category: "industry",
    author: "Аналитический отдел",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-14T14:30:00Z",
    views: 892,
    comments: 18,
    likes: 32,
    image: "/placeholder.svg?height=200&width=400",
    tags: ["рынок", "статистика", "рост"],
    featured: false,
    status: "published",
  },
  {
    id: 3,
    title: "Внедрение ИИ в системы видеонаблюдения: новые возможности",
    excerpt: "Искусственный интеллект революционизирует сферу безопасности и видеонаблюдения...",
    content: "Обзор новых технологий ИИ в сфере безопасности...",
    category: "technology",
    author: "Технический эксперт",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-13T09:15:00Z",
    views: 567,
    comments: 12,
    likes: 28,
    image: "/placeholder.svg?height=200&width=400",
    tags: ["ИИ", "видеонаблюдение", "технологии"],
    featured: false,
    status: "draft",
  },
  {
    id: 4,
    title: "Крупнейшая охранная компания России расширяет географию",
    excerpt: "Компания 'Альфа-Безопасность' объявила о планах открытия новых филиалов в регионах...",
    content: "Подробности о планах расширения компании...",
    category: "companies",
    author: "Корреспондент",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-12T16:45:00Z",
    views: 445,
    comments: 8,
    likes: 19,
    image: "/placeholder.svg?height=200&width=400",
    tags: ["компании", "расширение", "регионы"],
    featured: false,
    status: "pending",
  },
]

const trendingTopics = [
  { name: "Лицензирование ЧОП", count: 156 },
  { name: "Видеонаблюдение", count: 89 },
  { name: "Охрана объектов", count: 67 },
  { name: "Новые технологии", count: 45 },
  { name: "Законодательство", count: 34 },
]

export default function NewsPage() {
  const { userRole } = useUserRole()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Новости отрасли"
      case "chop":
        return "Новости и аналитика"
      case "moderator":
        return "Модерация новостей"
      case "admin":
        return "Управление новостями"
      default:
        return "Новости"
    }
  }

  const getPageDescription = () => {
    switch (userRole) {
      case "guard":
        return "Актуальные новости сферы безопасности и охранной деятельности"
      case "chop":
        return "Следите за трендами рынка и изменениями в законодательстве"
      case "moderator":
        return "Модерируйте новости и следите за качеством контента"
      case "admin":
        return "Полное управление новостным разделом и контентом"
      default:
        return "Актуальные новости сферы безопасности и охранной деятельности"
    }
  }

  const getTabsForRole = () => {
    switch (userRole) {
      case "guard":
      case "chop":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-11">
            <TabsTrigger value="latest" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="featured" className="text-sm font-medium">
              Рекомендуемые
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-sm font-medium">
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
            <TabsTrigger value="latest" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="drafts" className="text-sm font-medium">
              Черновики
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Аналитика
            </TabsTrigger>
          </TabsList>
        )
      case "admin":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-5 h-11">
            <TabsTrigger value="moderation" className="text-sm font-medium">
              Модерация
            </TabsTrigger>
            <TabsTrigger value="latest" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="drafts" className="text-sm font-medium">
              Черновики
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm font-medium">
              Настройки
            </TabsTrigger>
          </TabsList>
        )
      default:
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-11">
            <TabsTrigger value="latest" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="featured" className="text-sm font-medium">
              Рекомендуемые
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-sm font-medium">
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bookmark className="h-4 w-4 mr-2" />
              Сохраненные
            </Button>
          </div>
        )
      case "chop":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <BarChart3 className="h-4 w-4 mr-2" />
              Аналитика
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bookmark className="h-4 w-4 mr-2" />
              Сохраненные
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-800 border-0">На модерации: 3</Badge>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Правила
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 hidden md:flex text-sm" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать новость
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Создание новости</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="news-title">Заголовок</Label>
                    <Input id="news-title" placeholder="Введите заголовок новости" />
                  </div>
                  <div>
                    <Label htmlFor="news-category">Категория</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="industry">Отрасль</SelectItem>
                        <SelectItem value="legislation">Законодательство</SelectItem>
                        <SelectItem value="technology">Технологии</SelectItem>
                        <SelectItem value="companies">Компании</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="news-excerpt">Краткое описание</Label>
                    <Textarea id="news-excerpt" placeholder="Краткое описание новости..." />
                  </div>
                  <div>
                    <Label htmlFor="news-content">Содержание</Label>
                    <Textarea id="news-content" placeholder="Полный текст новости..." className="min-h-32" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Сохранить как черновик</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Опубликовать</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const getNewsActions = (newsItem) => {
    switch (userRole) {
      case "guard":
      case "chop":
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4 mr-1" />
              Сохранить
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Поделиться
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex items-center gap-2">
            {newsItem.status === "pending" ? (
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
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Редактировать
              </Button>
            )}
          </div>
        )
      case "admin":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-1" />
              Статистика
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

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    // Для модераторов и админов показываем все новости
    if (userRole === "moderator" || userRole === "admin") {
      return matchesSearch && matchesCategory
    }

    // Для обычных пользователей показываем только опубликованные
    return matchesSearch && matchesCategory && item.status === "published"
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
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
              defaultValue={userRole === "moderator" || userRole === "admin" ? "moderation" : "latest"}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">{getTabsForRole()}</div>

              {/* Модерация - только для модераторов и админов */}
              {(userRole === "moderator" || userRole === "admin") && (
                <TabsContent value="moderation" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Новости на модерации</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {news
                          .filter((item) => item.status === "pending")
                          .map((newsItem) => (
                            <div key={newsItem.id} className="p-4 border rounded-lg">
                              <div className="flex items-start gap-4">
                                <img
                                  src={newsItem.image || "/placeholder.svg"}
                                  alt={newsItem.title}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium mb-2">{newsItem.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{newsItem.excerpt}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <span>Автор: {newsItem.author}</span>
                                    <span>{formatDate(newsItem.publishedAt)}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      Одобрить
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600">
                                      Отклонить
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Просмотреть
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Последние новости */}
              <TabsContent value="latest" className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Поиск новостей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 border-gray-200"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      {newsCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Featured News */}
                {filteredNews.filter((item) => item.featured).length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Главные новости</h2>
                    <div className="grid gap-6">
                      {filteredNews
                        .filter((item) => item.featured)
                        .map((newsItem) => (
                          <Card
                            key={newsItem.id}
                            className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer overflow-hidden"
                          >
                            <CardContent className="p-0">
                              <div className="md:flex">
                                <div className="md:w-1/3">
                                  <img
                                    src={newsItem.image || "/placeholder.svg"}
                                    alt={newsItem.title}
                                    className="w-full h-48 md:h-full object-cover"
                                  />
                                </div>
                                <div className="md:w-2/3 p-6">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Badge className="bg-red-100 text-red-800 border-0">Главная новость</Badge>
                                    <Badge variant="outline">
                                      {newsCategories.find((cat) => cat.id === newsItem.category)?.name}
                                    </Badge>
                                    {(userRole === "moderator" || userRole === "admin") && (
                                      <Badge
                                        className={
                                          newsItem.status === "published"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-orange-100 text-orange-800"
                                        }
                                      >
                                        {newsItem.status === "published" ? "Опубликовано" : "На модерации"}
                                      </Badge>
                                    )}
                                  </div>
                                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                                    {newsItem.title}
                                  </h3>
                                  <p className="text-gray-600 mb-4 leading-relaxed">{newsItem.excerpt}</p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarImage
                                            src={newsItem.authorAvatar || "/placeholder.svg"}
                                            alt={newsItem.author}
                                          />
                                          <AvatarFallback>
                                            {newsItem.author
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span>{newsItem.author}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(newsItem.publishedAt)}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{newsItem.views}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{newsItem.comments}</span>
                                      </div>
                                    </div>
                                    {getNewsActions(newsItem)}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}

                {/* Regular News */}
                <div className="grid gap-6">
                  {filteredNews
                    .filter((item) => !item.featured)
                    .map((newsItem) => (
                      <Card
                        key={newsItem.id}
                        className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="md:flex">
                            <div className="md:w-1/4">
                              <img
                                src={newsItem.image || "/placeholder.svg"}
                                alt={newsItem.title}
                                className="w-full h-48 md:h-32 object-cover"
                              />
                            </div>
                            <div className="md:w-3/4 p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">
                                  {newsCategories.find((cat) => cat.id === newsItem.category)?.name}
                                </Badge>
                                {(userRole === "moderator" || userRole === "admin") && (
                                  <Badge
                                    className={
                                      newsItem.status === "published"
                                        ? "bg-green-100 text-green-800"
                                        : newsItem.status === "pending"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {newsItem.status === "published"
                                      ? "Опубликовано"
                                      : newsItem.status === "pending"
                                        ? "На модерации"
                                        : "Черновик"}
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                {newsItem.title}
                              </h3>
                              <p className="text-gray-600 mb-3 text-sm leading-relaxed">{newsItem.excerpt}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>{newsItem.author}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatDate(newsItem.publishedAt)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{newsItem.views}</span>
                                  </div>
                                </div>
                                {getNewsActions(newsItem)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Рекомендуемые новости */}
              <TabsContent value="featured" className="space-y-6">
                <div className="grid gap-6">
                  {filteredNews
                    .filter((item) => item.featured || item.views > 500)
                    .map((newsItem) => (
                      <Card
                        key={newsItem.id}
                        className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer overflow-hidden"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="h-4 w-4 text-red-500" />
                            <Badge className="bg-red-100 text-red-800 border-0">Рекомендуем</Badge>
                            <Badge variant="outline">
                              {newsCategories.find((cat) => cat.id === newsItem.category)?.name}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                            {newsItem.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{newsItem.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{newsItem.author}</span>
                              <span>{formatDate(newsItem.publishedAt)}</span>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{newsItem.views}</span>
                              </div>
                            </div>
                            {getNewsActions(newsItem)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Популярные новости */}
              <TabsContent value="trending" className="space-y-6">
                <div className="grid gap-6">
                  {filteredNews
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 10)
                    .map((newsItem) => (
                      <Card
                        key={newsItem.id}
                        className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer overflow-hidden"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="h-4 w-4 text-orange-500" />
                            <Badge className="bg-orange-100 text-orange-800 border-0">Популярно</Badge>
                            <Badge variant="outline">
                              {newsCategories.find((cat) => cat.id === newsItem.category)?.name}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                            {newsItem.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{newsItem.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{newsItem.author}</span>
                              <span>{formatDate(newsItem.publishedAt)}</span>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{newsItem.views}</span>
                              </div>
                            </div>
                            {getNewsActions(newsItem)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Черновики - только для модераторов и админов */}
              {(userRole === "moderator" || userRole === "admin") && (
                <TabsContent value="drafts" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Черновики</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {news
                          .filter((item) => item.status === "draft")
                          .map((newsItem) => (
                            <div key={newsItem.id} className="p-4 border rounded-lg">
                              <h4 className="font-medium mb-2">{newsItem.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{newsItem.excerpt}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <span>Автор: {newsItem.author}</span>
                                <span>Создано: {formatDate(newsItem.publishedAt)}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  Редактировать
                                </Button>
                                <Button variant="outline" size="sm">
                                  Опубликовать
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600">
                                  Удалить
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Аналитика - только для модераторов и админов */}
              {(userRole === "moderator" || userRole === "admin") && (
                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">156</div>
                        <div className="text-sm text-gray-600">Всего новостей</div>
                        <div className="text-xs text-green-600 mt-1">+12% за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">45,234</div>
                        <div className="text-sm text-gray-600">Просмотров</div>
                        <div className="text-xs text-green-600 mt-1">+18% за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">1,234</div>
                        <div className="text-sm text-gray-600">Комментариев</div>
                        <div className="text-xs text-green-600 mt-1">+8% за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">89%</div>
                        <div className="text-sm text-gray-600">Вовлеченность</div>
                        <div className="text-xs text-green-600 mt-1">+2% за месяц</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}

              {/* Настройки - только для админов */}
              {userRole === "admin" && (
                <TabsContent value="settings" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Настройки новостей</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Модерация новых новостей</span>
                          <Button variant="outline" size="sm">
                            Включено
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Автоматическая публикация</span>
                          <Button variant="outline" size="sm">
                            Отключено
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Уведомления о новых новостях</span>
                          <Button variant="outline" size="sm">
                            Включено
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Управление категориями</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {newsCategories.slice(1).map((category) => (
                          <div key={category.id} className="flex items-center justify-between">
                            <span>{category.name}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Редактировать
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                Удалить
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button size="sm" className="w-full">
                          Добавить категорию
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Категории</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {newsCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Популярные темы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{topic.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{topic.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Subscription */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Подписка на новости</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Получайте последние новости отрасли на свою почту</p>
                <div className="space-y-2">
                  <Input placeholder="Ваш email" type="email" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Подписаться</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
