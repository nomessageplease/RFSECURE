"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Users, Building, Star, Crown, TrendingUp, Award, Clock } from "lucide-react"

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
          secondaryCta: "Узнать больше",
          badge: "Для всех",
          color: "from-blue-600 to-purple-600",
          features: ["Поиск работы", "Рейтинги ЧОП", "Отзывы", "Форум"],
        }
      case "Новичок":
        return {
          icon: Users,
          title: "Добро пожаловать на платформу!",
          subtitle: "Выберите свою роль для персонализации",
          description: "Определитесь с типом аккаунта: ищете работу в охране или представляете охранную организацию",
          cta: "Заполнить профиль",
          secondaryCta: "Помощь новичкам",
          badge: "Новый пользователь",
          color: "from-green-600 to-blue-600",
          features: ["Создание профиля", "Поиск вакансий", "Обучение", "Поддержка"],
        }
      case "Охранник":
        return {
          icon: Shield,
          title: "Найдите работу мечты",
          subtitle: "Лучшие вакансии в сфере охраны",
          description:
            "Просматривайте актуальные предложения, откликайтесь на вакансии и развивайте карьеру в надежных организациях",
          cta: "Смотреть вакансии",
          secondaryCta: "Мой профиль",
          badge: "Для охранников",
          color: "from-green-600 to-teal-600",
          features: ["Поиск работы", "Отклики", "Резюме", "Карьера"],
        }
      case "Представитель организации":
        return {
          icon: Building,
          title: "Найдите лучших сотрудников",
          subtitle: "Эффективный подбор персонала",
          description:
            "Размещайте вакансии, просматривайте резюме, общайтесь с кандидатами и формируйте команду профессионалов",
          cta: "Разместить вакансию",
          secondaryCta: "Управление ЧОП",
          badge: "Для ЧОП",
          color: "from-orange-600 to-red-600",
          features: ["Размещение вакансий", "Поиск кандидатов", "Управление", "Аналитика"],
        }
      case "Модератор":
        return {
          icon: Star,
          title: "Поддерживайте порядок",
          subtitle: "Модерация контента платформы",
          description:
            "Проверяйте публикации, рассматривайте жалобы, поддерживайте качество информации и помогайте пользователям",
          cta: "Панель модератора",
          secondaryCta: "Статистика",
          badge: "Модерация",
          color: "from-indigo-600 to-purple-600",
          features: ["Модерация", "Жалобы", "Контроль качества", "Поддержка"],
        }
      case "Админ":
        return {
          icon: Crown,
          title: "Полный контроль системы",
          subtitle: "Администрирование платформы",
          description:
            "Управление пользователями, настройка системы, аналитика, безопасность и стратегическое развитие платформы",
          cta: "Админ-панель",
          secondaryCta: "Аналитика",
          badge: "Администратор",
          color: "from-red-600 to-orange-600",
          features: ["Управление", "Аналитика", "Настройки", "Безопасность"],
        }
      default:
        return {
          icon: Shield,
          title: "RusGuard Platform",
          subtitle: "Платформа частной охраны",
          description: "Единое пространство для всех участников охранной отрасли",
          cta: "Подробнее",
          secondaryCta: "Контакты",
          badge: "Платформа",
          color: "from-gray-600 to-gray-800",
          features: ["Универсальность", "Надежность", "Качество", "Поддержка"],
        }
    }
  }

  const config = getRoleConfig(role)
  const IconComponent = config.icon

  const handleNavigation = (page: string) => {
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page },
      }),
    )
  }

  const handlePrimaryCTA = () => {
    if (role === "Гость") handleNavigation("register")
    else if (role === "Новичок") handleNavigation("profile")
    else if (role === "Охранник") handleNavigation("vacancies")
    else if (role === "Представитель организации") handleNavigation("vacancies")
    else if (role === "Модератор") handleNavigation("profile")
    else if (role === "Админ") handleNavigation("profile")
    else handleNavigation("organizations")
  }

  const handleSecondaryCTA = () => {
    if (role === "Гость") handleNavigation("organizations")
    else if (role === "Новичок") handleNavigation("forum")
    else if (role === "Охранник") handleNavigation("profile")
    else if (role === "Представитель организации") handleNavigation("organizations")
    else if (role === "Модератор") handleNavigation("profile")
    else if (role === "Админ") handleNavigation("profile")
    else handleNavigation("news")
  }

  return (
    <section className={`relative py-20 bg-gradient-to-br ${config.color} text-white overflow-hidden`}>
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая часть - контент */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
              >
                {config.badge}
              </Badge>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors cursor-pointer">
                <div className="text-2xl font-bold">{stats.organizations.toLocaleString()}</div>
                <div className="text-sm text-white/70">ЧОПов</div>
                <TrendingUp className="h-4 w-4 mx-auto mt-1 text-green-300" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors cursor-pointer">
                <div className="text-2xl font-bold">{stats.vacancies.toLocaleString()}</div>
                <div className="text-sm text-white/70">Вакансий</div>
                <Award className="h-4 w-4 mx-auto mt-1 text-blue-300" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors cursor-pointer">
                <div className="text-2xl font-bold">{stats.users.toLocaleString()}</div>
                <div className="text-sm text-white/70">Пользователей</div>
                <Users className="h-4 w-4 mx-auto mt-1 text-purple-300" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors cursor-pointer">
                <div className="text-2xl font-bold">{stats.reviews.toLocaleString()}</div>
                <div className="text-sm text-white/70">Отзывов</div>
                <Star className="h-4 w-4 mx-auto mt-1 text-yellow-300" />
              </div>
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handlePrimaryCTA}
              >
                {config.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
                onClick={handleSecondaryCTA}
              >
                {config.secondaryCta}
              </Button>
            </div>
          </div>

          {/* Правая часть - быстрые действия */}
          <div className="lg:pl-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-6 border border-white/20">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-white/80" />
                <h3 className="text-xl font-semibold text-white">Быстрые действия</h3>
              </div>

              {/* Особенности для текущей роли */}
              <div className="grid grid-cols-2 gap-3">
                {config.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-lg p-3 text-center hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <div className="text-sm font-medium text-white">{feature}</div>
                  </div>
                ))}
              </div>

              {/* Кнопки действий */}
              <div className="space-y-3">
                {role === "Гость" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("register")}
                    >
                      Зарегистрироваться
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("login")}
                    >
                      Войти в систему
                    </Button>
                  </>
                )}

                {role === "Новичок" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("profile")}
                    >
                      Заполнить профиль
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("forum")}
                    >
                      Помощь новичкам
                    </Button>
                  </>
                )}

                {role === "Охранник" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("vacancies")}
                    >
                      Найти работу
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("profile")}
                    >
                      Мой профиль
                    </Button>
                  </>
                )}

                {role === "Представитель организации" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("vacancies")}
                    >
                      Разместить вакансию
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("organizations")}
                    >
                      Управление ЧОП
                    </Button>
                  </>
                )}

                {(role === "Модератор" || role === "Админ") && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("profile")}
                    >
                      Панель управления
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 transition-colors"
                      onClick={() => handleNavigation("notifications")}
                    >
                      Уведомления
                    </Button>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm text-white/70 text-center">
                  Присоединяйтесь к сообществу профессионалов охранной отрасли
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
