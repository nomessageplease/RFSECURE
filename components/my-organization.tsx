"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Briefcase,
  Star,
  Eye,
  TrendingUp,
  Edit,
  Plus,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Award,
  AlertTriangle,
} from "lucide-react"

interface MyOrganizationProps {
  role?: string
}

export default function MyOrganization({ role = "Гость" }: MyOrganizationProps) {
  if (role !== "Представитель организации") {
    return null
  }

  const organizationData = {
    name: "ЧОП Безопасность Плюс",
    logo: "/placeholder.svg?height=80&width=80&text=БП",
    rating: 4.7,
    reviewsCount: 156,
    employeesCount: 245,
    activeVacancies: 8,
    foundedYear: 2018,
    city: "Москва",
    phone: "+7 (495) 123-45-67",
    email: "info@security-plus.ru",
    website: "www.security-plus.ru",
    license: "№ 12345 от 15.03.2018",
    status: "verified",
    specializations: ["Охрана объектов", "Личная охрана", "Техническая охрана", "Консультации"],
    stats: {
      profileViews: 1247,
      vacancyViews: 3456,
      applications: 89,
      hires: 12,
    },
  }

  const recentActivity = [
    { type: "application", text: "Новый отклик на вакансию 'Охранник 4 разряда'", time: "2 часа назад" },
    { type: "view", text: "Профиль организации просмотрен 15 раз", time: "Сегодня" },
    { type: "review", text: "Получен новый отзыв (5 звезд)", time: "Вчера" },
    { type: "vacancy", text: "Опубликована вакансия 'Старший охранник'", time: "2 дня назад" },
  ]

  const quickActions = [
    { title: "Редактировать профиль", icon: Edit, color: "blue" },
    { title: "Добавить вакансию", icon: Plus, color: "green" },
    { title: "Просмотреть кандидатов", icon: Users, color: "purple" },
    { title: "Аналитика", icon: TrendingUp, color: "orange" },
  ]

  return (
    <div className="space-y-6">
      {/* Заголовок секции */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Моя организация</h2>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Редактировать
        </Button>
      </div>

      {/* Основная информация об организации */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={organizationData.logo || "/placeholder.svg"}
                alt={organizationData.name}
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-gray-900">{organizationData.name}</h3>
                  {organizationData.status === "verified" && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Верифицирована
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{organizationData.rating}</span>
                    <span>({organizationData.reviewsCount} отзывов)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{organizationData.employeesCount} сотрудников</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{organizationData.activeVacancies} вакансий</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Контактная информация */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Контактная информация</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{organizationData.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{organizationData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{organizationData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Основана в {organizationData.foundedYear} году</span>
                </div>
              </div>
            </div>

            {/* Лицензия и специализации */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Лицензия и специализации</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-gray-400" />
                  <span>Лицензия {organizationData.license}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {organizationData.specializations.map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{organizationData.stats.profileViews}</div>
            <div className="text-sm text-gray-600">Просмотров профиля</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Briefcase className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{organizationData.stats.vacancyViews}</div>
            <div className="text-sm text-gray-600">Просмотров вакансий</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{organizationData.stats.applications}</div>
            <div className="text-sm text-gray-600">Откликов получено</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{organizationData.stats.hires}</div>
            <div className="text-sm text-gray-600">Сотрудников нанято</div>
          </CardContent>
        </Card>
      </div>

      {/* Быстрые действия */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                onClick={() => console.log(`Действие: ${action.title}`)}
              >
                <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                <span className="text-sm font-medium text-center">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Последняя активность */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Последняя активность</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "application"
                      ? "bg-green-500"
                      : activity.type === "view"
                        ? "bg-blue-500"
                        : activity.type === "review"
                          ? "bg-yellow-500"
                          : "bg-purple-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Предупреждения и уведомления */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Требует внимания</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800 font-medium">Обновите информацию о вакансиях</p>
              <p className="text-xs text-orange-600 mt-1">2 вакансии истекают через 3 дня</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Новые кандидаты ожидают рассмотрения</p>
              <p className="text-xs text-blue-600 mt-1">8 новых откликов за последние 24 часа</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
