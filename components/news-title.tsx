"use client"

import { useEffect, useState } from "react"

interface NewsTitleProps {
  role?: string
}

export default function NewsTitle({ role = "Гость" }: NewsTitleProps) {
  const [userName, setUserName] = useState("")

  // В реальном приложении это будет приходить из контекста авторизации
  useEffect(() => {
    // Имитация получения имени пользователя
    if (role !== "Гость") {
      setUserName("Иван")
    }
  }, [role])

  const getTitleContent = () => {
    const baseTitle = <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Новости охранной отрасли</h1>

    switch (role) {
      case "Гость":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              Добро пожаловать в раздел новостей! Зарегистрируйтесь, чтобы видеть полный контент.
            </p>
          </>
        )
      case "Новичок":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `Привет, ${userName}! ` : "Привет! "}
              Ознакомьтесь с последними новостями отрасли.
            </p>
          </>
        )
      case "Охранник":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              следите за актуальными событиями и обновлениями.
            </p>
          </>
        )
      case "Представитель организации":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              публикуйте новости вашей организации и следите за отраслевыми событиями.
            </p>
          </>
        )
      case "Модератор":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              управляйте новостным контентом и проверяйте публикации.
            </p>
          </>
        )
      case "Админ":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              администрируйте раздел новостей и управляйте публикациями.
            </p>
          </>
        )
      default:
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">Будьте в курсе последних событий охранной отрасли</p>
          </>
        )
    }
  }

  return <div className="text-left">{getTitleContent()}</div>
}
