"use client"

import { useState, useEffect } from "react"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  AlertCircle,
  Camera,
  Check,
  X,
  Flag,
  MessageSquare,
  Edit,
  Building,
  Users,
  Clock,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { UserRoleSwitcher, type UserRole } from "@/components/user-role-switcher"
import { createClient } from "@/lib/supabase/client"

// Mock data for reviews and other content that's not in database yet
const reviews = [
  {
    id: 1,
    author: "Михаил К.",
    authorType: "Бизнес-центр",
    rating: 5,
    date: "2024-01-15",
    text: "Отличная работа! Охраняют наш торговый центр уже 3 года. Профессиональный подход, вежливый персонал.",
    verified: true,
    helpful: 12,
    ratings: {
      reliability: 5,
      professionalism: 5,
      response: 5,
      equipment: 4,
      value: 5,
    },
    reply: {
      author: "Альфа-Безопасность",
      date: "2024-01-16",
      text: "Спасибо за высокую оценку нашей работы! Мы ценим наше сотрудничество и всегда стремимся поддерживать высокий уровень сервиса.",
    },
  },
  {
    id: 2,
    author: "Елена С.",
    authorType: "Торговый центр",
    rating: 4,
    date: "2024-01-10",
    text: "Хорошая компания, но иногда бывают задержки с заменой охранников при болезни.",
    verified: true,
    helpful: 8,
    ratings: {
      reliability: 4,
      professionalism: 5,
      response: 3,
      equipment: 4,
      value: 4,
    },
  },
]

