"use client"

import { Button } from "@/components/ui/button"
import { Grid3X3, List, LayoutGrid } from "lucide-react"

interface ChopListViewProps {
  selectedView: "grid" | "list" | "compact"
  onViewChange: (view: "grid" | "list" | "compact") => void
}

export default function ChopListView({ selectedView, onViewChange }: ChopListViewProps) {
  const viewOptions = [
    { value: "grid" as const, label: "Сетка", icon: Grid3X3 },
    { value: "list" as const, label: "Список", icon: List },
    { value: "compact" as const, label: "Компактно", icon: LayoutGrid },
  ]

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="grid grid-cols-3 gap-2">
        {viewOptions.map((option) => {
          const IconComponent = option.icon
          return (
            <Button
              key={option.value}
              variant={selectedView === option.value ? "default" : "outline"}
              size="sm"
              className="flex flex-col items-center p-3 h-auto"
              onClick={() => onViewChange(option.value)}
            >
              <IconComponent className="h-4 w-4 mb-1" />
              <span className="text-xs">{option.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
