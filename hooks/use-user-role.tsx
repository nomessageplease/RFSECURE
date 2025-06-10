"use client"

import { createContext, useContext, useState, useEffect } from "react"

type UserRole = "user" | "chop" | "admin"

interface UserRoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined)

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("user")

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole
    if (savedRole) {
      setRole(savedRole)
    }
  }, [])

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole)
    localStorage.setItem("userRole", newRole)
  }

  return (
    <UserRoleContext.Provider value={{ role, setRole: handleSetRole }}>
      {children}
    </UserRoleContext.Provider>
  )
}

export function useUserRole() {
  const context = useContext(UserRoleContext)
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider")
  }
  return context
} 