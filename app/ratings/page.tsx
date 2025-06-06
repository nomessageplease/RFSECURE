"use client"

import { useState, useMemo } from "react"
import {
  BarChart3,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Eye,
  ContrastIcon as Compare,
  Filter,
  Search,
  MapPin,
  Users,
  Shield,
  Award,
  Building2,
  Phone,
  ChevronDown,
  ChevronUp,
  Zap,
  Plus,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useUserRole } from "@/components/user-role-switcher"
import Link from "next/link"
import Header from "@/components/header"

// Расширенные данные ЧОПов
const chopsData = [
  {
    id: 1,
    name: "Охранное Агентство Авангард",
    shortName: "Авангард",
    rating: 4.8,
    previousRating: 4.7,
    reviewCount: 156,
    verifiedReviews: 142,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%201-pSoYbxeRfeKKzvB9MhQQpkC67sQnGz.jpeg",
    location: "Москва",
    region: "Центральный",
    experience: 15,
    employees: 450,
    verified: true,
    premium: true,
    founded: 2008,
    specialization: ["Объекты", "Мероприятия", "VIP", "Банки"],
    services: ["Физическая охрана", "Техническая охрана", "Консультации"],
    contact: {
      phone: "+7 (495) 123-45-67",
      email: "info@avangard-security.ru",
      website: "www.avangard-security.ru",
    },
    ratingBreakdown: {
      reliability: 4.9,
      professionalism: 4.8,
      response: 4.7,
      equipment: 4.6,
      value: 4.8,
    },
    trend: "up",
    trendValue: 0.1,
    monthlyGrowth: 12,
    clientRetention: 94,
    avgProjectCost: 150000,
    completedProjects: 234,
    activeContracts: 45,
    licenses: ["ЧОП-001", "ТехОхрана-123"],
    certifications: ["ISO 9001", "ISO 27001"],
    workRegions: ["Москва", "МО", "Тула"],
    responseTime: 3.2,
    equipment: ["CCTV", "Сигнализация", "Контроль доступа"],
  },
  {
    id: 2,
    name: "Щит-Безопасность",
    shortName: "Щит",
    rating: 4.7,
    previousRating: 4.6,
    reviewCount: 134,
    verifiedReviews: 128,
    logo: "/placeholder.svg?height=200&width=200",
    location: "Москва",
    region: "Центральный",
    experience: 10,
    employees: 180,
    verified: true,
    premium: false,
    founded: 2013,
    specialization: ["VIP-охрана", "Мероприятия", "Персональная охрана"],
    services: ["VIP-охрана", "Сопровождение", "Консультации"],
    contact: {
      phone: "+7 (495) 987-65-43",
      email: "contact@shield-security.ru",
      website: "www.shield-security.ru",
    },
    ratingBreakdown: {
      reliability: 4.8,
      professionalism: 4.7,
      response: 4.6,
      equipment: 4.8,
      value: 4.5,
    },
    trend: "up",
    trendValue: 0.1,
    monthlyGrowth: 8,
    clientRetention: 89,
    avgProjectCost: 200000,
    completedProjects: 156,
    activeContracts: 28,
    licenses: ["ЧОП-002"],
    certifications: ["ISO 9001"],
    workRegions: ["Москва", "СПб"],
    responseTime: 2.8,
    equipment: ["Бронетранспорт", "Связь", "Оружие"],
  },
  {
    id: 3,
    name: "Охранное Предприятие Барс",
    shortName: "Барс",
    rating: 4.6,
    previousRating: 4.7,
    reviewCount: 89,
    verifiedReviews: 82,
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%B3%D0%BE%202-LPcWjTR8tqF96i00nlQSHBA3vXRfbt.jpeg",
    location: "Санкт-Петербург",
    region: "Северо-Западный",
    experience: 8,
    employees: 280,
    verified: true,
    premium: true,
    founded: 2015,
    specialization: ["Торговые центры", "Склады", "Промышленные объекты"],
    services: ["Физическая охрана", "Техническая охрана", "Логистика"],
    contact: {
      phone: "+7 (812) 456-78-90",
      email: "info@bars-security.ru",
      website: "www.bars-security.ru",
    },
    ratingBreakdown: {
      reliability: 4.7,
      professionalism: 4.6,
      response: 4.5,
      equipment: 4.4,
      value: 4.7,
    },
    trend: "down",
    trendValue: -0.1,
    monthlyGrowth: -3,
    clientRetention: 85,
    avgProjectCost: 80000,
    completedProjects: 198,
    activeContracts: 52,
    licenses: ["ЧОП-003", "Склад-456"],
    certifications: ["ISO 14001"],
    workRegions: ["СПб", "ЛО", "Новгород"],
    responseTime: 4.1,
    equipment: ["CCTV", "Датчики", "Патрулирование"],
  },
]

