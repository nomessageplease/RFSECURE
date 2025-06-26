"use client"

import { useListData } from "@/hooks/use-list-data"
import { useListConfig } from "@/hooks/use-list-config"
import ListFilters from "@/components/list-filters"
import ListControls from "@/components/list-controls"
import ChopListCards from "@/components/chop-list-cards"

interface OrganizationsListProps {
  role?: string
}

export default function OrganizationsList({ role = "Гость" }: OrganizationsListProps) {
  const { filters, sort, view, handleFilterChange, clearFilters, handleSortChange, handleViewChange } =
    useListData("organizations")

  const { filtersConfig, sortConfig, viewConfig } = useListConfig("organizations")

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
          <ChopListCards role={role} view={view as "grid" | "list"} filters={filters} sort={sort} />
        </div>
      </div>
    </div>
  )
}
