"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  Briefcase,
  Building,
  MessageCircle,
  Star,
  Eye,
  Clock,
  Award,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

interface PlatformActivityProps {
  role?: string
}

export default function PlatformActivity({ role = "Гость" }: PlatformActivityProps) {
  const [stats, setStats] = useState({
    totalUsers: 15623,
    activeUsers: 3247,
    totalOrganizations: 1247,
    verifiedOrganizations: 892,
    totalVacancies: 3891,
    newVacancies: 156,
    totalReviews: 8934,
    newReviews: 89,
  })

  const [recentActivity] = useState([
    {
      id: 1,
      type: "vacancy",
      title: "Новая вакансия: Охранник 4 разряда",
      company: "ЧОП Безопасность Плюс",
      location: "Москва",
      salary: "55,000 - 75,000 ₽",
      time: "5 минут назад",
      isHot: true,
    },
    {
      id: 2,
      type: "review",
      title: "Новый отзыв о ЧОП Щит",
      author: "Александр К.",
      rating: 4.5,
      text: "Отличные условия работы, стабильная зарплата...",
      time: "12 минут назад",
      isHot: false,
    },
    {
      id: 3,
      type: "organization",
      title: "Новая организация: Гарант Плюс",
      location: "Екатеринбург",
      specialization: "Банковская безопасность",
      time: "1 час назад",
      isHot: false,
    },
    {
      id: 4,
      type: "user",
      title: "Новый пользователь: Михаил С.",
      role: "Охранник",
      experience: "3 года опыта",
      time: "2 часа назад",
      isHot: false,
    },
  ])

  const [topContent] = useState([
    {
      id: 1,
      type: "organization",
      title: "ЧОП Безопасность Плюс",
      rating: 4.8,
      views: 2156,
      trend: "up",
      change: "+12%",
    },
    {
      id: 2,
      type: "vacancy",
      title: "Старший охранник ТЦ",
      company: "Охранное агентство Щит",
      views: 1834,
      trend: "up",
      change: "+8%",
    },
    {
      id: 3,
      type: "news",
      title: "Новые требования к лицензированию ЧОП",
      views: 1247,
      trend: "down",
      change: "-3%",
    },
  ])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-green-500" />
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "vacancy":
        return <Briefcase className="h-4 w-4 text-blue-600" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-600" />
      case "organization":
        return <Building className="h-4 w-4 text-purple-600" />
      case "user":
        return <Users className="h-4 w-4 text-green-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const handleViewMore = (type: string) => {
    console.log(`Просмотр больше ${type}`)
    // Здесь будет навигация к соответствующей странице
  }

  return (
    <div className="space-y-6">
      {/* Общая статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Пользователи</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+{stats.activeUsers.toLocaleString()} активных
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Организации</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrganizations.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  {stats.verifiedOrganizations} проверенных
                </p>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Вакансии</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVacancies.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+{stats.newVacancies} новых
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Отзывы</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReviews.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />+{stats.newReviews} новых
                </p>
              </div>
              <MessageCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Последняя активность */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Последняя активность</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                    {activity.isHot && <Badge className="bg-red-100 text-red-800 text-xs">Горячее</Badge>}
                  </div>

                  <div className="space-y-1">
                    {activity.type === "vacancy" && (
                      <>
                        <p className="text-sm text-gray-600">
                          {activity.company} • {activity.location}
                        </p>
                        <p className="text-sm font-medium text-green-600">{activity.salary}</p>
                      </>
                    )}
                    {activity.type === "review" && (
                      <>
                        <p className="text-sm text-gray-600">От {activity.author}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= activity.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{activity.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">{activity.text}</p>
                      </>
                    )}
                    {activity.type === "organization" && (
                      <>
                        <p className="text-sm text-gray-600">{activity.location}</p>
                        <p className="text-sm text-blue-600">{activity.specialization}</p>
                      </>
                    )}
                    {activity.type === "user" && (
                      <>
                        <p className="text-sm text-gray-600">Роль: {activity.role}</p>
                        <p className="text-sm text-blue-600">{activity.experience}</p>
                      </>
                    )}
                  </div>

                  <div className="flex items-center space-x-1 mt-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => handleViewMore("activity")}
              >
                Показать больше активности
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Популярный контент */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Популярное сегодня</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContent.map((content, index) => (
              <div
                key={content.id}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{content.title}</h4>
                  {content.company && <p className="text-sm text-gray-600">{content.company}</p>}
                  {content.rating && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-600">{content.rating}</span>
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">{content.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(content.trend)}
                    <span
                      className={`text-xs ${
                        content.trend === "up"
                          ? "text-green-600"
                          : content.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {content.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => handleViewMore("trending")}
              >
                Весь рейтинг популярности
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Быстрые действия для разных ролей */}
      {role !== "Гость" && (
        <Card>
          <CardHeader>
            <CardTitle>Рекомендации для вас</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {role === "Охранник" && (
                <>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Briefcase className="h-6 w-6 text-blue-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Новые вакансии</h4>
                    <p className="text-sm text-gray-600 mb-3">12 новых вакансий в вашем городе</p>
                    <Button size="sm" onClick={() => handleViewMore("vacancies")}>
                      Посмотреть
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <Star className="h-6 w-6 text-green-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Оставить отзыв</h4>
                    <p className="text-sm text-gray-600 mb-3">Поделитесь опытом работы</p>
                    <Button size="sm" variant="outline" onClick={() => handleViewMore("reviews")}>
                      Написать
                    </Button>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Форум</h4>
                    <p className="text-sm text-gray-600 mb-3">Обсуждения коллег</p>
                    <Button size="sm" variant="outline" onClick={() => handleViewMore("forum")}>
                      Участвовать
                    </Button>
                  </div>
                </>
              )}

              {role === "Представитель организации" && (
                <>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <Briefcase className="h-6 w-6 text-orange-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Разместить вакансию</h4>
                    <p className="text-sm text-gray-600 mb-3">Найдите лучших кандидатов</p>
                    <Button size="sm" onClick={() => handleViewMore("post-vacancy")}>
                      Разместить
                    </Button>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Eye className="h-6 w-6 text-blue-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Аналитика</h4>
                    <p className="text-sm text-gray-600 mb-3">Статистика просмотров</p>
                    <Button size="sm" variant="outline" onClick={() => handleViewMore("analytics")}>
                      Посмотреть
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <Building className="h-6 w-6 text-green-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Профиль ЧОП</h4>
                    <p className="text-sm text-gray-600 mb-3">Обновите информацию</p>
                    <Button size="sm" variant="outline" onClick={() => handleViewMore("organization")}>
                      Редактировать
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
