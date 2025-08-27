"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Edit,
  Settings,
  FileText,
  Briefcase,
  MessageCircle,
  Bell,
  Shield,
  Users,
  Plus,
  Eye,
  BarChart3,
  AlertTriangle,
  Crown,
  Database,
} from "lucide-react"

interface ProfileActionsProps {
  role?: string
}

export default function ProfileActions({ role = "Гость" }: ProfileActionsProps) {
  const handleAction = (action: string) => {
    console.log(`Action clicked: ${action} for role: ${role}`)
    // Здесь будет логика навигации или других действий
  }

  if (role === "Гость") {
    return (
      <div>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Войдите для доступа к действиям</p>
            <Button onClick={() => handleAction("login")}>Войти в систему</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getActionsForRole = () => {
    switch (role) {
      case "Новичок":
        return [
          { icon: Edit, text: "Заполнить профиль", action: "edit-profile", variant: "default" as const },
          { icon: FileText, text: "Загрузить документы", action: "upload-docs", variant: "outline" as const },
          { icon: Briefcase, text: "Найти работу", action: "find-jobs", variant: "outline" as const },
          { icon: MessageCircle, text: "Помощь новичкам", action: "help", variant: "outline" as const },
        ]
      case "Охранник":
        return [
          { icon: Edit, text: "Редактировать профиль", action: "edit-profile", variant: "outline" as const },
          { icon: Briefcase, text: "Мои отклики", action: "my-applications", variant: "default" as const },
          { icon: Eye, text: "Избранные вакансии", action: "favorites", variant: "outline" as const },
          { icon: FileText, text: "Мое резюме", action: "my-resume", variant: "outline" as const },
          { icon: Bell, text: "Настройки уведомлений", action: "notifications", variant: "outline" as const },
          { icon: Settings, text: "Настройки профиля", action: "settings", variant: "outline" as const },
        ]
      case "Представитель организации":
        return [
          { icon: Plus, text: "Создать вакансию", action: "create-vacancy", variant: "default" as const },
          { icon: Briefcase, text: "Мои вакансии", action: "my-vacancies", variant: "outline" as const },
          { icon: Users, text: "Кандидаты", action: "candidates", variant: "outline" as const },
          { icon: BarChart3, text: "Аналитика", action: "analytics", variant: "outline" as const },
          { icon: Edit, text: "Профиль ЧОП", action: "edit-company", variant: "outline" as const },
          { icon: Settings, text: "Настройки", action: "settings", variant: "outline" as const },
        ]
      case "Модератор":
        return [
          { icon: AlertTriangle, text: "Жалобы", action: "complaints", variant: "default" as const },
          { icon: Eye, text: "Проверка публикаций", action: "review-posts", variant: "outline" as const },
          { icon: Users, text: "Управление пользователями", action: "manage-users", variant: "outline" as const },
          { icon: BarChart3, text: "Статистика модерации", action: "moderation-stats", variant: "outline" as const },
          { icon: Settings, text: "Настройки модерации", action: "mod-settings", variant: "outline" as const },
        ]
      case "Админ":
        return [
          { icon: Crown, text: "Панель администратора", action: "admin-panel", variant: "default" as const },
          { icon: Users, text: "Управление пользователями", action: "manage-users", variant: "outline" as const },
          { icon: Database, text: "Системные настройки", action: "system-settings", variant: "outline" as const },
          { icon: BarChart3, text: "Аналитика платформы", action: "platform-analytics", variant: "outline" as const },
          { icon: Shield, text: "Безопасность", action: "security", variant: "outline" as const },
          { icon: Settings, text: "Настройки", action: "settings", variant: "outline" as const },
        ]
      default:
        return []
    }
  }

  const actions = getActionsForRole()

  return (
    <div>
      <Card>
        <CardContent className="space-y-3 pt-6">
          {actions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Button
                key={index}
                variant={action.variant}
                className="w-full justify-start"
                onClick={() => handleAction(action.action)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {action.text}
              </Button>
            )
          })}
        </CardContent>
      </Card>

      {/* Дополнительная информация в зависимости от роли */}
      {role === "Новичок" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Следующие шаги</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Заполните профиль на 100%</p>
              <p>• Загрузите фото и документы</p>
              <p>• Найдите первую вакансию</p>
              <p>• Присоединитесь к форуму</p>
            </div>
          </CardContent>
        </Card>
      )}

      {(role === "Модератор" || role === "Админ") && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Требуют внимания</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Новые жалобы</span>
                <span className="font-medium text-red-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">На проверке</span>
                <span className="font-medium text-orange-600">7</span>
              </div>
              {role === "Админ" && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Системные уведомления</span>
                  <span className="font-medium text-blue-600">2</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
