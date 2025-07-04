"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Users, Building, Star, Crown, Headphones, Settings } from "lucide-react"
import HeroQuickButtons from "@/components/hero-quick-buttons"

interface HeroSectionProps {
  role?: string
}

export default function HeroSection({ role = "Гость" }: HeroSectionProps) {
  const [stats, setStats] = useState({
    organizations: 1247,
    vacancies: 3891,
    users: 15623,
    reviews: 8934,
  })

  const getRoleConfig = (userRole: string) => {
    switch (userRole) {
      case "Гость":
        return {
          icon: Shield,
          title: "Добро пожаловать в RusGuard",
          subtitle: "Единая платформа частной охраны России",
          description:
            "Найдите надежную охранную организацию, работу в сфере безопасности или оставьте отзыв о качестве услуг",
          cta: "Начать работу",
          badge: "Для всех",
          color: "from-blue-600 to-purple-600",
        }
      case "Новичок":
        return {
          icon: Users,
          title: "Добро пожаловать на платформу!",
          subtitle: "Выберите свою роль для персонализации",
          description: "Определитесь с типом аккаунта: ищете работу в охране или представляете охранную организацию",
          cta: "Выбрать роль",
          badge: "Новый пользователь",
          color: "from-green-600 to-blue-600",
        }
      case "Сотрудник охраны":
        return {
          icon: Shield,
          title: "Найдите работу мечты",
          subtitle: "Лучшие вакансии в сфере охраны",
          description:
            "Просматривайте актуальные предложения, откликайтесь на вакансии и развивайте карьеру в надежных организациях",
          cta: "Смотреть вакансии",
          badge: "Для охранников",
          color: "from-green-600 to-teal-600",
        }
      case "Управляющий ЧОПа":
        return {
          icon: Crown,
          title: "Управляйте организацией",
          subtitle: "Полный контроль над бизнесом",
          description:
            "Стратегическое планирование, управление репутацией, контроль качества услуг и развитие организации",
          cta: "В кабинет управляющего",
          badge: "Руководство",
          color: "from-purple-600 to-pink-600",
        }
      case "Менеджер ЧОПа":
        return {
          icon: Building,
          title: "Найдите лучших сотрудников",
          subtitle: "Эффективный подбор персонала",
          description:
            "Размещайте вакансии, просматривайте резюме, общайтесь с кандидатами и формируйте команду профессионалов",
          cta: "Разместить вакансию",
          badge: "Для ЧОП",
          color: "from-orange-600 to-red-600",
        }
      case "Модератор":
        return {
          icon: Star,
          title: "Поддерживайте порядок",
          subtitle: "Модерация контента платформы",
          description:
            "Проверяйте публикации, рассматривайте жалобы, поддерживайте качество информации и помогайте пользователям",
          cta: "Панель модератора",
          badge: "Модерация",
          color: "from-indigo-600 to-purple-600",
        }
      case "Саппорт":
        return {
          icon: Headphones,
          title: "Помогайте пользователям",
          subtitle: "Техническая поддержка",
          description:
            "Отвечайте на вопросы, решайте технические проблемы и обеспечивайте качественную поддержку пользователей",
          cta: "Центр поддержки",
          badge: "Поддержка",
          color: "from-cyan-600 to-blue-600",
        }
      case "Суперадмин":
        return {
          icon: Settings,
          title: "Полный контроль системы",
          subtitle: "Администрирование платформы",
          description:
            "Управление пользователями, настройка системы, аналитика, безопасность и стратегическое развитие платформы",
          cta: "Админ-панель",
          badge: "Администратор",
          color: "from-red-600 to-orange-600",
        }
      default:
        return {
          icon: Shield,
          title: "RusGuard Platform",
          subtitle: "Платформа частной охраны",
          description: "Единое пространство для всех участников охранной отрасли",
          cta: "Подробнее",
          badge: "Платформа",
          color: "from-gray-600 to-gray-800",
        }
    }
  }

  const config = getRoleConfig(role)
  const IconComponent = config.icon

  return (
    <section className={`relative py-20 bg-gradient-to-br ${config.color} text-white overflow-hidden`}>
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая часть - контент */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {config.badge}
              </Badge>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <IconComponent className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">{config.title}</h1>
                  <p className="text-xl text-white/90 mt-2">{config.subtitle}</p>
                </div>
              </div>

              <p className="text-lg text-white/80 leading-relaxed max-w-lg">{config.description}</p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{stats.organizations.toLocaleString()}</div>
                <div className="text-sm text-white/70">ЧОПов</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{stats.vacancies.toLocaleString()}</div>
                <div className="text-sm text-white/70">Вакансий</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{stats.users.toLocaleString()}</div>
                <div className="text-sm text-white/70">Пользователей</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{stats.reviews.toLocaleString()}</div>
                <div className="text-sm text-white/70">Отзывов</div>
              </div>
            </div>

            {/* CTA кнопка */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                {config.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Узнать больше
              </Button>
            </div>
          </div>

          {/* Правая часть - быстрые действия */}
          <div className="lg:pl-8">
            <HeroQuickButtons role={role} />
          </div>
        </div>
      </div>
    </section>
  )
}
