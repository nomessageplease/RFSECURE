"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, MessageCircle, ArrowRight, Clock, User } from "lucide-react"

export default function NewsCards() {
  const [news] = useState([
    {
      id: 1,
      title: "Новые требования к лицензированию ЧОП в 2025 году",
      excerpt:
        "Росгвардия утвердила обновленные требования к получению лицензий на охранную деятельность. Изменения коснутся процедуры подачи документов и сроков рассмотрения заявок.",
      category: "Законодательство",
      date: "2025-01-15",
      views: 1247,
      comments: 23,
      author: "Редакция RusGuard",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "5 мин",
    },
    {
      id: 2,
      title: "Рост зарплат охранников в Москве на 15%",
      excerpt:
        "Аналитики отмечают значительный рост заработных плат в сфере частной охраны столичного региона. Средняя зарплата охранника в Москве достигла 65 000 рублей.",
      category: "Рынок труда",
      date: "2025-01-12",
      views: 892,
      comments: 45,
      author: "Аналитический отдел",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "3 мин",
    },
    {
      id: 3,
      title: "Технологии безопасности: тренды 2025",
      excerpt:
        "Обзор современных технологических решений в области физической охраны объектов. ИИ, биометрия и умные системы видеонаблюдения меняют отрасль.",
      category: "Технологии",
      date: "2025-01-10",
      views: 634,
      comments: 12,
      author: "Технический эксперт",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "7 мин",
    },
    {
      id: 4,
      title: "Обучение охранников: новые стандарты",
      excerpt:
        "Министерство внутренних дел представило обновленные программы подготовки частных охранников. Акцент сделан на практических навыках и психологической подготовке.",
      category: "Образование",
      date: "2025-01-08",
      views: 445,
      comments: 18,
      author: "Образовательный центр",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "4 мин",
    },
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Законодательство":
        return "bg-red-100 text-red-800 border-red-200"
      case "Рынок труда":
        return "bg-green-100 text-green-800 border-green-200"
      case "Технологии":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Образование":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const handleNewsClick = (newsId: number) => {
    console.log(`Переход к новости ${newsId}`)
    // В реальном приложении здесь будет навигация к детальной странице новости
  }

  const handleAllNewsClick = () => {
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "news" },
      }),
    )
  }

  return (
    <div className="space-y-6">
      {/* Заголовок секции */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="inline-block w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 mr-3 rounded-full"></span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Новости отрасли</h2>
            <p className="text-gray-600 text-sm mt-1">Актуальные события и тренды</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center group hover:bg-blue-50 transition-colors bg-transparent"
          onClick={handleAllNewsClick}
        >
          Все новости
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Сетка новостей */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((article) => (
          <Card
            key={article.id}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200 overflow-hidden"
            onClick={() => handleNewsClick(article.id)}
          >
            {/* Изображение */}
            <div className="relative overflow-hidden">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${getCategoryColor(article.category)} border`}>{article.category}</Badge>
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {article.readTime}
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Описание */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>

              {/* Метаинформация */}
              <div className="space-y-3">
                {/* Автор и дата */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>

                {/* Статистика */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{article.comments}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNewsClick(article.id)
                    }}
                  >
                    Читать далее
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Дополнительная информация */}
      <div className="text-center py-4 border-t border-gray-200">
        <p className="text-gray-500 text-sm mb-3">Следите за актуальными новостями охранной отрасли</p>
        <Button
          variant="outline"
          onClick={handleAllNewsClick}
          className="hover:bg-blue-50 hover:text-blue-600 transition-colors bg-transparent"
        >
          Перейти ко всем новостям
        </Button>
      </div>
    </div>
  )
}
