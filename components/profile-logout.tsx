"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LogOut, UserX, RefreshCw } from "lucide-react"
import { useLoginAction } from "@/hooks/use-login-action"
import { useRegisterAction } from "@/hooks/use-register-action"

export default function ProfileLogout() {
  const { handleLogin } = useLoginAction()
  const { handleRegister } = useRegisterAction()

  const handleLogout = () => {
    // Очищаем данные пользователя
    localStorage.removeItem("currentRoleIndex")

    // Уведомляем о смене роли на "Гость"
    const event = new CustomEvent("roleChanged", {
      detail: { role: "Гость" },
    })
    window.dispatchEvent(event)

    console.log("Пользователь вышел из системы")
  }

  const handleSwitchAccount = () => {
    handleLogout()
    // Дополнительная логика для смены аккаунта
    console.log("Смена аккаунта")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Войти</span>
          </button>

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <UserX className="h-4 w-4" />
            <span>Зарегистрироваться</span>
          </button>

          <button
            onClick={handleSwitchAccount}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Сменить аккаунт</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full border border-red-300 text-red-700 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Выйти</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
