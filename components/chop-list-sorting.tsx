"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface ChopListSortingProps {
  role?: string
  selectedSort: {
    field: string
    direction: "asc" | "desc"
  }
  onSortChange: (sort: { field: string; direction: "asc" | "desc" }) => void
}

export default function ChopListSorting({ role = "Гость", selectedSort, onSortChange }: ChopListSortingProps) {
  const sortOptions = [
    { field: "name", label: "По названию" },
    { field: "rating", label: "По рейтингу" },
    { field: "vacancies", label: "По количеству вакансий" },
    { field: "city", label: "По городу" },
    { field: "experience", label: "По стажу работы" },
  ]

  const handleSortChange = (field: string) => {
    if (selectedSort.field === field) {
      // Если тот же параметр, меняем направление
      onSortChange({
        field,
        direction: selectedSort.direction === "asc" ? "desc" : "asc",
      })
    } else {
      // Если новый параметр, устанавливаем по убыванию по умолчанию
      onSortChange({
        field,
        direction: "desc",
      })
    }
  }

  const getSortIcon = (field: string) => {
    if (selectedSort.field !== field) {
      return <ArrowUpDown className="h-3 w-3 ml-1" />
    }
    return selectedSort.direction === "asc" ? (
      <ArrowUp className="h-3 w-3 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1" />
    )
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="space-y-2">
        {sortOptions.map((option) => (
          <Button
            key={option.field}
            variant={selectedSort.field === option.field ? "default" : "outline"}
            size="sm"
            className="w-full justify-between text-xs"
            onClick={() => handleSortChange(option.field)}
          >
            <span>{option.label}</span>
            {getSortIcon(option.field)}
          </Button>
        ))}
      </div>

      {role === "Гость" && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Зарегистрируйтесь для доступа ко всем параметрам сортировки
          </p>
        </div>
      )}
    </div>
  )
}
