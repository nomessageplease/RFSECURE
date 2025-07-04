"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, MessageSquare, Star, Clock, MapPin } from "lucide-react"

export default function PlatformActivity() {
  const [recentActivity] = useState([
    {
      id: 1,
      type: "vacancy",
      title: "Новая вакансия: Охранник КПП",
      company: 'ЧОП "Безопасность+"',
      location: "Москва",
      time: "5 минут назад",
      urgent: true,
    },
    {
      id: 2,
      type: "review",
      title: "Новый отзыв о работодателе",
      company: 'ЧОП "Гарант"',
      rating: 4,
      time: "12 минут назад",
      urgent: false,
    },
    {
      id: 3,
      type: "user",
      title: "Новый пользователь зарегистрировался",
      company: "Охранник с опытом 3 года",
      location: "Санкт-Петербург",
      time: "25 минут назад",
      urgent: false,
    },
    {
      id: 4,
      type: "forum",
      title: "Обсуждение: Изменения в законодательстве",
      company: "Форум профессионалов",
      time: "1 час назад",
      urgent: false,
    },
    {
      id: 5,
      type: "vacancy",
      title: "Срочно требуется: Старший охранник",
      company: 'ЧОП "Щит"',
      location: "Казань",
      time: "2 часа назад",
      urgent: true,
    },
  ])

  const [stats] = useState({
    activeUsers: 342,
    newVacancies: 28,
    newReviews: 15,
    forumMessages: 67,
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "vacancy":
        return <Users className="h-4 w-4 text-blue-600" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-600" />
      case "user":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "forum":
        return <MessageSquare className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "vacancy":
        return { text: "Вакансия", variant: "default" as const }
      case "review":
        return { text: "Отзыв", variant: "secondary" as const }
      case "user":
        return { text: "Пользователь", variant: "outline" as const }
      case "forum":
        return { text: "Форум", variant: "outline" as const }
      default:
        return { text: "Активность", variant: "outline" as const }
    }
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Активность платформы</h2>
        <p className="text-gray-600 mt-1">Последние события и статистика в реальном времени</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{stats.activeUsers}</div>
            <div className="text-sm text-blue-600">Активных пользователей</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{stats.newVacancies}</div>
            <div className="text-sm text-green-600">Новых вакансий</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-700">{stats.newReviews}</div>
            <div className="text-sm text-yellow-600">Новых отзывов</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{stats.forumMessages}</div>
            <div className="text-sm text-purple-600">Сообщений в форуме</div>
          </CardContent>
        </Card>
      </div>

      {/* Лента активности */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span>Последняя активность</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const badge = getActivityBadge(activity.type)
              return (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
                    activity.urgent ? "border-orange-200 bg-orange-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant={badge.variant} className="text-xs">
                        {badge.text}
                      </Badge>
                      {activity.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Срочно
                        </Badge>
                      )}
                    </div>

                    <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.company}</p>

                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>

                      {activity.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{activity.location}</span>
                        </div>
                      )}

                      {activity.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{activity.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              Показать больше активности →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
