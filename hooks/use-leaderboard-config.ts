"use client"

import type { LeaderboardType } from "./use-leaderboard-data"

export interface LeaderboardFilter {
  id: string
  label: string
  disabled?: boolean
}

export const useLeaderboardConfig = (type: LeaderboardType, role = "Гость") => {
  // Конфигурация фильтров для организаций
  const organizationFilters: LeaderboardFilter[] = [
    { id: "overall", label: "Общий рейтинг" },
    { id: "reliability", label: "Надежность" },
    { id: "salary", label: "Зарплата" },
    { id: "conditions", label: "Условия работы" },
    { id: "career", label: "Карьерный рост" },
    { id: "management", label: "Руководство" },
  ]

  // Конфигурация фильтров для форума
  const forumFilters: LeaderboardFilter[] = [
    { id: "rating", label: "По рейтингу" },
    { id: "messages", label: "По сообщениям" },
    { id: "activity", label: "По активности" },
  ]

  // Получение доступных фильтров с учетом роли
  const getAvailableFilters = (): LeaderboardFilter[] => {
    const filters = type === "organizations" ? organizationFilters : forumFilters

    if (role === "Гость" && type === "organizations") {
      return filters.map((filter) => ({
        ...filter,
        disabled: filter.id !== "overall",
      }))
    }

    return filters.map((filter) => ({
      ...filter,
      disabled: false,
    }))
  }

  // Получение цвета роли пользователя
  const getRoleColor = (userRole: string) => {
    const colors = {
      Модератор: "bg-blue-500 text-white",
      "Представитель организации": "bg-green-500 text-white",
      Охранник: "bg-gray-500 text-white",
      Новичок: "bg-yellow-500 text-white",
    }
    return colors[userRole as keyof typeof colors] || "bg-gray-500 text-white"
  }

  // Получение сокращенного названия роли
  const getRoleShort = (userRole: string) => {
    const shorts = {
      Модератор: "Модератор",
      "Представитель организации": "Представитель",
      Охранник: "Охранник",
      Новичок: "Новичок",
    }
    return shorts[userRole as keyof typeof shorts] || userRole
  }

  return {
    availableFilters: getAvailableFilters(),
    getRoleColor,
    getRoleShort,
  }
}
