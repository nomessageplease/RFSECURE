"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Users, Building, Briefcase, Star } from "lucide-react"
import { useRegisterAction } from "@/hooks/use-register-action"
import { useLoginAction } from "@/hooks/use-login-action"

interface HeroSectionProps {
  role?: string
}

export default function HeroSection({ role = "Гость" }: HeroSectionProps) {
  const { handleRegister } = useRegisterAction()
  const { handleLogin } = useLoginAction()

  const getHeroContent = () => {
    switch (role) {
      case "Гость":
        return {
          title: "Платформа охранной отрасли России",
          subtitle: "Найдите лучшие ЧОП, вакансии и возможности в сфере частной охраны",
          cta: "Начать поиск",
          secondaryCta: "Зарегистрироваться",
          stats: [
            { label: "Организаций", value: "2,847", icon: Building },
            { label: "Вакансий", value: "1,234", icon: Briefcase },
            { label: "Пользователей", value: "15,678", icon: Users },
            { label: "Отзывов", value: "8,945", icon: Star },
          ],
        }
      case "Новичок":
        return {
          title: "Добро пожаловать в RusGuard!",
          subtitle: "Завершите настройку профиля и начните поиск работы в охранной сфере",
          cta: "Заполнить профиль",
          secondaryCta: "Просмотреть вакансии",
          stats: [
            { label: "Профиль заполнен", value: "45%", icon: TrendingUp },
            { label: "Рекомендуемых вакансий", value: "23", icon: Briefcase },
            { label: "ЧОП в вашем городе", value: "156", icon: Building },
            { label: "Новых пользователей", value: "+47", icon: Users },
          ],
        }
      case "Охранник":
        return {
          title: "Найдите идеальную работу",
          subtitle: "Персональные рекомендации вакансий на основе вашего опыта и предпочтений",
          cta: "Смотреть вакансии",
          secondaryCta: "Обновить резюме",
          stats: [
            { label: "Новых вакансий", value: "12", icon: Briefcase },
            { label: "Откликов отправлено", value: "8", icon: TrendingUp },
            { label: "Просмотров профиля", value: "156", icon: Users },
            { label: "Средняя зарплата", value: "65к", icon: Star },
          ],
        }
      case "Представитель организации":
        return {
          title: "Управление вашей организацией",
          subtitle: "Привлекайте лучших кандидатов и управляйте репутацией вашего ЧОП",
          cta: "Добавить вакансию",
          secondaryCta: "Просмотреть кандидатов",
          stats: [
            { label: "Активных вакансий", value: "8", icon: Briefcase },
            { label: "Новых откликов", value: "23", icon: Users },
            { label: "Рейтинг организации", value: "4.7", icon: Star },
            { label: "Просмотров профиля", value: "1,247", icon: TrendingUp },
          ],
        }
      case "Модератор":
        return {
          title: "Панель модератора",
          subtitle: "Обеспечивайте качество контента и безопасность платформы",
          cta: "Рассмотреть жалобы",
          secondaryCta: "Проверить публикации",
          stats: [
            { label: "Новых жалоб", value: "3", icon: TrendingUp },
            { label: "На модерации", value: "7", icon: Building },
            { label: "Решено сегодня", value: "12", icon: Star },
            { label: "Активных модераторов", value: "5", icon: Users },
          ],
        }
      case "Админ":
        return {
          title: "Административная панель",
          subtitle: "Полный контроль над платформой и системными настройками",
          cta: "Системная аналитика",
          secondaryCta: "Управление пользователями",
          stats: [
            { label: "Всего пользователей", value: "15,678", icon: Users },
            { label: "Активных организаций", value: "2,847", icon: Building },
            { label: "Системных событий", value: "156", icon: TrendingUp },
            { label: "Время работы", value: "99.9%", icon: Star },
          ],
        }
      default:
        return {
          title: "Платформа охранной отрасли России",
          subtitle: "Найдите лучшие ЧОП, вакансии и возможности в сфере частной охраны",
          cta: "Начать поиск",
          secondaryCta: "Узнать больше",
          stats: [],
        }
    }
  }

  const content = getHeroContent()

  const handlePrimaryCTA = () => {
    switch (role) {
      case "Гость":
        console.log("Начать поиск - переход к каталогу")
        break
      case "Новичок":
        console.log("Заполнить профиль - переход к настройкам профиля")
        break
      case "Охранник":
        console.log("Смотреть вакансии - переход к вакансиям")
        break
      case "Представитель организации":
        console.log("Добавить вакансию - переход к созданию вакансии")
        break
      case "Модератор":
        console.log("Рассмотреть жалобы - переход к панели модерации")
        break
      case "Админ":
        console.log("Системная аналитика - переход к админ панели")
        break
      default:
        console.log("Действие по умолчанию")
    }
  }

  const handleSecondaryCTA = () => {
    switch (role) {
      case "Гость":
        handleRegister()
        break
      case "Новичок":
        console.log("Просмотреть вакансии - переход к вакансиям")
        break
      case "Охранник":
        console.log("Обновить резюме - переход к профилю")
        break
      case "Представитель организации":
        console.log("Просмотреть кандидатов - переход к кандидатам")
        break
      case "Модератор":
        console.log("Проверить публикации - переход к модерации контента")
        break
      case "Админ":
        console.log("Управление пользователями - переход к управлению")
        break
      default:
        console.log("Узнать больше")
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Роль бейдж */}
          {role !== "Гость" && (
            <div className="mb-6">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                {role}
              </Badge>
            </div>
          )}

          {/* Заголовок */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">{content.title}</h1>

          {/* Подзаголовок */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{content.subtitle}</p>

          {/* CTA кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="px-8 py-4 text-lg font-medium" onClick={handlePrimaryCTA}>
              <Search className="h-5 w-5 mr-2" />
              {content.cta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-medium bg-transparent"
              onClick={handleSecondaryCTA}
            >
              {content.secondaryCta}
            </Button>
          </div>

          {/* Статистика */}
          {content.stats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-white rounded-full shadow-sm border">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
