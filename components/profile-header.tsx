"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Building, Settings, Crown, Star } from "lucide-react"

interface ProfileHeaderProps {
  role?: string
}

export default function ProfileHeader({ role = "Гость" }: ProfileHeaderProps) {
  const [userName, setUserName] = useState("")

  // В реальном приложении это будет приходить из контекста авторизации
  useEffect(() => {
    if (role !== "Гость") {
      setUserName("Иван Петров")
    }
  }, [role])

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
    return <IconComponent className="h-8 w-8" />
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

  const getWelcomeMessage = () => {
    switch (role) {
      case "Гость":
        return {
          title: "Добро пожаловать на RusGuard",
          subtitle: "Войдите в систему или зарегистрируйтесь для доступа к личному кабинету",
          emoji: "👋",
        }
      case "Новичок":
        return {
          title: `Добро пожаловать, ${userName}!`,
          subtitle: "Вы делаете первые шаги на платформе. Давайте настроим ваш профиль!",
          emoji: "🌱",
        }
      case "Охранник":
        return {
          title: `Личный кабинет охранника`,
          subtitle: `${userName}, управляйте профилем и откликайтесь на вакансии`,
          emoji: "🛡️",
        }
      case "Представитель организации":
        return {
          title: `Кабинет представителя ЧОП`,
          subtitle: `${userName}, управляйте вакансиями и взаимодействуйте с кандидатами`,
          emoji: "🏢",
        }
      case "Модератор":
        return {
          title: `Панель модератора`,
          subtitle: `${userName}, следите за порядком на платформе`,
          emoji: "⭐",
        }
      case "Админ":
        return {
          title: `Панель администратора`,
          subtitle: `${userName}, полное управление платформой`,
          emoji: "👑",
        }
      default:
        return {
          title: "Личный кабинет",
          subtitle: "Управляйте своим профилем",
          emoji: "👤",
        }
    }
  }

  const welcomeData = getWelcomeMessage()

  return (
    <div className="space-y-6">
      {/* Основная информация */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">{getRoleIcon(role)}</div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Badge className={getRoleColor(role)}>{role}</Badge>
              {role !== "Гость" && <span className="text-sm text-gray-500">На платформе с марта 2024</span>}
            </div>
          </div>
        </div>
        {role !== "Гость" && (
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
            <Settings className="h-5 w-5" />
            <span className="text-sm">Настройки</span>
          </button>
        )}
      </div>

      {/* Приветствие */}
      <div className="text-center space-y-3">
        <div className="text-4xl">{welcomeData.emoji}</div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{welcomeData.title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{welcomeData.subtitle}</p>
        </div>
      </div>
    </div>
  )
}
