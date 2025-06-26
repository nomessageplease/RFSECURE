"use client"

import { useListData } from "@/hooks/use-list-data"
import { useListConfig } from "@/hooks/use-list-config"
import ListFilters from "@/components/list-filters"
import ListControls from "@/components/list-controls"
import VacancyCards from "@/components/vacancy-cards"

interface VacanciesListProps {
  role?: string
}

export default function VacanciesList({ role = "Гость" }: VacanciesListProps) {
  const { filters, sort, view, handleFilterChange, clearFilters, handleSortChange, handleViewChange } =
    useListData("vacancies")

  const { filtersConfig, sortConfig, viewConfig } = useListConfig("vacancies")

  return (
    <div className="bg-white rounded-lg">
      <div className="flex gap-4 p-4">
        {/* Фильтры */}
        <ListFilters
          role={role}
          filtersConfig={filtersConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />

        {/* Основной контент */}
        <div className="flex-1 min-w-0">
          {/* Контролы */}
          <ListControls
            sortConfig={sortConfig}
            viewConfig={viewConfig}
            sort={sort}
            view={view}
            onSortChange={handleSortChange}
            onViewChange={handleViewChange}
          />

          {/* Список */}
          <VacancyCards role={role} view={view as "large" | "small"} filters={filters} sort={sort} />
        </div>
      </div>
    </div>
  )
}
