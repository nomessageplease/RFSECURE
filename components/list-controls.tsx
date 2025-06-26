"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUp, ArrowDown } from "lucide-react"
import type { SortConfig, ViewConfig } from "@/hooks/use-list-config"

interface ListControlsProps {
  sortConfig: SortConfig[]
  viewConfig: ViewConfig[]
  sort: {
    field: string
    direction: "asc" | "desc"
  }
  view: string
  onSortChange: (field: string) => void
  onViewChange: (view: string) => void
}

export default function ListControls({
  sortConfig,
  viewConfig,
  sort,
  view,
  onSortChange,
  onViewChange,
}: ListControlsProps) {
  const getSortIcon = () => {
    return sort.direction === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
  }

  if (sortConfig.length === 0 && viewConfig.length === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
      {/* Сортировка */}
      {sortConfig.length > 0 && (
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Сортировка:</span>
          <Select onValueChange={onSortChange} value={sort.field}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortConfig.map((option) => (
                <SelectItem key={option.field} value={option.field}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => onSortChange(sort.field)}>
            {getSortIcon()}
          </Button>
        </div>
      )}

      {/* Вид отображения */}
      {viewConfig.length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Вид:</span>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {viewConfig.map((option) => {
              const IconComponent = option.icon
              return (
                <Button
                  key={option.value}
                  variant={view === option.value ? "default" : "ghost"}
                  size="sm"
                  className="p-2"
                  onClick={() => onViewChange(option.value)}
                  title={option.label}
                >
                  <IconComponent className="h-4 w-4" />
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
