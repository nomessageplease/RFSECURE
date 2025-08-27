"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Clock, MessageCircle, Share2, Bookmark, TrendingUp, AlertCircle, Calendar, Tag } from "lucide-react"

interface NewsCardsProps {
  role?: string
}

export default function NewsCards({ role = "Гость" }: NewsCardsProps) {
  const [bookmarked, setBookmarked] = useState<number[]>([])

  const news = [
    {
      id: 1,
      title: "Новые требования к лицензированию частных охранных организаций в 2024 году",
      excerpt:
        "Росгвардия утвердила обновленные требования к получению и продлению лицензий для ЧОП. Изменения коснутся процедуры подачи документов и квалификационных требований.",
      content: "Полный текст новых требований...",
      category: "Законодательство",
      categoryColor: "bg-red-100 text-red-800",
      author: "Редакция RusGuard",
      authorAvatar: "/placeholder.svg?height=32&width=32&text=Р",
      publishedDate: "2024-01-15T10:30:00",
      readTime: 5,
      viewsCount: 1247,
      commentsCount: 23,
      sharesCount: 45,
      isImportant: true,
      isTrending: true,
      tags: ["Лицензирование", "ЧОП", "Росгвардия", "2024"],
      image: "/placeholder.svg?height=200&width=400&text=Лицензирование",
    },
    {
      id: 2,
      title: "Рейтинг лучших охранных организаций России по итогам 2023 года",
      excerpt:
        "Представляем топ-50 частных охранных предприятий, которые показали лучшие результаты в области качества услуг, клиентского сервиса и профессионализма сотрудников.",
      content: "Методология составления рейтинга...",
      category: "Рейтинги",
      categoryColor: "bg-yellow-100 text-yellow-800",
      author: "Аналитический отдел",
      authorAvatar: "/placeholder.svg?height=32&width=32&text=А",
      publishedDate: "2024-01-12T14:15:00",
      readTime: 8,
      viewsCount: 2156,
      commentsCount: 67,
      sharesCount: 89,
      isImportant: false,
      isTrending: true,
      tags: ["Рейтинг", "ТОП-50", "2023", "Качество"],
      image: "/placeholder.svg?height=200&width=400&text=Рейтинг+ЧОП",
    },
    {
      id: 3,
      title: "Новые технологии в охранной деятельности: ИИ и машинное обучение",
      excerpt:
        "Искусственный интеллект революционизирует сферу безопасности. Рассматриваем современные решения для видеоаналитики, распознавания лиц и прогнозирования угроз.",
      content: "Обзор технологий ИИ в охране...",
      category: "Технологии",
      categoryColor: "bg-blue-100 text-blue-800",
      author: "Технический эксперт",
      authorAvatar: "/placeholder.svg?height=32&width=32&text=Т",
      publishedDate: "2024-01-10T09:45:00",
      readTime: 12,
      viewsCount: 892,
      commentsCount: 34,
      sharesCount: 56,
      isImportant: false,
      isTrending: false,
      tags: ["ИИ", "Технологии", "Видеоаналитика", "Инновации"],
      image: "/placeholder.svg?height=200&width=400&text=ИИ+в+охране",
    },
    {
      id: 4,
      title: "Изменения в трудовом законодательстве для охранников с 1 февраля 2024",
      excerpt:
        "Вступают в силу новые нормы регулирования рабочего времени, оплаты труда и социальных гарантий для сотрудников частных охранных организаций.",
      content: "Детальный разбор изменений...",
      category: "Трудовое право",
      categoryColor: "bg-green-100 text-green-800",
      author: "Юридический консультант",
      authorAvatar: "/placeholder.svg?height=32&width=32&text=Ю",
      publishedDate: "2024-01-08T16:20:00",
      readTime: 6,
      viewsCount: 1543,
      commentsCount: 78,
      sharesCount: 123,
      isImportant: true,
      isTrending: false,
      tags: ["Трудовое право", "Охранники", "Зарплата", "Законы"],
      image: "/placeholder.svg?height=200&width=400&text=Трудовое+право",
    },
  ]

  const toggleBookmark = (newsId: number) => {
    if (role === "Гость") {
      alert("Для сохранения новостей необходимо войти в систему")
      return
    }

    setBookmarked((prev) => (prev.includes(newsId) ? prev.filter((id) => id !== newsId) : [...prev, newsId]))
  }

  const handleShare = (newsId: number) => {
    console.log(`Поделиться новостью ${newsId}`)
    // Здесь будет логика шаринга
  }

  const handleComment = (newsId: number) => {
    if (role === "Гость") {
      alert("Для комментирования необходимо войти в систему")
      return
    }
    console.log(`Комментировать новость ${newsId}`)
    // Здесь будет переход к комментариям
  }

  const handleReadMore = (newsId: number) => {
    console.log(`Читать полностью новость ${newsId}`)
    // Здесь будет переход к полной статье
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "вчера"
    if (diffDays < 7) return `${diffDays} дня назад`
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {news.map((article) => (
        <Card
          key={article.id}
          className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 overflow-hidden"
        >
          {/* Изображение */}
          <div className="relative">
            <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-48 object-cover" />

            {/* Бейджи поверх изображения */}
            <div className="absolute top-3 left-3 flex space-x-2">
              <Badge className={article.categoryColor}>{article.category}</Badge>
              {article.isImportant && (
                <Badge className="bg-red-500 text-white">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Важно
                </Badge>
              )}
              {article.isTrending && (
                <Badge className="bg-orange-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Тренд
                </Badge>
              )}
            </div>

            {/* Время чтения */}
            <div className="absolute bottom-3 right-3">
              <Badge variant="secondary" className="bg-black/70 text-white border-none">
                <Clock className="h-3 w-3 mr-1" />
                {article.readTime} мин
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-3">
            {/* Заголовок */}
            <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
              {article.title}
            </h3>

            {/* Автор и дата */}
            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <div className="flex items-center space-x-2">
                <img
                  src={article.authorAvatar || "/placeholder.svg"}
                  alt={article.author}
                  className="h-6 w-6 rounded-full"
                />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(article.publishedDate)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Краткое описание */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>

            {/* Теги */}
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {article.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{article.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Статистика */}
            <div className="flex items-center justify-between text-sm text-gray-500 py-2 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.viewsCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{article.commentsCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4" />
                  <span>{article.sharesCount}</span>
                </div>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => handleReadMore(article.id)} className="flex-1 mr-2">
                Читать полностью
              </Button>

              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" onClick={() => toggleBookmark(article.id)} className="p-2">
                  <Bookmark
                    className={`h-4 w-4 ${
                      bookmarked.includes(article.id)
                        ? "text-blue-600 fill-blue-600"
                        : "text-gray-400 hover:text-blue-600"
                    }`}
                  />
                </Button>

                <Button variant="ghost" size="sm" onClick={() => handleComment(article.id)} className="p-2">
                  <MessageCircle className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                </Button>

                <Button variant="ghost" size="sm" onClick={() => handleShare(article.id)} className="p-2">
                  <Share2 className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
