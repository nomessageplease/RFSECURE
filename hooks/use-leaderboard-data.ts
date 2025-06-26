"use client"

import { useState, useMemo } from "react"

export type LeaderboardType = "organizations" | "forum"

interface ChopData {
  id: number
  name: string
  logo: string
  rating: {
    overall: number
    reliability: number
    salary: number
    conditions: number
    career: number
    management: number
  }
  city: string
  vacancies: number
  salaryRange?: string
  verified: boolean
  hasComplaints?: boolean
  position: number
}

interface UserData {
  id: number
  name: string
  avatar: string
  role: string
  messagesCount: number
  rating: number
  position: number
  isOnline: boolean
}

// Генерация данных ЧОПов
const generateChopsData = (): ChopData[] => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `ЧОП "Безопасность ${index + 1}"`,
    logo: `/placeholder.svg?height=32&width=32&query=chop${index + 1}`,
    rating: {
      overall: 5 - (index % 3) * 0.5,
      reliability: 5 - (index % 4) * 0.7,
      salary: 5 - (index % 5) * 0.6,
      conditions: 5 - (index % 3) * 0.8,
      career: 5 - (index % 4) * 0.5,
      management: 5 - (index % 3) * 0.4,
    },
    city: index % 3 === 0 ? "Москва" : index % 2 === 0 ? "СПб" : "Казань",
    vacancies: 15 - index,
    salaryRange: `${50 + index * 5}-${80 + index * 5}к`,
    verified: index % 2 === 0,
    hasComplaints: index === 3 || index === 7,
    position: index + 1,
  }))
}

// Генерация данных участников форума
const generateForumData = (): UserData[] => {
  const names = [
    "Иван Петров",
    "Мария Сидорова",
    "Алексей Козлов",
    "Елена Морозова",
    "Дмитрий Волков",
    "Анна Федорова",
    "Сергей Николаев",
    "Ольга Васильева",
    "Михаил Смирнов",
    "Татьяна Кузнецова",
  ]

  const roles = ["Модератор", "Охранник", "Представитель организации", "Новичок"]

  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: names[index],
    avatar: `/placeholder.svg?height=40&width=40&query=user${index + 1}`,
    role: roles[index % 4],
    messagesCount: 500 - index * 45,
    rating: 1000 - index * 85,
    position: index + 1,
    isOnline: Math.random() > 0.6,
  }))
}

export const useLeaderboardData = (type: LeaderboardType, role = "Гость") => {
  // Состояние фильтров
  const [selectedFilter, setSelectedFilter] = useState(type === "organizations" ? "overall" : "rating")

  // Базовые данные
  const chopsData = useMemo(() => generateChopsData(), [])
  const forumData = useMemo(() => generateForumData(), [])

  // Получение текущего рейтинга для ЧОПа
  const getCurrentRating = (chop: ChopData) => {
    switch (selectedFilter) {
      case "overall":
        return chop.rating.overall
      case "reliability":
        return chop.rating.reliability
      case "salary":
        return chop.rating.salary
      case "conditions":
        return chop.rating.conditions
      case "career":
        return chop.rating.career
      case "management":
        return chop.rating.management
      default:
        return chop.rating.overall
    }
  }

  // Сортированные данные
  const sortedData = useMemo(() => {
    if (type === "organizations") {
      return [...chopsData]
        .sort((a, b) => {
          const aRating = getCurrentRating(a)
          const bRating = getCurrentRating(b)
          return bRating - aRating
        })
        .map((chop, index) => ({ ...chop, position: index + 1 }))
    } else {
      const sorted = [...forumData]
      if (selectedFilter === "messages") {
        sorted.sort((a, b) => b.messagesCount - a.messagesCount)
      } else if (selectedFilter === "rating") {
        sorted.sort((a, b) => b.rating - a.rating)
      } else if (selectedFilter === "activity") {
        sorted.sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0))
      }
      return sorted.map((user, index) => ({ ...user, position: index + 1 }))
    }
  }, [type, selectedFilter, chopsData, forumData])

  // Обработчик изменения фильтра
  const handleFilterChange = (filterId: string) => {
    if (role === "Гость" && type === "organizations" && filterId !== "overall") {
      return
    }
    setSelectedFilter(filterId)
  }

  // Обработчик клика по профилю
  const handleProfileClick = (id: number) => {
    if (role === "Гость") {
      alert(
        `Для ${type === "organizations" ? "просмотра профиля организации" : "просмотра профилей"} необходимо зарегистрироваться`,
      )
      return
    }
    console.log(`Opening ${type} profile for id ${id}`)
  }

  return {
    selectedFilter,
    sortedData,
    handleFilterChange,
    handleProfileClick,
    getCurrentRating,
  }
}
