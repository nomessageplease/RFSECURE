"use client"
import { Search, Briefcase, Building2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import type { UserRole } from "@/components/user-role-switcher"

interface HeroSectionProps {
  userRole: UserRole
}

export function HeroSection({ userRole }: HeroSectionProps) {
  const getHeroTitle = () => {
    switch (userRole) {
      case "guard":
        return "Найдите работу в сфере охраны"
      case "chop":
        return "Управляйте своей охранной компанией"
      case "moderator":
        return "Модерируйте контент платформы"
      case "admin":
        return "Администрируйте платформу"
      default:
        return "Платформа охранной отрасли России"
    }
  }

  const getHeroDescription = () => {
    switch (userRole) {
      case "guard":
        return "Найдите лучшие вакансии, изучите рейтинги компаний и получите работу мечты в сфере безопасности"
      case "chop":
        return "Размещайте вакансии, управляйте репутацией, находите лучших сотрудников и развивайте бизнес"
      case "moderator":
        return "Обеспечивайте качество контента, модерируйте отзывы и поддерживайте порядок на платформе"
      case "admin":
        return "Полное управление платформой, аналитика, настройки и администрирование всех разделов"
      default:
        return "Поиск охранных компаний, вакансий, рейтинги, отзывы и всё для работы в сфере безопасности"
    }
  }

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobs">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Briefcase className="h-5 w-5 mr-2" />
                Найти работу
              </Button>
            </Link>
            <Link href="/chops">
              <Button variant="outline" size="lg">
                <Building2 className="h-5 w-5 mr-2" />
                Изучить ЧОПы
              </Button>
            </Link>
          </div>
        )
      case "chop":
        return (
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobs">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Разместить вакансию
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="outline" size="lg">
                Управлять отзывами
              </Button>
            </Link>
          </div>
        )
      default:
        return (
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/chops">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Найти ЧОП
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" size="lg">
                Найти работу
              </Button>
            </Link>
          </div>
        )
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            {userRole === "guard" && "Платформа для поиска работы"}
            {userRole === "chop" && "Платформа для работодателей"}
            {userRole === "moderator" && "Панель модерации"}
            {userRole === "admin" && "Административная панель"}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {getHeroTitle()}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">{getHeroDescription()}</p>

          {getRoleSpecificActions()}
        </div>

        {/* Role-specific search */}
        {userRole === "guard" && (
          <div className="max-w-4xl mx-auto mb-8">
            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white shadow-lg">
                <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Вакансии
                </TabsTrigger>
                <TabsTrigger value="chops" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Building2 className="h-4 w-4 mr-2" />
                  ЧОПы
                </TabsTrigger>
              </TabsList>

              <TabsContent value="jobs">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Поиск вакансий: должность, зарплата, график..."
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 shadow-lg"
                    />
                  </div>
                  <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700">
                    Найти работу
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="chops">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Поиск ЧОПов по названию, ИНН, лицензии, городу..."
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 shadow-lg"
                    />
                  </div>
                  <Button size="lg" className="h-14 px-8 bg-green-600 hover:bg-green-700">
                    Найти ЧОП
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {userRole === "chop" && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-12 bg-green-600 hover:bg-green-700">Новая вакансия</Button>
                <Button variant="outline" className="h-12">
                  Найти сотрудников
                </Button>
                <Button variant="outline" className="h-12">
                  Статистика
                </Button>
                <Button variant="outline" className="h-12">
                  Отзывы
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
