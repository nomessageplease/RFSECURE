"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChopCard } from "@/components/chop-card"
import Link from "next/link"

const featuredChops = [
  {
    id: 1,
    name: "Охранное Агентство Авангард",
    rating: 4.8,
    reviewCount: 156,
    location: "Москва",
    verified: true,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%201-pSoYbxeRfeKKzvB9MhQQpkC67sQnGz.jpeg",
    specialization: ["VIP-охрана", "Объекты"],
    employees: 450,
    experience: 15,
    activeJobs: 12,
    recentReview: "Отличная работа, рекомендую!",
    phone: "+7 (495) 123-45-67",
    email: "info@avangard-security.ru",
    description: "Ведущая охранная компания Москвы с 15-летним опытом работы.",
    price: "от 25 000 ₽/мес",
  },
  {
    id: 2,
    name: "Щит-Безопасность",
    rating: 4.7,
    reviewCount: 134,
    location: "Москва",
    verified: true,
    logo: "/placeholder.svg?height=200&width=200",
    specialization: ["Мероприятия", "VIP"],
    employees: 180,
    experience: 10,
    activeJobs: 8,
    recentReview: "Профессиональный подход",
    phone: "+7 (495) 234-56-78",
    email: "info@shield-security.ru",
    description: "Профессиональная охрана мероприятий и VIP-персон.",
    price: "от 30 000 ₽/мес",
  },
  {
    id: 3,
    name: "Барс-Охрана",
    rating: 4.6,
    reviewCount: 89,
    location: "СПб",
    verified: true,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%202-LPcWjTR8tqF96i00nlQSHBA3vXRfbt.jpeg",
    specialization: ["ТЦ", "Склады"],
    employees: 280,
    experience: 8,
    activeJobs: 5,
    recentReview: "Надежная компания",
    phone: "+7 (812) 345-67-89",
    email: "info@bars-security.ru",
    description: "Специализируемся на охране торговых центров и складов.",
    price: "от 20 000 ₽/мес",
  },
]

export function FeaturedCompaniesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Топ охранных компаний</h2>
            <p className="text-xl text-gray-600">Лидеры отрасли по рейтингам и отзывам</p>
          </div>
          <Link href="/ratings">
            <Button variant="outline" className="bg-white shadow-sm hover:shadow-lg">
              Все рейтинги
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredChops.map((chop, index) => (
            <ChopCard key={chop.id} chop={chop} viewMode="grid" showRank={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
