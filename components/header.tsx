"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, User, Menu, X } from "lucide-react"
import NotificationsPopup from "./notifications-popup"

export default function Header() {
  const [currentRole, setCurrentRole] = useState("Гость")
  const [currentPage, setCurrentPage] = useState("main")
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

    const handlePageChange = (event: CustomEvent) => {
      setCurrentPage(event.detail.page)
      setIsMobileMenuOpen(false) // Закрываем мобильное меню при навигации
    }

    window.addEventListener("roleChanged", handleRoleChange as EventListener)
    window.addEventListener("pageChanged", handlePageChange as EventListener)
    return () => {
      window.removeEventListener("roleChanged", handleRoleChange as EventListener)
      window.removeEventListener("pageChanged", handlePageChange as EventListener)
    }
  }, [])

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page },
      }),
    )
  }

  const renderPersonalModule = () => {
    if (currentRole === "Гость") {
      return (
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => handleNavigation("login")}>
            Войти
          </Button>
          <Button size="sm" onClick={() => handleNavigation("register")}>
            Зарегистрироваться
          </Button>
        </div>
      )
    }

    return (
      <div className="flex items-center space-x-4">
        {/* Уведомления */}
        <button
          className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Личный кабинет */}
        <button
          className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
          onClick={() => handleNavigation("profile")}
        >
          <User className="h-5 w-5" />
          <span className="text-sm font-medium hidden sm:inline">Личный кабинет</span>
        </button>
      </div>
    )
  }

  const navigationItems = [
    { key: "main", label: "Главная" },
    { key: "organizations", label: "Организации" },
    { key: "vacancies", label: "Вакансии" },
    { key: "forum", label: "Форум" },
    { key: "news", label: "Новости" },
  ]

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Логотип */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => handleNavigation("main")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img src="/placeholder.svg?height=40&width=40" alt="RusGuard" className="h-10 w-10" />
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-gray-900">RusGuard</div>
                <div className="text-xs text-gray-500">Платформа охранной отрасли</div>
              </div>
            </button>
          </div>

          {/* Навигация для десктопа */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 flex-1">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.key
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => handleNavigation(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Личное для десктопа */}
          <div className="hidden lg:flex items-center flex-shrink-0">{renderPersonalModule()}</div>

          {/* Мобильное меню кнопка */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 mt-4">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  className={`font-medium px-3 py-2 rounded-lg text-left transition-colors ${
                    currentPage === item.key
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavigation(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200">{renderPersonalModule()}</div>
          </div>
        )}
      </header>

      {/* Попап уведомлений */}
      <NotificationsPopup isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </>
  )
}
