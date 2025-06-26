"use client"

import { useEffect, useState } from "react"
import PageHeaderSection from "@/components/page-header-section"
import NewsListSection from "@/components/news-list-section"

export default function NewsPage() {
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
      <PageHeaderSection page="news" role={currentRole} />

      {/* Основной контент: Новости */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <NewsListSection role={currentRole} />
        </div>
      </section>
    </main>
  )
}
