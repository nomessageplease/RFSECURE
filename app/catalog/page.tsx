"use client"

import { useState } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import {
  Search,
  Star,
  MapPin,
  Users,
  Clock,
  Grid3X3,
  List,
  Award,
  Phone,
  ArrowUpDown,
  Building2,
  Eye,
  Heart,
  Share2,
  Edit,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Header from "@/components/header"

const companies = [
  {
    id: 1,
    name: "Охранное Агентство Авангард",
    rating: 4.8,
    reviewCount: 156,
    license: "ЧО-001234",
    specialization: ["Объекты", "Мероприятия", "VIP"],
    location: "Москва",
    address: "ул. Тверская, д. 15, стр. 1",
    phone: "+7 (495) 123-45-67",
    email: "info@avangard-security.ru",
    experience: 15,
    employees: 450,
    verified: true,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%201-pSoYbxeRfeKKzvB9MhQQpkC67sQnGz.jpeg",
    description: "Ведущая охранная компания Москвы с 15-летним опытом работы.",
    price: "от 25 000 ₽/мес",
    activeJobs: 12,
    responseTime: "< 15 мин",
    coverage: ["Москва", "МО"],
  },
  {
    id: 2,
    name: "Охранное Предприятие Барс",
    rating: 4.6,
    reviewCount: 89,
    license: "ЧО-005678",
    specialization: ["Торговые центры", "Склады"],
    location: "Санкт-Петербург",
    address: "пр. Невский, д. 45",
    phone: "+7 (812) 234-56-78",
    email: "info@bars-security.ru",
    experience: 8,
    employees: 280,
    verified: true,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%202-LPcWjTR8tqF96i00nlQSHBA3vXRfbt.jpeg",
    description: "Специализируемся на охране торговых объектов и складских комплексов.",
    price: "от 20 000 ₽/мес",
    activeJobs: 8,
    responseTime: "< 20 мин",
    coverage: ["СПб", "ЛО"],
  },
  {
    id: 3,
    name: "Агентство Комплексной Безопасности АКБ",
    rating: 4.4,
    reviewCount: 203,
    license: "ЧО-009012",
    specialization: ["Жилые комплексы", "Офисы"],
    location: "Екатеринбург",
    address: "ул. Ленина, д. 78",
    phone: "+7 (343) 345-67-89",
    email: "info@akb-security.ru",
    experience: 12,
    employees: 320,
    verified: false,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%203-srieVVmZm4t05KIb2gr0dpHzoEdFiS.jpeg",
    description: "Комплексные решения безопасности для жилых и офисных объектов.",
    price: "от 18 000 ₽/мес",
    activeJobs: 5,
    responseTime: "< 30 мин",
    coverage: ["Екатеринбург", "Свердловская обл."],
  },
]

const cities = ["Все города", "Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск", "Казань"]
const specializations = ["Все услуги", "Объекты", "VIP-охрана", "Мероприятия", "Торговые центры", "Банки", "Офисы"]

export default function CatalogPage() {
  const { userRole } = useUserRole()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Все города")
  const [selectedSpecialization, setSelectedSpecialization] = useState("Все услуги")
  const [sortBy, setSortBy] = useState("rating")
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Каталог ЧОПов"
      case "chop":
        return "Конкуренты и партнеры"
      case "moderator":
        return "Модерация ЧОПов"
      case "admin":
        return "Управление ЧОПами"
      default:
        return "Каталог ЧОПов"
    }
  }

  const getPageDescription = () => {
    switch (userRole) {
      case "guard":
        return `Найдите надежную охранную компанию среди ${companies.length} проверенных организаций`
      case "chop":
        return "Изучайте рынок, анализируйте конкурентов и находите партнеров"
      case "moderator":
        return "Проверяйте и модерируйте информацию об охранных организациях"
      case "admin":
        return "Полное управление базой данных охранных организаций"
      default:
        return `Найдите надежную охранную компанию среди ${companies.length} проверенных организаций`
    }
  }

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Избранные
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Просмотренные
            </Button>
          </div>
        )
      case "chop":
        return (
          <div className="flex items-center gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Добавить компанию
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Мой профиль
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex items-center gap-3">
            <Badge className="bg-orange-100 text-orange-800 border-0">На модерации: 5</Badge>
            <Button variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Быстрое одобрение
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex items-center gap-3">
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Добавить ЧОП
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Настройки каталога
            </Button>
          </div>
        )
    }
  }

  const getCompanyActions = (company: any) => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Link href={`/catalog/${company.id}`}>
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                Подробнее
              </Button>
            </Link>
          </div>
        )
      case "chop":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Анализ
            </Button>
            <Link href={`/catalog/${company.id}`}>
              <Button size="sm" variant="outline">
                Профиль
              </Button>
            </Link>
          </div>
        )
      case "moderator":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-1" />
              Одобрить
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              <XCircle className="h-4 w-4 mr-1" />
              Заблокировать
            </Button>
            <Link href={`/catalog/${company.id}`}>
              <Button size="sm">Управление</Button>
            </Link>
          </div>
        )
    }
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = selectedCity === "Все города" || company.location === selectedCity
    const matchesSpecialization =
      selectedSpecialization === "Все услуги" || company.specialization.includes(selectedSpecialization)
    const matchesVerified = !showVerifiedOnly || company.verified

    return matchesSearch && matchesCity && matchesSpecialization && matchesVerified
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">{getPageTitle()}</h1>
              </div>
              <p className="text-lg text-gray-600">{getPageDescription()}</p>
            </div>
            {getRoleSpecificActions()}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Расширенный поиск</h2>
            <p className="text-sm text-gray-600 mt-1">Найдите подходящую охранную компанию по всем параметрам</p>
          </div>

          <div className="p-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="basic">Основные</TabsTrigger>
                <TabsTrigger value="advanced">Расширенные</TabsTrigger>
                <TabsTrigger value="location">География</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Поиск компаний..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Специализация" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                      <SelectItem value="reviews">По отзывам</SelectItem>
                      <SelectItem value="experience">По опыту</SelectItem>
                      <SelectItem value="price">По цене</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Опыт работы</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой опыт" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любой опыт</SelectItem>
                        <SelectItem value="1-5">1-5 лет</SelectItem>
                        <SelectItem value="5-10">5-10 лет</SelectItem>
                        <SelectItem value="10+">Более 10 лет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Размер компании</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой размер" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любой размер</SelectItem>
                        <SelectItem value="small">До 100 сотрудников</SelectItem>
                        <SelectItem value="medium">100-500 сотрудников</SelectItem>
                        <SelectItem value="large">Более 500 сотрудников</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ценовой диапазон</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Любая цена" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любая цена</SelectItem>
                        <SelectItem value="budget">До 20 000 ₽</SelectItem>
                        <SelectItem value="medium">20 000 - 40 000 ₽</SelectItem>
                        <SelectItem value="premium">Более 40 000 ₽</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Федеральный округ</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите округ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="central">Центральный ФО</SelectItem>
                        <SelectItem value="northwest">Северо-Западный ФО</SelectItem>
                        <SelectItem value="south">Южный ФО</SelectItem>
                        <SelectItem value="volga">Приволжский ФО</SelectItem>
                        <SelectItem value="ural">Уральский ФО</SelectItem>
                        <SelectItem value="siberian">Сибирский ФО</SelectItem>
                        <SelectItem value="fareast">Дальневосточный ФО</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Радиус покрытия</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите радиус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city">Только город</SelectItem>
                        <SelectItem value="region">Регион</SelectItem>
                        <SelectItem value="federal">Федеральный округ</SelectItem>
                        <SelectItem value="russia">Вся Россия</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mt-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="verified"
                    checked={showVerifiedOnly}
                    onCheckedChange={setShowVerifiedOnly}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label htmlFor="verified" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Только проверенные компании
                  </label>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Найдено: {filteredCompanies.length} компаний</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">Вид:</span>
                <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`h-8 w-8 p-0 ${viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`h-8 w-8 p-0 ${viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredCompanies.map((company) => (
            <Card
              key={company.id}
              className={`group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer ${
                viewMode === "list" ? "w-full" : ""
              }`}
            >
              <CardContent className={viewMode === "grid" ? "p-6" : "p-0"}>
                {viewMode === "grid" ? (
                  // Grid View
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-2 border-gray-200">
                        <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                          {company.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                            {company.name}
                          </h3>
                          {company.verified && (
                            <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Проверена
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
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
                          <span className="text-gray-500 text-sm">({company.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{company.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">{company.description}</p>

                    {/* Specialization */}
                    <div className="flex flex-wrap gap-2">
                      {company.specialization.slice(0, 3).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {company.specialization.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{company.specialization.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{company.experience} лет</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{company.employees} сотр.</span>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                      <div>Время реагирования: {company.responseTime}</div>
                      <div>Активных вакансий: {company.activeJobs}</div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{company.price}</div>
                        <div className="text-xs text-gray-500">за охрану объекта</div>
                      </div>
                      {getCompanyActions(company)}
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
                    <Avatar className="h-20 w-20 border-2 border-gray-200 flex-shrink-0">
                      <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                        {company.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-xl text-gray-900 group-hover:text-gray-700 transition-colors">
                              {company.name}
                            </h3>
                            {company.verified && (
                              <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                Проверена
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-2">
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
                              <span className="text-gray-500">({company.reviewCount} отзывов)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{company.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-semibold text-gray-900 mb-1">{company.price}</div>
                          <div className="text-sm text-gray-500">за охрану объекта</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3 leading-relaxed">{company.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{company.experience} лет опыта</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{company.employees} сотрудников</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {company.specialization.slice(0, 2).map((spec, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{company.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Link href={`/catalog/${company.id}`}>
                              <Button className="bg-gray-900 hover:bg-gray-800">Подробнее</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled>
              Предыдущая
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Следующая</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
