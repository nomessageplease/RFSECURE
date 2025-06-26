"use client"

import { useEffect, useState } from "react"

interface ForumTitleProps {
  role?: string
}

export default function ForumTitle({ role = "Гость" }: ForumTitleProps) {
  const [userName, setUserName] = useState("")

  // В реальном приложении это будет приходить из контекста авторизации
  useEffect(() => {
    // Имитация получения имени пользователя
    if (role !== "Гость") {
      setUserName("Иван")
    }
  }, [role])

  const getTitleContent = () => {
    const baseTitle = <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Форум охранной отрасли</h1>

    switch (role) {
      case "Гость":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              Добро пожаловать на форум! Зарегистрируйтесь, чтобы создавать темы и участвовать в обсуждениях.
            </p>
          </>
        )
      case "Новичок":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `Привет, ${userName}! ` : "Привет! "}
              Начните общение — создавайте темы и делитесь опытом.
            </p>
          </>
        )
      case "Охранник":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              ищите ответы и делитесь знаниями с коллегами.
            </p>
          </>
        )
      case "Представитель организации":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              участвуйте в обсуждениях и представляйте свою организацию.
            </p>
          </>
        )
      case "Модератор":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              следите за порядком на форуме и модерируйте обсуждения.
            </p>
          </>
        )
      case "Админ":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              управляйте форумом и контролируйте активность пользователей.
            </p>
          </>
        )
      default:
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">Место для профессионального общения охранников</p>
          </>
        )
    }
  }

  return <div className="text-left">{getTitleContent()}</div>
}
