"use client"

import { useEffect, useState } from "react"

interface NotificationsTitleProps {
  role?: string
}

export default function NotificationsTitle({ role = "Гость" }: NotificationsTitleProps) {
  const [userName, setUserName] = useState("")

  // В реальном приложении это будет приходить из контекста авторизации
  useEffect(() => {
    // Имитация получения имени пользователя
    if (role !== "Гость") {
      setUserName("Иван")
    }
  }, [role])

  const getTitleContent = () => {
    const baseTitle = <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Уведомления</h1>

    switch (role) {
      case "Гость":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              Зарегистрируйтесь, чтобы получать персональные уведомления о важных событиях.
            </p>
          </>
        )
      case "Новичок":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `Привет, ${userName}! ` : "Привет! "}
              Здесь вы найдете все важные уведомления и обновления.
            </p>
          </>
        )
      case "Охранник":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              следите за откликами на вакансии, сообщениями и важными обновлениями.
            </p>
          </>
        )
      case "Представитель организации":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              получайте уведомления о новых кандидатах, заявках и важных событиях.
            </p>
          </>
        )
      case "Модератор":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              отслеживайте жалобы, заявки на модерацию и системные уведомления.
            </p>
          </>
        )
      case "Админ":
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">
              {userName ? `${userName}, ` : ""}
              контролируйте все системные уведомления и важные события платформы.
            </p>
          </>
        )
      default:
        return (
          <>
            {baseTitle}
            <p className="text-lg text-gray-600">Будьте в курсе всех важных событий на платформе</p>
          </>
        )
    }
  }

  return <div className="text-left">{getTitleContent()}</div>
}
