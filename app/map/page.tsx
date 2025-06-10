"use client"

import { useState, useEffect } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import { MapPin, Search, Phone, Clock, Star, Navigation, Layers, Shield, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import { createClient } from "@/lib/supabase/client"

export default function MapPage() {
  const { userRole } = useUserRole()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [activeLayers, setActiveLayers] = useState(["chops", "jobs"])
  const [mapObjects, setMapObjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMapData() {
      try {
        const supabase = createClient()

        // Загружаем ЧОПы
        const { data: chopsData, error: chopsError } = await supabase.from("chops").select("*").eq("status", "active")

        if (chopsError) {
          console.error("Error loading chops:", chopsError)
        }

        // Загружаем вакансии
        const { data: jobsData, error: jobsError } = await supabase.from("jobs").select("*").eq("status", "active")

        if (jobsError) {
          console.error("Error loading jobs:", jobsError)
        }

        // Преобразуем данные ЧОПов
        const chopsObjects = (chopsData || []).map((chop) => ({
          id: `chop-${chop.id}`,
          name: chop.name,
          type: "chop",
          address: chop.address || "Адрес не указан",
          phone: chop.phone || "Телефон не указан",
          rating: 4.5, // Default rating
          reviewCount: 50, // Default review count
          workingHours: "Круглосуточно",
          services: ["Охрана объектов", "Видеонаблюдение"],
          coordinates: { lat: 55.7558 + Math.random() * 0.1, lng: 37.6176 + Math.random() * 0.1 },
          verified: true,
          status: "active",
        }))

        // Преобразуем данные вакансий
        const jobsObjects = (jobsData || []).map((job) => ({
          id: `job-${job.id}`,
          name: job.title,
          type: "job",
          address: job.location || "Москва",
          phone: "По запросу",
          rating: 0,
          reviewCount: 0,
          workingHours: job.schedule || "Полный день",
          services: [job.employment_type || "Полная занятость"],
          coordinates: { lat: 55.7558 + Math.random() * 0.1, lng: 37.6176 + Math.random() * 0.1 },
          verified: true,
          status: "active",
          salary: job.salary_from ? `от ${job.salary_from} руб.` : "По договоренности",
        }))

        setMapObjects([...chopsObjects, ...jobsObjects])
        console.log("Loaded map objects:", [...chopsObjects, ...jobsObjects])
      } catch (error) {
        console.error("Error loading map data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMapData()
  }, [])

  const mapLayers = [
    {
      id: "chops",
      name: "Офисы ЧОПов",
      count: mapObjects.filter((obj) => obj.type === "chop").length,
      color: "bg-blue-500",
    },
    {
      id: "jobs",
      name: "Вакансии",
      count: mapObjects.filter((obj) => obj.type === "job").length,
      color: "bg-green-500",
    },
  ]

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Карта вакансий и ЧОПов"
      case "chop":
        return "Карта клиентов и конкурентов"
      case "moderator":
        return "Модерация карты"
      case "admin":
        return "Управление картой"
      default:
        return "Интерактивная карта"
    }
  }

  const getPageDescription = () => {
    switch (userRole) {
      case "guard":
        return "Найдите ближайшие вакансии и охранные компании"
      case "chop":
        return "Управляйте своими объектами и отслеживайте конкурентов"
      case "moderator":
        return "Модерируйте объекты на карте и проверяйте информацию"
      case "admin":
        return "Полное управление картой и всеми объектами"
      default:
        return "Интерактивная карта охранных компаний и вакансий"
    }
  }

  const getObjectTypeIcon = (type: string) => {
    switch (type) {
      case "chop":
        return <Shield className="h-5 w-5 text-blue-600" />
      case "job":
        return <Briefcase className="h-5 w-5 text-green-600" />
      default:
        return <MapPin className="h-5 w-5 text-gray-600" />
    }
  }

  const getObjectTypeName = (type: string) => {
    switch (type) {
      case "chop":
        return "ЧОП"
      case "job":
        return "Вакансия"
      default:
        return "Неизвестно"
    }
  }

  const filteredObjects = mapObjects.filter((object) => {
    const matchesSearch =
      object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      object.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || object.type === selectedType
    const matchesLayer = activeLayers.includes(object.type === "chop" ? "chops" : "jobs")

    return matchesSearch && matchesType && matchesLayer
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка карты...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{getPageTitle()}</h1>
              <p className="text-lg text-gray-600 max-w-2xl">{getPageDescription()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search and Filters */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Поиск на карте..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 border-gray-200"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Тип объекта" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      <SelectItem value="chop">ЧОПы</SelectItem>
                      <SelectItem value="job">Вакансии</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Map Layers */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Слои карты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mapLayers.map((layer) => (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${layer.color}`}></div>
                      <span className="text-sm font-medium">{layer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{layer.count}</span>
                      <input
                        type="checkbox"
                        checked={activeLayers.includes(layer.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setActiveLayers([...activeLayers, layer.id])
                          } else {
                            setActiveLayers(activeLayers.filter((id) => id !== layer.id))
                          }
                        }}
                        className="rounded"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ЧОПы:</span>
                  <span className="font-semibold">{mapObjects.filter((obj) => obj.type === "chop").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Вакансии:</span>
                  <span className="font-semibold">{mapObjects.filter((obj) => obj.type === "job").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Всего объектов:</span>
                  <span className="font-semibold">{mapObjects.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="map" className="space-y-6">
              <TabsList className="grid w-full sm:w-auto grid-cols-2 h-11">
                <TabsTrigger value="map" className="text-sm font-medium">
                  Карта
                </TabsTrigger>
                <TabsTrigger value="list" className="text-sm font-medium">
                  Список
                </TabsTrigger>
              </TabsList>

              {/* Карта */}
              <TabsContent value="map" className="space-y-6">
                {/* Map Container */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Интерактивная карта</p>
                        <p className="text-sm text-gray-500">Здесь будет отображаться карта с объектами</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Objects List */}
                <div className="grid gap-4">
                  {filteredObjects.map((object) => (
                    <Card
                      key={object.id}
                      className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">{getObjectTypeIcon(object.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {object.name}
                              </h3>
                              <Badge variant="outline">{getObjectTypeName(object.type)}</Badge>
                              {object.verified && (
                                <Badge className="bg-green-100 text-green-800 border-0">Проверено</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{object.address}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                <span>{object.phone}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{object.workingHours}</span>
                              </div>
                            </div>
                            {object.type === "chop" && object.rating > 0 && (
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="font-semibold">{object.rating}</span>
                                  <span className="text-gray-500 text-sm">({object.reviewCount} отзывов)</span>
                                </div>
                              </div>
                            )}
                            {object.type === "job" && object.salary && (
                              <div className="mb-3">
                                <span className="text-green-600 font-semibold">{object.salary}</span>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {object.services.map((service: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">
                                Координаты: {object.coordinates.lat.toFixed(4)}, {object.coordinates.lng.toFixed(4)}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Navigation className="h-4 w-4 mr-1" />
                                  Маршрут
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  Подробнее
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Список объектов */}
              <TabsContent value="list" className="space-y-6">
                <div className="grid gap-4">
                  {filteredObjects.map((object) => (
                    <Card
                      key={object.id}
                      className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getObjectTypeIcon(object.type)}
                            <div>
                              <h4 className="font-medium">{object.name}</h4>
                              <p className="text-sm text-gray-600">{object.address}</p>
                              {object.type === "job" && object.salary && (
                                <p className="text-sm text-green-600 font-semibold">{object.salary}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {object.type === "chop" && object.rating > 0 && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-semibold">{object.rating}</span>
                              </div>
                            )}
                            <Button variant="outline" size="sm">
                              Подробнее
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
