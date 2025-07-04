"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Flag, TrendingUp, TrendingDown, CheckCircle } from "lucide-react"

interface OrganizationReviewsProps {
  organizationId: number
  organizationName: string
}

export default function OrganizationReviews({ organizationId, organizationName }: OrganizationReviewsProps) {
  const [sortBy, setSortBy] = useState("date")

  // Мок данные отзывов для организации
  const reviews = [
    {
      id: 1,
      author: "Александр К.",
      authorRole: "Сотрудник охраны",
      verified: true,
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
          author: `HR ${organizationName}`,
          text: "Спасибо за отзыв! Мы работаем над улучшением условий труда.",
          date: "2024-01-16",
          isOfficial: true,
        },
      ],
    },
    {
      id: 2,
      author: "Елена В.",
      authorRole: "Сотрудник охраны",
      verified: true,
      rating: {
        overall: 5,
        salary: 5,
        management: 5,
        conditions: 5,
        career: 4,
      },
      title: "Рекомендую всем",
      text: "Работаю уже 3 года, очень довольна. Высокие зарплаты, отличное руководство, современное оборудование. Регулярные тренинги и обучение.",
      pros: ["Высокие зарплаты", "Профессиональное руководство", "Современное оборудование", "Обучение"],
      cons: ["Высокие требования"],
      date: "2024-01-08",
      likes: 15,
      dislikes: 0,
      helpful: true,
      responses: [],
    },
    {
      id: 3,
      author: "Дмитрий М.",
      authorRole: "Сотрудник охраны",
      verified: false,
      rating: {
        overall: 3.5,
        salary: 3,
        management: 4,
        conditions: 3,
        career: 4,
      },
      title: "Нормальная работа",
      text: "Работал полгода. В целом нормально, но есть недостатки. Зарплата средняя по рынку, руководство адекватное.",
      pros: ["Стабильность", "Нормальное руководство"],
      cons: ["Средняя зарплата", "Однообразная работа"],
      date: "2024-01-05",
      likes: 5,
      dislikes: 1,
      helpful: false,
      responses: [],
    },
  ]

  // Статистика отзывов
  const stats = {
    totalReviews: reviews.length,
    averageRating: 4.3,
    ratingDistribution: {
      5: 33,
      4: 45,
      3: 15,
      2: 5,
      1: 2,
    },
    categories: {
      salary: 4.0,
      management: 4.7,
      conditions: 4.0,
      career: 4.0,
    },
    trend: "up",
    monthlyChange: 0.2,
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
      <span className="text-gray-600 w-24">{label}</span>
      <div className="flex items-center space-x-2 flex-1">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(rating / 5) * 100}%` }} />
        </div>
        <span className="font-medium w-8">{rating.toFixed(1)}</span>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Общая статистика */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Общий рейтинг */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Общий рейтинг</span>
              <div className="flex items-center space-x-1">
                {stats.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ${stats.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stats.monthlyChange > 0 ? "+" : ""}
                  {stats.monthlyChange}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-yellow-600 mb-2">{stats.averageRating}</div>
              <div className="flex items-center justify-center mb-2">{renderStars(stats.averageRating, "lg")}</div>
              <div className="text-sm text-gray-600">На основе {stats.totalReviews} отзывов</div>
            </div>

            {/* Распределение оценок */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2 text-sm">
                  <span className="w-6">{rating}</span>
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <Progress
                    value={stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                    className="flex-1 h-2"
                  />
                  <span className="w-8 text-right">
                    {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Детальные категории */}
        <Card>
          <CardHeader>
            <CardTitle>Оценки по категориям</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderRatingBar("Зарплата", stats.categories.salary)}
            {renderRatingBar("Руководство", stats.categories.management)}
            {renderRatingBar("Условия", stats.categories.conditions)}
            {renderRatingBar("Карьера", stats.categories.career)}
          </CardContent>
        </Card>
      </div>

      {/* Заголовок отзывов */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Отзывы сотрудников ({stats.totalReviews})</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Сортировка:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="date">По дате</option>
            <option value="rating">По рейтингу</option>
            <option value="helpful">По полезности</option>
          </select>
        </div>
      </div>

      {/* Список отзывов */}
      <div className="space-y-6">
        {reviews.map((review) => (
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
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating.overall)}
                      <span className="text-sm font-medium ml-1">{review.rating.overall.toFixed(1)}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h4>
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
                  <h5 className="font-semibold text-green-700 mb-2">Плюсы:</h5>
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
                  <h5 className="font-semibold text-red-700 mb-2">Минусы:</h5>
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

      {/* Кнопка загрузить еще */}
      <div className="text-center">
        <Button variant="outline">Загрузить еще отзывы</Button>
      </div>
    </div>
  )
}
