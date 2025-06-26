"use client"

import { Star, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UserData {
  id: number
  name: string
  avatar: string
  role: string
  messagesCount: number
  rating: number
  position: number
  isOnline: boolean
}

interface ForumUserCardProps {
  user: UserData
  getRoleColor: (role: string) => string
  getRoleShort: (role: string) => string
  onClick: (id: number) => void
}

export default function ForumUserCard({ user, getRoleColor, getRoleShort, onClick }: ForumUserCardProps) {
  return (
    <div
      className={`
        flex-shrink-0 w-80 relative rounded-xl p-4 transition-all duration-300 cursor-pointer group
        ${
          user.position === 1
            ? "bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-2 border-yellow-400 shadow-lg hover:shadow-xl"
            : user.position === 2
              ? "bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 border-2 border-gray-400 shadow-lg hover:shadow-xl"
              : user.position === 3
                ? "bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-2 border-orange-400 shadow-lg hover:shadow-xl"
                : "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
        }
        hover:scale-[1.02] hover:-translate-y-1
      `}
      onClick={() => onClick(user.id)}
    >
      {/* Декоративный элемент для топ-3 */}
      {user.position <= 3 && (
        <div
          className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-lg ${
            user.position === 1
              ? "bg-gradient-to-br from-yellow-400/30 to-amber-400/30"
              : user.position === 2
                ? "bg-gradient-to-br from-gray-400/30 to-slate-400/30"
                : "bg-gradient-to-br from-orange-400/30 to-amber-400/30"
          }`}
        ></div>
      )}

      {/* Индикатор позиции для топ-3 */}
      {user.position <= 3 && (
        <div
          className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
            user.position === 1
              ? "bg-gradient-to-br from-yellow-500 to-amber-600"
              : user.position === 2
                ? "bg-gradient-to-br from-gray-500 to-slate-600"
                : "bg-gradient-to-br from-orange-500 to-amber-600"
          }`}
        >
          <span className="text-white font-bold text-xs">
            {user.position === 1 ? "🥇" : user.position === 2 ? "🥈" : "🥉"}
          </span>
        </div>
      )}

      {/* Заголовок с аватаром и позицией */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="h-10 w-10 rounded-full border-2 border-white shadow-md"
            />
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">#{user.position}</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{user.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={`text-xs px-2 py-0.5 ${getRoleColor(user.role)}`}>{getRoleShort(user.role)}</Badge>
              {user.isOnline && <span className="text-xs text-green-600 font-medium">Онлайн</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Статистика участника */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-blue-50 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <MessageCircle className="h-3 w-3 text-blue-600" />
            <span className="text-sm font-bold text-blue-700">{user.messagesCount}</span>
          </div>
          <span className="text-xs text-blue-700 font-medium">Сообщений</span>
        </div>
        <div className="bg-purple-50 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Star className="h-3 w-3 text-purple-600" />
            <span className="text-sm font-bold text-purple-700">{user.rating}</span>
          </div>
          <span className="text-xs text-purple-700 font-medium">Рейтинг</span>
        </div>
      </div>

      {/* Активность и достижения */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Активность:</span>
          <span className="text-xs font-medium text-gray-700">
            {user.position <= 3 ? "Очень высокая" : user.position <= 6 ? "Высокая" : "Средняя"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">На форуме:</span>
          <span className="text-xs font-medium text-gray-700">
            {Math.floor(user.id * 30 + Math.random() * 200)} дней
          </span>
        </div>

        {/* Достижения */}
        <div className="flex flex-wrap gap-1 mt-2">
          {user.position <= 3 && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Топ участник</span>
          )}
          {user.messagesCount > 400 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Активный</span>
          )}
          {user.role === "Модератор" && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Модератор</span>
          )}
        </div>
      </div>

      {/* Индикатор последней активности */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
            <span className="text-xs text-gray-500">
              {user.isOnline ? "Сейчас онлайн" : `Был ${Math.floor(Math.random() * 24)} ч. назад`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
