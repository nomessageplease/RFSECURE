"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUserRole } from "@/components/user-role-switcher"
import { MessageSquare, ArrowLeft, Clock, Eye, Edit, Trash, Reply, Pin, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import type { ForumTopic, ForumPost } from "@/lib/supabase/types"

export default function TopicPage() {
  const params = useParams()
  const router = useRouter()
  const { userRole } = useUserRole()
  const [topic, setTopic] = useState<ForumTopic | null>(null)
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState("")
  const [posting, setPosting] = useState(false)
  const [editingPost, setEditingPost] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")

  useEffect(() => {
    fetchTopicAndPosts()
  }, [params.topicId])

  const fetchTopicAndPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/forum/topics/${params.topicId}`)
      const data = await response.json()

      if (data.topic) {
        setTopic(data.topic)
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error("Ошибка загрузки темы:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.trim()) return

    try {
      setPosting(true)
      const response = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic_id: params.topicId,
          content: newPost,
        }),
      })

      if (response.ok) {
        setNewPost("")
        fetchTopicAndPosts()
      }
    } catch (error) {
      console.error("Ошибка создания сообщения:", error)
    } finally {
      setPosting(false)
    }
  }

  const handleEditPost = async (postId: string) => {
    if (!editContent.trim()) return

    try {
      const response = await fetch(`/api/forum/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      })

      if (response.ok) {
        setEditingPost(null)
        setEditContent("")
        fetchTopicAndPosts()
      }
    } catch (error) {
      console.error("Ошибка редактирования сообщения:", error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Вы уверены, что хотите удалить это сообщение?")) return

    try {
      const response = await fetch(`/api/forum/posts/${postId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchTopicAndPosts()
      }
    } catch (error) {
      console.error("Ошибка удаления сообщения:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Тема не найдена</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Навигация */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => router.push(`/forum/${topic.category_id}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к категории
          </Button>
        </div>

        {/* Заголовок темы */}
        <Card className="border-0 shadow-sm mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {topic.is_pinned && <Pin className="h-5 w-5 text-blue-600" />}
                  {topic.is_locked && <Lock className="h-5 w-5 text-gray-500" />}
                  <CardTitle className="text-2xl">{topic.title}</CardTitle>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{topic.author_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(topic.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{topic.views} просмотров</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{topic.replies_count} ответов</span>
                  </div>
                </div>
              </div>
              {(userRole === "moderator" || userRole === "admin") && (
                <Badge
                  variant={topic.status === "active" ? "default" : "secondary"}
                  className={
                    topic.status === "active" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                  }
                >
                  {topic.status === "active" ? "Активна" : "На модерации"}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{topic.content}</p>
            </div>
          </CardContent>
        </Card>

        {/* Сообщения */}
        <div className="space-y-4 mb-6">
          {posts.map((post, index) => (
            <Card key={post.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarFallback>
                      {post.author_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.author_name}</span>
                        <span className="text-sm text-gray-500">
                          #{index + 1} • {formatDate(post.created_at)}
                        </span>
                        {post.is_edited && (
                          <Badge variant="outline" className="text-xs">
                            Изменено
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {(userRole === "moderator" || userRole === "admin") && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingPost(post.id)
                                setEditContent(post.content)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    {editingPost === post.id ? (
                      <div className="space-y-3">
                        <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={4} />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEditPost(post.id)} disabled={!editContent.trim()}>
                            Сохранить
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingPost(null)
                              setEditContent("")
                            }}
                          >
                            Отмена
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Форма ответа */}
        {!topic.is_locked && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Ответить в теме</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Напишите ваш ответ..."
                  rows={4}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleCreatePost}
                    disabled={posting || !newPost.trim()}
                    className="bg-gray-900 hover:bg-gray-800"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    {posting ? "Отправка..." : "Ответить"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {topic.is_locked && (
          <Card className="border-0 shadow-sm bg-gray-50">
            <CardContent className="p-6 text-center">
              <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Тема заблокирована для новых сообщений</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
