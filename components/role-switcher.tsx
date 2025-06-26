"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const roles = ["Гость", "Новичок", "Охранник", "Представитель организации", "Модератор", "Админ"]

export default function RoleSwitcher() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  // Загружаем роль из localStorage при инициализации
  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      const index = Number.parseInt(savedRoleIndex, 10)
      setCurrentRoleIndex(index)
      // Отправляем событие с сохраненной ролью
      window.dispatchEvent(
        new CustomEvent("roleChanged", {
          detail: { role: roles[index] },
        }),
      )
    }
  }, [])

  const switchRole = () => {
    const newIndex = (currentRoleIndex + 1) % roles.length
    setCurrentRoleIndex(newIndex)

    // Сохраняем роль в localStorage
    localStorage.setItem("currentRoleIndex", newIndex.toString())

    // Отправляем событие об изменении роли
    window.dispatchEvent(
      new CustomEvent("roleChanged", {
        detail: { role: roles[newIndex] },
      }),
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        className="bg-white shadow-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
        onClick={switchRole}
      >
        {roles[currentRoleIndex]}
      </Button>
    </div>
  )
}
