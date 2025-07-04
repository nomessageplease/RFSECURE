"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, MessageCircle, ArrowRight } from "lucide-react"

export default function NewsCards() {
  const [news] = useState([
    {
      id: 1,
      title: "Новые требования к лицензированию ЧОП в 2024 году",
      excerpt: "Росгвардия утвердила обновленные требования к получению лицензий на охранную деятельность...",
      category: "Законодательство",
      date: "2024-01-15",
      views: 1247,
      comments: 23,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Рост зарплат охранников в Москве на 15%",
      excerpt: "Аналитики отмечают значительный рост заработных плат в сфере частной охраны столичного региона...",
      category: "Рынок труда",
      date: "2024-01-12",
      views: 892,
      comments: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Технологии безопасности: тренды 2024",
      excerpt: "Обзор современных технологических решений в области физической охраны объектов...",
      category: "Технологии",
      date: "2024-01-10",
      views: 634,
      comments: 12,
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Законодательство":
        return "bg-red-100 text-red-800"
      case "Рынок труда":
        return "bg-green-100 text-green-800"
      case "Технологии":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Заголовок секции */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Последние новости</h2>
          <p className="text-gray-600 mt-1">Актуальная информация из мира частной охраны</p>
        </div>
        <Button variant="outline" className="hidden sm:flex bg-transparent">
          Все новости
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Сетка новостей */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <Card key={article.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-3 left-3">
                <Badge className={getCategoryColor(article.category)}>{article.category}</Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{article.comments}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Кнопка "Все новости" для мобильных */}
      <div className="sm:hidden">
        <Button variant="outline" className="w-full bg-transparent">
          Все новости
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
