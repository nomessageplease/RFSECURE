"use client"

import { Upload, Search, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileActionsProps {
  role: string
  handleRegister: () => void
  handleLogin: () => void
}

export default function ProfileActions({ role, handleRegister, handleLogin }: ProfileActionsProps) {
  if (role === "Гость") {
    return null
  }

  if (role === "Новичок") {
    return (
      <div className="space-y-6">
        {/* Быстрые действия */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <User className="h-4 w-4" />
              <span>Заполнить профиль</span>
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Загрузить документы</span>
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Найти вакансии</span>
            </button>
          </CardContent>
        </Card>

        {/* Помощь */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Нужна помощь?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="text-xl">📞</div>
                <div>
                  <div className="font-medium text-sm">Техподдержка</div>
                  <div className="text-xs text-gray-500">Онлайн чат</div>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="text-xl">💬</div>
                <div>
                  <div className="font-medium text-sm">Форум новичков</div>
                  <div className="text-xs text-gray-500">Задать вопрос</div>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>

        {/* Статистика */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ваша активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Дней на платформе</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Просмотрено вакансий</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Сообщений на форуме</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Placeholder for other roles */}
      {role}
    </div>
  )
}
