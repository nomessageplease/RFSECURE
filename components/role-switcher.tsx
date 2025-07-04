"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Shield, Building, Star, Crown } from "lucide-react"

export default function RoleSwitcher() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const roles = [
    { name: "Гость", icon: User, color: "bg-gray-500", description: "Просмотр без регистрации" },
    { name: "Новичок", icon: User, color: "bg-blue-500", description: "Новый пользователь" },
    { name: "Охранник", icon: Shield, color: "bg-green-500", description: "Ищет работу в охране" },
    { name: "Представитель организации", icon: Building, color: "bg-orange-500", description: "Представляет ЧОП" },
    { name: "Модератор", icon: Star, color: "bg-purple-500", description: "Модерирует контент" },
    { name: "Админ", icon: Crown, color: "bg-red-500", description: "Полный доступ" },
  ]

  // Загружаем сохраненную роль при инициализации
  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      const index = Number.parseInt(savedRoleIndex, 10)
      setCurrentRoleIndex(index)
      // Отправляем событие для обновления интерфейса
      window.dispatchEvent(
        new CustomEvent("roleChanged", {
          detail: { role: roles[index].name },
        }),
      )
    }
  }, [])

  const handleRoleChange = (newRoleIndex: number) => {
    setCurrentRoleIndex(newRoleIndex)
    localStorage.setItem("currentRoleIndex", newRoleIndex.toString())

    // Отправляем событие для обновления всего интерфейса
    const event = new CustomEvent("roleChanged", {
      detail: { role: roles[newRoleIndex].name },
    })
    window.dispatchEvent(event)

    setIsOpen(false)
  }

  const currentRole = roles[currentRoleIndex]
  const IconComponent = currentRole.icon

  return (
    <>
      {/* Кнопка переключения ролей */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`${currentRole.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full p-3`}
          size="lg"
        >
          <IconComponent className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">{currentRole.name}</span>
          <Settings className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Панель выбора роли */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50">
          <Card className="w-80 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Выберите роль</h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    ✕
                  </Button>
                </div>

                {roles.map((role, index) => {
                  const RoleIcon = role.icon
                  const isActive = index === currentRoleIndex

                  return (
                    <button
                      key={index}
                      onClick={() => handleRoleChange(index)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                        isActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${role.color} text-white`}>
                          <RoleIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{role.name}</span>
                            {isActive && (
                              <Badge variant="default" className="text-xs">
                                Активная
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">Роль влияет на доступные функции и интерфейс</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overlay для закрытия панели */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </>
  )
}
