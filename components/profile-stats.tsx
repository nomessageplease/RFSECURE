"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Activity, Award } from "lucide-react"

interface ProfileStatsProps {
  role: string
}

export default function ProfileStats({ role }: ProfileStatsProps) {
  // Базовая статистика для всех ролей
  const getStatsData = () => {
    const baseStats = {
      daysOnPlatform: 92,
      lastActivity: "Сегодня в 14:30",
      totalActions: 156,
      achievements: 3,
    }

    // Дополнительная статистика в зависимости от роли
    const roleSpecificStats = {
      Новичок: {
        profileCompletion: 45,
        viewedVacancies: 12,
        forumPosts: 0,
        connections: 2,
      },
      Охранник: {
        applications: 23,
        responses: 8,
        forumPosts: 15,
        rating: 4.2,
      },
      "Представитель организации": {
        activeVacancies: 5,
        candidatesReviewed: 67,
        hiredCandidates: 12,
        companyRating: 4.7,
      },
      Модератор: {
        resolvedReports: 89,
        activeReports: 3,
        moderatedPosts: 234,
        warnings: 12,
      },
      Админ: {
        systemActions: 445,
        usersManaged: 1234,
        systemUptime: "99.9%",
        criticalIssues: 0,
      },
    }

    return {
      ...baseStats,
      roleStats: roleSpecificStats[role as keyof typeof roleSpecificStats] || {},
    }
  }

  const statsData = getStatsData()

  const baseStatsItems = [
    {
      icon: Calendar,
      title: "Дней на платформе",
      value: statsData.daysOnPlatform,
      color: "text-blue-600",
    },
    {
      icon: Activity,
      title: "Всего действий",
      value: statsData.totalActions,
      color: "text-green-600",
    },
    {
      icon: Award,
      title: "Достижений",
      value: statsData.achievements,
      color: "text-purple-600",
    },
  ]

  const getRoleSpecificItems = () => {
    switch (role) {
      case "Новичок":
        return [
          { title: "Заполнение профиля", value: `${statsData.roleStats.profileCompletion}%`, color: "text-yellow-600" },
          { title: "Просмотрено вакансий", value: statsData.roleStats.viewedVacancies, color: "text-blue-600" },
          { title: "Сообщений на форуме", value: statsData.roleStats.forumPosts, color: "text-gray-600" },
        ]
      case "Охранник":
        return [
          { title: "Откликов отправлено", value: statsData.roleStats.applications, color: "text-blue-600" },
          { title: "Ответов получено", value: statsData.roleStats.responses, color: "text-green-600" },
          { title: "Рейтинг", value: statsData.roleStats.rating, color: "text-yellow-600" },
        ]
      case "Представитель организации":
        return [
          { title: "Активных вакансий", value: statsData.roleStats.activeVacancies, color: "text-blue-600" },
          { title: "Кандидатов рассмотрено", value: statsData.roleStats.candidatesReviewed, color: "text-green-600" },
          { title: "Рейтинг ЧОП", value: statsData.roleStats.companyRating, color: "text-yellow-600" },
        ]
      case "Модератор":
        return [
          { title: "Жалоб рассмотрено", value: statsData.roleStats.resolvedReports, color: "text-purple-600" },
          { title: "Активных жалоб", value: statsData.roleStats.activeReports, color: "text-orange-600" },
          { title: "Модерированных постов", value: statsData.roleStats.moderatedPosts, color: "text-blue-600" },
        ]
      case "Админ":
        return [
          { title: "Системных действий", value: statsData.roleStats.systemActions, color: "text-red-600" },
          { title: "Пользователей", value: statsData.roleStats.usersManaged, color: "text-blue-600" },
          { title: "Время работы системы", value: statsData.roleStats.systemUptime, color: "text-green-600" },
        ]
      default:
        return []
    }
  }

  const roleSpecificItems = getRoleSpecificItems()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Статистика</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Базовая статистика */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Общая активность</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {baseStatsItems.map((item, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <item.icon className={`h-6 w-6 mx-auto mb-2 ${item.color}`} />
                  <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-sm text-gray-600">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Роль-специфичная статистика */}
          {roleSpecificItems.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Профессиональная активность</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roleSpecificItems.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-white border rounded-lg">
                    <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-sm text-gray-600">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Последняя активность */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Последняя активность:</span>
              <span className="font-medium text-gray-900">{statsData.lastActivity}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
