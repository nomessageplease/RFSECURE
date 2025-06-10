"use client"

import { useState, useEffect } from "react"
import { Search, ArrowUpDown, Grid3X3, List, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RegistrationBanner } from "@/components/registration-banner"
import { useAuth } from "@/hooks/use-auth"
import Header from "@/components/header"
import { ChopCard } from "@/components/chop-card"
import { createClient } from "@/lib/supabase/client"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Типы данных
interface Chop {
  id: string
  name: string | null
  inn: string
  website: string | null
  description: string | null
  address: string | null
  phone: string | null
  email: string | null
  license_number: string | null
  logo_url: string | null
  status: string | null
  rating: number | null
  reviews_count: number | null
  employees_count: number | null
  created_at: string | null
  specialization?: string[]
  location?: string
  experience?: number
  verified?: boolean
  price?: string
}

const cities = ["Все города", "Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск", "Казань"]
const specializations = ["Все услуги", "Объекты", "VIP-охрана", "Мероприятия", "Торговые центры", "Банки", "Офисы"]

export default function CatalogPage() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Все города")
  const [selectedSpecialization, setSelectedSpecialization] = useState("Все услуги")
  const [sortBy, setSortBy] = useState("rating")
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  // Состояния для загрузки данных
  const [chops, setChops] = useState<Chop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const supabase = createClient()

  // Загрузка данных из Supabase
  useEffect(() => {
    async function loadChops() {
      try {
        console.log("Загружаем ЧОПы из базы данных...")
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.from("chops").select("*").order("created_at", { ascending: false })

        console.log("Результат запроса:", { data, error })

        if (error) {
          console.error("Ошибка при загрузке ЧОПов:", error)
          setError(`Ошибка при загрузке данных: ${error.message}`)
          setDebugInfo({ error })
          return
        }

        if (!data || data.length === 0) {
          console.log("ЧОПы не найдены")
          setChops([])
          return
        }

        // Преобразуем данные для отображения
        const formattedChops: any[] = data.map((chop) => ({
          id: chop.id,
          name: chop.name || `ЧОП ${chop.inn}`,
          rating: chop.rating || 0,
          reviewCount: chop.reviews_count || 0,
          location: chop.address || "Москва",
          verified: chop.status === "verified" || chop.status === "active",
          logo: chop.logo_url, // Правильное маппинг логотипа
          specialization: ["Объекты", "Охрана"],
          employees: chop.employees_count || 0,
          experience: 5,
          phone: chop.phone || "+7 (***) ***-**-**",
          email: chop.email || "info@example.com",
          description: chop.description || "Охранная компания",
          price: "от 20 000 ₽/мес",
          // Добавляем все оригинальные поля для отладки
          originalData: chop,
        }))

        console.log(`Загружено ${formattedChops.length} ЧОПов`)
        setChops(formattedChops)
      } catch (err: any) {
        console.error("Ошибка при загрузке ЧОПов:", err)
        setError(`Произошла ошибка: ${err.message}`)
        setDebugInfo({ error: err })
      } finally {
        setLoading(false)
      }
    }

    loadChops()
  }, [])

  // Фильтрация и сортировка
  const filteredCompanies = chops.filter((company) => {
    const matchesSearch =
      company.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false ||
      company.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false ||
      company.inn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false

    const matchesCity = selectedCity === "Все города" || company.location === selectedCity
    const matchesSpecialization =
      selectedSpecialization === "Все услуги" || company.specialization?.includes(selectedSpecialization) || false

    const matchesVerified = !showVerifiedOnly || company.verified || false

    return matchesSearch && matchesCity && matchesSpecialization && matchesVerified
  })

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "reviews":
        return (b.reviews_count || 0) - (a.reviews_count || 0)
      case "experience":
        return (b.experience || 0) - (a.experience || 0)
      case "name":
        return (a.name || "").localeCompare(b.name || "")
      case "date":
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      default:
        return 0
    }
  })

  return (
    <>
      <Header />
      <main role="main" className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Организации</h1>
            <p className="text-lg text-gray-600">
              Найдите надежную охранную компанию среди {chops.length} проверенных организаций
            </p>
          </div>

          {/* Registration Banner for non-authenticated users */}
          {!user && (
            <div className="mb-8">
              <RegistrationBanner variant="companies" />
            </div>
          )}

          {/* Filters */}
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Фильтры поиска</h2>
              <p className="text-sm text-gray-600 mt-1">Найдите подходящую охранную компанию</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Поиск компаний..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* City Filter */}
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

                {/* Specialization Filter */}
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

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="reviews">По отзывам</SelectItem>
                    <SelectItem value="experience">По опыту</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                    <SelectItem value="date">По дате создания</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
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
                    <span className="font-medium">Найдено: {sortedCompanies.length} компаний</span>
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

          {/* Error message */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
                {debugInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium">Подробности</summary>
                    <pre className="mt-2 text-xs overflow-auto max-h-64 bg-white p-2 rounded border">
                      {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                  </details>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
              <p className="text-gray-600">Загрузка данных...</p>
            </div>
          ) : sortedCompanies.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Компании не найдены</h3>
              <p className="text-gray-600">
                {chops.length === 0
                  ? "В базе данных пока нет ЧОПов. Создайте первый!"
                  : "По заданным критериям не найдено ни одной компании. Попробуйте изменить параметры поиска."}
              </p>
            </div>
          ) : (
            /* Companies Grid/List */
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedCompanies.map((company) => (
                <ChopCard key={company.id} chop={company} viewMode={viewMode} />
              ))}
            </div>
          )}

          {/* Pagination - only show if we have companies */}
          {!loading && sortedCompanies.length > 0 && (
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
          )}
        </div>
      </main>
    </>
  )
}
