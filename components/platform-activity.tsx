"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  Building,
  Briefcase,
  MessageSquare,
  Star,
  Clock,
  ArrowRight,
  Activity,
  Eye,
  Heart,
  UserPlus,
} from "lucide-react"

export default function PlatformActivity() {
  const [activities] = useState([
    {
      id: 1,
      type: "new_organization",
      title: "Новая организация зарегистрирована",
      description: 'ЧОП "Альфа-Безопасность" присоединился к платформе',
      time: "5 минут назад",
      icon: Building,
      color: "text-blue-600 bg-blue-100",
      action: "Посмотреть профиль",
    },
    {
      id: 2,
      type: "new_vacancy",
      title: "Размещена новая вакансия",
      description: "Охранник КПП в Москве, зарплата 55 000 ₽",
      time: "12 минут назад",
      icon: Briefcase,
      color: "text-green-600 bg-green-100",
      action: "Смотреть вакансию",
    },
    {
      id: 3,
      type: "new_review",
      title: "Новый отзыв о работодателе",
      description: 'Отзыв о ЧОП "Стражник" - рейтинг 4.5/5',
      time: "25 минут назад",
      icon: Star,
      color: "text-yellow-600 bg-yellow-100",
      action: "Читать отзыв",
    },
    {
      id: 4,
      type: "forum_post",
      title: "Активность на форуме",
      description: "Новая тема: Особенности работы в ночную смену",
      time: "1 час назад",
      icon: MessageSquare,
      color: "text-purple-600 bg-purple-100",
      action: "Перейти к обсуждению",
    },
    {
      id: 5,
      type: "user_joined",
      title: "Новые пользователи",
      description: "За последний час зарегистрировалось 12 новых пользователей",
      time: "1 час назад",
      icon: UserPlus,
      color: "text-indigo-600 bg-indigo-100",
      action: "Статистика",
    },
  ])

  const [stats] = useState({
    totalUsers: 15623,
    activeToday: 1247,
    newVacancies: 89,
    newOrganizations: 12,
    forumPosts: 156,
    reviews: 34,
  })

  const handleActivityClick = (activityId: number, type: string) => {
    console.log(`Переход к активности ${activityId} типа ${type}`)

    // Навигация в зависимости от типа активности
    switch (type) {
      case "new_organization":
        window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "organizations" } }))
        break
      case "new_vacancy":
        window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "vacancies" } }))
        break
      case "new_review":
        window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "organizations" } }))
        break
      case "forum_post":
        window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "forum" } }))
        break
      case "user_joined":
        // Для админов и модераторов - статистика
        break
      default:
        break
    }
  }

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
            </div>
          </div>
          {change && (
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{change}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div className="flex items-center">
        <span className="inline-block w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mr-3 rounded-full"></span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Активность платформы</h2>
          <p className="text-gray-600 text-sm mt-1">Последние события и статистика</p>
        </div>
      </div>

      {/* Статистические карточки */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={Users}
          title="Всего пользователей"
          value={stats.totalUsers}
          change={8}
          color="text-blue-600 bg-blue-100"
        />
        <StatCard
          icon={Activity}
          title="Активны сегодня"
          value={stats.activeToday}
          change={12}
          color="text-green-600 bg-green-100"
        />
        <StatCard
          icon={Briefcase}
          title="Новые вакансии"
          value={stats.newVacancies}
          change={15}
          color="text-orange-600 bg-orange-100"
        />
        <StatCard
          icon={Building}
          title="Новые ЧОПы"
          value={stats.newOrganizations}
          change={5}
          color="text-purple-600 bg-purple-100"
        />
        <StatCard
          icon={MessageSquare}
          title="Сообщения на форуме"
          value={stats.forumPosts}
          change={20}
          color="text-indigo-600 bg-indigo-100"
        />
        <StatCard
          icon={Star}
          title="Новые отзывы"
          value={stats.reviews}
          change={10}
          color="text-yellow-600 bg-yellow-100"
        />
      </div>

      {/* Лента активности */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Левая колонка - последние события */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-600" />
              Последние события
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                  onClick={() => handleActivityClick(activity.id, activity.type)}
                >
                  <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{activity.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-blue-600 hover:text-blue-800 p-0 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {activity.action}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Правая колонка - популярное */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-gray-600" />
              Популярное сегодня
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Популярные вакансии */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 text-sm">Популярные вакансии</h4>
              {[
                { title: "Охранник КПП", company: "ЧОП Альфа", views: 234 },
                { title: "Оператор видеонаблюдения", company: "Безопасность+", views: 189 },
                { title: "Старший охранник", company: "Стражник", views: 156 },
              ].map((vacancy, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "vacancies" } }))
                  }
                >
                  <div>
                    <p className="font-medium text-sm text-gray-900">{vacancy.title}</p>
                    <p className="text-xs text-gray-600">{vacancy.company}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Eye className="h-3 w-3 mr-1" />
                    {vacancy.views}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 text-sm mb-3">Популярные организации</h4>
              {[
                { name: "ЧОП Альфа-Безопасность", rating: 4.8, likes: 45 },
                { name: "Стражник Плюс", rating: 4.6, likes: 38 },
                { name: "Безопасность Москвы", rating: 4.5, likes: 32 },
              ].map((org, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "organizations" } }))
                  }
                >
                  <div>
                    <p className="font-medium text-sm text-gray-900">{org.name}</p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-xs text-gray-600">{org.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Heart className="h-3 w-3 mr-1" />
                    {org.likes}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Призыв к действию */}
      <div className="text-center py-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Станьте частью активного сообщества</h3>
        <p className="text-gray-600 mb-4">
          Присоединяйтесь к обсуждениям, делитесь опытом и находите новые возможности
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "forum" } }))}>
            Перейти на форум
          </Button>
          <Button
            variant="outline"
            onClick={() => window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: "organizations" } }))}
          >
            Найти работодателя
          </Button>
        </div>
      </div>
    </div>
  )
}
