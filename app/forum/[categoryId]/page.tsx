"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUserRole } from "@/components/user-role-switcher"
import { MessageSquare, TrendingUp, Pin, Clock, Eye, Plus, ArrowLeft, Lock, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Header from "@/components/header"
import type { ForumCategory, ForumTopic } from "@/lib/supabase/types"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const { userRole } = useUserRole()
  const [category, setCategory] = useState<ForumCategory | null>(null)
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newTopic, setNewTopic] = useState({ title: "", content: "" })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchCategoryAndTopics()
  }, [params.categoryId])

  const fetchCategoryAndTopics = async () => {
    try {
      setLoading(true)

      // Получаем категорию
      const categoryResponse = await fetch(`/api/forum/categories`)
      const categoryData = await categoryResponse.json()
      const currentCategory = categoryData.categories?.find((cat: ForumCategory) => cat.id === params.categoryId)
      setCategory(currentCategory || null)

      // Получаем темы категории
      const topicsResponse = await fetch(`/api/forum/topics?category_id=${params.categoryId}`)
      const topicsData = await topicsResponse.json()
      setTopics(topicsData.topics || [])
    } catch (error) {
      console.error("Ошибка загрузки данных:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTopic = async () => {
    if (!newTopic.title.trim() || !newTopic.content.trim()) return

    try {
      setCreating(true)
      const response = await fetch("/api/forum/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: params.categoryId,
          title: newTopic.title,
          content: newTopic.content,
        }),
      })

      if (response.ok) {
        setNewTopic({ title: "", content: "" })
        setShowCreateDialog(false)
        fetchCategoryAndTopics()
      }
    } catch (error) {
      console.error("Ошибка создания темы:", error)
    } finally {
      setCreating(false)
    }
  }

  const handleTopicAction = async (topicId: string, action: string, value?: any) => {
    try {
      if (action === "delete") {
        await fetch(`/api/forum/topics/${topicId}`, { method: "DELETE" })
      } else {
        await fetch(`/api/forum/topics/${topicId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [action]: value }),
        })
      }
      fetchCategoryAndTopics()
    } catch (error) {
      console.error("Ошибка действия с темой:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Только что"
    if (diffInHours < 24) return `${diffInHours} ч. назад`
    if (diffInHours < 48) return "Вчера"
    return date.toLocaleDateString("ru-RU")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Загрузка...</div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Категория не найдена</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Навигация */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => router.push("/forum")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Назад к форуму
          </Button>
        </div>

        {/* Заголовок категории */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${category.color}-100 text-${category.color}-700`}>
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
                <p className="text-lg text-gray-600">{category.description}</p>
              </div>
            </div>

            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gray-900 hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Новая тема
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Создать новую тему</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Заголовок темы</label>
                    <Input
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                      placeholder="Введите заголовок темы..."
                      maxLength={500}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Содержание</label>
                    <Textarea
                      value={newTopic.content}
                      onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                      placeholder="Опишите вашу тему подробнее..."
                      rows={6}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)} disabled={creating}>
                      Отмена
                    </Button>
                    <Button
                      onClick={handleCreateTopic}
                      disabled={creating || !newTopic.title.trim() || !newTopic.content.trim()}
                    >
                      {creating ? "Создание..." : "Создать тему"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Список тем */}
        <div className="space-y-4">
          {topics.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет тем</h3>
                <p className="text-gray-600 mb-4">Станьте первым, кто создаст тему в этой категории!</p>
                <Button onClick={() => setShowCreateDialog(true)} className="bg-gray-900 hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать первую тему
                </Button>
              </CardContent>
            </Card>
          ) : (
            topics.map((topic) => (
              <Card
                key={topic.id}
                className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer"
                onClick={() => router.push(`/forum/topic/${topic.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarFallback>
                        {topic.author_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {topic.is_pinned && <Pin className="h-4 w-4 text-blue-600" />}
                        {topic.is_locked && <Lock className="h-4 w-4 text-gray-500" />}
                        {topic.is_hot && <TrendingUp className="h-4 w-4 text-red-500" />}
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </h3>
                        {(userRole === "moderator" || userRole === "admin") && (
                          <Badge
                            variant={topic.status === "active" ? "default" : "secondary"}
                            className={
                              topic.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }
                          >
                            {topic.status === "active" ? "Активна" : "На модерации"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span>Автор: {topic.author_name}</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{topic.replies_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{topic.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(topic.last_reply_at)}</span>
                        </div>
                      </div>
                      {(userRole === "moderator" || userRole === "admin") && (
                        <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTopicAction(topic.id, "is_pinned", !topic.is_pinned)}
                          >
                            <Pin className="h-4 w-4 mr-1" />
                            {topic.is_pinned ? "Открепить" : "Закрепить"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTopicAction(topic.id, "is_locked", !topic.is_locked)}
                          >
                            <Lock className="h-4 w-4 mr-1" />
                            {topic.is_locked ? "Разблокировать" : "Заблокировать"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleTopicAction(topic.id, "delete")}
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Удалить
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
