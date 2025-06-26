"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUp, ArrowDown } from "lucide-react"

interface VacancySortingProps {
  role?: string
  sort: {
    field: string
    direction: "asc" | "desc"
  }
  onSortChange: (sort: { field: string; direction: "asc" | "desc" }) => void
}

export default function VacancySorting({ role = "Гость", sort, onSortChange }: VacancySortingProps) {
  const sortOptions = [
    { field: "date", label: "По дате публикации" },
    { field: "salary", label: "По зарплате" },
    { field: "company", label: "По названию компании" },
    { field: "rating", label: "По рейтингу работодателя" },
    { field: "relevance", label: "По релевантности" },
  ]

  const handleSortFieldChange = (field: string) => {
    onSortChange({
      field,
      direction: sort.direction,
    })
  }

  const handleSortDirectionToggle = () => {
    onSortChange({
      field: sort.field,
      direction: sort.direction === "asc" ? "desc" : "asc",
    })
  }

  const getSortIcon = () => {
    return sort.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <Select value={sort.field} onValueChange={handleSortFieldChange}>
          <SelectTrigger className="flex-1 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.field} value={option.field}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSortDirectionToggle}
          className="p-2"
          title={sort.direction === "asc" ? "По возрастанию" : "По убыванию"}
        >
          {getSortIcon()}
        </Button>
      </div>

      {role === "Гость" && (
        <div className="pt-4 border-t border-gray-200 mt-4">
          <p className="text-xs text-gray-500 text-center">
            Зарегистрируйтесь для доступа ко всем параметрам сортировки
          </p>
        </div>
      )}
    </div>
  )
}
