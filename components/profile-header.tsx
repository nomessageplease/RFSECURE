"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Building, Settings, Crown, Star } from "lucide-react"

interface ProfileHeaderProps {
  role?: string
}

export default function ProfileHeader({ role = "Гость" }: ProfileHeaderProps) {
  const [userName, setUserName] = useState("")
  const [userStats, setUserStats] = useState({
    joinDate: "2024-03-15",
    lastActivity: "2025-06-16",
    rating: 4.5,
    completedTasks: 0,
  })

  // В реальном приложении это будет приходить из контекста авторизации
  useEffect(() => {
    // Имитация получения данных пользователя
    if (role !== "Гость") {
      setUserName("Иван Петров")
      setUserStats({
        joinDate: "2024-03-15",
        lastActivity: "2025-06-16",
        rating: 4.5,
        completedTasks: getCompletedTasksByRole(role),
      })
    }
  }, [role])

  const getCompletedTasksByRole = (userRole: string) => {
    const tasks = {
      Новичок: 2,
      Охранник: 45,
      "Представитель организации": 23,
      Модератор: 156,
      Админ: 892,
    }
    return tasks[userRole as keyof typeof tasks] || 0
  }

  const getRoleIcon = (userRole: string) => {
    const icons = {
      Гость: User,
      Новичок: User,
      Охранник: Shield,
      "Представитель организации": Building,
      Модератор: Star,
      Админ: Crown,
    }
    const IconComponent = icons[userRole as keyof typeof icons] || User
    return <IconComponent className="h-6 w-6" />
  }

  const getRoleColor = (userRole: string) => {
    const colors = {
      Гость: "bg-gray-100 text-gray-800",
      Новичок: "bg-yellow-100 text-yellow-800",
      Охранник: "bg-blue-100 text-blue-800",
      "Представитель организации": "bg-green-100 text-green-800",
      Модератор: "bg-purple-100 text-purple-800",
      Админ: "bg-red-100 text-red-800",
    }
    return colors[userRole as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getTitleContent = () => {
    switch (role) {
      case "Гость":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Добро пожаловать!</h1>
            <p className="text-lg text-gray-600">
              Войдите в систему или зарегистрируйтесь, чтобы получить доступ к личному кабинету
            </p>
          </>
        )
      case "Новичок":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Добро пожаловать, {userName}!</h1>
            <p className="text-lg text-gray-600 mb-4">
              Вы новичок на платформе. Заполните профиль и начните изучать возможности RusGuard.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">Следующие шаги:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Заполните профиль полностью</li>
                <li>• Изучите организации в вашем регионе</li>
                <li>• Присоединитесь к обсуждениям на форуме</li>
                <li>• Подпишитесь на интересные вакансии</li>
              </ul>
            </div>
          </>
        )
      case "Охранник":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Личный кабинет охранника</h1>
            <p className="text-lg text-gray-600 mb-4">
              {userName}, управляйте своим профилем, откликайтесь на вакансии и участвуйте в профессиональном
              сообществе.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Ваша активность:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-blue-900">{userStats.completedTasks}</div>
                  <div className="text-blue-700">Откликов на вакансии</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-900">{userStats.rating}</div>
                  <div className="text-blue-700">Рейтинг</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-900">12</div>
                  <div className="text-blue-700">Сообщений на форуме</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-900">5</div>
                  <div className="text-blue-700">Избранных ЧОП</div>
                </div>
              </div>
            </div>
          </>
        )
      case "Представитель организации":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Кабинет представителя ЧОП</h1>
            <p className="text-lg text-gray-600 mb-4">
              {userName}, управляйте профилем организации, размещайте вакансии и взаимодействуйте с кандидатами.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2">Статистика организации:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-green-900">8</div>
                  <div className="text-green-700">Активных вакансий</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-900">{userStats.completedTasks}</div>
                  <div className="text-green-700">Откликов получено</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-900">{userStats.rating}</div>
                  <div className="text-green-700">Рейтинг ЧОП</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-900">156</div>
                  <div className="text-green-700">Просмотров профиля</div>
                </div>
              </div>
            </div>
          </>
        )
      case "Модератор":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Панель модератора</h1>
            <p className="text-lg text-gray-600 mb-4">
              {userName}, следите за порядком на платформе и помогайте пользователям.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-medium text-purple-800 mb-2">Статистика модерации:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-purple-900">3</div>
                  <div className="text-purple-700">Жалоб на рассмотрении</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-900">{userStats.completedTasks}</div>
                  <div className="text-purple-700">Решений принято</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-900">7</div>
                  <div className="text-purple-700">Новых публикаций</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-900">2</div>
                  <div className="text-purple-700">Заявок ЧОП</div>
                </div>
              </div>
            </div>
          </>
        )
      case "Админ":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Панель администратора</h1>
            <p className="text-lg text-gray-600 mb-4">
              {userName}, полное управление платформой и системными настройками.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-800 mb-2">Системная статистика:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-red-900">1,234</div>
                  <div className="text-red-700">Всего пользователей</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-900">89</div>
                  <div className="text-red-700">Активных ЧОП</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-900">456</div>
                  <div className="text-red-700">Открытых вакансий</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-900">{userStats.completedTasks}</div>
                  <div className="text-red-700">Админ-действий</div>
                </div>
              </div>
            </div>
          </>
        )
      default:
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Личный кабинет</h1>
            <p className="text-lg text-gray-600">Управляйте своим профилем и настройками</p>
          </>
        )
    }
  }

  if (role === "Гость") {
    return <div className="text-center">{getTitleContent()}</div>
  }

  return (
    <div className="space-y-6">
      {/* Основная информация пользователя */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">{getRoleIcon(role)}</div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{userName}</h2>
              <Badge className={getRoleColor(role)}>{role}</Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>На платформе с {userStats.joinDate}</span>
              <span>•</span>
              <span>Последняя активность: {userStats.lastActivity}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-400" />
          <button className="text-sm text-blue-600 hover:text-blue-800">Настройки</button>
        </div>
      </div>

      {/* Контент в зависимости от роли */}
      <div>{getTitleContent()}</div>
    </div>
  )
}
