"use client"

import { useEffect, useState } from "react"

interface VacanciesTitleProps {
  role?: string
}

export default function VacanciesTitle({ role = "Гость" }: VacanciesTitleProps) {
  const [userName, setUserName] = useState("")

  // В реальном приложении это будет приходить из контекста авторизации
  useEffect(() => {
    // Имитация получения имени пользователя
    if (role !== "Гость") {
      setUserName("Иван")
    }
  }, [role])

  const getTitleContent = () => {
    const baseTitle = <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Вакансии в охранной отрасли</h1>

    switch (role) {
      case "Гость":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              Добро пожаловать в раздел вакансий! Зарегистрируйтесь, чтобы откликаться на вакансии и сохранять
              избранное.
            </p>
          </>
        )
      case "Новичок":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `Привет, ${userName}! ` : "Привет! "}
              Ознакомьтесь с актуальными вакансиями и начните строить карьеру в охранной отрасли.
            </p>
          </>
        )
      case "Охранник":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              найдите лучшие предложения работы в вашем регионе и подайте заявку на подходящие вакансии.
            </p>
          </>
        )
      case "Представитель организации":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              Управляйте вакансиями вашей организации: создавайте, редактируйте и анализируйте отклики кандидатов.
            </p>
          </>
        )
      case "Модератор":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              Проверяйте новые вакансии и следите за соблюдением правил размещения объявлений.
            </p>
          </>
        )
      case "Админ":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              Администрируйте раздел вакансий: управляйте вакансиями, категориями и модераторами.
            </p>
          </>
        )
      default:
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">Найдите работу своей мечты в сфере охранной деятельности</p>
          </>
        )
    }
  }

  return <div className="text-left">{getTitleContent()}</div>
}
