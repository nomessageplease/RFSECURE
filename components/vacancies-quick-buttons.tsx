"use client"

import { Button } from "@/components/ui/button"
import { useRegisterAction } from "@/hooks/use-register-action"

interface VacanciesQuickButtonsProps {
  role?: string
}

export default function VacanciesQuickButtons({ role = "Гость" }: VacanciesQuickButtonsProps) {
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
          { text: "Просмотреть вакансии", action: "browse-vacancies", variant: "outline" as const },
        ]
      case "Новичок":
        return [
          { text: "Создать резюме", action: "create-resume", variant: "default" as const },
          { text: "Найти вакансии для новичков", action: "find-entry-level", variant: "outline" as const },
        ]
      case "Охранник":
        return [
          { text: "Найти вакансии", action: "find-vacancies", variant: "default" as const },
          { text: "Мои отклики", action: "my-applications", variant: "outline" as const },
          { text: "Избранные вакансии", action: "favorite-vacancies", variant: "outline" as const },
        ]
      case "Представитель организации":
        return [
          { text: "Создать вакансию", action: "create-vacancy", variant: "default" as const },
          { text: "Мои вакансии", action: "my-vacancies", variant: "outline" as const },
          { text: "Отклики кандидатов", action: "candidate-responses", variant: "outline" as const },
        ]
      case "Модератор":
        return [
          { text: "Вакансии на проверке", action: "vacancies-on-review", variant: "default" as const },
          { text: "Жалобы на вакансии", action: "vacancy-complaints", variant: "outline" as const },
          { text: "Статистика модерации", action: "moderation-stats", variant: "outline" as const },
        ]
      case "Админ":
        return [
          { text: "Управление вакансиями", action: "manage-vacancies", variant: "default" as const },
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
