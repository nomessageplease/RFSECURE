"use client"

import { useState } from "react"
import {
  MapPin,
  DollarSign,
  Clock,
  Users,
  Shield,
  Building,
  Calendar,
  Eye,
  Heart,
  Share2,
  Flag,
  CheckCircle,
  Phone,
  Mail,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { UserRoleSwitcher } from "@/components/user-role-switcher"

// Mock data for demonstration
const jobData = {
  id: 1,
  title: "Охранник торгового центра",
  company: {
    id: 1,
    name: "Охранное Агентство Авангард",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%BE%D0%B3%D0%BE%201-pSoYbxeRfeKKzvB9MhQQpkC67sQnGz.jpeg",
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    phone: "+7 (495) 123-45-67",
    email: "hr@avangard-security.ru",
    website: "www.avangard-security.ru",
  },
  location: "Москва",
  address: "ТЦ Европейский, Площадь Киевского Вокзала, д. 2",
  salary: {
    min: 45000,
    max: 55000,
    currency: "₽",
    period: "месяц",
  },
  schedule: "2/2 (день/ночь)",
  workType: "Полная занятость",
  experience: "Опыт от 1 года",
  education: "Среднее специальное",
  postedAt: "2024-01-15",
  expiresAt: "2024-02-15",
  views: 234,
  applications: 12,
  urgent: true,
  remote: false,
  description: `Крупная охранная компания приглашает на работу охранника для обеспечения безопасности в торговом центре "Европейский".

Мы предлагаем стабильную работу в дружном коллективе с возможностями профессионального роста.

Торговый центр "Европейский" - один из крупнейших ТЦ Москвы с высоким потоком посетителей. Работа предполагает контроль доступа, обеспечение порядка и безопасности посетителей и персонала.`,

  responsibilities: [
    "Контроль пропускного режима на объекте",
    "Обеспечение безопасности посетителей и персонала ТЦ",
    "Патрулирование территории торгового центра",
    "Реагирование на нештатные ситуации",
    "Ведение документации по установленной форме",
    "Взаимодействие с службами экстренного реагирования",
    "Контроль соблюдения правил пожарной безопасности",
  ],

  requirements: [
    "Удостоверение частного охранника (4-6 разряд)",
    "Опыт работы охранником от 1 года",
    "Опыт работы в торговых центрах приветствуется",
    "Физическая подготовка",
    "Ответственность и внимательность",
    "Стрессоустойчивость",
    "Коммуникабельность",
    "Отсутствие судимости",
  ],

  conditions: [
    "Официальное трудоустройство по ТК РФ",
    "Заработная плата от 45 000 до 55 000 рублей",
    "График работы 2/2 (день/ночь)",
    "Полный социальный пакет",
    "Обеспечение форменной одеждой",
    "Питание за счет компании",
    "Обучение и повышение квалификации",
    "Премии по результатам работы",
    "Медицинское страхование",
    "Оплачиваемый отпуск 28 календарных дней",
  ],

  additionalInfo: {
    workingHours: "Сменный график 12/12 часов",
    probationPeriod: "3 месяца",
    startDate: "Как можно скорее",
    contactPerson: "Иванова Елена Петровна",
    contactPhone: "+7 (495) 123-45-67 доб. 123",
  },
}

const similarJobs = [
  {
    id: 2,
    title: "Охранник бизнес-центра",
    company: "Щит-Безопасность",
    location: "Москва",
    salary: "от 50 000 ₽",
    postedAt: "2024-01-14",
  },
  {
    id: 3,
    title: "Старший охранник ТЦ",
    company: "Гарант-Охрана",
    location: "Москва",
    salary: "от 60 000 ₽",
    postedAt: "2024-01-13",
  },
  {
    id: 4,
    title: "Охранник склада",
    company: "Альфа-Безопасность",
    location: "Подмосковье",
    salary: "от 40 000 ₽",
    postedAt: "2024-01-12",
  },
]

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  const handleApply = () => {
    setHasApplied(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserRoleSwitcher />

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
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
              <Link href="/chops" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
                Организации
              </Link>
              <Link href="/forum" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
                Форум
              </Link>
              <Link href="/jobs" className="text-gray-900 font-medium text-sm">
                Вакансии
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
                Новости
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
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href="/jobs" className="hover:text-gray-900">
            Вакансии
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{jobData.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {jobData.urgent && <Badge className="bg-red-100 text-red-800 border-0">Срочно</Badge>}
                      <Badge variant="outline">Полная занятость</Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{jobData.title}</h1>
                    <div className="flex items-center gap-6 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        <Link href={`/chop/${jobData.company.id}`} className="font-medium hover:text-blue-600">
                          {jobData.company.name}
                        </Link>
                        {jobData.company.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>{jobData.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-semibold text-xl text-gray-900">
                          {jobData.salary.min.toLocaleString()} - {jobData.salary.max.toLocaleString()}{" "}
                          {jobData.salary.currency}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>{jobData.schedule}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={isFavorite ? "text-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {hasApplied && (
                  <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Ваш отклик успешно отправлен! Работодатель свяжется с вами в ближайшее время.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleApply}
                    disabled={hasApplied}
                  >
                    {hasApplied ? "Отклик отправлен" : "Откликнуться"}
                  </Button>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{jobData.views} просмотров</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{jobData.applications} откликов</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Опубликовано {new Date(jobData.postedAt).toLocaleDateString("ru-RU")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Описание вакансии</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{jobData.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">Обязанности</h3>
                  <ul className="space-y-2">
                    {jobData.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">Требования</h3>
                  <ul className="space-y-2">
                    {jobData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">Условия работы</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobData.conditions.map((condition, index) => (
                      <div key={index}>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{condition}</span>
                        </li>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Дополнительная информация</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Рабочее время</h4>
                    <p className="text-gray-700">{jobData.additionalInfo.workingHours}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Испытательный срок</h4>
                    <p className="text-gray-700">{jobData.additionalInfo.probationPeriod}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Дата начала работы</h4>
                    <p className="text-gray-700">{jobData.additionalInfo.startDate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Контактное лицо</h4>
                    <p className="text-gray-700">{jobData.additionalInfo.contactPerson}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>О компании</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-gray-200">
                    <AvatarImage src={jobData.company.logo || "/placeholder.svg"} alt={jobData.company.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                      {jobData.company.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{jobData.company.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Shield
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(jobData.company.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {jobData.company.rating} ({jobData.company.reviewCount} отзывов)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{jobData.company.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{jobData.company.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span>{jobData.company.website}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href={`/chop/${jobData.company.id}`}>
                    <Button variant="outline" className="w-full">
                      Подробнее о компании
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Детали вакансии</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Опыт работы:</span>
                  <span className="font-medium">{jobData.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Образование:</span>
                  <span className="font-medium">{jobData.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Тип занятости:</span>
                  <span className="font-medium">{jobData.workType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Адрес:</span>
                  <span className="font-medium text-right">{jobData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Действует до:</span>
                  <span className="font-medium">{new Date(jobData.expiresAt).toLocaleDateString("ru-RU")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Похожие вакансии</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {similarJobs.map((job) => (
                  <div key={job.id} className="border-b pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{job.location}</span>
                      <span className="font-medium">{job.salary}</span>
                    </div>
                  </div>
                ))}
                <Link href="/jobs">
                  <Button variant="outline" className="w-full">
                    Все вакансии
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