const regions = [
  "Все регионы",
  "Центральный",
  "Северо-Западный",
  "Южный",
  "Приволжский",
  "Уральский",
  "Сибирский",
  "Дальневосточный",
  "Северо-Кавказский",
]

const specializations = [
  "Все специализации",
  "Объекты",
  "Мероприятия",
  "VIP",
  "Банки",
  "Торговые центры",
  "Склады",
  "Промышленные объекты",
  "Персональная охрана",
]

const services = [
  "Все услуги",
  "Физическая охрана",
  "Техническая охрана",
  "VIP-охрана",
  "Консультации",
  "Сопровождение",
  "Логистика",
]

export default function RatingsPage() {
  const { userRole } = useUserRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("Все регионы")
  const [selectedSpecialization, setSelectedSpecialization] = useState("Все специализации")
  const [selectedService, setSelectedService] = useState("Все услуги")
  const [sortBy, setSortBy] = useState("rating")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [minRating, setMinRating] = useState([3])
  const [minEmployees, setMinEmployees] = useState([0])
  const [expandedFilters, setExpandedFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid")

  // Фильтрация и сортировка
  const filteredAndSortedChops = useMemo(() => {
    const filtered = chopsData.filter((chop) => {
      const matchesSearch =
        chop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chop.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRegion = selectedRegion === "Все регионы" || chop.region === selectedRegion
      const matchesSpecialization =
        selectedSpecialization === "Все специализации" || chop.specialization.includes(selectedSpecialization)
      const matchesService = selectedService === "Все услуги" || chop.services.includes(selectedService)
      const matchesVerified = !showVerifiedOnly || chop.verified
      const matchesPremium = !showPremiumOnly || chop.premium
      const matchesRating = chop.rating >= minRating[0]
      const matchesEmployees = chop.employees >= minEmployees[0]

      return (
        matchesSearch &&
        matchesRegion &&
        matchesSpecialization &&
        matchesService &&
        matchesVerified &&
        matchesPremium &&
        matchesRating &&
        matchesEmployees
      )
    })

    // Сортировка
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "rating":
          aValue = a.rating
          bValue = b.rating
          break
        case "reviews":
          aValue = a.reviewCount
          bValue = b.reviewCount
          break
        case "experience":
          aValue = a.experience
          bValue = b.experience
          break
        case "employees":
          aValue = a.employees
          bValue = b.employees
          break
        case "trend":
          aValue = a.trendValue
          bValue = b.trendValue
          break
        case "response":
          aValue = a.responseTime
          bValue = b.responseTime
          break
        default:
          aValue = a.rating
          bValue = b.rating
      }

      if (sortOrder === "desc") {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })

    return filtered
  }, [
    searchTerm,
    selectedRegion,
    selectedSpecialization,
    selectedService,
    showVerifiedOnly,
    showPremiumOnly,
    minRating,
    minEmployees,
    sortBy,
    sortOrder,
  ])

  const toggleCompare = (chopId: number) => {
    setSelectedForCompare((prev) =>
      prev.includes(chopId) ? prev.filter((id) => id !== chopId) : prev.length < 3 ? [...prev, chopId] : prev,
    )
  }

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Рейтинги работодателей"
      case "chop":
        return "Анализ конкурентов"
      case "moderator":
        return "Модерация рейтингов"
      case "admin":
        return "Управление рейтингами"
      default:
        return "Рейтинги ЧОПов"
    }
  }

  const getPageDescription = () => {
    switch (userRole) {
      case "guard":
        return "Выбирайте лучших работодателей на основе независимых рейтингов и отзывов сотрудников"
      case "chop":
        return "Анализируйте позиции конкурентов и улучшайте свои показатели"
      case "moderator":
        return "Модерируйте отзывы и рейтинги для поддержания качества платформы"
      case "admin":
        return "Полное управление системой рейтингов и аналитика платформы"
      default:
        return "Независимые рейтинги охранных организаций на основе отзывов клиентов"
    }
  }

  const renderRoleSpecificActions = () => {
    switch (userRole) {
      case "chop":
        return (
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Award className="h-4 w-4 mr-2" />
              Улучшить рейтинг
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Аналитика
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex gap-2">
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Жалобы на отзывы
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              На модерации (12)
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить ЧОП
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Настройки рейтинга
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Smart Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">{getPageTitle()}</h1>
              </div>
              <p className="text-lg text-gray-600">{getPageDescription()}</p>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {filteredAndSortedChops.length} компаний
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Средний рейтинг:{" "}
                  {(
                    filteredAndSortedChops.reduce((acc, chop) => acc + chop.rating, 0) / filteredAndSortedChops.length
                  ).toFixed(1)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {filteredAndSortedChops.reduce((acc, chop) => acc + chop.employees, 0).toLocaleString()} сотрудников
                </span>
              </div>
            </div>

            {renderRoleSpecificActions()}
          </div>
        </div>

        {/* Smart Filters */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-6">
            {/* Search and Quick Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск по названию или городу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="reviews">По отзывам</SelectItem>
                    <SelectItem value="experience">По опыту</SelectItem>
                    <SelectItem value="employees">По размеру</SelectItem>
                    <SelectItem value="trend">По динамике</SelectItem>
                    <SelectItem value="response">По скорости</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}>
                  {sortOrder === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </Button>

                <Button variant="outline" onClick={() => setExpandedFilters(!expandedFilters)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                  {expandedFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>

            {/* Expanded Filters */}
            {expandedFilters && (
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Регион" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger>
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

                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Услуги" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Минимальный рейтинг: {minRating[0]}</label>
                    <Slider
                      value={minRating}
                      onValueChange={setMinRating}
                      max={5}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Минимум сотрудников: {minEmployees[0]}</label>
                    <Slider
                      value={minEmployees}
                      onValueChange={setMinEmployees}
                      max={1000}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" checked={showVerifiedOnly} onCheckedChange={setShowVerifiedOnly} />
                      <label htmlFor="verified" className="text-sm font-medium">
                        Только проверенные
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium" checked={showPremiumOnly} onCheckedChange={setShowPremiumOnly} />
                      <label htmlFor="premium" className="text-sm font-medium">
                        Только премиум
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant={compareMode ? "default" : "outline"}
                      onClick={() => {
                        setCompareMode(!compareMode)
                        if (!compareMode) setSelectedForCompare([])
                      }}
                      className="w-full"
                    >
                      <Compare className="h-4 w-4 mr-2" />
                      {compareMode ? "Отменить" : "Сравнить"}
                    </Button>

                    {compareMode && selectedForCompare.length > 1 && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Сравнить ({selectedForCompare.length})
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {filteredAndSortedChops.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
                <p className="text-gray-600">Попробуйте изменить критерии поиска или фильтры</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedChops.map((chop, index) => (
                <Card
                  key={chop.id}
                  className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
                    index === 0 ? "ring-2 ring-yellow-400" : ""
                  } ${compareMode ? "cursor-pointer hover:bg-gray-50" : ""} ${
                    selectedForCompare.includes(chop.id) ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => compareMode && toggleCompare(chop.id)}
                >
                  {/* Badges Container */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between z-20">
                    {/* Premium Badge */}
                    <div>
                      {chop.premium && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                          <Zap className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>

                    {/* Rank Badge */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                            ? "bg-gray-400"
                            : index === 2
                              ? "bg-orange-500"
                              : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <CardContent className="p-6 pt-14 relative">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-16 w-16 border-2 border-gray-200 flex-shrink-0">
                        <AvatarImage src={chop.logo || "/placeholder.svg"} alt={chop.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                          {chop.shortName.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg leading-tight mb-1 truncate" title={chop.name}>
                          {chop.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span>{chop.location}</span>
                          {chop.verified && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              <Shield className="h-3 w-3 mr-1 text-green-600" />
                              Проверен
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(chop.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xl font-bold text-gray-900">{chop.rating}</span>
                        <div
                          className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            chop.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {chop.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(chop.trendValue).toFixed(1)}
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {chop.reviewCount} отзывов • {chop.verifiedReviews} проверенных
                      </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-gray-600">Опыт</div>
                        <div className="font-semibold">{chop.experience} лет</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-gray-600">Сотрудники</div>
                        <div className="font-semibold">{chop.employees}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-gray-600">Реагирование</div>
                        <div className="font-semibold">{chop.responseTime} мин</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-gray-600">Удержание</div>
                        <div className="font-semibold">{chop.clientRetention}%</div>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {chop.specialization.slice(0, 3).map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {chop.specialization.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{chop.specialization.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {compareMode ? (
                        <Button
                          variant={selectedForCompare.includes(chop.id) ? "default" : "outline"}
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCompare(chop.id)
                          }}
                        >
                          {selectedForCompare.includes(chop.id) ? "Выбрано" : "Выбрать"}
                        </Button>
                      ) : (
                        <>
                          <Link href={`/chop/${chop.id}`} className="flex-1">
                            <Button size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-1" />
                              Просмотр
                            </Button>
                          </Link>
                          {userRole === "guard" && (
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
