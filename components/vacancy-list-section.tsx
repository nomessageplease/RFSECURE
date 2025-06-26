"use client"

import { useState } from "react"
import VacancyFilters from "@/components/vacancy-filters"
import VacancySorting from "@/components/vacancy-sorting"
import VacancyView from "@/components/vacancy-view"
import VacancyCards from "@/components/vacancy-cards"

interface VacancyListSectionProps {
  role?: string
}

export default function VacancyListSection({ role = "Гость" }: VacancyListSectionProps) {
  const [filters, setFilters] = useState({
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
  })

  const [sort, setSort] = useState({
    field: "date",
    direction: "desc" as "asc" | "desc",
  })

  const [view, setView] = useState<"large" | "small">("large")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Левая панель: Фильтры */}
      <div className="lg:col-span-1 space-y-6">
        <VacancyFilters role={role} filters={filters} onFiltersChange={setFilters} />
        <VacancySorting role={role} sort={sort} onSortChange={setSort} />
        <VacancyView selectedView={view} onViewChange={setView} />
      </div>

      {/* Правая панель: Список вакансий */}
      <div className="lg:col-span-3">
        <VacancyCards role={role} view={view} filters={filters} sort={sort} />
      </div>
    </div>
  )
}
