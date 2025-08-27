"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Calendar, Shield, Building, Eye, Briefcase, Award } from "lucide-react"

interface ProfileInfoProps {
  role?: string
}

export default function ProfileInfo({ role = "Гость" }: ProfileInfoProps) {
  if (role === "Гость") {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Войдите для просмотра информации</h2>
        <p className="text-gray-600">Зарегистрируйтесь или войдите в систему, чтобы увидеть свой профиль</p>
      </div>
    )
  }

  const getProfileData = () => {
    const baseData = {
      name: "Иван Петров",
      email: "ivan.petrov@example.com",
      phone: "+7 (999) 123-45-67",
      city: "Москва",
      joinDate: "15 марта 2024",
    }

    switch (role) {
      case "Новичок":
        return {
          ...baseData,
          completeness: 45,
          sections: [
            { title: "Основная информация", completed: true },
            { title: "Контактные данные", completed: true },
            { title: "Опыт работы", completed: false },
            { title: "Документы", completed: false },
          ],
        }
      case "Охранник":
        return {
          ...baseData,
          license: "4 разряд",
          experience: "3 года",
          lastWork: "ЧОП Безопасность",
          applications: 12,
          responses: 3,
        }
      case "Представитель организации":
        return {
          ...baseData,
          company: "ЧОП Безопасность Плюс",
          position: "HR-менеджер",
          vacancies: 8,
          candidates: 45,
        }
      case "Модератор":
        return {
          ...baseData,
          moderatorSince: "10 января 2024",
          resolvedComplaints: 156,
          activeReports: 3,
        }
      case "Админ":
        return {
          ...baseData,
          adminSince: "1 декабря 2023",
          systemActions: 892,
          lastLogin: "16 июня 2025, 18:45",
        }
      default:
        return baseData
    }
  }

  const profileData = getProfileData()

  const renderNewbieInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Заполнение профиля</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Прогресс заполнения</span>
              <span>{profileData.completeness}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${profileData.completeness}%` }}></div>
            </div>
          </div>
          <div className="space-y-2">
            {profileData.sections?.map((section, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{section.title}</span>
                <Badge variant={section.completed ? "default" : "outline"}>
                  {section.completed ? "Готово" : "Не заполнено"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контактная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.city}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderGuardInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Профессиональная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Shield className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Удостоверение ЧО: {profileData.license}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Опыт работы: {profileData.experience}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Последнее место работы: {profileData.lastWork}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Активность по вакансиям</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{profileData.applications}</div>
              <div className="text-sm text-gray-600">Откликов отправлено</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{profileData.responses}</div>
              <div className="text-sm text-gray-600">Ответов получено</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контактная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.city}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCompanyRepInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Информация об организации</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Организация: {profileData.company}</span>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Должность: {profileData.position}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Статистика работы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{profileData.vacancies}</div>
              <div className="text-sm text-gray-600">Активных вакансий</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{profileData.candidates}</div>
              <div className="text-sm text-gray-600">Кандидатов рассмотрено</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контактная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.phone}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderModeratorInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Статистика модерации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{profileData.resolvedComplaints}</div>
              <div className="text-sm text-gray-600">Жалоб рассмотрено</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{profileData.activeReports}</div>
              <div className="text-sm text-gray-600">Активных жалоб</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Информация модератора</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Award className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Модератор с: {profileData.moderatorSince}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm">На платформе с: {profileData.joinDate}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контактная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.phone}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAdminInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Системная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Award className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Администратор с: {profileData.adminSince}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Eye className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Последний вход: {profileData.lastLogin}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Статистика действий</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{profileData.systemActions}</div>
            <div className="text-sm text-gray-600">Системных действий выполнено</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контактная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{profileData.phone}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (role) {
      case "Новичок":
        return renderNewbieInfo()
      case "Охранник":
        return renderGuardInfo()
      case "Представитель организации":
        return renderCompanyRepInfo()
      case "Модератор":
        return renderModeratorInfo()
      case "Админ":
        return renderAdminInfo()
      default:
        return renderGuardInfo()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Информация</h2>
      {renderContent()}
    </div>
  )
}
