"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, X, Minimize2 } from "lucide-react"

interface ChatWidgetProps {
  recipientName: string
  recipientRole: string
  context?: {
    type: "vacancy" | "organization" | "general"
    title?: string
    id?: number
  }
}

export default function ChatWidget({ recipientName, recipientRole, context }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", {
        to: recipientName,
        message: message,
        context: context,
      })
      setMessage("")
    }
  }

  const handleStartChat = () => {
    setIsOpen(true)
    setIsMinimized(false)
  }

  if (!isOpen) {
    return (
      <Button onClick={handleStartChat} className="bg-blue-600 hover:bg-blue-700">
        <MessageSquare className="h-4 w-4 mr-2" />
        Написать сообщение
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-80 ${isMinimized ? "h-14" : "h-96"} transition-all duration-200`}>
        <CardHeader className="p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{recipientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">{recipientName}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {recipientRole}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)}>
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          {context && !isMinimized && (
            <div className="mt-2">
              <Badge className="bg-blue-100 text-blue-800 text-xs">
                {context.type === "vacancy" && "По вакансии"}
                {context.type === "organization" && "Об организации"}
                {context.type === "general" && "Общение"}
              </Badge>
              {context.title && <div className="text-xs text-gray-600 mt-1">{context.title}</div>}
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Область сообщений */}
            <div className="flex-1 p-3 overflow-y-auto">
              <div className="text-center text-sm text-gray-500 mb-4">Начните общение</div>
            </div>

            {/* Поле ввода */}
            <div className="p-3 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Введите сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="sm" onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
