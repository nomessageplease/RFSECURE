"use client"

import { useState } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import {
  MapPin,
  Search,
  Building,
  Phone,
  Clock,
  Star,
  Navigation,
  Layers,
  Plus,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Settings,
  BarChart3,
  Shield,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"

const mapObjects = [
  {
    id: 1,
    name: "Охранное Агентство Авангард",
    type: "chop",
    address: "ул. Тверская, 15, Москва",
    phone: "+7 (495) 123-45-67",
    rating: 4.8,
    reviewCount: 124,
    workingHours: "Круглосуточно",
    services: ["Охрана объектов", "Видеонаблюдение", "Пультовая охрана"],
    coordinates: { lat: 55.7558, lng: 37.6176 },
    verified: true,
    status: "active",
  },
  {
    id: 2,
    name: "ЧОП Ильгория",
    type: "chop",
    address: "пр. Мира, 45, Москва",
    phone: "+7 (495) 234-56-78",
    rating: 4.2,
    reviewCount: 89,
    workingHours: "Пн-Пт 9:00-18:00",
    services: ["Охрана мероприятий", "Личная охрана", "Консультации"],
    coordinates: { lat: 55.7887, lng: 37.6343 },
    verified: true,
    status: "active",
  },
  {
    id: 3,
    name: "Торговый центр Европейский",
    type: "object",
    address: "пл. Киевского Вокзала, 2, Москва",
    phone: "+7 (495) 345-67-89",
    rating: 4.5,
    reviewCount: 234,
    workingHours: "10:00-22:00",
    services: ["Торговый центр", "Охрана", "Парковка"],
    coordinates: { lat: 55.7447, lng: 37.5656 },
    verified: true,
    status: "pending",
  },
  {
    id: 4,
    name: "Бизнес-центр Белая Площадь",
    type: "object",
    address: "ул. Белая, 8, Москва",
    phone: "+7 (495) 456-78-90",
    rating: 4.3,
    reviewCount: 67,
    workingHours: "24/7",
    services: ["Офисный центр", "Охрана", "Видеонаблюдение"],
    coordinates: { lat: 55.7601, lng: 37.6184 },
    verified: false,
    status: "active",
  },
  {
    id: 5,
    name: "Охранник Иван Петров",
    type: "guard",
    address: "Район Хамовники, Москва",
    phone: "+7 (999) 123-45-67",
    rating: 4.9,
    reviewCount: 45,
    workingHours: "По договоренности",
    services: ["Личная охрана", "Сопровождение", "Консультации"],
    coordinates: { lat: 55.7284, lng: 37.5795 },
    verified: true,
    status: "active",
  },
]

const mapLayers = [
  { id: "chops", name: "ЧОПы", count: 45, color: "bg-blue-500" },
  { id: "objects", name: "Охраняемые объекты", count: 234, color: "bg-green-500" },
  { id: "guards", name: "Охранники", count: 156, color: "bg-purple-500" },
  { id: "incidents", name: "Инциденты", count: 12, color: "bg-red-500" },
]

export default function MapPage() {
  const { userRole } = useUserRole()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [activeLayers, setActiveLayers] = useState(["chops", "objects"])

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Карта объектов"
      case "chop":
        return "Карта клиентов и объектов"
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
        return "Найдите ближайшие объекты для работы и охранные компании"
      case "chop":
        return "Управляйте своими объектами и отслеживайте активность"
      case "moderator":
        return "Модерируйте объекты на карте и проверяйте информацию"
      case "admin":
        return "Полное управление картой и всеми объектами"
      default:
        return "Интерактивная карта охранных компаний и объектов"
    }
  }

  const getTabsForRole = () => {
    switch (userRole) {
      case "guard":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-11">
            <TabsTrigger value="map" className="text-sm font-medium">
              Карта
            </TabsTrigger>
            <TabsTrigger value="nearby" className="text-sm font-medium">
              Рядом
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-sm font-medium">
              Избранное
            </TabsTrigger>
          </TabsList>
        )
      case "chop":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-4 h-11">
            <TabsTrigger value="map" className="text-sm font-medium">
              Карта
            </TabsTrigger>
            <TabsTrigger value="my-objects" className="text-sm font-medium">
              Мои объекты
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="routes" className="text-sm font-medium">
              Маршруты
            </TabsTrigger>
          </TabsList>
        )
      case "moderator":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-4 h-11">
            <TabsTrigger value="moderation" className="text-sm font-medium">
              Модерация
            </TabsTrigger>
            <TabsTrigger value="map" className="text-sm font-medium">
              Карта
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm font-medium">
              Жалобы
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Аналитика
            </TabsTrigger>
          </TabsList>
        )
      case "admin":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-5 h-11">
            <TabsTrigger value="moderation" className="text-sm font-medium">
              Модерация
            </TabsTrigger>
            <TabsTrigger value="map" className="text-sm font-medium">
              Карта
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm font-medium">
              Настройки
            </TabsTrigger>
            <TabsTrigger value="layers" className="text-sm font-medium">
              Слои
            </TabsTrigger>
          </TabsList>
        )
      default:
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-2 h-11">
            <TabsTrigger value="map" className="text-sm font-medium">
              Карта
            </TabsTrigger>
            <TabsTrigger value="list" className="text-sm font-medium">
              Список
            </TabsTrigger>
          </TabsList>
        )
    }
  }

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Navigation className="h-4 w-4 mr-2" />
              Мое местоположение
            </Button>
          </div>
        )
      case "chop":
        return (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 hidden md:flex text-sm" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить объект
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Добавление объекта на карту</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="object-name">Название объекта</Label>
                    <Input id="object-name" placeholder="Например: Торговый центр Галерея" />
                  </div>
                  <div>
                    <Label htmlFor="object-address">Адрес</Label>
                    <Input id="object-address" placeholder="Полный адрес объекта" />
                  </div>
                  <div>
                    <Label htmlFor="object-type">Тип объекта</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Офисное здание</SelectItem>
                        <SelectItem value="retail">Торговый центр</SelectItem>
                        <SelectItem value="warehouse">Склад</SelectItem>
                        <SelectItem value="residential">Жилой комплекс</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="object-description">Описание</Label>
                    <Textarea id="object-description" placeholder="Дополнительная информация об объекте..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Отмена</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Добавить</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <BarChart3 className="h-4 w-4 mr-2" />
              Отчеты
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-800 border-0">На модерации: 8</Badge>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Shield className="h-4 w-4 mr-2" />
              Правила размещения
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Настройки карты
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 hidden md:flex text-sm" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Добавить слой
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const getObjectActions = (object) => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Navigation className="h-4 w-4 mr-1" />
              Маршрут
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Подробнее
            </Button>
          </div>
        )
      case "chop":
        return object.type === "object" ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-1" />
              Статистика
            </Button>
          </div>
        ) : (
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Связаться
          </Button>
        )
      case "moderator":
      case "admin":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            {object.status === "pending" && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Одобрить
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <XCircle className="h-4 w-4 mr-1" />
                  Отклонить
                </Button>
              </>
            )}
            {userRole === "admin" && (
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash className="h-4 w-4 mr-1" />
                Удалить
              </Button>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const getObjectTypeIcon = (type) => {
    switch (type) {
      case "chop":
        return <Shield className="h-5 w-5 text-blue-600" />
      case "object":
        return <Building className="h-5 w-5 text-green-600" />
      case "guard":
        return <MapPin className="h-5 w-5 text-purple-600" />
      default:
        return <MapPin className="h-5 w-5 text-gray-600" />
    }
  }

  const getObjectTypeName = (type) => {
    switch (type) {
      case "chop":
        return "ЧОП"
      case "object":
        return "Объект"
      case "guard":
        return "Охранник"
      default:
        return "Неизвестно"
    }
  }

  const filteredObjects = mapObjects.filter((object) => {
    const matchesSearch =
      object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      object.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || object.type === selectedType

    // Для модераторов и админов показываем все объекты
    if (userRole === "moderator" || userRole === "admin") {
      return matchesSearch && matchesType
    }

    // Для обычных пользователей показываем только активные
    return matchesSearch && matchesType && object.status === "active"
  })

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
            {getRoleSpecificActions()}
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
                      <SelectItem value="object">Объекты</SelectItem>
                      <SelectItem value="guard">Охранники</SelectItem>
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
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Объекты:</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Охранники:</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Активных:</span>
                  <span className="font-semibold text-green-600">89%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              defaultValue={userRole === "moderator" || userRole === "admin" ? "moderation" : "map"}
              className="space-y-6"
            >
              {getTabsForRole()}

              {/* Модерация - только для модераторов и админов */}
              {(userRole === "moderator" || userRole === "admin") && (
                <TabsContent value="moderation" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Объекты на модерации</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mapObjects
                          .filter((object) => object.status === "pending")
                          .map((object) => (
                            <div key={object.id} className="p-4 border rounded-lg">
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">{getObjectTypeIcon(object.type)}</div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-medium">{object.name}</h4>
                                    <Badge variant="outline">{getObjectTypeName(object.type)}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{object.address}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <span>{object.phone}</span>
                                    <span>{object.workingHours}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      Одобрить
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600">
                                      Отклонить
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Просмотреть
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

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
                              {(userRole === "moderator" || userRole === "admin") && (
                                <Badge
                                  className={
                                    object.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-orange-100 text-orange-800"
                                  }
                                >
                                  {object.status === "active" ? "Активен" : "На модерации"}
                                </Badge>
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
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-semibold">{object.rating}</span>
                                <span className="text-gray-500 text-sm">({object.reviewCount} отзывов)</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {object.services.map((service, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">
                                Координаты: {object.coordinates.lat}, {object.coordinates.lng}
                              </div>
                              {getObjectActions(object)}
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
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-semibold">{object.rating}</span>
                            </div>
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

              {/* Рядом - для охранников */}
              {userRole === "guard" && (
                <TabsContent value="nearby" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Объекты рядом с вами</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mapObjects.slice(0, 3).map((object) => (
                          <div key={object.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getObjectTypeIcon(object.type)}
                              <div>
                                <h4 className="font-medium">{object.name}</h4>
                                <p className="text-sm text-gray-600">{object.address}</p>
                                <p className="text-sm text-blue-600">~1.2 км от вас</p>
                              </div>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Маршрут
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Мои объекты - для ЧОПов */}
              {userRole === "chop" && (
                <TabsContent value="my-objects" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Мои объекты</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mapObjects
                          .filter((object) => object.type === "object")
                          .slice(0, 2)
                          .map((object) => (
                            <div key={object.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{object.name}</h4>
                                  <p className="text-sm text-gray-600">{object.address}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                    <span>Рейтинг: {object.rating}</span>
                                    <span>Отзывов: {object.reviewCount}</span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    Редактировать
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    Статистика
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Аналитика */}
              {(userRole === "chop" || userRole === "moderator" || userRole === "admin") && (
                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">435</div>
                        <div className="text-sm text-gray-600">Всего объектов</div>
                        <div className="text-xs text-green-600 mt-1">+12% за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">89%</div>
                        <div className="text-sm text-gray-600">Активных объектов</div>
                        <div className="text-xs text-green-600 mt-1">+2% за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">4.6</div>
                        <div className="text-sm text-gray-600">Средний рейтинг</div>
                        <div className="text-xs text-green-600 mt-1">+0.2 за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">1,234</div>
                        <div className="text-sm text-gray-600">Просмотров</div>
                        <div className="text-xs text-green-600 mt-1">+18% за месяц</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}

              {/* Жалобы - для модераторов */}
              {userRole === "moderator" && (
                <TabsContent value="reports" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Жалобы на объекты</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <div>
                              <h4 className="font-medium">Неверная информация об объекте</h4>
                              <p className="text-sm text-gray-600">
                                Жалоба на: Торговый центр Европейский • 2 часа назад
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">
                            Указаны неверные часы работы и контактная информация...
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Исправить
                            </Button>
                            <Button variant="outline" size="sm">
                              Отклонить жалобу
                            </Button>
                            <Button variant="outline" size="sm">
                              Связаться с владельцем
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Настройки - только для админов */}
              {userRole === "admin" && (
                <TabsContent value="settings" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Настройки карты</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Модерация новых объектов</span>
                          <Button variant="outline" size="sm">
                            Включено
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Автоматическая геолокация</span>
                          <Button variant="outline" size="sm">
                            Включено
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Публичный доступ к карте</span>
                          <Button variant="outline" size="sm">
                            Включено
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Управление слоями</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {mapLayers.map((layer) => (
                          <div key={layer.id} className="flex items-center justify-between">
                            <span>{layer.name}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Настроить
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                Скрыть
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button size="sm" className="w-full">
                          Добавить слой
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}

              {/* Слои - только для админов */}
              {userRole === "admin" && (
                <TabsContent value="layers" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Управление слоями карты</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mapLayers.map((layer) => (
                          <div key={layer.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full ${layer.color}`}></div>
                                <div>
                                  <h4 className="font-medium">{layer.name}</h4>
                                  <p className="text-sm text-gray-600">{layer.count} объектов</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Настроить
                                </Button>
                                <Button variant="outline" size="sm">
                                  Экспорт
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600">
                                  Удалить
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
