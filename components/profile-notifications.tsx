"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, X, Settings } from "lucide-react"

interface ProfileNotificationsProps {
  role: string
}

export default function ProfileNotifications({ role }: ProfileNotificationsProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Новое сообщение",
      message: "У вас есть непрочитанное сообщение от поддержки",
      time: "5 мин назад",
      read: false,
      type: "message",
    },
    {
      id: 2,
      title: "Обновление системы",
      message: "Платформа будет недоступна с 02:00 до 04:00",
      time: "1 час назад",
      read: false,
      type: "system",
    },
    {
      id: 3,
      title: "Профиль обновлен",
      message: "Ваши изменения успешно сохранены",
      time: "2 часа назад",
      read: true,
      type: "success",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getTypeColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-800"
      case "system":
        return "bg-orange-100 text-orange-800"
      case "success":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Уведомления</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1">
            <Settings className="h-4 w-4" />
            <span>Настроить</span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Нет новых уведомлений</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read ? "bg-gray-50" : "bg-white border-blue-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium ${notification.read ? "text-gray-600" : "text-gray-900"}`}>
                        {notification.title}
                      </h4>
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type === "message" && "Сообщение"}
                        {notification.type === "system" && "Система"}
                        {notification.type === "success" && "Успех"}
                      </Badge>
                    </div>
                    <p className={`text-sm ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Отметить как прочитанное"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Удалить"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
