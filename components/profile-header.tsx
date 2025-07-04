"use client"

import { User, Shield, Users, Crown, Headphones, Settings } from "lucide-react"

interface ProfileHeaderProps {
  role?: string
}

const getRoleConfig = (role: string) => {
  switch (role) {
    case "Гость":
      return {
        icon: User,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        greeting: "Добро пожаловать!",
        subtitle: "Зарегистрируйтесь для полного доступа к платформе",
      }
    case "Новичок":
      return {
        icon: User,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        greeting: "Добро пожаловать на платформу!",
        subtitle: "Выберите свою роль для персонализации интерфейса",
      }
    case "Сотрудник охраны":
      return {
        icon: Shield,
        color: "text-green-600",
        bgColor: "bg-green-100",
        greeting: "Добро пожаловать, охранник!",
        subtitle: "Найдите подходящую работу и развивайте карьеру",
      }
    case "Управляющий ЧОПа":
      return {
        icon: Crown,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        greeting: "Добро пожаловать, управляющий!",
        subtitle: "Управляйте организацией и развивайте бизнес",
      }
    case "Менеджер ЧОПа":
      return {
        icon: Users,
        color: "text-indigo-600",
        bgColor: "bg-indigo-100",
        greeting: "Добро пожаловать, менеджер!",
        subtitle: "Управляйте вакансиями и подбором персонала",
      }
    case "Модератор":
      return {
        icon: Shield,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        greeting: "Добро пожаловать, модератор!",
        subtitle: "Поддерживайте порядок и качество контента",
      }
    case "Саппорт":
      return {
        icon: Headphones,
        color: "text-cyan-600",
        bgColor: "bg-cyan-100",
        greeting: "Добро пожаловать в поддержку!",
        subtitle: "Помогайте пользователям решать их вопросы",
      }
    case "Суперадмин":
      return {
        icon: Settings,
        color: "text-red-600",
        bgColor: "bg-red-100",
        greeting: "Добро пожаловать, администратор!",
        subtitle: "Полный контроль над системой и пользователями",
      }
    default:
      return {
        icon: User,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        greeting: "Добро пожаловать!",
        subtitle: "Личный кабинет пользователя",
      }
  }
}

export default function ProfileHeader({ role = "Гость" }: ProfileHeaderProps) {
  const config = getRoleConfig(role)
  const RoleIcon = config.icon

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${config.bgColor}`}>
            <RoleIcon className={`h-8 w-8 ${config.color}`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{config.greeting}</h1>
            <p className="text-blue-100 mt-1">{config.subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-blue-100">Текущая роль</div>
          <div className="font-semibold">{role}</div>
          <div className="text-xs text-blue-200 mt-1">
            {role === "Гость" ? "Не авторизован" : "Активен с 15.01.2024"}
          </div>
        </div>
      </div>
    </div>
  )
}
