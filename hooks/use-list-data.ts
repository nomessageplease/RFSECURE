"use client"

import { useState } from "react"

export type ListType = "organizations" | "vacancies" | "forum" | "news"

interface BaseFilters {
  [key: string]: any
}

interface BaseSort {
  field: string
  direction: "asc" | "desc"
}

// Дефолтные фильтры для каждого типа
const getDefaultFilters = (type: ListType): BaseFilters => {
  switch (type) {
    case "organizations":
      return {
        city: "all",
        foundedBefore: "all",
        hasRepresentative: "all",
      }
    case "vacancies":
      return {
        workSchedule: [],
        salaryFrom: "",
        salaryTo: "",
        salaryPeriod: "month",
        securityLicense: "none",
        objectType: [],
        region: "all",
        meals: "any",
        postType: [],
        experience: "none",
        allowCriminalRecord: false,
        paymentFrequency: "any",
        paymentType: "any",
        minEmployerRating: "any",
      }
    case "forum":
      return {
        sortType: "latest",
      }
    case "news":
      return {
        category: "all",
        region: "all",
        dateRange: "all",
        source: "all",
      }
    default:
      return {}
  }
}

// Дефолтная сортировка для каждого типа
const getDefaultSort = (type: ListType): BaseSort => {
  switch (type) {
    case "organizations":
      return { field: "rating", direction: "desc" }
    case "vacancies":
      return { field: "date", direction: "desc" }
    case "forum":
      return { field: "latest", direction: "desc" }
    case "news":
      return { field: "date", direction: "desc" }
    default:
      return { field: "date", direction: "desc" }
  }
}

// Дефолтный вид для каждого типа
const getDefaultView = (type: ListType): string => {
  switch (type) {
    case "organizations":
      return "list"
    case "vacancies":
      return "large"
    case "forum":
      return "list"
    case "news":
      return "list"
    default:
      return "list"
  }
}

export const useListData = (type: ListType) => {
  const [filters, setFilters] = useState<BaseFilters>(getDefaultFilters(type))
  const [sort, setSort] = useState<BaseSort>(getDefaultSort(type))
  const [view, setView] = useState<string>(getDefaultView(type))

  // Универсальный обработчик изменения фильтров
  const handleFilterChange = (key: string, value: any) => {
    if (key === "workSchedule" || key === "objectType" || key === "postType") {
      // Для массивов
      const currentArray = filters[key] || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value]

      setFilters({ ...filters, [key]: newArray })
    } else {
      setFilters({ ...filters, [key]: value })
    }
  }

  // Универсальный сброс фильтров
  const clearFilters = () => {
    setFilters(getDefaultFilters(type))
  }

  // Универсальный обработчик сортировки
  const handleSortChange = (field: string) => {
    if (sort.field === field) {
      setSort({
        field,
        direction: sort.direction === "asc" ? "desc" : "asc",
      })
    } else {
      setSort({
        field,
        direction: "desc",
      })
    }
  }

  // Универсальный обработчик смены вида
  const handleViewChange = (newView: string) => {
    setView(newView)
  }

  return {
    filters,
    sort,
    view,
    handleFilterChange,
    clearFilters,
    handleSortChange,
    handleViewChange,
    setFilters,
    setSort,
    setView,
  }
}