export default function ChopDetailPage({ params }: { params: { id: string } }) {
  const [userRole, setUserRole] = useState<UserRole>("guest")
  const [pendingChanges, setPendingChanges] = useState(2)
  const [chopData, setChopData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadChopData() {
      try {
        const supabase = createClient()

        const { data, error } = await supabase.from("chops").select("*").eq("id", params.id).single()

        if (error) {
          console.error("Error loading chop:", error)
          setError("Ошибка загрузки данных ЧОПа")
          return
        }

        if (!data) {
          setError("ЧОП не найден")
          return
        }

        // Transform database data to component format
        const transformedData = {
          id: data.id,
          name: data.name,
          inn: data.inn,
          rating: 4.8, // Default rating for now
          reviewCount: 156, // Default review count
          license: data.license_number || "ЧО-001234",
          licenseExpiry: "2025-12-31",
          licenseScans: [
            { id: 1, name: "Лицензия ЧО", url: "/placeholder.svg?height=800&width=600" },
            { id: 2, name: "Приложение к лицензии", url: "/placeholder.svg?height=800&width=600" },
          ],
          regions: data.regions ? data.regions.split(",").map((r: string) => r.trim()) : ["Москва"],
          services: [
            {
              id: 1,
              name: "Физическая охрана объектов",
              description: "Круглосуточная охрана объектов любой сложности",
            },
            { id: 2, name: "Сопровождение и охрана грузов", description: "Безопасная транспортировка ценных грузов" },
            { id: 3, name: "Личная охрана (VIP)", description: "Индивидуальная охрана частных лиц" },
            { id: 4, name: "Охрана мероприятий", description: "Обеспечение безопасности на массовых мероприятиях" },
          ],
          awards: [],
          photos: [],
          specialization: data.services ? data.services.split(",").map((s: string) => s.trim()) : ["Объекты"],
          location: data.city || data.address || "Москва",
          address: data.address || "Адрес не указан",
          phone: data.phone || "Телефон не указан",
          email: data.email || "Email не указан",
          website: data.website || "Сайт не указан",
          founded: data.founded_year || 2009,
          employees: data.employees_count || 0,
          verified: true,
          description: data.description || "Описание не указано",
          logo: data.logo_url || "/placeholder.svg?height=200&width=200",
          hasOwner: true,

          // Detailed ratings
          detailedRatings: {
            reliability: { score: 4.9, count: 150, name: "Надежность" },
            professionalism: { score: 4.7, count: 145, name: "Профессионализм" },
            response: { score: 4.8, count: 130, name: "Скорость реагирования" },
            equipment: { score: 4.6, count: 120, name: "Техническое оснащение" },
            value: { score: 4.5, count: 140, name: "Соотношение цена/качество" },
          },

          criteria: {
            license: { score: 5, weight: 20, description: "Действующая лицензия, без нарушений" },
            experience: { score: 5, weight: 15, description: "15 лет успешной работы" },
            staff: { score: 4, weight: 15, description: "Квалифицированный персонал" },
            equipment: { score: 5, weight: 10, description: "Современное оборудование" },
            financial: { score: 4, weight: 10, description: "Финансовая стабильность" },
            reviews: { score: 5, weight: 15, description: "Положительные отзывы клиентов" },
            response: { score: 4, weight: 10, description: "Быстрое реагирование" },
            insurance: { score: 5, weight: 5, description: "Страхование ответственности" },
          },

          verificationStatus: {
            mainInfo: "verified",
            licenses: "verified",
            contacts: "verified",
            services: "pending",
            photos: "verified",
          },
        }

        setChopData(transformedData)
        console.log("Loaded chop data:", transformedData)
      } catch (err) {
        console.error("Error:", err)
        setError("Произошла ошибка при загрузке данных")
      } finally {
        setLoading(false)
      }
    }

    loadChopData()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных ЧОПа...</p>
        </div>
      </div>
    )
  }

  if (error || !chopData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Ошибка</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/chops">
            <Button>Вернуться к списку ЧОПов</Button>
          </Link>
        </div>
      </div>
    )
  }

  const overallScore = Object.values(chopData.criteria).reduce((acc: number, criterion: any) => {
    return acc + (criterion.score * criterion.weight) / 100
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Кнопка переключения роли пользователя */}
      <UserRoleSwitcher onRoleChange={setUserRole} />

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-7 w-7 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Охрана РФ</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-4 ml-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 text-sm">
                Главная
              </Link>
              <Link href="/chops" className="text-gray-700 hover:text-blue-600 text-sm">
                Организации
              </Link>
              <Link href="/forum" className="text-gray-700 hover:text-blue-600 text-sm">
                Форум
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-blue-600 text-sm">
                Вакансии
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-blue-600 text-sm">
                Новости
              </Link>
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/profile" className="text-gray-700 hover:text-blue-600 text-sm">
                Личный кабинет
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Уведомления для разных ролей */}
      {userRole === "moderator" && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
          <div className="container mx-auto px-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            <p className="text-amber-700">
              <span className="font-bold">Режим модератора.</span> У этой страницы есть {pendingChanges} изменения,
              ожидающие проверки.
            </p>
            <Button variant="outline" size="sm" className="ml-auto">
              Просмотреть изменения
            </Button>
          </div>
        </div>
      )}

      {userRole === "owner" && chopData.verificationStatus.services === "pending" && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="container mx-auto px-4 flex items-center">
            <Clock className="h-5 w-5 text-blue-500 mr-2" />
            <p className="text-blue-700">
              <span className="font-bold">Информация об услугах</span> ожидает проверки модератором.
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Company Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col sm:flex-row gap-6 flex-1">
                <div className="flex justify-center sm:justify-start">
                  <Avatar className="h-24 w-24 border-2 border-gray-200">
                    <AvatarImage src={chopData.logo || "/placeholder.svg"} alt={chopData.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                      {chopData.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <CardTitle className="text-2xl lg:text-3xl">{chopData.name}</CardTitle>
                    {userRole === "owner" && (
                      <Button variant="outline" size="sm" className="h-7 w-fit mx-auto sm:mx-0">
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Редактировать
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(chopData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-semibold">{chopData.rating}</span>
                    <span className="text-gray-500">({chopData.reviewCount} отзывов)</span>
                  </div>

                  <CardDescription className="text-base mb-4 text-center sm:text-left">
                    {chopData.description}
                  </CardDescription>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="truncate">{chopData.address}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span>{chopData.phone}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="truncate">{chopData.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Globe className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="truncate">{chopData.website}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-auto lg:min-w-[200px]">
                {userRole === "guest" && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="lg" className="w-full">
                          Оставить отзыв
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Оставить отзыв о компании {chopData.name}</DialogTitle>
                          <DialogDescription>
                            Поделитесь своим опытом работы с этой охранной компанией.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="review-type">Тип объекта/услуги</Label>
                            <Input id="review-type" placeholder="Например: Бизнес-центр, Жилой комплекс" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="review-text">Текст отзыва</Label>
                            <Textarea
                              id="review-text"
                              placeholder="Опишите ваш опыт работы с компанией..."
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Отправить отзыв</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {chopData.hasOwner && (
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Связаться с компанией
                      </Button>
                    )}

                    <Button variant="outline" className="w-full">
                      <Flag className="h-4 w-4 mr-2" />
                      Сообщить о нарушении
                    </Button>
                  </>
                )}

                {userRole === "owner" && (
                  <Button size="lg" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Редактировать информацию
                  </Button>
                )}

                {userRole === "moderator" && (
                  <>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full">
                      <Check className="h-4 w-4 mr-2" />
                      Одобрить изменения
                    </Button>
                    <Button variant="outline" className="text-red-600 w-full">
                      <X className="h-4 w-4 mr-2" />
                      Отклонить изменения
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="rating" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="rating">Рейтинг</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="info">Информация</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="licenses">Лицензии</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
          </TabsList>

          <TabsContent value="rating">
            <Card>
              <CardHeader>
                <CardTitle>Детальная оценка</CardTitle>
                <CardDescription>Рейтинг рассчитывается на основе проверенных критериев</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{overallScore.toFixed(1)}</div>
                  <div className="text-gray-600">Общий балл из 5.0</div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Оценки пользователей</h3>
                  <div className="space-y-4">
                    {Object.entries(chopData.detailedRatings).map(([key, rating]: [string, any]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{rating.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{rating.count} оценок</span>
                            <span className="font-semibold">{rating.score}/5</span>
                          </div>
                        </div>
                        <Progress value={rating.score * 20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Отзывы клиентов</CardTitle>
                <CardDescription>{chopData.reviewCount} отзывов от проверенных клиентов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.author}</span>
                            <Badge variant="outline" className="text-xs">
                              {review.authorType}
                            </Badge>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Проверен
                              </Badge>
                            )}
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString("ru-RU")}
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-2">{review.text}</p>
                          {review.reply && (
                            <div className="mt-4 bg-blue-50 p-3 rounded-md">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-blue-800">{review.reply.author}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.reply.date).toLocaleDateString("ru-RU")}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{review.reply.text}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Информация о компании</CardTitle>
                <CardDescription>Верифицированные данные о охранной компании</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Основные данные</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Название:</span>
                        <span>{chopData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ИНН:</span>
                        <span>{chopData.inn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Лицензия:</span>
                        <span>{chopData.license}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Основана:</span>
                        <span>{chopData.founded} г.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Сотрудников:</span>
                        <span>{chopData.employees}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Регионы присутствия</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {chopData.regions.map((region: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {region}
                        </Badge>
                      ))}
                    </div>

                    <h4 className="font-semibold mb-2">Специализация</h4>
                    <div className="flex flex-wrap gap-2">
                      {chopData.specialization.map((spec: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Услуги</CardTitle>
                <CardDescription>Услуги, предоставляемые компанией</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {chopData.services.map((service: any) => (
                    <Card key={service.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-gray-100 p-4 flex items-center justify-center">
                            {service.id === 1 && <Building className="h-12 w-12 text-blue-600" />}
                            {service.id === 2 && <Briefcase className="h-12 w-12 text-blue-600" />}
                            {service.id === 3 && <Users className="h-12 w-12 text-blue-600" />}
                            {service.id === 4 && <Users className="h-12 w-12 text-blue-600" />}
                          </div>
                          <div className="p-4 md:w-2/3">
                            <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                            <p className="text-gray-600">{service.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="licenses">
            <Card>
              <CardHeader>
                <CardTitle>Лицензии</CardTitle>
                <CardDescription>Сканы лицензий и разрешительных документов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {chopData.licenseScans.map((license: any) => (
                    <Card key={license.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="aspect-[3/4] relative">
                          <img
                            src={license.url || "/placeholder.svg"}
                            alt={license.name}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                            <div className="font-medium">{license.name}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Галерея</CardTitle>
                <CardDescription>Фотографии компании и награды</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Фотографии пока не добавлены</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
