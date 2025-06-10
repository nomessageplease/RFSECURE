"use client"

import { TrendingUp, MessageSquare, Briefcase, Shield, Users, Clock, ArrowRight, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const recentActivity = [
  {
    type: "review",
    title: "Новый отзыв о компании Авангард",
    time: "2 мин назад",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  {
    type: "job",
    title: "Добавлена вакансия охранника в ТЦ",
    time: "15 мин назад",
    icon: Briefcase,
    color: "text-green-600",
  },
  {
    type: "company",
    title: "Новая компания прошла верификацию",
    time: "1 час назад",
    icon: Shield,
    color: "text-purple-600",
  },
  {
    type: "forum",
    title: "Горячая тема: Новые требования к ЧОП",
    time: "2 часа назад",
    icon: Users,
    color: "text-orange-600",
  },
]

export function ActivitySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recent Activity */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Активность платформы</h3>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center ${activity.color}`}
                      >
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{activity.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/activity">
                <Button variant="outline" className="w-full">
                  Вся активность
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Platform Benefits */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Преимущества платформы</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Проверенная информация</h4>
                  <p className="text-gray-600 text-sm">Все данные о компаниях проходят модерацию и верификацию</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Честные рейтинги</h4>
                  <p className="text-gray-600 text-sm">Независимые рейтинги на основе реальных отзывов клиентов</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Активное сообщество</h4>
                  <p className="text-gray-600 text-sm">Форум профессионалов отрасли для обмена опытом</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Рынок труда</h4>
                  <p className="text-gray-600 text-sm">Актуальные вакансии и резюме в сфере охранной деятельности</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
