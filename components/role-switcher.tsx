"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Shield, Building, Star, Crown, ChevronDown, Check, X } from "lucide-react"

const roles = [
  {
    id: 0,
    name: "Гость",
    description: "Просмотр публичной информации",
    icon: User,
    color: "bg-gray-100 text-gray-800",
    access: ["Просмотр организаций", "Просмотр вакансий", "Чтение форума"],
  },
  {
    id: 1,
    name: "Новичок",
    description: "Новый пользователь на платформе",
    icon: User,
    color: "bg-blue-100 text-blue-800",
    access: ["Создание профиля", "Базовый поиск", "Участие в форуме"],
  },
  {
    id: 2,
    name: "Охранник",
    description: "Сотрудник охранной организации",
    icon: Shield,
    color: "bg-green-100 text-green-800",
    access: ["Поиск работы", "Отклики на вакансии", "Отзывы о ЧОП", "Полный доступ к форуму"],
  },
  {
    id: 3,
    name: "Представитель организации",
    description: "HR или руководитель ЧОП",
    icon: Building,
    color: "bg-orange-100 text-orange-800",
    access: ["Размещение вакансий", "Поиск кандидатов", "Управление профилем ЧОП", "Аналитика"],
  },
  {
    id: 4,
    name: "Модератор",
    description: "Модерация контента платформы",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    access: ["Модерация отзывов", "Обработка жалоб", "Контроль качества", "Поддержка пользователей"],
  },
  {
    id: 5,
    name: "Админ",
    description: "Полный доступ к системе",
    icon: Crown,
    color: "bg-red-100 text-red-800",
    access: ["Управление пользователями", "Системные настройки", "Полная аналитика", "Управление ЧОП"],
  },
]

export default function RoleSwitcher() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      setCurrentRoleIndex(Number.parseInt(savedRoleIndex, 10))
    }
  }, [])

  const handleRoleChange = (roleIndex: number) => {
    setCurrentRoleIndex(roleIndex)
    localStorage.setItem("currentRoleIndex", roleIndex.toString())

    // Отправляем событие для обновления всего интерфейса
    const event = new CustomEvent("roleChanged", {
      detail: { role: roles[roleIndex].name, roleIndex },
    })
    window.dispatchEvent(event)

    setIsOpen(false)
  }

  const currentRole = roles[currentRoleIndex]
  const IconComponent = currentRole.icon

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Основная кнопка */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`${currentRole.color} hover:shadow-lg transition-all duration-200 h-14 px-4 rounded-full shadow-lg`}
          size="lg"
        >
          <IconComponent className="h-5 w-5 mr-2" />
          <span className="font-medium">{currentRole.name}</span>
          <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>

        {/* Выпадающее меню */}
        {isOpen && (
          <Card className="absolute bottom-16 right-0 w-80 shadow-2xl border-2 animate-in slide-in-from-bottom-2">
            <CardContent className="p-0">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-1">Выберите роль</h3>
                <p className="text-sm text-gray-600">Интерфейс адаптируется под выбранную роль</p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {roles.map((role) => {
                  const RoleIcon = role.icon
                  const isSelected = currentRoleIndex === role.id

                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleChange(role.id)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b last:border-b-0 ${
                        isSelected ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${role.color} flex-shrink-0`}>
                          <RoleIcon className="h-4 w-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{role.name}</h4>
                            {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{role.description}</p>

                          <div className="space-y-1">
                            {role.access.slice(0, 2).map((access, index) => (
                              <div key={index} className="flex items-center text-xs text-gray-500">
                                <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                {access}
                              </div>
                            ))}
                            {role.access.length > 2 && (
                              <div className="text-xs text-gray-400">+{role.access.length - 2} возможностей</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span className="text-sm">Закрыть</span>
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
