"use client"

import { Button } from "@/components/ui/button"

interface OrganizationsQuickButtonsProps {
  role?: string
}

export default function OrganizationsQuickButtons({ role = "Гость" }: OrganizationsQuickButtonsProps) {
  const handleButtonClick = (action: string) => {
    console.log(`Action clicked: ${action} for role: ${role}`)
    // Здесь будет логика навигации или других действий
  }

  const getButtonsForRole = () => {
    switch (role) {
      case "Гость":
        return [
          { text: "Зарегистрироваться", action: "register", variant: "default" as const },
          { text: "Как это работает?", action: "how-it-works", variant: "outline" as const },
        ]
      case "Новичок":
        return [
          { text: "Заполнить профиль охранника", action: "fill-guard-profile", variant: "default" as const },
          { text: "Подать заявку на подключение ЧОП", action: "submit-chop-request", variant: "outline" as const },
        ]
      case "Охранник":
        return [
          { text: "Найти вакансии", action: "find-vacancies", variant: "default" as const },
          { text: "Сравнить организации", action: "compare-organizations", variant: "outline" as const },
          { text: "Мои избранные", action: "my-favorites", variant: "outline" as const },
        ]
      case "Представитель организации":
        return [
          { text: "Редактировать профиль ЧОП", action: "edit-chop-profile", variant: "default" as const },
          { text: "Посмотреть конкурентов", action: "view-competitors", variant: "outline" as const },
          { text: "Аналитика просмотров", action: "view-analytics", variant: "outline" as const },
        ]
      case "Модератор":
        return [
          { text: "Организации на проверке", action: "organizations-on-review", variant: "default" as const },
          { text: "Жалобы", action: "complaints", variant: "outline" as const },
          { text: "Статистика модерации", action: "moderation-stats", variant: "outline" as const },
        ]
      case "Админ":
        return [
          { text: "Управление организациями", action: "manage-organizations", variant: "default" as const },
          { text: "Системные настройки", action: "system-settings", variant: "outline" as const },
          { text: "Полная аналитика", action: "full-analytics", variant: "outline" as const },
        ]
      default:
        return []
    }
  }

  const buttons = getButtonsForRole()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant}
            className="h-auto py-3 px-4"
            onClick={() => handleButtonClick(button.action)}
          >
            <span className="text-sm font-medium">{button.text}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
