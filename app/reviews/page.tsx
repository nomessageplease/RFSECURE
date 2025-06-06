"use client"

import { useState } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import {
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Eye,
  TrendingUp,
  Edit,
  Trash,
  Shield,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import Header from "@/components/header"

const reviews = [
  {
    id: 1,
    company: "Охранное Агентство Авангард",
    companyId: 1,
    author: "Михаил К.",
    authorType: "Бизнес-центр",
    rating: 5,
    date: "2024-01-15",
    text: "Отличная работа! Охраняют наш торговый центр уже 3 года. Профессиональный подход, вежливый персонал. Никаких нареканий.",
    verified: true,
    helpful: 12,
    notHelpful: 1,
    ratings: {
      reliability: 5,
      professionalism: 5,
      response: 5,
      equipment: 4,
      value: 5,
    },
    reply: {
      author: "Авангард",
      date: "2024-01-16",
      text: "Спасибо за высокую оценку! Мы ценим наше сотрудничество.",
    },
    tags: ["Профессионализм", "Надежность"],
  },
  {
    id: 2,
    company: "Щит-Безопасность",
    companyId: 2,
    author: "Елена С.",
    authorType: "Торговый центр",
    rating: 4,
    date: "2024-01-10",
    text: "Хорошая компания, но иногда бывают задержки с заменой охранников при болезни. В целом довольны сотрудничеством.",
    verified: true,
    helpful: 8,
    notHelpful: 2,
    ratings: {
      reliability: 4,
      professionalism: 5,
      response: 3,
      equipment: 4,
      value: 4,
    },
    tags: ["Качество", "Замечания"],
  },
  {
    id: 3,
    company: "Барс-Охрана",
    companyId: 3,
    author: "Дмитрий П.",
    authorType: "Организатор мероприятий",
    rating: 5,
    date: "2024-01-05",
    text: "Обеспечивали безопасность корпоративного мероприятия на 500 человек. Все прошло на высшем уровне! Рекомендую.",
    verified: false,
    helpful: 5,
    notHelpful: 0,
    ratings: {
      reliability: 5,
      professionalism: 5,
      response: 5,
      equipment: 5,
      value: 4,
    },
    tags: ["Мероприятия", "Профессионализм"],
  },
]

const complaints = [
  {
    id: 1,
    company: "ООО Охрана-Сервис",
    companyId: 4,
    author: "Анна В.",
    type: "service_quality",
    status: "investigating",
    date: "2024-01-12",
    title: "Нарушение договорных обязательств",
    description: "Охранники регулярно опаздывают на смену, что создает проблемы с безопасностью объекта.",
    severity: "medium",
    category: "Качество услуг",
  },
  {
    id: 2,
    company: "Гарант-Безопасность",
    companyId: 5,
    author: "Сергей Н.",
    type: "billing",
    status: "resolved",
    date: "2024-01-08",
    title: "Неправомерное списание средств",
    description: "Компания списала оплату за услуги, которые не были оказаны согласно договору.",
    severity: "high",
    category: "Финансы",
  },
]

const companies = [
  { id: 1, name: "Охранное Агентство Авангард" },
  { id: 2, name: "Щит-Безопасность" },
  { id: 3, name: "Барс-Охрана" },
]

export default function ReviewsPage() {
  const { userRole } = useUserRole()
  const [activeTab, setActiveTab] = useState("reviews")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Отзывы о ЧОПах"
      case "chop":
        return "Управление отзывами"
      case "moderator":
        return "Модерация отзывов"
      case "admin":
        return "Администрирование отзывов"
      default:
        return "Отзывы и жалобы"
    }
  }

  const getPageDescription = () => {
    switch (userRole) {
      case "guard":
        return "Читайте честные отзывы о работе в охранных компаниях и оставляйте свои"
      case "chop":
        return "Отвечайте на отзывы клиентов и управляйте репутацией компании"
      case "moderator":
        return "Модерируйте отзывы и жалобы пользователей платформы"
      case "admin":
        return "Полное управление системой отзывов и жалоб"
      default:
        return "Честные отзывы клиентов и система подачи жалоб на охранные компании"
    }
  }

  const getRoleSpecificTabs = () => {
    switch (userRole) {
      case "guard":
        return (
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="my-reviews">Мои отзывы</TabsTrigger>
            <TabsTrigger value="complaints">Жалобы</TabsTrigger>
          </TabsList>
        )
      case "chop":
        return (
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="my-reviews">О нас</TabsTrigger>
            <TabsTrigger value="responses">Ответы</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>
        )
      case "moderator":
        return (
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="moderation">Модерация</TabsTrigger>
            <TabsTrigger value="reviews">Все отзывы</TabsTrigger>
            <TabsTrigger value="complaints">Жалобы</TabsTrigger>
          </TabsList>
        )
      case "admin":
        return (
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="moderation">Модерация</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="complaints">Жалобы</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>
        )
    }
  }

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Оставить отзыв
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Написать отзыв</DialogTitle>
                  <DialogDescription>Поделитесь своим опытом работы с охранной компанией</DialogDescription>
                </DialogHeader>
                {/* Review form */}
              </DialogContent>
            </Dialog>
          </div>
        )
      case "chop":
        return (
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-100 text-blue-800 border-0">Новых отзывов: 3</Badge>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Настройки уведомлений
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex items-center gap-3">
            <Badge className="bg-orange-100 text-orange-800 border-0">На модерации: 12</Badge>
            <Button variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Быстрое одобрение
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Настройки модерации
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Экспорт данных
            </Button>
          </div>
        )
    }
  }

  const getReviewActions = (review: any) => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Полезно ({review.helpful})
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
              <ThumbsDown className="h-4 w-4 mr-1" />
              Не полезно ({review.notHelpful})
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
              <Flag className="h-4 w-4 mr-1" />
              Пожаловаться
            </Button>
          </div>
        )
      case "chop":
        return (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-1" />
              Ответить
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4 mr-1" />
              Оспорить
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-1" />
              Одобрить
            </Button>
            <Button size="sm" variant="outline" className="text-red-600">
              <Trash className="h-4 w-4 mr-1" />
              Удалить
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              <Trash className="h-4 w-4 mr-1" />
              Удалить
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-1" />
              Заблокировать автора
            </Button>
          </div>
        )
    }
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating
    return matchesSearch && matchesRating
  })

  const chopData = {
    logo: "/placeholder.svg",
    name: "Placeholder Company",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">{getPageTitle()}</h1>
              </div>
              <p className="text-lg text-gray-600">{getPageDescription()}</p>
            </div>
            {getRoleSpecificActions()}
          </div>
        </div>

        {/* Role-specific stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Stats cards adapted for each role */}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {getRoleSpecificTabs()}

          <TabsContent value="reviews" className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Поиск отзывов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Рейтинг" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все рейтинги</SelectItem>
                    <SelectItem value="5">5 звезд</SelectItem>
                    <SelectItem value="4">4 звезды</SelectItem>
                    <SelectItem value="3">3 звезды</SelectItem>
                    <SelectItem value="2">2 звезды</SelectItem>
                    <SelectItem value="1">1 звезда</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Сначала новые</SelectItem>
                    <SelectItem value="oldest">Сначала старые</SelectItem>
                    <SelectItem value="helpful">По полезности</SelectItem>
                    <SelectItem value="rating_high">Высокий рейтинг</SelectItem>
                    <SelectItem value="rating_low">Низкий рейтинг</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Применить
                </Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                          {review.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{review.author}</h3>
                              <Badge variant="outline" className="text-xs">
                                {review.authorType}
                              </Badge>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Проверен
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Link
                                href={`/catalog/${review.companyId}`}
                                className="font-medium text-blue-600 hover:text-blue-800"
                              >
                                {review.company}
                              </Link>
                              <span className="text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="ml-2 font-semibold text-lg">{review.rating}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {review.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Detailed Ratings */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                          {Object.entries(review.ratings).map(([key, rating]) => (
                            <div key={key} className="text-center">
                              <div className="text-xs text-gray-600 mb-1">
                                {key === "reliability" && "Надежность"}
                                {key === "professionalism" && "Профессионализм"}
                                {key === "response" && "Реагирование"}
                                {key === "equipment" && "Оборудование"}
                                {key === "value" && "Цена/качество"}
                              </div>
                              <div className="flex items-center justify-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                                <span className="font-medium text-sm">{rating}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          {getReviewActions(review)}
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Eye className="h-4 w-4" />
                            <span>234 просмотра</span>
                          </div>
                        </div>

                        {/* Company Reply */}
                        {review.reply && (
                          <div className="mt-4 bg-blue-50 p-3 rounded-md">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={chopData.logo || "/placeholder.svg"} alt={chopData.name} />
                                <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                                  {chopData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-blue-800">{review.reply.author}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(review.reply.date).toLocaleDateString("ru-RU")}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{review.reply.text}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            {/* Complaint Form */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Подать жалобу
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-red-600 hover:bg-red-700">Подать жалобу на компанию</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Подача жалобы</DialogTitle>
                      <DialogDescription>
                        Опишите проблему с охранной компанией. Все жалобы рассматриваются в течение 3 рабочих дней.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="complaint-company">Компания</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите компанию" />
                          </SelectTrigger>
                          <SelectContent>
                            {companies.map((company) => (
                              <SelectItem key={company.id} value={company.id.toString()}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="complaint-type">Тип жалобы</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="service_quality">Качество услуг</SelectItem>
                            <SelectItem value="billing">Финансовые вопросы</SelectItem>
                            <SelectItem value="contract">Нарушение договора</SelectItem>
                            <SelectItem value="staff">Поведение персонала</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="complaint-title">Заголовок жалобы</Label>
                        <Input id="complaint-title" placeholder="Краткое описание проблемы" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="complaint-description">Подробное описание</Label>
                        <Textarea
                          id="complaint-description"
                          placeholder="Опишите проблему подробно..."
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-red-600 hover:bg-red-700">
                        Подать жалобу
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Complaints List */}
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <Card key={complaint.id} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{complaint.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>
                            Компания:{" "}
                            <Link
                              href={`/catalog/${complaint.companyId}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {complaint.company}
                            </Link>
                          </span>
                          <span>От: {complaint.author}</span>
                          <span>{complaint.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{complaint.category}</Badge>
                          <Badge
                            className={
                              complaint.status === "resolved"
                                ? "bg-green-100 text-green-800 border-0"
                                : complaint.status === "investigating"
                                  ? "bg-yellow-100 text-yellow-800 border-0"
                                  : "bg-gray-100 text-gray-800 border-0"
                            }
                          >
                            {complaint.status === "resolved" && "Решена"}
                            {complaint.status === "investigating" && "Рассматривается"}
                            {complaint.status === "pending" && "Ожидает"}
                          </Badge>
                          <Badge
                            className={
                              complaint.severity === "high"
                                ? "bg-red-100 text-red-800 border-0"
                                : complaint.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-800 border-0"
                                  : "bg-blue-100 text-blue-800 border-0"
                            }
                          >
                            {complaint.severity === "high" && "Высокая"}
                            {complaint.severity === "medium" && "Средняя"}
                            {complaint.severity === "low" && "Низкая"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Статистика отзывов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Отзывов за месяц</span>
                      <span className="font-semibold text-lg">+156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Средний рейтинг</span>
                      <span className="font-semibold text-lg">4.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Проверенных отзывов</span>
                      <span className="font-semibold text-lg">83%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Статистика жалоб
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Жалоб за месяц</span>
                      <span className="font-semibold text-lg">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Решено</span>
                      <span className="font-semibold text-lg text-green-600">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">В работе</span>
                      <span className="font-semibold text-lg text-yellow-600">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
