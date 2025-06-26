"use client"

import { useEffect, useState } from "react"
import ProfileHeader from "@/components/profile-header"
import ProfileDashboard from "@/components/profile-dashboard"

export default function ProfilePage() {
  const [currentRole, setCurrentRole] = useState("Гость")

  // Загружаем роль из localStorage при инициализации
  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      const roles = ["Гость", "Новичок", "Охранник", "Представитель организации", "Модератор", "Админ"]
      const index = Number.parseInt(savedRoleIndex, 10)
      setCurrentRole(roles[index])
    }
  }, [])

  // Слушаем изменения роли из RoleSwitcher
  useEffect(() => {
    const handleRoleChange = (event: CustomEvent) => {
      setCurrentRole(event.detail.role)
    }

    window.addEventListener("roleChanged", handleRoleChange as EventListener)
    return () => {
      window.removeEventListener("roleChanged", handleRoleChange as EventListener)
    }
  }, [])

  return (
    <main className="flex-1">
      {/* Шапка личного кабинета */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <ProfileHeader role={currentRole} />
        </div>
      </section>

      {/* Основной контент - упрощенная панель управления */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <ProfileDashboard role={currentRole} />
        </div>
      </section>
    </main>
  )
}
