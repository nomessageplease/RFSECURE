"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, TrendingUp, Folder } from "lucide-react"

interface ForumSortingProps {
  role?: string
  selectedSort: string
  onSortChange: (sort: string) => void
}

export default function ForumSorting({ role = "Гость", selectedSort, onSortChange }: ForumSortingProps) {
  const sortOptions = [
    { value: "sections", label: "По разделам", icon: Folder },
    { value: "latest", label: "Последние", icon: Clock },
    { value: "popular", label: "Популярные", icon: TrendingUp },
  ]

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2">
        {/* Десктопная версия - кнопки */}
        <div className="hidden md:flex space-x-2">
          {sortOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <Button
                key={option.value}
                variant={selectedSort === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onSortChange(option.value)}
                className="flex items-center space-x-2"
              >
                <IconComponent className="h-4 w-4" />
                <span>{option.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Мобильная версия - выпадающий список */}
        <div className="md:hidden w-full">
          <Select value={selectedSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {role === "Гость" && (
        <div className="pt-4 border-t border-gray-200 mt-4">
          <p className="text-xs text-gray-500 text-center">
            Зарегистрируйтесь для создания тем и участия в обсуждениях
          </p>
        </div>
      )}
    </div>
  )
}
