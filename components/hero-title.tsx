"use client"

import { useEffect, useState } from "react"

interface HeroTitleProps {
  role?: string
}

export default function HeroTitle({ role = "Гость" }: HeroTitleProps) {
  const [userName, setUserName] = useState("")

  // В реальном приложении это будет приходить из контекста авторизации
  useEffect(() => {
    // Имитация получения имени пользователя
    if (role !== "Гость") {
      setUserName("Иван")
    }
  }, [role])

  const getTitleContent = () => {
    const baseTitle = (
      <>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <span className="text-blue-600 relative">
            RusGuard
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></span>
          </span>{" "}
          – главный информационный портал охранной отрасли Российской Федерации!
        </h1>
      </>
    )

    switch (role) {
      case "Гость":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600 mb-6">
              Здесь вы можете просматривать информацию о ЧОПах и участвовать в обсуждениях после регистрации
            </p>
          </>
        )
      case "Новичок":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600 mb-6">
              {userName ? `${userName}, добро пожаловать на ` : "Добро пожаловать на "}
              <span className="font-medium">RusGuard</span>! Здесь вы можете узнать о возможностях портала, задать свои
              первые вопросы и получить помощь от сообщества.
            </p>
          </>
        )
      case "Охранник":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600 mb-6">
              {userName ? `${userName}, добро пожаловать на ` : "Добро пожаловать на "}
              <span className="font-medium">RusGuard</span>! Здесь вы можете найти или обсудить охранные организации.
            </p>
          </>
        )
      case "Представитель организации":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600 mb-6">
              {userName ? `${userName}, добро пожаловать на ` : "Добро пожаловать на "}
              <span className="font-medium">RusGuard</span>! Здесь вы можете управлять профилем своей организации,
              публиковать вакансии и участвовать в форуме.
            </p>
          </>
        )
      case "Модератор":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600 mb-6">
              {userName ? `${userName}, добро пожаловать на ` : "Добро пожаловать на "}
              <span className="font-medium">RusGuard</span>! Здесь вы можете модерировать обсуждения, проверять новые
              публикации и следить за порядком на форуме.
            </p>
          </>
        )
      case "Админ":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600 mb-6">
              {userName ? `${userName}, добро пожаловать на ` : "Добро пожаловать на "}
              <span className="font-medium">RusGuard</span>! Здесь вы можете управлять пользователями, назначать роли и
              настраивать параметры работы системы.
            </p>
          </>
        )
      default:
        return baseTitle
    }
  }

  return <div className="text-left">{getTitleContent()}</div>
}
