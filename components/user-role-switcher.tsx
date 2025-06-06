"use client"

import type React from "react"
import { useState, createContext, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export type UserRole = "guard" | "chop" | "moderator" | "admin"

export interface UserRoleContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
}

export const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined)

export function useUserRole() {
  const context = useContext(UserRoleContext)
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider")
  }
  return context
}

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth()
  const [userRole, setUserRole] = useState<UserRole>("guard")

  // Обновляем роль на основе профиля пользователя
  useEffect(() => {
    if (profile?.role) {
      setUserRole(profile.role as UserRole)
    }
  }, [profile])

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
      {/* Показываем переключатель только для суперадмина */}
      {user?.email === "superadmin@chopy.ru" && <UserRoleSwitcher />}
    </UserRoleContext.Provider>
  )
}

function UserRoleSwitcher() {
  const { userRole, setUserRole } = useUserRole()

  const toggleUserRole = () => {
    let newRole: UserRole
    if (userRole === "guard") newRole = "chop"
    else if (userRole === "chop") newRole = "moderator"
    else if (userRole === "moderator") newRole = "admin"
    else newRole = "guard"

    setUserRole(newRole)
  }

  const getRoleLabel = () => {
    switch (userRole) {
      case "guard":
        return "👤 Охранник"
      case "chop":
        return "🏢 ЧОП"
      case "moderator":
        return "🛡️ Модератор"
      case "admin":
        return "⚙️ Админ"
    }
  }

  const getRoleColor = () => {
    switch (userRole) {
      case "guard":
        return "bg-blue-600 hover:bg-blue-700"
      case "chop":
        return "bg-green-600 hover:bg-green-700"
      case "moderator":
        return "bg-orange-600 hover:bg-orange-700"
      case "admin":
        return "bg-red-600 hover:bg-red-700"
    }
  }

  return (
    <Button
      onClick={toggleUserRole}
      className={`fixed bottom-4 right-4 z-[9999] ${getRoleColor()} text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105`}
    >
      {getRoleLabel()}
    </Button>
  )
}

export { UserRoleSwitcher }
