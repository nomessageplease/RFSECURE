"use client"

import { useEffect, useState } from "react"
import LoginHeader from "@/components/login-header"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
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
    <main className="flex-1 bg-gray-50">
      {/* Шапка страницы входа */}
      <section className="py-20 border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <LoginHeader role={currentRole} />
        </div>
      </section>

      {/* Форма входа */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
