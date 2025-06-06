"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Star, Briefcase, MessageSquare, Shield, UserPlus, LogIn } from "lucide-react"
import Link from "next/link"

interface RegistrationBannerProps {
  variant?: "default" | "jobs" | "reviews" | "companies"
  className?: string
}

export function RegistrationBanner({ variant = "default", className = "" }: RegistrationBannerProps) {
  const { user } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (user || dismissed) {
    return null
  }

  const getBannerContent = () => {
    switch (variant) {
      case "jobs":
        return {
          icon: Briefcase,
          title: "Найдите работу мечты в сфере охраны",
          description:
            "Получите доступ к эксклюзивным вакансиям, откликайтесь на предложения и управляйте своим резюме",
          benefits: [
            "Доступ ко всем вакансиям",
            "Отклики на предложения",
            "Личный кабинет",
            "Уведомления о новых вакансиях",
          ],
        }
      case "reviews":
        return {
          icon: MessageSquare,
          title: "Поделитесь своим опытом работы",
          description: "Оставляйте отзывы о работодателях, читайте мнения коллег и помогайте другим в выборе",
          benefits: ["Написание отзывов", "Доступ к контактам", "Подача жалоб", "Участие в обсуждениях"],
        }
      case "companies":
        return {
          icon: Shield,
          title: "Получите полную информацию о ЧОПах",
          description: "Просматривайте контакты, сравнивайте компании и получайте персональные рекомендации",
          benefits: ["Контактная информация", "Сравнение компаний", "Рекомендации", "История просмотров"],
        }
      default:
        return {
          icon: Star,
          title: "Присоединяйтесь к сообществу профессионалов",
          description: "Получите полный доступ ко всем возможностям платформы охранной отрасли",
          benefits: ["Поиск работы", "Отзывы и рейтинги", "Форум специалистов", "Персональные рекомендации"],
        }
    }
  }

  const content = getBannerContent()
  const IconComponent = content.icon

  return (
    <Card className={`border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 ${className}`}>
      <CardContent className="p-6 relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <IconComponent className="h-6 w-6 text-blue-600" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h3>
            <p className="text-gray-600 mb-4">{content.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth/sign-up" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Создать аккаунт бесплатно
                </Button>
              </Link>
              <Link href="/auth/sign-in" className="flex-1">
                <Button variant="outline" className="w-full bg-white">
                  <LogIn className="h-4 w-4 mr-2" />
                  Уже есть аккаунт?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
