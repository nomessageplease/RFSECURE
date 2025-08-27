"use client"

import { Calendar, Eye, Heart, Share2, Bookmark, MessageCircle, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NewsListProps {
  role?: string
  filters: any
}

interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  category: string
  author: string
  source: string
  publishDate: string
  views: number
  likes: number
  comments: number
  image: string
  tags: string[]
  isHot: boolean
  isBreaking: boolean
}

export default function NewsList({ role = "Гость", filters }: NewsListProps) {
  // Создаем массив новостей
  const allNews: NewsItem[] = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    title: [
      "Новые требования к лицензированию частных охранных организаций",
      "Рост зарплат в охранной отрасли: статистика за 2025 год",
      "Внедрение ИИ в системы видеонаблюдения: тренды и перспективы",
      "Изменения в законодательстве о частной охранной деятельности",
      "Крупнейшая выставка безопасности пройдет в Москве",
      "Новые технологии контроля доступа в офисных зданиях",
      "Обучение охранников: новые стандарты и требования",
      "Рынок охранных услуг показал рост на 15% за год",
      "Цифровизация охранной отрасли: вызовы и возможности",
      "Международная конференция по безопасности в Санкт-Петербурге",
      "Новое оборудование для охраны промышленных объектов",
      "Страхование в охранной деятельности: актуальные вопросы",
      "Кибербезопасность для охранных организаций",
      "Профсоюзы охранников обсудили условия труда",
      "Инновации в сфере физической защиты объектов",
    ][index],
    summary: `Краткое описание новости ${index + 1}. Здесь содержится основная информация о событии в охранной отрасли, которая будет интересна профессионалам.`,
    content: `Полный текст новости ${index + 1} с подробным описанием события...`,
    category: ["legislation", "industry", "technology", "companies", "events", "education"][index % 6],
    author: [
      "Редакция RusGuard",
      "Иван Петров",
      "Мария Сидорова",
      "Алексей Козлов",
      "Пресс-служба Минвнутрдел",
      "Аналитический центр",
    ][index % 6],
    source: ["official", "companies", "media", "platform"][index % 4],
    publishDate: `2025-06-${16 - (index % 15)} ${10 + (index % 12)}:${(index % 6) * 10}`,
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 50) + 5,
    comments: Math.floor(Math.random() * 20) + 1,
    image: `/placeholder.svg?height=200&width=300&query=news${index + 1}`,
    tags: [
      ["законодательство", "лицензирование"],
      ["зарплаты", "статистика"],
      ["технологии", "ИИ"],
      ["закон", "изменения"],
      ["выставка", "мероприятие"],
      ["технологии", "доступ"],
    ][index % 6],
    isHot: index % 7 === 0,
    isBreaking: index % 10 === 0,
  }))

  // Применяем фильтры
  const filteredNews = allNews.filter((news) => {
    if (filters.category !== "all" && news.category !== filters.category) return false
    if (filters.source !== "all" && news.source !== filters.source) return false
    // Здесь можно добавить фильтрацию по региону и дате
    return true
  })

  const getCategoryLabel = (category: string) => {
    const labels = {
      legislation: "Законодательство",
      industry: "Отрасль",
      technology: "Технологии",
      companies: "Компании",
      events: "Мероприятия",
      education: "Обучение",
    }
    return labels[category as keyof typeof labels] || category
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      legislation: "bg-red-100 text-red-800",
      industry: "bg-blue-100 text-blue-800",
      technology: "bg-purple-100 text-purple-800",
      companies: "bg-green-100 text-green-800",
      events: "bg-yellow-100 text-yellow-800",
      education: "bg-orange-100 text-orange-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleAction = (action: string, newsId: number) => {
    if (role === "Гость" && (action === "like" || action === "save" || action === "comment")) {
      alert("Для выполнения действия необходимо зарегистрироваться")
      return
    }
    console.log(`Action: ${action}, News ID: ${newsId}`)
  }

  const renderNewsCard = (news: NewsItem) => (
    <article key={news.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      {/* Заголовок с бейджами */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {news.isBreaking && (
              <Badge variant="destructive" className="text-xs">
                Срочно
              </Badge>
            )}
            {news.isHot && (
              <Badge variant="default" className="text-xs">
                Популярное
              </Badge>
            )}
            <Badge className={`text-xs ${getCategoryColor(news.category)}`}>{getCategoryLabel(news.category)}</Badge>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">{news.title}</h2>
        </div>
      </div>

      {/* Изображение и контент */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-1">
          <img
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            className="w-full h-48 md:h-32 object-cover rounded-lg"
          />
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-700 mb-3">{news.summary}</p>
          <div className="flex flex-wrap gap-2">
            {news.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Метаинформация */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Building className="h-4 w-4" />
            <span>{news.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{news.publishDate}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{news.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{news.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{news.comments}</span>
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Button size="sm" onClick={() => handleAction("read", news.id)}>
            Читать полностью
          </Button>
          <Button variant="outline" size="sm" disabled={role === "Гость"} onClick={() => handleAction("save", news.id)}>
            <Bookmark className="h-4 w-4 mr-1" />
            {role === "Гость" ? "Войдите для сохранения" : "Сохранить"}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" disabled={role === "Гость"} onClick={() => handleAction("like", news.id)}>
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction("share", news.id)}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={role === "Гость"}
            onClick={() => handleAction("comment", news.id)}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Найдено новостей: {filteredNews.length}</h3>
        {role === "Гость" && <div className="text-xs text-gray-500">Зарегистрируйтесь для лайков и сохранения</div>}
      </div>

      {filteredNews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">По выбранным фильтрам новости не найдены</p>
        </div>
      ) : (
        <div className="space-y-6">{filteredNews.map(renderNewsCard)}</div>
      )}
    </div>
  )
}
