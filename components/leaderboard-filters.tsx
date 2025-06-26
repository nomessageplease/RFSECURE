"use client"

import { Button } from "@/components/ui/button"
import type { LeaderboardFilter } from "@/hooks/use-leaderboard-config"

interface LeaderboardFiltersProps {
  filters: LeaderboardFilter[]
  selectedFilter: string
  onFilterChange: (filterId: string) => void
  role: string
  type: "organizations" | "forum"
}

export default function LeaderboardFilters({
  filters,
  selectedFilter,
  onFilterChange,
  role,
  type,
}: LeaderboardFiltersProps) {
  return (
    <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
      <div className="flex flex-wrap gap-1">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            className={`text-xs px-2 py-1 h-7 ${filter.disabled ? "opacity-50" : ""}`}
            onClick={() => onFilterChange(filter.id)}
            disabled={filter.disabled}
          >
            {filter.label}
            {filter.disabled && role === "Гость" && filter.id !== "overall" && <span className="ml-2 text-xs">🔒</span>}
          </Button>
        ))}
      </div>
      {role === "Гость" && type === "organizations" && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">Зарегистрируйтесь для доступа ко всем параметрам</p>
        </div>
      )}
    </div>
  )
}
