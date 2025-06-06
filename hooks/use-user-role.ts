"use client"

import { createContext, useContext } from "react"

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
