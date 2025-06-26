"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

interface VacancyViewProps {
  selectedView: "large" | "small"
  onViewChange: (view: "large" | "small") => void
}

export default function VacancyView({ selectedView, onViewChange }: VacancyViewProps) {
  const viewOptions = [
    { value: "large" as const, label: "Большой", icon: LayoutGrid },
    { value: "small" as const, label: "Маленький", icon: List },
  ]

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="grid grid-cols-2 gap-2">
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
