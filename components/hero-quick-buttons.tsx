"use client"

import { Button } from "@/components/ui/button"

interface HeroQuickButtonsProps {
  role?: string
}

export default function HeroQuickButtons({ role = "Гость" }: HeroQuickButtonsProps) {
  const handleButtonClick = (action: string) => {
    console.log(`Action clicked: ${action} for role: ${role}`)
    // Здесь будет логика навигации или других действий
  }

  const getButtonsForRole = () => {
    switch (role) {
      case "Гость":
        return [
          { text: "Найти работу", action: "find-work", variant: "default" as const },
          { text: "Посмотреть организации", action: "view-organizations", variant: "outline" as const },
          { text: "Зарегистрироваться", action: "register", variant: "default" as const },
          { text: "Как это работает?", action: "how-it-works", variant: "outline" as const },
        ]
      case "Новичок":
        return [
          { text: "Найти работу", action: "find-work", variant: "default" as const },
          { text: "Я представитель ЧОПа", action: "i-represent-chop", variant: "outline" as const },
          { text: "Изучить ЧОПы", action: "study-chops", variant: "outline" as const },
        ]
      case "Охранник":
        return [
          { text: "Найти работу", action: "find-work", variant: "default" as const },
          { text: "Изучить ЧОПы", action: "study-chops", variant: "outline" as const },
          { text: "Зайти на форум", action: "go-to-forum", variant: "outline" as const },
        ]
      case "Представитель организации":
        return [
          { text: "Разместить вакансию", action: "post-vacancy", variant: "default" as const },
          { text: "Мои вакансии", action: "my-vacancies", variant: "outline" as const },
          { text: "Профиль организации", action: "change-org-profile", variant: "outline" as const },
          { text: "Изучить конкурентов", action: "study-competitors", variant: "outline" as const },
        ]
      case "Модератор":
        return [
          { text: "Заявки на подключение", action: "connection-requests", variant: "default" as const },
          { text: "Жалобы", action: "complaints", variant: "outline" as const },
          { text: "Статистика площадки", action: "platform-stats", variant: "outline" as const },
        ]
      case "Админ":
        return [
          { text: "Жалобы", action: "complaints", variant: "default" as const },
          { text: "Статистика площадки", action: "platform-stats", variant: "outline" as const },
          { text: "Модераторы", action: "moderators", variant: "outline" as const },
          { text: "Статистика", action: "statistics", variant: "outline" as const },
        ]
      default:
        return []
    }
  }

  const buttons = getButtonsForRole()

  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant}
          className={`flex-1 min-w-0 justify-start text-left h-auto py-4 px-6 rounded-xl transition-all ${
            button.variant === "default"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl text-white border-0"
              : "bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 shadow-sm hover:shadow-md"
          }`}
          onClick={() => handleButtonClick(button.action)}
        >
          <span className="font-medium">{button.text}</span>
        </Button>
      ))}
    </div>
  )
}
