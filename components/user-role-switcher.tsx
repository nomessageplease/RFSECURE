"use client"

import type React from "react"
import { useState, createContext, useContext, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useUserRole } from "@/hooks/use-user-role"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Shield, User, Building2 } from "lucide-react"

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

const roles = [
  { id: "user", name: "Пользователь", icon: User },
  { id: "chop", name: "ЧОП", icon: Building2 },
  { id: "admin", name: "Администратор", icon: Shield },
]

export function UserRoleSwitcher() {
  const { role, setRole } = useUserRole()

  const currentRole = roles.find((r) => r.id === role)
  const Icon = currentRole?.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <span className="hidden md:inline">
            {currentRole?.name || "Роль"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {roles.map((roleOption) => {
          const RoleIcon = roleOption.icon
          return (
            <DropdownMenuItem
              key={roleOption.id}
              onClick={() => setRole(roleOption.id)}
              className="gap-2"
            >
              <RoleIcon className="h-4 w-4" />
              <span>{roleOption.name}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
