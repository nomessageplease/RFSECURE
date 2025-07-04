"use client"

import { useState, useEffect } from "react"
import HeroSection from "../hero-section"
import ChopCards from "../chop-cards"
import VacancyCards from "../vacancy-cards"
import NewsCards from "../news-cards"
import PlatformActivity from "../platform-activity"

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

  // Слушаем изменения роли
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero секция */}
      <HeroSection role={currentRole} />

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Секция организаций */}
        <section>
          <ChopCards />
        </section>

        {/* Секция вакансий */}
        <section>
          <VacancyCards role={currentRole} />
        </section>

        {/* Секция новостей */}
        <section>
          <NewsCards />
        </section>

        {/* Секция активности платформы */}
        <section>
          <PlatformActivity />
        </section>
      </div>
    </div>
  )
}
