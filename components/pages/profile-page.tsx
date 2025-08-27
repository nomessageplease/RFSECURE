"use client"

import { useEffect, useState } from "react"
import ProfileHeader from "@/components/profile-header"
import ProfileInfo from "@/components/profile-info"
import ProfileActions from "@/components/profile-actions"

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
      {/* Шапка личного кабинета - полная ширина */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <ProfileHeader role={currentRole} />
        </div>
      </section>

      {/* Основной контент: Информация + Действия */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Информация - основная область */}
            <div className="lg:col-span-2 border-r border-gray-200 pr-8">
              <ProfileInfo role={currentRole} />
            </div>

            {/* Действия - боковая панель */}
            <div className="lg:col-span-1">
              <ProfileActions role={currentRole} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
