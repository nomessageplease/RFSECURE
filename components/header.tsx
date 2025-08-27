"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"
import NotificationsPopup from "./notifications-popup"

export default function Header() {
  const [currentRole, setCurrentRole] = useState("Гость")
  const [currentPage, setCurrentPage] = useState("main")
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

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
          className="relative p-2 text-gray-600 hover:text-blue-600"
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Личный кабинет */}
        <button
          className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600"
          onClick={() => handleNavigation("profile")}
        >
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">Личный кабинет</span>
        </button>
      </div>
    )
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Логотип */}
          <div className="flex items-center flex-shrink-0">
            <img src="/placeholder.svg?height=40&width=40" alt="Логотип" className="h-10 w-10" />
          </div>

          {/* Навигация */}
          <nav className="flex items-center justify-center space-x-8 flex-1">
            <button
              className={`font-medium px-3 py-2 ${currentPage === "main" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => handleNavigation("main")}
            >
              Главная
            </button>
            <button
              className={`font-medium px-3 py-2 ${currentPage === "organizations" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => handleNavigation("organizations")}
            >
              Организации
            </button>
            <button
              className={`font-medium px-3 py-2 ${currentPage === "vacancies" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => handleNavigation("vacancies")}
            >
              Вакансии
            </button>
            <button
              className={`font-medium px-3 py-2 ${currentPage === "forum" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => handleNavigation("forum")}
            >
              Форум
            </button>
            <button
              className={`font-medium px-3 py-2 ${currentPage === "news" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => handleNavigation("news")}
            >
              Новости
            </button>
          </nav>

          {/* Личное */}
          <div className="flex items-center flex-shrink-0">{renderPersonalModule()}</div>
        </div>
      </header>

      {/* Попап уведомлений */}
      <NotificationsPopup isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </>
  )
}
