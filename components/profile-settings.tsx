"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, User, Lock, Eye, Palette } from "lucide-react"

interface ProfileSettingsProps {
  role: string
}

export default function ProfileSettings({ role }: ProfileSettingsProps) {
  const settingsItems = [
    {
      icon: User,
      title: "Основная информация",
      description: "Имя, контакты, фото",
      action: () => console.log("Открыть основные настройки"),
    },
    {
      icon: Lock,
      title: "Безопасность",
      description: "Пароль, двухфакторная аутентификация",
      action: () => console.log("Открыть настройки безопасности"),
    },
    {
      icon: Eye,
      title: "Приватность",
      description: "Видимость профиля, данные",
      action: () => console.log("Открыть настройки приватности"),
    },
    {
      icon: Palette,
      title: "Интерфейс",
      description: "Тема, язык, уведомления",
      action: () => console.log("Открыть настройки интерфейса"),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Настройки</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
