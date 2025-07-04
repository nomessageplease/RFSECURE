"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, Briefcase, Building, Star, TrendingUp, Users, Activity } from "lucide-react"

interface PlatformActivityProps {
  role?: string
}

export default function PlatformActivity({ role = "Гость" }: PlatformActivityProps) {
  const [activities] = useState([
    {
      id: 1,
      type: "vacancy",
      title: "Новая вакансия: Охранник 4 разряда",
      organization: "СБ Альфа",
      time: "5 минут назад",
      icon: Briefcase,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      type: "review",
      title: "Новый отзыв о ЧОП Барс",
      author: "Иван П.",
      rating: 5,
      time: "12 минут назад",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: 3,
      type: "forum",
      title: "Обсуждение: Изменения в законодательстве",
      replies: 23,
      time: "25 минут назад",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 4,
      type: "organization",
      title: "Новая организация: ЧОП Гарант-Сервис",
      location: "Санкт-Петербург",
      time: "1 час назад",
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: 5,
      type: "user",
      title: "Новый пользователь: Алексей Смирнов",
      role: "Сотрудник охраны",
      time: "2 часа назад",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ])

  const [stats] = useState({
    todayVacancies: 47,
    todayUsers: 156,
    todayReviews: 23,
    todayDiscussions: 89,
  })

  const formatTime = (timeString: string) => {
    return timeString
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <Activity className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Активность платформы</h2>
          <p className="text-gray-600">Последние события в реальном времени</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Статистика за сегодня */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Сегодня</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.todayVacancies}</div>
                  <div className="text-xs text-gray-600">Новых вакансий</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.todayUsers}</div>
                  <div className="text-xs text-gray-600">Новых пользователей</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.todayReviews}</div>
                  <div className="text-xs text-gray-600">Отзывов</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.todayDiscussions}</div>
                  <div className="text-xs text-gray-600">Обсуждений</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Лента активности */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Последние события</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                        <IconComponent className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {activity.organization && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.organization}
                                </Badge>
                              )}
                              {activity.author && <span className="text-xs text-gray-500">от {activity.author}</span>}
                              {activity.rating && (
                                <div className="flex items-center space-x-1">
                                  {[...Array(activity.rating)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              )}
                              {activity.replies && (
                                <span className="text-xs text-gray-500">{activity.replies} ответов</span>
                              )}
                              {activity.location && <span className="text-xs text-gray-500">{activity.location}</span>}
                              {activity.role && (
                                <Badge variant="secondary" className="text-xs">
                                  {activity.role}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500 flex-shrink-0 ml-2">
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(activity.time)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
