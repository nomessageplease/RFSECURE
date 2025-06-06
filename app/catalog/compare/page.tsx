"use client"

import { useState } from "react"
import {
  Shield,
  Star,
  Users,
  Clock,
  MapPin,
  Award,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Download,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { UserRoleSwitcher } from "@/components/user-role-switcher"

const compareData = [
  {
    id: 1,
    name: "Охранное Агентство Авангард",
    rating: 4.8,
    reviewCount: 156,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%201-pSoYbxeRfeKKzvB9MhQQpkC67sQnGz.jpeg",
    location: "Москва",
    experience: 15,
    employees: 450,
    verified: true,
    license: "ЧО-001234",
    licenseExpiry: "2025-12-31",
    services: ["VIP-охрана", "Объекты", "Мероприятия", "Банки"],
    coverage: ["Москва", "МО", "Тула"],
    price: "от 25,000 ₽/мес",
    responseTime: "< 15 мин",
    insurance: "100 млн ₽",
    certifications: ["ISO 9001", "ISO 27001"],
    ratings: {
      reliability: 4.9,
      professionalism: 4.8,
      response: 4.7,
      equipment: 4.6,
      value: 4.8,
    },
  },
  {
    id: 2,
    name: "Щит-Безопасность",
    rating: 4.7,
    reviewCount: 134,
    logo: "/placeholder.svg?height=200&width=200",
    location: "Москва",
    experience: 10,
    employees: 180,
    verified: true,
    license: "ЧО-005678",
    licenseExpiry: "2024-06-30",
    services: ["VIP-охрана", "Мероприятия", "Офисы"],
    coverage: ["Москва", "МО"],
    price: "от 30,000 ₽/мес",
    responseTime: "< 20 мин",
    insurance: "50 млн ₽",
    certifications: ["ISO 9001"],
    ratings: {
      reliability: 4.8,
      professionalism: 4.7,
      response: 4.6,
      equipment: 4.8,
      value: 4.5,
    },
  },
  {
    id: 3,
    name: "Барс-Охрана",
    rating: 4.6,
    reviewCount: 89,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%202-LPcWjTR8tqF96i00nlQSHBA3vXRfbt.jpeg",
    location: "Санкт-Петербург",
    experience: 8,
    employees: 280,
    verified: true,
    license: "ЧО-009012",
    licenseExpiry: "2025-03-15",
    services: ["Торговые центры", "Склады", "Офисы"],
    coverage: ["СПб", "ЛО", "Новгород"],
    price: "от 20,000 ₽/мес",
    responseTime: "< 25 мин",
    insurance: "75 млн ₽",
    certifications: ["ISO 9001", "ГОСТ Р"],
    ratings: {
      reliability: 4.7,
      professionalism: 4.6,
      response: 4.5,
      equipment: 4.4,
      value: 4.7,
    },
  },
]

const comparisonCategories = [
  { id: "basic", name: "Основная информация" },
  { id: "ratings", name: "Рейтинги" },
  { id: "services", name: "Услуги" },
  { id: "coverage", name: "География" },
  { id: "pricing", name: "Стоимость" },
  { id: "certifications", name: "Сертификаты" },
]

export default function ComparePage() {
  const [selectedCategory, setSelectedCategory] = useState("basic")

  const getBestValue = (field: string) => {
    switch (field) {
      case "rating":
        return Math.max(...compareData.map((c) => c.rating))
      case "experience":
        return Math.max(...compareData.map((c) => c.experience))
      case "employees":
        return Math.max(...compareData.map((c) => c.employees))
      case "reviewCount":
        return Math.max(...compareData.map((c) => c.reviewCount))
      default:
        return null
    }
  }

  const isBestValue = (value: number, field: string) => {
    return value === getBestValue(field)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserRoleSwitcher />

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-7 w-7 text-gray-800" />
              <h1 className="text-xl font-bold text-gray-900">Охрана РФ</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-4 ml-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
                Главная
              </Link>
              <Link href="/catalog" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
                Каталог
              </Link>
              <Link href="/catalog/compare" className="text-gray-900 font-medium text-sm">
                Сравнение
              </Link>
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/profile" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
                Личный кабинет
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/catalog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к каталогу
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Сравнение ЧОПов</h1>
              <p className="text-lg text-gray-600">Детальное сравнение {compareData.length} охранных компаний</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Скачать отчет
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {comparisonCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-6 font-semibold text-gray-900 w-64">Параметр</th>
                    {compareData.map((company) => (
                      <th key={company.id} className="text-center p-6 min-w-[280px]">
                        <div className="flex flex-col items-center gap-3">
                          <Avatar className="h-16 w-16 border-2 border-gray-200">
                            <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                              {company.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-center leading-tight">{company.name}</h3>
                            <div className="flex items-center justify-center gap-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(company.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-semibold">{company.rating}</span>
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedCategory === "basic" && (
                    <>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Местоположение</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{company.location}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Опыт работы</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                                isBestValue(company.experience, "experience")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <Clock className="h-4 w-4" />
                              <span className="font-semibold">{company.experience} лет</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Количество сотрудников</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                                isBestValue(company.employees, "employees")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <Users className="h-4 w-4" />
                              <span className="font-semibold">{company.employees}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Верификация</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            {company.verified ? (
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800">
                                <CheckCircle className="h-4 w-4" />
                                <span className="font-semibold">Проверена</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800">
                                <XCircle className="h-4 w-4" />
                                <span className="font-semibold">Не проверена</span>
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Лицензия</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            <div className="space-y-1">
                              <div className="font-semibold">{company.license}</div>
                              <div className="text-sm text-gray-600">до {company.licenseExpiry}</div>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Количество отзывов</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                                isBestValue(company.reviewCount, "reviewCount")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <span className="font-semibold">{company.reviewCount}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {selectedCategory === "ratings" && (
                    <>
                      {Object.entries(compareData[0].ratings).map(([key, _]) => (
                        <tr key={key} className="border-b">
                          <td className="p-6 font-medium text-gray-900">
                            {key === "reliability" && "Надежность"}
                            {key === "professionalism" && "Профессионализм"}
                            {key === "response" && "Скорость реагирования"}
                            {key === "equipment" && "Техническое оснащение"}
                            {key === "value" && "Соотношение цена/качество"}
                          </td>
                          {compareData.map((company) => (
                            <td key={company.id} className="p-6">
                              <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="font-semibold">
                                    {company.ratings[key as keyof typeof company.ratings]}
                                  </span>
                                </div>
                                <Progress
                                  value={company.ratings[key as keyof typeof company.ratings] * 20}
                                  className="h-2"
                                />
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}

                  {selectedCategory === "services" && (
                    <tr className="border-b">
                      <td className="p-6 font-medium text-gray-900">Предоставляемые услуги</td>
                      {compareData.map((company) => (
                        <td key={company.id} className="p-6">
                          <div className="space-y-2">
                            {company.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="block text-center">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  )}

                  {selectedCategory === "coverage" && (
                    <tr className="border-b">
                      <td className="p-6 font-medium text-gray-900">География покрытия</td>
                      {compareData.map((company) => (
                        <td key={company.id} className="p-6">
                          <div className="space-y-2">
                            {company.coverage.map((region, index) => (
                              <Badge key={index} variant="outline" className="block text-center">
                                {region}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  )}

                  {selectedCategory === "pricing" && (
                    <>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Стоимость услуг</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            <div className="font-semibold text-lg">{company.price}</div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Время реагирования</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            <div className="font-semibold">{company.responseTime}</div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-6 font-medium text-gray-900">Страхование ответственности</td>
                        {compareData.map((company) => (
                          <td key={company.id} className="p-6 text-center">
                            <div className="font-semibold">{company.insurance}</div>
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {selectedCategory === "certifications" && (
                    <tr className="border-b">
                      <td className="p-6 font-medium text-gray-900">Сертификаты и стандарты</td>
                      {compareData.map((company) => (
                        <td key={company.id} className="p-6">
                          <div className="space-y-2">
                            {company.certifications.map((cert, index) => (
                              <Badge key={index} variant="outline" className="block text-center">
                                <Award className="h-3 w-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-4">
            {compareData.map((company) => (
              <Link key={company.id} href={`/catalog/${company.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">Подробнее о {company.name.split(" ")[0]}</Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
