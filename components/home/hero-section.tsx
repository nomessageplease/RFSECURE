"use client"

import { Search, Briefcase, Users, TrendingUp, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface HeroSectionProps {
  userRole: string
}

export function HeroSection({ userRole }: HeroSectionProps) {
  const getHeroContent = () => {
    switch (userRole) {
      case "guard":
        return {
          title: "Найдите работу в сфере охраны",
          subtitle: "Найдите лучшие вакансии, изучите рейтинги компаний и получите работу мечты в сфере безопасности",
          showSearch: true,
        }
      case "chop":
        return {
          title: "Управляйте вашей охранной компанией",
          subtitle: "Размещайте вакансии, находите лучших кандидатов и управляйте репутацией вашей компании",
          showSearch: false,
        }
      case "moderator":
        return {
          title: "Модерация платформы",
          subtitle: "Обеспечивайте качество контента и безопасность пользователей на платформе",
          showSearch: false,
        }
      case "admin":
        return {
          title: "Администрирование платформы",
          subtitle: "Полное управление платформой, пользователями и контентом",
          showSearch: false,
        }
      default:
        return {
          title: "Платформа для поиска работы в сфере охраны",
          subtitle: "Найдите лучшие вакансии, изучите рейтинги компаний и получите работу мечты в сфере безопасности",
          showSearch: true,
        }
    }
  }

  const getActionButtons = () => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/jobs">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Briefcase className="mr-2 h-5 w-5" aria-hidden="true" />
                Найти работу
              </Button>
            </Link>
            <Link href="/chops">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" aria-hidden="true" />
                Рейтинг ЧОПов
              </Button>
            </Link>
          </div>
        )
      case "chop":
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/jobs/create">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                <Briefcase className="mr-2 h-5 w-5" aria-hidden="true" />
                Разместить вакансию
              </Button>
            </Link>
            <Link href="/catalog">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <TrendingUp className="mr-2 h-5 w-5" aria-hidden="true" />
                Аналитика рынка
              </Button>
            </Link>
          </div>
        )
      case "moderator":
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/admin/dashboard">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
                Панель модерации
              </Button>
            </Link>
            <Link href="/admin/requests">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Заявки ЧОПов
              </Button>
            </Link>
          </div>
        )
      case "admin":
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/admin/dashboard">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                Админ-панель
              </Button>
            </Link>
            <Link href="/admin/requests">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Управление системой
              </Button>
            </Link>
          </div>
        )
      default:
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                Начать поиск работы
              </Button>
            </Link>
            <Link href="/chops">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" aria-hidden="true" />
                Рейтинг ЧОПов
              </Button>
            </Link>
          </div>
        )
    }
  }

  const content = getHeroContent()

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{content.title}</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">{content.subtitle}</p>

          {content.showSearch && (
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <form className="flex flex-col md:flex-row gap-4" role="search" aria-label="Поиск вакансий">
                    <div className="relative flex-1">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                        aria-hidden="true"
                      />
                      <Input
                        placeholder="Должность, компания или ключевые слова"
                        className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        aria-label="Поиск по должности, компании или ключевым словам"
                      />
                    </div>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                        aria-hidden="true"
                      />
                      <Input
                        placeholder="Город"
                        className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 md:w-48"
                        aria-label="Выберите город для поиска"
                      />
                    </div>
                    <Button
                      size="lg"
                      className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
                      type="submit"
                      aria-label="Начать поиск вакансий"
                    >
                      <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                      Найти
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {getActionButtons()}
        </div>
      </div>
    </section>
  )
}
