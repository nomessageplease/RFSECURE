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
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Доступ ограничен</h2>
        <p className="text-gray-600">Для просмотра информации необходимо войти в систему</p>
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
      {/* Дашборд */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Следующие шаги */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="text-2xl">📋</div>
              <span>Следующие шаги</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: "Загрузить фото профиля", completed: false, priority: "high" },
                { task: "Заполнить опыт работы", completed: false, priority: "high" },
                { task: "Добавить документы", completed: false, priority: "medium" },
                { task: "Указать предпочтения по работе", completed: true, priority: "low" },
                { task: "Пройти верификацию", completed: false, priority: "medium" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.completed ? "bg-green-500" : "bg-gray-300"}`}></div>
                    <span className={`text-sm ${item.completed ? "line-through text-gray-500" : "text-gray-700"}`}>
                      {item.task}
                    </span>
                  </div>
                  <Badge
                    variant={
                      item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "outline"
                    }
                  >
                    {item.priority === "high" ? "Важно" : item.priority === "medium" ? "Средне" : "Низко"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Рекомендации */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="text-2xl">💡</div>
              <span>Рекомендации</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-1">Изучите топ ЧОП</h4>
                <p className="text-sm text-green-600">Посмотрите рейтинг лучших организаций в вашем городе</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">Подпишитесь на вакансии</h4>
                <p className="text-sm text-blue-600">Настройте уведомления о новых вакансиях</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-1">Участвуйте в форуме</h4>
                <p className="text-sm text-purple-600">Задавайте вопросы опытным коллегам</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Профиль */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Основная информация</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Фото профиля</span>
                <Badge variant="outline">Не загружено</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Основная информация</span>
                <Badge variant="default">Заполнено</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Контактные данные</span>
                <Badge variant="default">Заполнено</Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Опыт работы</span>
                <Badge variant="outline">Не заполнено</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Документы</span>
                <Badge variant="outline">Не загружены</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm text-gray-600">Верификация</span>
                <Badge variant="outline">Ожидает</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Обучение */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="text-xl">🎯</div>
            <span>Обучающие материалы</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="text-2xl mb-2">📖</div>
              <h4 className="font-medium mb-1">Гайды по платформе</h4>
              <p className="text-sm text-gray-600">Пошаговые инструкции</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="text-2xl mb-2">🎥</div>
              <h4 className="font-medium mb-1">Видео-туры</h4>
              <p className="text-sm text-gray-600">Обзор всех функций</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="text-2xl mb-2">❓</div>
              <h4 className="font-medium mb-1">FAQ для новичков</h4>
              <p className="text-sm text-gray-600">Частые вопросы</p>
            </div>
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
