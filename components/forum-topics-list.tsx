"use client"

import { MessageCircle, Eye, Clock, Pin, Lock, Star, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ForumTopicsListProps {
  role?: string
  sortType: string
}

interface TopicData {
  id: number
  title: string
  author: string
  authorRole: string
  section: string
  replies: number
  views: number
  lastActivity: string
  isPinned: boolean
  isLocked: boolean
  isHot: boolean
  hasNewPosts: boolean
  description: string
}

export default function ForumTopicsList({ role = "Гость", sortType }: ForumTopicsListProps) {
  // Создаем массив тем
  const allTopics: TopicData[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: [
      "Новые требования к лицензированию ЧОП",
      "Обсуждение зарплат в разных регионах",
      "Как правильно оформить задержание нарушителя",
      "Работа на объектах повышенной опасности",
      "Обучение новых сотрудников: лучшие практики",
      "Проблемы с выплатой зарплаты в ЧОП",
      "Технические средства охраны: что выбрать?",
      "Взаимодействие с полицией при ЧП",
      "Карьерный рост в охранной отрасли",
      "Медицинские требования к охранникам",
      "Работа в ночные смены: советы и рекомендации",
      "Конфликтные ситуации с посетителями",
      "Страхование охранников: что нужно знать",
      "Новое оборудование для видеонаблюдения",
      "Права и обязанности частного охранника",
      "Подготовка к аттестации на разряд",
      "Работа на массовых мероприятиях",
      "Психологическая подготовка охранника",
      "Юридические аспекты охранной деятельности",
      "Обмен опытом работы в банковской сфере",
    ][index],
    author: [
      "Иван Петров",
      "Мария Сидорова",
      "Алексей Козлов",
      "Елена Морозова",
      "Дмитрий Волков",
      "Анна Федорова",
      "Сергей Николаев",
      "Ольга Васильева",
    ][index % 8],
    authorRole: ["Охранник", "Представитель организации", "Модератор", "Новичок"][index % 4],
    section: [
      "Общие вопросы",
      "Законодательство",
      "Техника и оборудование",
      "Карьера и обучение",
      "Зарплаты и условия",
      "Происшествия",
    ][index % 6],
    replies: Math.floor(Math.random() * 50) + 1,
    views: Math.floor(Math.random() * 500) + 10,
    lastActivity: `2025-06-${16 - (index % 15)} ${10 + (index % 12)}:${(index % 6) * 10}`,
    isPinned: index < 2,
    isLocked: index === 15,
    isHot: Math.random() > 0.8,
    hasNewPosts: Math.random() > 0.6,
    description: `Краткое описание темы ${index + 1}. Здесь обсуждаются важные вопросы охранной деятельности.`,
  }))

  // Сортируем темы в зависимости от выбранного типа
  const sortedTopics = [...allTopics].sort((a, b) => {
    // Закрепленные темы всегда вверху
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    switch (sortType) {
      case "latest":
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      case "popular":
        return b.views + b.replies * 2 - (a.views + a.replies * 2)
      case "sections":
        return a.section.localeCompare(b.section)
      default:
        return 0
    }
  })

  // Группируем по разделам если выбрана сортировка по разделам
  const groupedTopics =
    sortType === "sections"
      ? sortedTopics.reduce(
          (acc, topic) => {
            if (!acc[topic.section]) {
              acc[topic.section] = []
            }
            acc[topic.section].push(topic)
            return acc
          },
          {} as Record<string, TopicData[]>,
        )
      : null

  const getRoleColor = (authorRole: string) => {
    const colors = {
      Модератор: "bg-blue-100 text-blue-800",
      "Представитель организации": "bg-green-100 text-green-800",
      Охранник: "bg-gray-100 text-gray-800",
      Новичок: "bg-yellow-100 text-yellow-800",
    }
    return colors[authorRole as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleTopicClick = (topicId: number) => {
    if (role === "Гость") {
      alert("Для просмотра темы необходимо зарегистрироваться")
      return
    }
    console.log(`Opening topic ${topicId}`)
  }

  const renderTopicCard = (topic: TopicData) => (
    <div
      key={topic.id}
      className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white cursor-pointer ${
        topic.hasNewPosts ? "border-l-4 border-l-blue-500" : ""
      }`}
      onClick={() => handleTopicClick(topic.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {topic.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
            {topic.isLocked && <Lock className="h-4 w-4 text-gray-600" />}
            {topic.isHot && <Star className="h-4 w-4 text-orange-500" />}
            <h3 className={`font-medium text-gray-900 ${topic.isPinned ? "font-semibold" : ""}`}>{topic.title}</h3>
            {topic.hasNewPosts && (
              <Badge variant="default" className="text-xs">
                Новое
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{topic.author}</span>
              <Badge className={`text-xs ${getRoleColor(topic.authorRole)}`}>{topic.authorRole}</Badge>
            </div>
            <Badge variant="outline" className="text-xs">
              {topic.section}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{topic.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{topic.replies}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{topic.views}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{topic.lastActivity}</span>
        </div>
      </div>
    </div>
  )

  const renderSectionGroup = (sectionName: string, topics: TopicData[]) => (
    <div key={sectionName} className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {sectionName} ({topics.length})
      </h3>
      <div className="space-y-4">{topics.map(renderTopicCard)}</div>
    </div>
  )

  return (
    <div className="space-y-4">
      {groupedTopics ? (
        <div>{Object.entries(groupedTopics).map(([section, topics]) => renderSectionGroup(section, topics))}</div>
      ) : (
        <div className="space-y-4">{sortedTopics.map(renderTopicCard)}</div>
      )}

      {role === "Гость" && (
        <div className="text-center py-8 border-t border-gray-200 mt-6">
          <p className="text-gray-500 mb-4">Зарегистрируйтесь, чтобы участвовать в обсуждениях</p>
          <Button>Зарегистрироваться</Button>
        </div>
      )}
    </div>
  )
}
