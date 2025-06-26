"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, BarChart3, HelpCircle, LogOut, User, ChevronRight } from "lucide-react"
import { useLoginAction } from "@/hooks/use-login-action"
import { useRegisterAction } from "@/hooks/use-register-action"

interface ProfileDashboardProps {
  role: string
}

export default function ProfileDashboard({ role }: ProfileDashboardProps) {
  const { handleLogin } = useLoginAction()
  const { handleRegister } = useRegisterAction()
  const [unreadNotifications] = useState(2)

  // Для гостя - только кнопки входа/регистрации
  if (role === "Гость") {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <User className="h-5 w-5" />
          <span>Войти в систему</span>
        </button>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <User className="h-5 w-5" />
          <span>Зарегистрироваться</span>
        </button>
      </div>
    )
  }

  // Быстрые действия в зависимости от роли
  const getQuickActions = () => {
    switch (role) {
      case "Новичок":
        return [
          { title: "Заполнить профиль", description: "45% завершено", urgent: true },
          { title: "Просмотреть вакансии", description: "12 новых вакансий", urgent: false },
        ]
      case "Охранник":
        return [
          { title: "Новые отклики", description: "3 ответа от работодателей", urgent: true },
          { title: "Обновить резюме", description: "Последнее обновление 2 недели назад", urgent: false },
        ]
      case "Представитель организации":
        return [
          { title: "Новые кандидаты", description: "8 откликов на ваши вакансии", urgent: true },
          { title: "Обновить вакансии", description: "2 вакансии истекают через 3 дня", urgent: false },
        ]
      case "Модератор":
        return [
          { title: "Новые жалобы", description: "3 жалобы требуют рассмотрения", urgent: true },
          { title: "Проверить публикации", description: "7 новых публикаций на модерации", urgent: false },
        ]
      case "Админ":
        return [
          { title: "Системные уведомления", description: "2 критических уведомления", urgent: true },
          { title: "Заявки ЧОП", description: "5 новых заявок на регистрацию", urgent: false },
        ]
      default:
        return []
    }
  }

  const quickActions = getQuickActions()

  // Навигационные разделы
  const navigationSections = [
    {
      icon: Bell,
      title: "Уведомления",
      description: "Сообщения и оповещения",
      badge: unreadNotifications > 0 ? unreadNotifications : null,
      action: () => console.log("Открыть уведомления"),
    },
    {
      icon: Settings,
      title: "Настройки",
      description: "Профиль, безопасность, приватность",
      badge: null,
      action: () => console.log("Открыть настройки"),
    },
    {
      icon: BarChart3,
      title: "Статистика",
      description: "Активность и достижения",
      badge: null,
      action: () => console.log("Открыть статистику"),
    },
    {
      icon: HelpCircle,
      title: "Поддержка",
      description: "Помощь и обратная связь",
      badge: null,
      action: () => console.log("Открыть поддержку"),
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("currentRoleIndex")
    const event = new CustomEvent("roleChanged", {
      detail: { role: "Гость" },
    })
    window.dispatchEvent(event)
    console.log("Пользователь вышел из системы")
  }

  return (
    <div className="space-y-8">
      {/* Быстрые действия */}
      {quickActions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Требует внимания</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className={action.urgent ? "border-orange-200 bg-orange-50" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                    {action.urgent && (
                      <Badge variant="destructive" className="ml-2">
                        Срочно
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Основные разделы */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Разделы кабинета</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {navigationSections.map((section, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={section.action}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <section.icon className="h-8 w-8 text-blue-600" />
                  {section.badge && <Badge variant="destructive">{section.badge}</Badge>}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{section.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                <div className="flex items-center text-blue-600 text-sm">
                  <span>Открыть</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Выход из системы */}
      <div className="pt-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Выйти из системы</span>
        </button>
      </div>
    </div>
  )
}
