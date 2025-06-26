"use client"

import { useNewsActions } from "../hooks/use-news-actions"

interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  date: string
}

export default function NewsCards() {
  const { readNews } = useNewsActions()

  // Создаем массив из 10 новостей
  const newsItems: NewsItem[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Новость ${index + 1}: Важные изменения в охранной отрасли`,
    description: `Краткое описание новости номер ${index + 1}. Здесь содержится основная информация о событии в сфере охранной деятельности.`,
    image: `/placeholder.svg?height=120&width=200&query=news${index + 1}`,
    date: `2025-06-${11 - (index % 10)}`,
  }))

  const handleNewsClick = (newsId: number) => {
    readNews(newsId)
  }

  const handleAllNewsClick = () => {
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "news" },
      }),
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="inline-block w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 mr-3 rounded-full"></span>
          <span className="text-lg font-semibold text-gray-700">Новости</span>
        </div>
        <button
          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center group"
          onClick={handleAllNewsClick}
        >
          Все новости
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Горизонтальный скролл контейнер */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="flex-shrink-0 w-64 h-80 rounded-lg bg-white hover:shadow-md transition-shadow overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200"
              onClick={() => handleNewsClick(news.id)}
            >
              {/* Картинка */}
              <div className="h-32 overflow-hidden">
                <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-full object-cover" />
              </div>

              {/* Контент */}
              <div className="p-4">
                {/* Заголовок */}
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">{news.title}</h4>

                {/* Краткое описание */}
                <p className="text-xs text-gray-600 line-clamp-4 mb-3">{news.description}</p>

                {/* Дата */}
                <p className="text-xs text-gray-500 bg-gray-50 inline-block px-2 py-1 rounded-full">{news.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
