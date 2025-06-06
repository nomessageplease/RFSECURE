"use client"

import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

export function RoleBadge() {
  const { profile } = useAuth()

  if (!profile) return null

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "guard":
        return { label: "Охранник", color: "bg-blue-100 text-blue-800" }
      case "chop":
        return { label: "ЧОП", color: "bg-green-100 text-green-800" }
      case "moderator":
        return { label: "Модератор", color: "bg-orange-100 text-orange-800" }
      case "admin":
        return { label: "Администратор", color: "bg-red-100 text-red-800" }
      default:
        return { label: "Пользователь", color: "bg-gray-100 text-gray-800" }
    }
  }

  const roleInfo = getRoleInfo(profile.role)

  return <Badge className={`${roleInfo.color} border-0`}>{roleInfo.label}</Badge>
}
