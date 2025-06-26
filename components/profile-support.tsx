"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, MessageCircle, Book, Phone } from "lucide-react"

interface ProfileSupportProps {
  role: string
}

export default function ProfileSupport({ role }: ProfileSupportProps) {
  const supportItems = [
    {
      icon: MessageCircle,
      title: "Чат с поддержкой",
      description: "Онлайн помощь",
      action: () => console.log("Открыть чат поддержки"),
      available: true,
    },
    {
      icon: Book,
      title: "База знаний",
      description: "FAQ и гайды",
      action: () => console.log("Открыть базу знаний"),
      available: true,
    },
    {
      icon: Phone,
      title: "Телефон поддержки",
      description: "+7 (800) 123-45-67",
      action: () => console.log("Позвонить в поддержку"),
      available: true,
    },
    {
      icon: HelpCircle,
      title: "Обратная связь",
      description: "Предложения и жалобы",
      action: () => console.log("Отправить обратную связь"),
      available: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <HelpCircle className="h-5 w-5" />
          <span>Поддержка</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {supportItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              disabled={!item.available}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                item.available ? "hover:bg-gray-50 cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
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

        {/* Быстрые ссылки */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium text-sm text-gray-900 mb-3">Быстрые ссылки</h4>
          <div className="space-y-2">
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800">
              Как заполнить профиль?
            </button>
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800">
              Проблемы с входом в систему
            </button>
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800">
              Настройка уведомлений
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
