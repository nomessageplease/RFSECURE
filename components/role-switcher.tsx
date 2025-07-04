"use client"

import { useState, useEffect } from "react"
import { ChevronDown, User, Shield, Users, Crown, Headphones, Settings } from "lucide-react"

const roles = [
  {
    name: "Гость",
    icon: User,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    description: "Просмотр публичной информации",
  },
  {
    name: "Новичок",
    icon: User,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    description: "Зарегистрированный пользователь без выбранной роли",
  },
  {
    name: "Сотрудник охраны",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-100",
    description: "Поиск работы, отклики на вакансии",
  },
  {
    name: "Управляющий ЧОПа",
    icon: Crown,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    description: "Полное управление организацией",
  },
  {
    name: "Менеджер ЧОПа",
    icon: Users,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    description: "Управление вакансиями и сотрудниками",
  },
  {
    name: "Модератор",
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "Модерация контента и пользователей",
  },
  {
    name: "Саппорт",
    icon: Headphones,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
    description: "Техническая поддержка пользователей",
  },
  {
    name: "Суперадмин",
    icon: Settings,
    color: "text-red-600",
    bgColor: "bg-red-100",
    description: "Полный доступ к системе",
  },
]

export default function RoleSwitcher() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Загружаем сохраненную роль при инициализации
  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      setCurrentRoleIndex(Number.parseInt(savedRoleIndex, 10))
    }
  }, [])

  const handleRoleChange = (index: number) => {
    setCurrentRoleIndex(index)
    localStorage.setItem("currentRoleIndex", index.toString())
    setIsOpen(false)

    // Отправляем событие об изменении роли
    const event = new CustomEvent("roleChanged", {
      detail: { role: roles[index].name, roleIndex: index },
    })
    window.dispatchEvent(event)
  }

  const currentRole = roles[currentRoleIndex]
  const CurrentIcon = currentRole.icon

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 
          hover:border-gray-400 transition-all duration-200 ${currentRole.bgColor}
        `}
      >
        <CurrentIcon className={`h-4 w-4 ${currentRole.color}`} />
        <span className={`font-medium ${currentRole.color}`}>{currentRole.name}</span>
        <ChevronDown className={`h-4 w-4 ${currentRole.color} transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Выберите роль для тестирования</h3>
            <p className="text-xs text-gray-500 mt-1">Интерфейс адаптируется под выбранную роль</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {roles.map((role, index) => {
              const RoleIcon = role.icon
              return (
                <button
                  key={role.name}
                  onClick={() => handleRoleChange(index)}
                  className={`
                    w-full flex items-start space-x-3 px-4 py-3 text-left hover:bg-gray-50 
                    transition-colors ${index === currentRoleIndex ? "bg-blue-50 border-r-2 border-blue-500" : ""}
                  `}
                >
                  <div className={`p-2 rounded-lg ${role.bgColor} flex-shrink-0`}>
                    <RoleIcon className={`h-4 w-4 ${role.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 text-sm">{role.name}</span>
                      {index === currentRoleIndex && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Активна</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{role.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              🔧 Режим разработки - переключение ролей для тестирования функций
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
