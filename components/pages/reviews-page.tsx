"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Search,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Flag,
  TrendingUp,
  TrendingDown,
  CheckCircle,
} from "lucide-react"

export default function ReviewsPage() {
  const [currentRole, setCurrentRole] = useState("Гость")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  // Загружаем роль из localStorage
  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      const roles = [
        "Гость",
        "Новичок",
        "Сотрудник охраны",
        "Управляющий ЧОПа",
        "Менеджер ЧОПа",
        "Модератор",
        "Саппорт",
        "Суперадмин",
      ]
      const index = Number.parseInt(savedRoleIndex, 10)
      setCurrentRole(roles[index])
    }
  }, [])

  // Слушаем изменения роли
  useEffect(() => {
    const handleRoleChange = (event: CustomEvent) => {
      setCurrentRole(event.detail.role)
    }

    window.addEventListener("roleChanged", handleRoleChange as EventListener)
    return () => {
      window.removeEventListener("roleChanged", handleRoleChange as EventListener)
    }
  }, [])

  // Мок данные отзывов
  const reviews = [
    {
      id: 1,
      author: "Александр К.",
      authorRole: "Сотрудник охраны",
      verified: true,
      organization: "ЧОП Безопасность Плюс",
      organizationId: 1,
      rating: {
        overall: 4.5,
        salary: 4,
        management: 5,
        conditions: 4,
        career: 4,
      },
      title: "Отличное место для работы",
      text: "Работаю в компании уже 2 года. Руководство адекватное, зарплату выплачивают вовремя. Объекты хорошие, условия труда нормальные. Есть возможности для карьерного роста.",
      pros: ["Стабильная зарплата", "Хорошее руководство", "Интересные объекты"],
      cons: ["Иногда переработки", "Мало отпускных дней"],
      date: "2024-01-15",
      likes: 12,
      dislikes: 2,
      helpful: true,
      responses: [
        {
          id: 1,
          author: "HR ЧОП Безопасность Плюс",
          text: "Спасибо за отзыв! Мы работаем над улучшением условий труда.",
          date: "2024-01-16",
          isOfficial: true,
        },
      ],
    },
    {
      id: 2,
      author: "Михаил С.",
      authorRole: "Сотрудник охраны",
      verified: false,
      organization: "ЧОП Надежная Охрана",
      organizationId: 2,
      rating: {
        overall: 2.5,
        salary: 2,
        management: 2,
        conditions: 3,
        career: 3,
      },
      title: "Не рекомендую",
      text: "Работал 6 месяцев. Постоянные задержки зарплаты, руководство хамское. Объекты в плохом состоянии, оборудование старое.",
      pros: ["Близко к дому"],
      cons: ["Задержки зарплаты", "Плохое руководство", "Старое оборудование", "Переработки без доплат"],
      date: "2024-01-10",
      likes: 8,
      dislikes: 1,
      helpful: true,
      responses: [],
    },
    {
      id: 3,
      author: "Елена В.",
      authorRole: "Сотрудник охраны",
      verified: true,
      organization: "ЧОП Элит-Охрана",
      organizationId: 3,
      rating: {
        overall: 5,
        salary: 5,
        management: 5,
        conditions: 5,
        career: 4,
      },
      title: "Лучшая компания в отрасли",
      text: "Работаю уже 3 года, очень довольна. Высокие зарплаты, отличное руководство, современное оборудование. Регулярные тренинги и обучение.",
      pros: ["Высокие зарплаты", "Профессиональное руководство", "Современное оборудование", "Обучение"],
      cons: ["Высокие требования"],
      date: "2024-01-08",
      likes: 15,
      dislikes: 0,
      helpful: true,
      responses: [],
    },
  ]

  // Мок данные моих отзывов
  const myReviews = [
    {
      id: 1,
      organization: "ЧОП Безопасность Плюс",
      rating: 4.5,
      title: "Отличное место для работы",
      date: "2024-01-15",
      status: "published",
      views: 45,
      likes: 12,
    },
  ]

  // Статистика платформы
  const stats = {
    totalReviews: 1247,
    averageRating: 3.8,
    thisMonth: 89,
    trend: "up",
  }

  const renderStars = (rating: number, size = "sm") => {
    const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5"
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const renderRatingBar = (label: string, rating: number) => (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600 w-20">{label}</span>
      <div className="flex items-center space-x-2 flex-1">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(rating / 5) * 100}%` }} />
        </div>
        <span className="font-medium w-8">{rating.toFixed(1)}</span>
      </div>
    </div>
  )

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRating =
      filterRating === "all" ||
      (filterRating === "5" && review.rating.overall >= 4.5) ||
      (filterRating === "4" && review.rating.overall >= 3.5 && review.rating.overall < 4.5) ||
      (filterRating === "3" && review.rating.overall >= 2.5 && review.rating.overall < 3.5) ||
      (filterRating === "2" && review.rating.overall >= 1.5 && review.rating.overall < 2.5) ||
      (filterRating === "1" && review.rating.overall < 1.5)

    return matchesSearch && matchesRating
  })

  const canWriteReview = currentRole !== "Гость"

  return (
    <main className="flex-1 bg-gray-50">
      {/* Шапка */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Отзывы о работодателях</h1>
              <p className="text-gray-600">Честные отзывы сотрудников о работе в охранных организациях</p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{stats.totalReviews}</div>
                    <div className="text-xs text-gray-600">Всего отзывов</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">{stats.averageRating}</div>
                    <div className="text-xs text-gray-600">Средний рейтинг</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{stats.thisMonth}</div>
                    <div className="text-xs text-gray-600">За месяц</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="text-center flex items-center justify-center">
                    {stats.trend === "up" ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-xs text-gray-600 ml-1">Тренд</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">Все отзывы</TabsTrigger>
              {canWriteReview && <TabsTrigger value="write">Написать отзыв</TabsTrigger>}
              {canWriteReview && <TabsTrigger value="my">Мои отзывы</TabsTrigger>}
            </TabsList>

            {/* Все отзывы */}
            <TabsContent value="all" className="space-y-6">
              {/* Фильтры и поиск */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск по организациям, отзывам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Фильтр по рейтингу" />
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
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">По дате</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="helpful">По полезности</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Список отзывов */}
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      {/* Заголовок отзыва */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900">{review.author}</span>
                              {review.verified && (
                                <CheckCircle className="h-4 w-4 text-green-500" title="Проверенный пользователь" />
                              )}
                              <Badge variant="outline" className="text-xs">
                                {review.authorRole}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-blue-600 font-medium">{review.organization}</span>
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating.overall)}
                              <span className="text-sm font-medium ml-1">{review.rating.overall.toFixed(1)}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h3>
                        </div>
                        <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString("ru-RU")}</div>
                      </div>

                      {/* Детальные рейтинги */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {renderRatingBar("Зарплата", review.rating.salary)}
                        {renderRatingBar("Руководство", review.rating.management)}
                        {renderRatingBar("Условия", review.rating.conditions)}
                        {renderRatingBar("Карьера", review.rating.career)}
                      </div>

                      {/* Текст отзыва */}
                      <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                      </div>

                      {/* Плюсы и минусы */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2">Плюсы:</h4>
                          <ul className="space-y-1">
                            {review.pros.map((pro, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-green-500 mr-2">+</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Минусы:</h4>
                          <ul className="space-y-1">
                            {review.cons.map((con, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-red-500 mr-2">-</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Действия */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{review.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{review.dislikes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                            <MessageSquare className="h-4 w-4" />
                            <span>Ответить</span>
                          </button>
                        </div>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                          <Flag className="h-4 w-4" />
                          <span>Пожаловаться</span>
                        </button>
                      </div>

                      {/* Ответы */}
                      {review.responses.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-gray-200">
                          {review.responses.map((response) => (
                            <div key={response.id} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-semibold text-gray-900">{response.author}</span>
                                {response.isOfficial && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">Официальный ответ</Badge>
                                )}
                                <span className="text-sm text-gray-500">
                                  {new Date(response.date).toLocaleDateString("ru-RU")}
                                </span>
                              </div>
                              <p className="text-gray-700">{response.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Написать отзыв */}
            {canWriteReview && (
              <TabsContent value="write">
                <Card>
                  <CardHeader>
                    <CardTitle>Написать отзыв о работодателе</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Выбор организации */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Организация *</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите организацию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">ЧОП Безопасность Плюс</SelectItem>
                          <SelectItem value="2">ЧОП Надежная Охрана</SelectItem>
                          <SelectItem value="3">ЧОП Элит-Охрана</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Общий рейтинг */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Общая оценка *</label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} className="p-1">
                            <Star className="h-6 w-6 text-gray-300 hover:text-yellow-400" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Детальные оценки */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Зарплата и льготы</label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="p-1">
                              <Star className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Руководство</label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="p-1">
                              <Star className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Условия труда</label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="p-1">
                              <Star className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Карьерные возможности</label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="p-1">
                              <Star className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Заголовок отзыва */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок отзыва *</label>
                      <Input placeholder="Кратко опишите ваш опыт работы" />
                    </div>

                    {/* Текст отзыва */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Подробный отзыв *</label>
                      <Textarea placeholder="Расскажите подробно о вашем опыте работы в организации..." rows={6} />
                    </div>

                    {/* Плюсы и минусы */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Плюсы работы</label>
                        <Textarea placeholder="Что вам понравилось в работе?" rows={4} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Минусы работы</label>
                        <Textarea placeholder="Что можно улучшить?" rows={4} />
                      </div>
                    </div>

                    {/* Кнопки */}
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline">Сохранить черновик</Button>
                      <Button>Опубликовать отзыв</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Мои отзывы */}
            {canWriteReview && (
              <TabsContent value="my">
                <div className="space-y-4">
                  {myReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-blue-600 font-medium">{review.organization}</span>
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                                <span className="text-sm font-medium ml-1">{review.rating.toFixed(1)}</span>
                              </div>
                              <Badge
                                className={
                                  review.status === "published"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {review.status === "published" ? "Опубликован" : "На модерации"}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h3>
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <span>Опубликован {new Date(review.date).toLocaleDateString("ru-RU")}</span>
                              <span>{review.views} просмотров</span>
                              <span>{review.likes} лайков</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="outline" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </main>
  )
}
