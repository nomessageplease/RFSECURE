"use client"

import { useEffect, useState } from "react"
import RegisterHeader from "@/components/register-header"
import RegisterForm from "@/components/register-form"

export default function RegisterPage() {
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
      {/* Шапка страницы регистрации */}
      <section className="py-20 border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <RegisterHeader role={currentRole} />
        </div>
      </section>

      {/* Форма регистрации */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <RegisterForm />
        </div>
      </section>
    </main>
  )
}
