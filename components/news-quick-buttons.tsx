"use client"

import { Button } from "@/components/ui/button"

interface NewsQuickButtonsProps {
  role?: string
}

export default function NewsQuickButtons({ role = "Гость" }: NewsQuickButtonsProps) {
  const handleButtonClick = (action: string) => {
    console.log(`Action clicked: ${action} for role: ${role}`)
    // Здесь будет логика навигации или других действий
  }

  const getButtonsForRole = () => {
    switch (role) {
      case "Гость":
        return [
          { text: "Зарегистрироваться", action: "register", variant: "default" as const },
          { text: "Популярные новости", action: "popular-news", variant: "outline" as const },
        ]
      case "Новичок":
        return [
          { text: "Подписаться на рассылку", action: "subscribe-newsletter", variant: "default" as const },
          { text: "Избранные новости", action: "favorite-news", variant: "outline" as const },
        ]
      case "Охранник":
        return [
          { text: "Мои избранные", action: "my-favorites", variant: "default" as const },
          { text: "Новости по регионам", action: "regional-news", variant: "outline" as const },
          { text: "Подписки", action: "subscriptions", variant: "outline" as const },
        ]
      case "Представитель организации":
        return [
          { text: "Опубликовать новость", action: "publish-news", variant: "default" as const },
          { text: "Мои публикации", action: "my-publications", variant: "outline" as const },
          { text: "Аналитика просмотров", action: "view-analytics", variant: "outline" as const },
        ]
      case "Модератор":
        return [
          { text: "Новости на проверке", action: "news-on-review", variant: "default" as const },
          { text: "Жалобы на новости", action: "news-complaints", variant: "outline" as const },
          { text: "Статистика модерации", action: "moderation-stats", variant: "outline" as const },
        ]
      case "Админ":
        return [
          { text: "Управление новостями", action: "manage-news", variant: "default" as const },
          { text: "Управление категориями", action: "manage-categories", variant: "outline" as const },
          { text: "Аналитика раздела", action: "section-analytics", variant: "outline" as const },
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
