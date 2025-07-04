"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/hero-section"
import Leaderboard from "@/components/leaderboard"
import PlatformActivity from "@/components/platform-activity"
import NewsCards from "@/components/news-cards"

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

      {/* Объединенная секция: Организации + Преимущества + Новости + Активность */}
      <section className="relative py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Контейнер с общим фоном */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="space-y-8 p-8">
              {/* Лидерборд организаций - занимает всю ширину */}
              <div>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100/50">
                  {/* Заголовок секции */}
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-lg">🏆</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Рейтинг ЧОПов</h3>
                        <p className="text-sm text-gray-600">Лучшие охранные организации России</p>
                      </div>
                    </div>
                  </div>

                  {/* Компонент лидерборда */}
                  <div>
                    <Leaderboard type="organizations" role={currentRole} />
                  </div>
                </div>
              </div>

              {/* Преимущества платформы - занимает всю ширину */}
              <div>
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white/80 rounded-xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-200">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">Проверенная информация</h3>
                      <p className="text-gray-600 text-xs">Все данные проходят модерацию</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-200">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">Честные рейтинги</h3>
                      <p className="text-gray-600 text-xs">На основе реальных отзывов</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-200">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">Активное сообщество</h3>
                      <p className="text-gray-600 text-xs">Форум профессионалов</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-200">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">Рынок труда</h3>
                      <p className="text-gray-600 text-xs">Актуальные вакансии</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Секция новостей - теперь здесь */}
              <div>
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border border-orange-100/50">
                  <NewsCards />
                </div>
              </div>
            </div>

            {/* Разделитель */}
            <div className="mx-8">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Нижняя часть: Активность платформы */}
            <div className="p-8">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100/50">
                <PlatformActivity />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Декоративный элемент внизу */}
      <div className="h-20 bg-gradient-to-t from-white to-transparent"></div>
    </main>
  )
}
