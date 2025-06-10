"use client"

import { Building2, MessageSquare, Briefcase, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { UserRole } from "@/components/user-role-switcher"

interface StatsSectionProps {
  userRole: UserRole
}

const getStatsForRole = (userRole: UserRole) => {
  switch (userRole) {
    case "guard":
      return [
        {
          label: "Активных вакансий",
          value: "234",
          icon: Briefcase,
          change: "+23%",
          subtext: "Новых за неделю: 54",
        },
        {
          label: "Проверенных ЧОПов",
          value: "1,247",
          icon: Building2,
          change: "+12%",
          subtext: "Верифицированных: 1,156",
        },
        {
          label: "Средняя зарплата",
          value: "45,000 ₽",
          icon: TrendingUp,
          change: "+5%",
          subtext: "За месяц",
        },
        {
          label: "Успешных трудоустройств",
          value: "89%",
          icon: Users,
          change: "+2%",
          subtext: "За месяц",
        },
      ]
    case "chop":
      return [
        {
          label: "Ваших вакансий",
          value: "12",
          icon: Briefcase,
          change: "+3",
          subtext: "За месяц",
        },
        {
          label: "Откликов получено",
          value: "156",
          icon: Users,
          change: "+45",
          subtext: "За неделю",
        },
        {
          label: "Рейтинг компании",
          value: "4.8",
          icon: TrendingUp,
          change: "+0.2",
          subtext: "За месяц",
        },
        {
          label: "Новых отзывов",
          value: "23",
          icon: MessageSquare,
          change: "+8",
          subtext: "За неделю",
        },
      ]
    default:
      return [
        {
          label: "ЧОПов в реестре",
          value: "1,247",
          icon: Building2,
          change: "+12%",
          subtext: "Верифицированных: 1,156",
        },
        {
          label: "Проверенных отзывов",
          value: "8,934",
          icon: MessageSquare,
          change: "+5%",
          subtext: "Средний рейтинг: 4.2",
        },
        {
          label: "Активных вакансий",
          value: "234",
          icon: Briefcase,
          change: "+23%",
          subtext: "Новых за неделю: 54",
        },
        {
          label: "Пользователей",
          value: "15,678",
          icon: Users,
          change: "+18%",
          subtext: "Активных: 12,456",
        },
      ]
  }
}

export function StatsSection({ userRole }: StatsSectionProps) {
  const stats = getStatsForRole(userRole)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all"
        >
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <stat.icon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-green-600 mt-1">
              {stat.change} {stat.subtext}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
