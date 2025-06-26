"use client"

import { Button } from "@/components/ui/button"
import { useRegisterAction } from "@/hooks/use-register-action"

interface ForumQuickButtonsProps {
  role?: string
}

export default function ForumQuickButtons({ role = "Гость" }: ForumQuickButtonsProps) {
  const { handleRegister } = useRegisterAction()

  const handleButtonClick = (action: string) => {
    console.log(`Action clicked: ${action} for role: ${role}`)

    // Обработка перехода на страницу регистрации
    if (action === "register") {
      handleRegister()
      return
    }

    // Здесь будет логика навигации или других действий
  }

  const getButtonsForRole = () => {
    switch (role) {
      case "Гость":
        return [
          { text: "Зарегистрироваться", action: "register", variant: "default" as const },
          { text: "Просмотреть темы", action: "browse-topics", variant: "outline" as const },
        ]
      case "Новичок":
        return [
          { text: "Создать тему", action: "create-topic", variant: "default" as const },
          { text: "Популярные темы", action: "popular-topics", variant: "outline" as const },
          { text: "Помощь новичкам", action: "help-for-beginners", variant: "outline" as const },
        ]
      case "Охранник":
        return [
          { text: "Создать тему", action: "create-topic", variant: "default" as const },
          { text: "Мои темы", action: "my-topics", variant: "outline" as const },
          { text: "Поиск по форуму", action: "search-forum", variant: "outline" as const },
        ]
      case "Представитель организации":
        return [
          { text: "Создать тему", action: "create-topic", variant: "default" as const },
          { text: "Темы организации", action: "organization-topics", variant: "outline" as const },
          { text: "Объявления", action: "announcements", variant: "outline" as const },
        ]
      case "Модератор":
        return [
          { text: "Жалобы", action: "complaints", variant: "default" as const },
          { text: "Модерация тем", action: "moderate-topics", variant: "outline" as const },
          { text: "Статистика форума", action: "forum-stats", variant: "outline" as const },
        ]
      case "Админ":
        return [
          { text: "Панель управления", action: "admin-panel", variant: "default" as const },
          { text: "Управление пользователями", action: "manage-users", variant: "outline" as const },
          { text: "Настройки форума", action: "forum-settings", variant: "outline" as const },
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
