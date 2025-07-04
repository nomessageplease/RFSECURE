"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/hero-section"
import ChopCards from "@/components/chop-cards"
import VacancyCards from "@/components/vacancy-cards"
import NewsCards from "@/components/news-cards"
import PlatformActivity from "@/components/platform-activity"

export default function MainPage() {
  const [currentRole, setCurrentRole] = useState("Гость")

  // Загружаем роль из localStorage при инициализации
  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      const roles = [
        "Гость",
        "Новичок",
        "Сотрудник охраны",
        "Управляющий ЧОПа",
        "Менеджер ЧОПа",
        "Модератор",
        "Саппорт",
        "Суперадмин",
      ]
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
    <main className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 min-h-screen">
      {/* Героическая секция */}
      <HeroSection role={currentRole} />

      {/* Основной контент */}
      <section className="relative py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Секция организаций */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <ChopCards />
          </div>

          {/* Секция вакансий */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <div className="mb-6">
              <div className="flex items-center">
                <span className="inline-block w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 mr-3 rounded-full"></span>
                <span className="text-lg font-semibold text-gray-700">Актуальные вакансии</span>
              </div>
            </div>
            <VacancyCards
              role={currentRole}
              view="small"
              filters={{ region: "all", workSchedule: [], experience: "none" }}
              sort={{ field: "date", direction: "desc" }}
            />
          </div>

          {/* Секция новостей */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <NewsCards />
          </div>

          {/* Активность платформы */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <PlatformActivity />
          </div>
        </div>
      </section>

      {/* Декоративный элемент внизу */}
      <div className="h-20 bg-gradient-to-t from-white to-transparent"></div>
    </main>
  )
}
