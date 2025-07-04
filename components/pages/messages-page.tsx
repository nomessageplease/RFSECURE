"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Paperclip, Phone, Video, MoreVertical, Circle, CheckCircle2, MessageSquare } from "lucide-react"

export default function MessagesPage() {
  const [currentRole, setCurrentRole] = useState("Гость")
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Загружаем роль из localStorage
  useEffect(() => {
    const savedRoleIndex = localStorage.getItem("currentRoleIndex")
    if (savedRoleIndex !== null) {
      const roles = ["Гость", "Новичок", "Охранник", "Представитель организации", "Модератор", "Админ"]
      const index = Number.parseInt(savedRoleIndex, 10)
      setCurrentRole(roles[index])
    }
  }, [])

  // Слушаем изменения роли
  useEffect(() => {
    const handleRoleChange = (event: CustomEvent) => {
      setCurrentRole(event.detail.role)
    }

    window.addEventListener("roleChanged", handleRoleChange as EventListener)
    return () => {
      window.removeEventListener("roleChanged", handleRoleChange as EventListener)
    }
  }, [])

  // Мок данные чатов
  const chats = [
    {
      id: 1,
      type: "vacancy",
      participant: {
        name: "ЧОП Безопасность Плюс",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Работодатель",
        online: true,
      },
      vacancy: {
        title: "Охранник 4 разряда",
        id: 1,
      },
      lastMessage: {
        text: "Когда вы можете приехать на собеседование?",
        time: "14:30",
        isRead: false,
        fromMe: false,
      },
      unreadCount: 2,
    },
    {
      id: 2,
      type: "vacancy",
      participant: {
        name: "ЧОП Надежная Охрана",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Работодатель",
        online: false,
      },
      vacancy: {
        title: "Старший охранник",
        id: 2,
      },
      lastMessage: {
        text: "Спасибо за отклик, рассмотрим вашу кандидатуру",
        time: "Вчера",
        isRead: true,
        fromMe: false,
      },
      unreadCount: 0,
    },
    {
      id: 3,
      type: "support",
      participant: {
        name: "Техническая поддержка",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Поддержка",
        online: true,
      },
      lastMessage: {
        text: "Ваш вопрос решен. Обращайтесь, если что-то еще!",
        time: "2 дня назад",
        isRead: true,
        fromMe: false,
      },
      unreadCount: 0,
    },
  ]

  // Мок данные сообщений для выбранного чата
  const messages = [
    {
      id: 1,
      text: "Здравствуйте! Меня заинтересовала ваша вакансия охранника.",
      time: "10:00",
      fromMe: true,
      status: "read",
    },
    {
      id: 2,
      text: "Добрый день! Спасибо за интерес к нашей вакансии. Расскажите немного о своем опыте работы.",
      time: "10:15",
      fromMe: false,
      status: "delivered",
    },
    {
      id: 3,
      text: "У меня есть удостоверение 4 разряда, работал охранником 3 года в разных организациях. Опыт работы на КПП и патрулирования.",
      time: "10:20",
      fromMe: true,
      status: "read",
    },
    {
      id: 4,
      text: "Отлично! Ваш опыт нам подходит. Когда вы можете приехать на собеседование?",
      time: "14:30",
      fromMe: false,
      status: "delivered",
    },
    {
      id: 5,
      text: "Могу завтра после 14:00 или в любое время послезавтра.",
      time: "14:35",
      fromMe: true,
      status: "sent",
    },
  ]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText)
      setMessageText("")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Circle className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCircle2 className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCircle2 className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  const selectedChatData = chats.find((chat) => chat.id === selectedChat)

  if (currentRole === "Гость") {
    return (
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Вход требуется</h2>
            <p className="text-gray-600 mb-4">Для использования сообщений необходимо войти в систему</p>
            <Button>Войти в систему</Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="h-screen flex">
        {/* Боковая панель с чатами */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Заголовок */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Сообщения</h1>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск сообщений..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Статистика */}
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">{chats.length}</div>
                <div className="text-xs text-gray-600">Всего</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {chats.reduce((sum, chat) => sum + chat.unreadCount, 0)}
                </div>
                <div className="text-xs text-gray-600">Непрочитанных</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">
                  {chats.filter((chat) => chat.type === "vacancy").length}
                </div>
                <div className="text-xs text-gray-600">По вакансиям</div>
              </div>
            </div>
          </div>

          {/* Список чатов */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === chat.id ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.participant.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{chat.participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.participant.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.participant.name}</h3>
                      <span className="text-xs text-gray-500">{chat.lastMessage.time}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {chat.participant.role}
                      </Badge>
                      {chat.type === "vacancy" && <Badge className="bg-blue-100 text-blue-800 text-xs">Вакансия</Badge>}
                      {chat.type === "support" && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Поддержка</Badge>
                      )}
                    </div>

                    {chat.vacancy && <div className="text-xs text-blue-600 mb-1">{chat.vacancy.title}</div>}

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1">{chat.lastMessage.text}</p>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs ml-2">{chat.unreadCount}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Область чата */}
        <div className="flex-1 flex flex-col">
          {selectedChatData ? (
            <>
              {/* Заголовок чата */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChatData.participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedChatData.participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedChatData.participant.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{selectedChatData.participant.name}</h2>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {selectedChatData.participant.role}
                        </Badge>
                        {selectedChatData.vacancy && (
                          <span className="text-sm text-blue-600">{selectedChatData.vacancy.title}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.fromMe ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div
                        className={`flex items-center justify-end space-x-1 mt-1 ${
                          message.fromMe ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        <span className="text-xs">{message.time}</span>
                        {message.fromMe && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Поле ввода */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-end space-x-3">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Введите сообщение..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={1}
                      className="resize-none"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                  </div>
                  <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Выберите чат</h3>
                <p className="text-gray-600">Выберите чат из списка слева, чтобы начать общение</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
