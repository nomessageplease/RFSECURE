"use client"

import { useEffect, useState } from "react"
import PageHeaderSection from "@/components/page-header-section"
import Leaderboard from "@/components/leaderboard"
import OrganizationsList from "@/components/organizations-list"

export default function OrganizationsPage() {
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
      {/* Универсальная секция с шапкой и быстрыми кнопками */}
      <PageHeaderSection page="organizations" role={currentRole} />

      {/* Лидерборд чопов - под шапкой страницы */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100/50 shadow-sm">
            <Leaderboard type="organizations" role={currentRole} />
          </div>
        </div>
      </section>

      {/* Основной контент: Список организаций */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <OrganizationsList role={currentRole} />
          </div>
        </div>
      </section>
    </main>
  )
}
