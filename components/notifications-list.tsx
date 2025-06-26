"use client"

import { Clock, Bell, CheckCircle, AlertCircle, Users, Briefcase, MessageSquare, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NotificationsListProps {
  role?: string
  filters?: any
}

interface NotificationItem {
  id: number
  title: string
  message: string
  type: "info" | "success" | "warning" | "error" | "system"
  category: "vacancy" | "organization" | "forum" | "news" | "system" | "moderation"
  isRead: boolean
  isImportant: boolean
  createdAt: string
  actionUrl?: string
  actionText?: string
}

export default function NotificationsList({ role = "Гость", filters = {} }: NotificationsListProps) {
  // Создаем массив уведомлений в зависимости от роли
  const generateNotifications = (): NotificationItem[] => {
    const baseNotifications: NotificationItem[] = []

    if (role === "Гость") {
      return [
        {
          id: 1,
          title: "Добро пожаловать!",
          message: "Зарегистрируйтесь, чтобы получать персональные уведомления",
          type: "info",
          category: "system",
          isRead: false,
          isImportant: true,
          createdAt: "2025-06-23 17:30",
          actionUrl: "/register",
          actionText: "Зарегистрироваться",
        },
      ]
    }

    // Уведомления для всех авторизованных пользователей
    const commonNotifications: NotificationItem[] = [
      {
        id: 2,
        title: "Обновление платформы",
        message: "Добавлены новые функции в разделе вакансий",
        type: "info",
        category: "system",
        isRead: false,
        isImportant: false,
        createdAt: "2025-06-23 16:00",
      },
      {
        id: 3,
        title: "Новые новости",
        message: "Опубликованы важные изменения в законодательстве",
        type: "info",
        category: "news",
        isRead: true,
        isImportant: true,
        createdAt: "2025-06-23 14:30",
      },
    ]

    baseNotifications.push(...commonNotifications)

    // Специфичные уведомления по ролям
    switch (role) {
      case "Охранник":
        baseNotifications.push(
          {
            id: 4,
            title: "Новая вакансия",
            message: "Найдена подходящая вакансия охранника в вашем регионе",
            type: "success",
            category: "vacancy",
            isRead: false,
            isImportant: true,
            createdAt: "2025-06-23 15:45",
            actionUrl: "/vacancies",
            actionText: "Посмотреть",
          },
          {
            id: 5,
            title: "Отклик на вакансию",
            message: "Ваш отклик на вакансию 'Охранник торгового центра' рассмотрен",
            type: "info",
            category: "vacancy",
            isRead: false,
            isImportant: false,
            createdAt: "2025-06-23 13:20",
          },
          {
            id: 6,
            title: "Ответ на форуме",
            message: "Получен новый ответ в теме 'Вопросы по лицензированию'",
            type: "info",
            category: "forum",
            isRead: true,
            isImportant: false,
            createdAt: "2025-06-23 11:15",
          },
        )
        break

      case "Представитель организации":
        baseNotifications.push(
          {
            id: 7,
            title: "Новый кандидат",
            message: "Поступил отклик на вакансию 'Старший охранник'",
            type: "success",
            category: "vacancy",
            isRead: false,
            isImportant: true,
            createdAt: "2025-06-23 16:30",
            actionUrl: "/vacancies/responses",
            actionText: "Посмотреть кандидата",
          },
          {
            id: 8,
            title: "Заявка на подключение",
            message: "Ваша заявка на подключение организации одобрена",
            type: "success",
            category: "organization",
            isRead: false,
            isImportant: true,
            createdAt: "2025-06-23 12:00",
          },
          {
            id: 9,
            title: "Истекает срок публикации",
            message: "Вакансия 'Охранник склада' будет снята с публикации через 3 дня",
            type: "warning",
            category: "vacancy",
            isRead: true,
            isImportant: false,
            createdAt: "2025-06-23 10:30",
          },
        )
        break

      case "Модератор":
        baseNotifications.push(
          {
            id: 10,
            title: "Новая жалоба",
            message: "Поступила жалоба на публикацию в форуме",
            type: "warning",
            category: "moderation",
            isRead: false,
            isImportant: true,
            createdAt: "2025-06-23 17:00",
            actionUrl: "/moderation/complaints",
            actionText: "Рассмотреть",
          },
          {
            id: 11,
            title: "Заявка на проверке",
            message: "Новая организация ожидает модерации",
            type: "info",
            category: "moderation",
            isRead: false,
            isImportant: false,
            createdAt: "2025-06-23 15:20",
          },
          {
            id: 12,
            title: "Превышен лимит жалоб",
            message: "Пользователь получил предупреждение за нарушения",
            type: "error",
            category: "moderation",
            isRead: true,
            isImportant: true,
            createdAt: "2025-06-23 14:00",
          },
        )
        break

      case "Админ":
        baseNotifications.push(
          {
            id: 13,
            title: "Системное уведомление",
            message: "Требуется обновление базы данных",
            type: "error",
            category: "system",
            isRead: false,
            isImportant: true,
            createdAt: "2025-06-23 17:15",
            actionUrl: "/admin/system",
            actionText: "Перейти в админку",
          },
          {
            id: 14,
            title: "Статистика платформы",
            message: "Еженедельный отчет готов к просмотру",
            type: "info",
            category: "system",
            isRead: false,
            isImportant: false,
            createdAt: "2025-06-23 09:00",
          },
        )
        break
    }

    return baseNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const notifications = generateNotifications()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vacancy":
        return <Briefcase className="h-4 w-4" />
      case "organization":
        return <Users className="h-4 w-4" />
      case "forum":
        return <MessageSquare className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      case "moderation":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      vacancy: "Вакансии",
      organization: "Организации",
      forum: "Форум",
      news: "Новости",
      system: "Система",
      moderation: "Модерация",
    }
    return labels[category as keyof typeof labels] || category
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      vacancy: "bg-blue-100 text-blue-800",
      organization: "bg-green-100 text-green-800",
      forum: "bg-purple-100 text-purple-800",
      news: "bg-orange-100 text-orange-800",
      system: "bg-gray-100 text-gray-800",
      moderation: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleAction = (notification: NotificationItem) => {
    if (role === "Гость" && notification.actionUrl === "/register") {
      window.dispatchEvent(
        new CustomEvent("pageChanged", {
          detail: { page: "register" },
        }),
      )
      return
    }

    console.log(`Action clicked for notification ${notification.id}`)
    // Здесь будет логика перехода по actionUrl
  }

  const markAsRead = (notificationId: number) => {
    console.log(`Mark as read: ${notificationId}`)
    // Здесь будет логика отметки как прочитанное
  }

  const renderNotificationCard = (notification: NotificationItem) => (
    <div
      key={notification.id}
      className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
        notification.isRead ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
      }`}
    >
      {/* Заголовок с иконками и статусом */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getTypeIcon(notification.type)}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              {notification.isImportant && (
                <Badge variant="destructive" className="text-xs">
                  Важное
                </Badge>
              )}
              <Badge className={`text-xs ${getCategoryColor(notification.category)}`}>
                <div className="flex items-center space-x-1">
                  {getCategoryIcon(notification.category)}
                  <span>{getCategoryLabel(notification.category)}</span>
                </div>
              </Badge>
              {!notification.isRead && (
                <Badge variant="default" className="text-xs">
                  Новое
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
          </div>
        </div>
      </div>

      {/* Сообщение */}
      <p className="text-gray-700 mb-3">{notification.message}</p>

      {/* Время и действия */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{notification.createdAt}</span>
        </div>
        <div className="flex items-center space-x-2">
          {!notification.isRead && (
            <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
              Отметить прочитанным
            </Button>
          )}
          {notification.actionUrl && (
            <Button size="sm" onClick={() => handleAction(notification)}>
              {notification.actionText || "Перейти"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-700">Всего уведомлений: {notifications.length}</h3>
          {unreadCount > 0 && (
            <Badge variant="default" className="text-sm">
              Непрочитанных: {unreadCount}
            </Badge>
          )}
        </div>
        {role !== "Гость" && notifications.length > 0 && (
          <Button variant="outline" size="sm">
            Отметить все прочитанными
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">У вас пока нет уведомлений</p>
        </div>
      ) : (
        <div className="space-y-4">{notifications.map(renderNotificationCard)}</div>
      )}
    </div>
  )
}
