"use client"

import { useListData } from "@/hooks/use-list-data"
import { useListConfig } from "@/hooks/use-list-config"
import ListFilters from "@/components/list-filters"
import ForumTopicsList from "@/components/forum-topics-list"

interface ForumListProps {
  role?: string
}

export default function ForumList({ role = "Гость" }: ForumListProps) {
  const { filters, handleFilterChange, clearFilters } = useListData("forum")

  const { filtersConfig } = useListConfig("forum")

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
          <ForumTopicsList role={role} sortType={filters.sortType} />
        </div>
      </div>
    </div>
  )
}
