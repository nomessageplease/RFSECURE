"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/hero-section"
import ChopCards from "@/components/chop-cards"
import VacancyCards from "@/components/vacancy-cards"
import NewsCards from "@/components/news-cards"
import PlatformActivity from "@/components/platform-activity"
import MyOrganization from "@/components/my-organization"

export default function MainPage() {
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
      {/* Hero секция */}
      <HeroSection role={currentRole} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Моя организация - только для представителей */}
        {currentRole === "Представитель организации" && (
          <section>
            <MyOrganization role={currentRole} />
          </section>
        )}

        {/* Организации */}
        <section>
          <ChopCards role={currentRole} />
        </section>

        {/* Вакансии */}
        <section>
          <VacancyCards role={currentRole} />
        </section>

        {/* Новости */}
        <section>
          <NewsCards role={currentRole} />
        </section>

        {/* Активность платформы */}
        <section>
          <PlatformActivity role={currentRole} />
        </section>
      </div>
    </main>
  )
}
