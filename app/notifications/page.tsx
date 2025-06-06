"use client"

import { useState } from "react"
import {
  Bell,
  Settings,
  Check,
  X,
  Star,
  MessageSquare,
  Briefcase,
  AlertTriangle,
  Building2,
  Filter,
  Search,
  Mail,
  Smartphone,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { UserRoleSwitcher } from "@/components/user-role-switcher"
import Header from "@/components/header"

const notifications = [
  {
    id: 1,
    type: "review",
    title: "Новый отзыв о вашей компании",
    message: "Пользователь Михаил К. оставил отзыв с оценкой 5 звезд",
    time: "2 минуты назад",
    read: false,
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    actionUrl: "/reviews/123",
  },
  {
    id: 2,
    type: "job_application",
    title: "Новый отклик на вакансию",
    message: "На вакансию 'Охранник ТЦ' откликнулся кандидат",
    time: "15 минут назад",
    read: false,
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    actionUrl: "/jobs/applications/456",
  },
  {
    id: 3,
    type: "system",
    title: "Обновление профиля компании",
    message: "Ваш профиль успешно прошел модерацию",
    time: "1 час назад",
    read: true,
    icon: Building2,
    color: "text-green-600",
    bgColor: "bg-green-100",
    actionUrl: "/profile",
  },
  {
    id: 4,
    type: "complaint",
    title: "Новая жалоба",
    message: "Поступила жалоба на качество услуг",
    time: "2 часа назад",
    read: false,
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
    actionUrl: "/complaints/789",
  },
  {
    id: 5,
    type: "forum",
    title: "Ответ в форуме",
    message: "Пользователь ответил на вашу тему в форуме",
    time: "3 часа назад",
    read: true,
    icon: MessageSquare,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    actionUrl: "/forum/topic/101",
  },
]

const subscriptions = [
  {
    id: "new_reviews",
    title: "Новые отзывы",
    description: "Уведомления о новых отзывах на вашу компанию",
    enabled: true,
    channels: {
      email: true,
      push: true,
      sms: false,
    },
  },
  {
    id: "job_applications",
    title: "Отклики на вакансии",
    description: "Уведомления о новых откликах на ваши вакансии",
    enabled: true,
    channels: {
      email: true,
      push: true,
      sms: true,
    },
  },
  {
    id: "rating_changes",
    title: "Изменения рейтинга",
    description: "Уведомления об изменении рейтинга компании",
    enabled: true,
    channels: {
      email: true,
      push: false,
      sms: false,
    },
  },
  {
    id: "forum_replies",
    title: "Ответы в форуме",
    description: "Уведомления об ответах на ваши сообщения в форуме",
    enabled: false,
    channels: {
      email: false,
      push: false,
      sms: false,
    },
  },
  {
    id: "system_updates",
    title: "Системные уведомления",
    description: "Важные обновления и изменения в системе",
    enabled: true,
    channels: {
      email: true,
      push: true,
      sms: false,
    },
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    // Логика отметки как прочитанное
    console.log(`Marking notification ${id} as read`)
  }

  const markAllAsRead = () => {
    // Логика отметки всех как прочитанные
    console.log("Marking all notifications as read")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserRoleSwitcher />

      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Уведомления</h1>
            {unreadCount > 0 && <Badge className="bg-red-100 text-red-800 border-0">{unreadCount} новых</Badge>}
          </div>
          <p className="text-lg text-gray-600">Управляйте уведомлениями и настройте персональные подписки</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            {/* Filters and Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-wrap gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Поиск уведомлений..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Тип уведомления" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      <SelectItem value="review">Отзывы</SelectItem>
                      <SelectItem value="job_application">Отклики</SelectItem>
                      <SelectItem value="system">Системные</SelectItem>
                      <SelectItem value="complaint">Жалобы</SelectItem>
                      <SelectItem value="forum">Форум</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <Button variant="outline" onClick={markAllAsRead}>
                      <Check className="h-4 w-4 mr-2" />
                      Отметить все как прочитанные
                    </Button>
                  )}
                  <Link href="/settings">
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Настройки
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Показано: {filteredNotifications.length} уведомлений</span>
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer ${
                    !notification.read ? "ring-2 ring-blue-100" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div
                        className={`w-12 h-12 ${notification.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <notification.icon className={`h-6 w-6 ${notification.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className={`font-semibold text-gray-900 ${!notification.read ? "font-bold" : ""}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            <span className="text-sm text-gray-500 whitespace-nowrap">{notification.time}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{notification.message}</p>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {notification.type === "review" && "Отзыв"}
                            {notification.type === "job_application" && "Отклик"}
                            {notification.type === "system" && "Система"}
                            {notification.type === "complaint" && "Жалоба"}
                            {notification.type === "forum" && "Форум"}
                          </Badge>

                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                <Check className="h-4 w-4 mr-1" />
                                Прочитано
                              </Button>
                            )}
                            <Link href={notification.actionUrl}>
                              <Button size="sm" variant="outline">
                                Перейти
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredNotifications.length === 0 && (
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Нет уведомлений</h3>
                    <p className="text-gray-600">Здесь будут отображаться ваши уведомления</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Управление подписками</CardTitle>
                <p className="text-gray-600">Настройте типы уведомлений, которые хотите получать</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">{subscription.title}</h3>
                          <Switch checked={subscription.enabled} />
                        </div>
                        <p className="text-sm text-gray-600">{subscription.description}</p>
                      </div>
                    </div>

                    {subscription.enabled && (
                      <div className="ml-6 space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">Способы доставки:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch checked={subscription.channels.email} />
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <Label className="text-sm">Email</Label>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch checked={subscription.channels.push} />
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-gray-500" />
                              <Label className="text-sm">Push</Label>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch checked={subscription.channels.sms} />
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-gray-500" />
                              <Label className="text-sm">SMS</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />
                  </div>
                ))}

                <div className="pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Сохранить настройки</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Общие настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Звуковые уведомления</Label>
                      <p className="text-sm text-gray-600">Воспроизводить звук при получении уведомлений</p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Группировка уведомлений</Label>
                      <p className="text-sm text-gray-600">Объединять похожие уведомления</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Уведомления в нерабочее время</Label>
                      <p className="text-sm text-gray-600">Получать уведомления после 18:00 и в выходные</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email для уведомлений</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон для SMS</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Часовой пояс</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите часовой пояс" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="msk">Москва (UTC+3)</SelectItem>
                        <SelectItem value="spb">Санкт-Петербург (UTC+3)</SelectItem>
                        <SelectItem value="ekb">Екатеринбург (UTC+5)</SelectItem>
                        <SelectItem value="nsk">Новосибирск (UTC+7)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Обновить контакты</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
