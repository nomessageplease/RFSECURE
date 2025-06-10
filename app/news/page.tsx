"use client"

import { useState, useEffect } from "react"
import { useUserRole } from "@/components/user-role-switcher"
import {
  Calendar,
  Eye,
  MessageSquare,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  User,
  Tag,
  Search,
  Plus,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Settings,
  BarChart3,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import type { News } from "@/lib/supabase/types"

interface NewsCategory {
  id: string
  name: string
  description?: string
  color?: string
  icon?: string
  sort_order: number
  is_active: boolean
}

interface NewsStats {
  totalNews: number
  publishedNews: number
  draftNews: number
  totalViews: number
  totalComments: number
  totalLikes: number
  categoryCounts: Record<string, number>
  topNews: Array<{ id: string; title: string; views: number; created_at: string }>
  recentNews: number
  engagement: number
}

interface NewsFormData {
  title: string
  excerpt: string
  content: string
  category: string
  image_url: string
  tags: string[]
  featured: boolean
  status: "draft" | "published"
}

interface CategoryFormData {
  id: string
  name: string
  description: string
  color: string
  sort_order: number
}

export default function NewsPage() {
  const { userRole } = useUserRole()
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [news, setNews] = useState<News[]>([])
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [stats, setStats] = useState<NewsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<NewsCategory | null>(null)
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    excerpt: "",
    content: "",
    category: "general",
    image_url: "",
    tags: [],
    featured: false,
    status: "draft",
  })
  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
    id: "",
    name: "",
    description: "",
    color: "#6B7280",
    sort_order: 0,
  })

  useEffect(() => {
    fetchNews()
    fetchCategories()
    if (userRole === "admin" || userRole === "moderator") {
      fetchStats()
    }
  }, [selectedCategory, userRole])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory)
      }

      const response = await fetch(`/api/news?${params}`)
      const result = await response.json()

      if (response.ok) {
        setNews(result.data || [])
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить новости",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching news:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить новости",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/news-categories")
      const result = await response.json()

      if (response.ok) {
        setCategories(result.data || [])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/news-stats")
      const result = await response.json()

      if (response.ok) {
        setStats(result.data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleCreateNews = async () => {
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          author_name: "Администратор",
          tags: formData.tags.filter((tag) => tag.trim() !== ""),
        }),
      })

      if (response.ok) {
        toast({
          title: "Успех",
          description: "Новость создана",
        })
        setIsCreateDialogOpen(false)
        resetForm()
        fetchNews()
        if (userRole === "admin" || userRole === "moderator") {
          fetchStats()
        }
      } else {
        const error = await response.json()
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось создать новость",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating news:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось создать новость",
        variant: "destructive",
      })
    }
  }

  const handleUpdateNews = async () => {
    if (!editingNews) return

    try {
      const response = await fetch(`/api/news/${editingNews.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.filter((tag) => tag.trim() !== ""),
        }),
      })

      if (response.ok) {
        toast({
          title: "Успех",
          description: "Новость обновлена",
        })
        setEditingNews(null)
        resetForm()
        fetchNews()
        if (userRole === "admin" || userRole === "moderator") {
          fetchStats()
        }
      } else {
        const error = await response.json()
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось обновить новость",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating news:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить новость",
        variant: "destructive",
      })
    }
  }

  const handleDeleteNews = async (newsId: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту новость?")) return

    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Успех",
          description: "Новость удалена",
        })
        fetchNews()
        if (userRole === "admin" || userRole === "moderator") {
          fetchStats()
        }
      } else {
        const error = await response.json()
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось удалить новость",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting news:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось удалить новость",
        variant: "destructive",
      })
    }
  }

  const handleCreateCategory = async () => {
    try {
      const response = await fetch("/api/news-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryFormData),
      })

      if (response.ok) {
        toast({
          title: "Успех",
          description: "Категория создана",
        })
        setIsCategoryDialogOpen(false)
        resetCategoryForm()
        fetchCategories()
      } else {
        const error = await response.json()
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось создать категорию",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating category:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось создать категорию",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return

    try {
      const response = await fetch(`/api/news-categories/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryFormData),
      })

      if (response.ok) {
        toast({
          title: "Успех",
          description: "Категория обновлена",
        })
        setEditingCategory(null)
        resetCategoryForm()
        fetchCategories()
      } else {
        const error = await response.json()
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось обновить категорию",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating category:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить категорию",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту категорию?")) return

    try {
      const response = await fetch(`/api/news-categories/${categoryId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Успех",
          description: "Категория удалена",
        })
        fetchCategories()
      } else {
        const error = await response.json()
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось удалить категорию",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось удалить категорию",
        variant: "destructive",
      })
    }
  }

  const moveCategoryUp = async (category: NewsCategory) => {
    const newOrder = category.sort_order - 1
    if (newOrder < 0) return

    try {
      await fetch(`/api/news-categories/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...category, sort_order: newOrder }),
      })
      fetchCategories()
    } catch (error) {
      console.error("Error moving category:", error)
    }
  }

  const moveCategoryDown = async (category: NewsCategory) => {
    const newOrder = category.sort_order + 1

    try {
      await fetch(`/api/news-categories/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...category, sort_order: newOrder }),
      })
      fetchCategories()
    } catch (error) {
      console.error("Error moving category:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "general",
      image_url: "",
      tags: [],
      featured: false,
      status: "draft",
    })
  }

  const resetCategoryForm = () => {
    setCategoryFormData({
      id: "",
      name: "",
      description: "",
      color: "#6B7280",
      sort_order: 0,
    })
  }

  const openEditDialog = (newsItem: News) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      excerpt: newsItem.excerpt || "",
      content: newsItem.content,
      category: newsItem.category,
      image_url: newsItem.image_url || "",
      tags: newsItem.tags || [],
      featured: newsItem.featured,
      status: newsItem.status,
    })
  }

  const openEditCategoryDialog = (category: NewsCategory) => {
    setEditingCategory(category)
    setCategoryFormData({
      id: category.id,
      name: category.name,
      description: category.description || "",
      color: category.color || "#6B7280",
      sort_order: category.sort_order,
    })
  }

  const getPageTitle = () => {
    switch (userRole) {
      case "guard":
        return "Новости отрасли"
      case "chop":
        return "Новости и аналитика"
      case "moderator":
        return "Модерация новостей"
      case "admin":
        return "Управление новостями"
      default:
        return "Новости"
    }
  }

  const getPageDescription = () => {
    switch (userRole) {
      case "guard":
        return "Актуальные новости сферы безопасности и охранной деятельности"
      case "chop":
        return "Следите за трендами рынка и изменениями в законодательстве"
      case "moderator":
        return "Модерируйте новости и следите за качеством контента"
      case "admin":
        return "Полное управление новостным разделом и контентом"
      default:
        return "Актуальные новости сферы безопасности и охранной деятельности"
    }
  }

  const getTabsForRole = () => {
    switch (userRole) {
      case "guard":
      case "chop":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-11">
            <TabsTrigger value="latest" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="featured" className="text-sm font-medium">
              Рекомендуемые
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-sm font-medium">
              Популярные
            </TabsTrigger>
          </TabsList>
        )
      case "moderator":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-4 h-11">
            <TabsTrigger value="moderation" className="text-sm font-medium">
              Модерация
            </TabsTrigger>
            <TabsTrigger value="latest" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="drafts" className="text-sm font-medium">
              Черновики
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Аналитика
            </TabsTrigger>
          </TabsList>
        )
      case "admin":
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-5 h-11">
            <TabsTrigger value="moderation" className="text-sm font-medium">
              Модерация
            </TabsTrigger>
            <TabsTrigger value="latest" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="drafts" className="text-sm font-medium">
              Черновики
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm font-medium">
              Настройки
            </TabsTrigger>
          </TabsList>
        )
      default:
        return (
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-11">
            <TabsTrigger value="latest" className="text-sm font-medium">
              Последние
            </TabsTrigger>
            <TabsTrigger value="featured" className="text-sm font-medium">
              Рекомендуемые
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-sm font-medium">
              Популярные
            </TabsTrigger>
          </TabsList>
        )
    }
  }

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case "guard":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bookmark className="h-4 w-4 mr-2" />
              Сохраненные
            </Button>
          </div>
        )
      case "chop":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <BarChart3 className="h-4 w-4 mr-2" />
              Аналитика
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bookmark className="h-4 w-4 mr-2" />
              Сохраненные
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-800 border-0">
              На модерации: {news.filter((n) => n.status === "draft").length}
            </Badge>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Правила
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex gap-2">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 hidden md:flex text-sm" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать новость
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Создание новости</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="news-title">Заголовок</Label>
                    <Input
                      id="news-title"
                      placeholder="Введите заголовок новости"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-category">Категория</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="news-excerpt">Краткое описание</Label>
                    <Textarea
                      id="news-excerpt"
                      placeholder="Краткое описание новости..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-content">Содержание</Label>
                    <Textarea
                      id="news-content"
                      placeholder="Полный текст новости..."
                      className="min-h-32"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-image">URL изображения</Label>
                    <Input
                      id="news-image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-tags">Теги (через запятую)</Label>
                    <Input
                      id="news-tags"
                      placeholder="тег1, тег2, тег3"
                      value={formData.tags.join(", ")}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                      Рекомендуемая новость
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormData({ ...formData, status: "draft" })
                        handleCreateNews()
                      }}
                    >
                      Сохранить как черновик
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setFormData({ ...formData, status: "published" })
                        handleCreateNews()
                      }}
                    >
                      Опубликовать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingNews} onOpenChange={() => setEditingNews(null)}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Редактирование новости</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-news-title">Заголовок</Label>
                    <Input
                      id="edit-news-title"
                      placeholder="Введите заголовок новости"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-news-category">Категория</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-news-excerpt">Краткое описание</Label>
                    <Textarea
                      id="edit-news-excerpt"
                      placeholder="Краткое описание новости..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-news-content">Содержание</Label>
                    <Textarea
                      id="edit-news-content"
                      placeholder="Полный текст новости..."
                      className="min-h-32"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-news-image">URL изображения</Label>
                    <Input
                      id="edit-news-image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-news-tags">Теги (через запятую)</Label>
                    <Input
                      id="edit-news-tags"
                      placeholder="тег1, тег2, тег3"
                      value={formData.tags.join(", ")}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                      Рекомендуемая новость
                    </label>
                  </div>
                  <div>
                    <Label>Статус</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "draft" | "published") => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Черновик</SelectItem>
                        <SelectItem value="published">Опубликовано</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditingNews(null)}>
                      Отмена
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleUpdateNews}>
                      Сохранить изменения
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const getNewsActions = (newsItem: News) => {
    switch (userRole) {
      case "guard":
      case "chop":
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4 mr-1" />
              Сохранить
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Поделиться
            </Button>
          </div>
        )
      case "moderator":
        return (
          <div className="flex items-center gap-2">
            {newsItem.status === "draft" ? (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Одобрить
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <XCircle className="h-4 w-4 mr-1" />
                  Отклонить
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => openEditDialog(newsItem)}>
                <Edit className="h-4 w-4 mr-1" />
                Редактировать
              </Button>
            )}
          </div>
        )
      case "admin":
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => openEditDialog(newsItem)}>
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-1" />
              Статистика
            </Button>
            <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteNews(newsItem.id)}>
              <Trash className="h-4 w-4 mr-1" />
              Удалить
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))

    // Для модераторов и админов показываем все новости
    if (userRole === "moderator" || userRole === "admin") {
      return matchesSearch
    }

    // Для обычных пользователей показываем только опубликованные
    return matchesSearch && item.status === "published"
  })

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Не опубликовано"
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка новостей...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{getPageTitle()}</h1>
              <p className="text-lg text-gray-600 max-w-2xl">{getPageDescription()}</p>
            </div>
            {getRoleSpecificActions()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              defaultValue={userRole === "moderator" || userRole === "admin" ? "moderation" : "latest"}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">{getTabsForRole()}</div>

              {/* Модерация - только для модераторов и админов */}
              {(userRole === "moderator" || userRole === "admin") && (
                <TabsContent value="moderation" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Новости на модерации</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredNews
                          .filter((item) => item.status === "draft")
                          .map((newsItem) => (
                            <div key={newsItem.id} className="p-4 border rounded-lg">
                              <div className="flex items-start gap-4">
                                <img
                                  src={newsItem.image_url || "/placeholder.svg?height=80&width=80"}
                                  alt={newsItem.title}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium mb-2">{newsItem.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{newsItem.excerpt}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <span>Автор: {newsItem.author_name}</span>
                                    <span>{formatDate(newsItem.created_at)}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      Одобрить
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600">
                                      Отклонить
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => openEditDialog(newsItem)}>
                                      Просмотреть
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        {filteredNews.filter((item) => item.status === "draft").length === 0 && (
                          <p className="text-gray-500 text-center py-8">Нет новостей на модерации</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Последние новости */}
              <TabsContent value="latest" className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Поиск новостей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 border-gray-200"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все новости</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Featured News */}
                {filteredNews.filter((item) => item.featured).length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Главные новости</h2>
                    <div className="grid gap-6">
                      {filteredNews
                        .filter((item) => item.featured)
                        .map((newsItem) => (
                          <Card
                            key={newsItem.id}
                            className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer overflow-hidden"
                          >
                            <CardContent className="p-0">
                              <div className="md:flex">
                                <div className="md:w-1/3">
                                  <img
                                    src={newsItem.image_url || "/placeholder.svg?height=200&width=300"}
                                    alt={newsItem.title}
                                    className="w-full h-48 md:h-full object-cover"
                                  />
                                </div>
                                <div className="md:w-2/3 p-6">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Badge className="bg-red-100 text-red-800 border-0">Главная новость</Badge>
                                    <Badge variant="outline">
                                      {categories.find((cat) => cat.id === newsItem.category)?.name}
                                    </Badge>
                                    {(userRole === "moderator" || userRole === "admin") && (
                                      <Badge
                                        className={
                                          newsItem.status === "published"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-orange-100 text-orange-800"
                                        }
                                      >
                                        {newsItem.status === "published" ? "Опубликовано" : "Черновик"}
                                      </Badge>
                                    )}
                                  </div>
                                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                                    {newsItem.title}
                                  </h3>
                                  <p className="text-gray-600 mb-4 leading-relaxed">{newsItem.excerpt}</p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarFallback>
                                            {newsItem.author_name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span>{newsItem.author_name}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(newsItem.published_at || newsItem.created_at)}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{newsItem.views}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{newsItem.comments_count}</span>
                                      </div>
                                    </div>
                                    {getNewsActions(newsItem)}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}

                {/* Regular News */}
                <div className="grid gap-6">
                  {filteredNews
                    .filter((item) => !item.featured)
                    .map((newsItem) => (
                      <Card
                        key={newsItem.id}
                        className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer overflow-hidden"
                      >
                        <CardContent className="p-0">
                          <div className="md:flex">
                            <div className="md:w-1/4">
                              <img
                                src={newsItem.image_url || "/placeholder.svg?height=150&width=200"}
                                alt={newsItem.title}
                                className="w-full h-48 md:h-32 object-cover"
                              />
                            </div>
                            <div className="md:w-3/4 p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">
                                  {categories.find((cat) => cat.id === newsItem.category)?.name}
                                </Badge>
                                {(userRole === "moderator" || userRole === "admin") && (
                                  <Badge
                                    className={
                                      newsItem.status === "published"
                                        ? "bg-green-100 text-green-800"
                                        : newsItem.status === "draft"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {newsItem.status === "published"
                                      ? "Опубликовано"
                                      : newsItem.status === "draft"
                                        ? "Черновик"
                                        : "Архив"}
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                {newsItem.title}
                              </h3>
                              <p className="text-gray-600 mb-3 text-sm leading-relaxed">{newsItem.excerpt}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>{newsItem.author_name}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatDate(newsItem.published_at || newsItem.created_at)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{newsItem.views}</span>
                                  </div>
                                </div>
                                {getNewsActions(newsItem)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Новости не найдены</p>
                  </div>
                )}
              </TabsContent>

              {/* Рекомендуемые новости */}
              <TabsContent value="featured" className="space-y-6">
                <div className="grid gap-6">
                  {filteredNews
                    .filter((item) => item.featured || item.views > 500)
                    .map((newsItem) => (
                      <Card
                        key={newsItem.id}
                        className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer overflow-hidden"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="h-4 w-4 text-red-500" />
                            <Badge className="bg-red-100 text-red-800 border-0">Рекомендуем</Badge>
                            <Badge variant="outline">
                              {categories.find((cat) => cat.id === newsItem.category)?.name}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                            {newsItem.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{newsItem.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{newsItem.author_name}</span>
                              <span>{formatDate(newsItem.published_at || newsItem.created_at)}</span>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{newsItem.views}</span>
                              </div>
                            </div>
                            {getNewsActions(newsItem)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Популярные новости */}
              <TabsContent value="trending" className="space-y-6">
                <div className="grid gap-6">
                  {filteredNews
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 10)
                    .map((newsItem) => (
                      <Card
                        key={newsItem.id}
                        className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer overflow-hidden"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="h-4 w-4 text-orange-500" />
                            <Badge className="bg-orange-100 text-orange-800 border-0">Популярно</Badge>
                            <Badge variant="outline">
                              {categories.find((cat) => cat.id === newsItem.category)?.name}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                            {newsItem.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{newsItem.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{newsItem.author_name}</span>
                              <span>{formatDate(newsItem.published_at || newsItem.created_at)}</span>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{newsItem.views}</span>
                              </div>
                            </div>
                            {getNewsActions(newsItem)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Черновики - только для модераторов и админов */}
              {(userRole === "moderator" || userRole === "admin") && (
                <TabsContent value="drafts" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Черновики</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredNews
                          .filter((item) => item.status === "draft")
                          .map((newsItem) => (
                            <div key={newsItem.id} className="p-4 border rounded-lg">
                              <h4 className="font-medium mb-2">{newsItem.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{newsItem.excerpt}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <span>Автор: {newsItem.author_name}</span>
                                <span>Создано: {formatDate(newsItem.created_at)}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => openEditDialog(newsItem)}
                                >
                                  Редактировать
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={async () => {
                                    await fetch(`/api/news/${newsItem.id}`, {
                                      method: "PUT",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({
                                        ...newsItem,
                                        status: "published",
                                        published_at: new Date().toISOString(),
                                      }),
                                    })
                                    fetchNews()
                                  }}
                                >
                                  Опубликовать
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleDeleteNews(newsItem.id)}
                                >
                                  Удалить
                                </Button>
                              </div>
                            </div>
                          ))}
                        {filteredNews.filter((item) => item.status === "draft").length === 0 && (
                          <p className="text-gray-500 text-center py-8">Нет черновиков</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Аналитика - только для модераторов и админов */}
              {(userRole === "moderator" || userRole === "admin") && (
                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">{stats?.totalNews || 0}</div>
                        <div className="text-sm text-gray-600">Всего новостей</div>
                        <div className="text-xs text-green-600 mt-1">+{stats?.recentNews || 0} за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">{stats?.totalViews || 0}</div>
                        <div className="text-sm text-gray-600">Просмотров</div>
                        <div className="text-xs text-green-600 mt-1">+18% за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">{stats?.totalComments || 0}</div>
                        <div className="text-sm text-gray-600">Комментариев</div>
                        <div className="text-xs text-green-600 mt-1">+8% за месяц</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold text-gray-900">{stats?.engagement || 0}%</div>
                        <div className="text-sm text-gray-600">Вовлеченность</div>
                        <div className="text-xs text-green-600 mt-1">+2% за месяц</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Топ новости */}
                  {stats?.topNews && stats.topNews.length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Топ новости по просмотрам</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {stats.topNews.map((item, index) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-gray-500">{formatDate(item.created_at)}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">{item.views}</div>
                                <div className="text-sm text-gray-500">просмотров</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Статистика по категориям */}
                  {stats?.categoryCounts && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Статистика по категориям</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Object.entries(stats.categoryCounts).map(([categoryId, count]) => {
                            const category = categories.find((cat) => cat.id === categoryId)
                            return (
                              <div key={categoryId} className="flex items-center justify-between">
                                <span>{category?.name || categoryId}</span>
                                <Badge variant="outline">{count}</Badge>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              )}

              {/* Настройки - только для админов */}
              {userRole === "admin" && (
                <TabsContent value="settings" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle>Настройки новостей</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Модерация новых новостей</span>
                          <Button variant="outline" size="sm">
                            Включено
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Автоматическая публикация</span>
                          <Button variant="outline" size="sm">
                            Отключено
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Уведомления о новых новостях</span>
                          <Button variant="outline" size="sm">
                            Включено
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Управление категориями</CardTitle>
                          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Добавить
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {editingCategory ? "Редактирование категории" : "Создание категории"}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="category-id">ID категории</Label>
                                  <Input
                                    id="category-id"
                                    placeholder="category-id"
                                    value={categoryFormData.id}
                                    onChange={(e) => setCategoryFormData({ ...categoryFormData, id: e.target.value })}
                                    disabled={!!editingCategory}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="category-name">Название</Label>
                                  <Input
                                    id="category-name"
                                    placeholder="Название категории"
                                    value={categoryFormData.name}
                                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="category-description">Описание</Label>
                                  <Textarea
                                    id="category-description"
                                    placeholder="Описание категории"
                                    value={categoryFormData.description}
                                    onChange={(e) =>
                                      setCategoryFormData({ ...categoryFormData, description: e.target.value })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="category-color">Цвет</Label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      id="category-color"
                                      type="color"
                                      value={categoryFormData.color}
                                      onChange={(e) =>
                                        setCategoryFormData({ ...categoryFormData, color: e.target.value })
                                      }
                                      className="w-16 h-10"
                                    />
                                    <Input
                                      placeholder="#6B7280"
                                      value={categoryFormData.color}
                                      onChange={(e) =>
                                        setCategoryFormData({ ...categoryFormData, color: e.target.value })
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="category-order">Порядок сортировки</Label>
                                  <Input
                                    id="category-order"
                                    type="number"
                                    value={categoryFormData.sort_order}
                                    onChange={(e) =>
                                      setCategoryFormData({
                                        ...categoryFormData,
                                        sort_order: Number.parseInt(e.target.value),
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setEditingCategory(null)
                                      setIsCategoryDialogOpen(false)
                                      resetCategoryForm()
                                    }}
                                  >
                                    Отмена
                                  </Button>
                                  <Button
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
                                  >
                                    {editingCategory ? "Сохранить" : "Создать"}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {categories
                          .sort((a, b) => a.sort_order - b.sort_order)
                          .map((category) => (
                            <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }}></div>
                                <div>
                                  <span className="font-medium">{category.name}</span>
                                  <p className="text-sm text-gray-500">{category.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => moveCategoryUp(category)}
                                  disabled={category.sort_order === 0}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => moveCategoryDown(category)}>
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    openEditCategoryDialog(category)
                                    setIsCategoryDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleDeleteCategory(category.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Категории</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedCategory === "all" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Все новости</span>
                    <span className="text-xs text-gray-500">{news.length}</span>
                  </div>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: category.color }}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {news.filter((n) => n.category === category.id).length}
                      </span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Популярные теги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from(new Set(news.flatMap((n) => n.tags || [])))
                  .slice(0, 10)
                  .map((tag, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{tag}</span>
                      </div>
                      <span className="text-xs text-gray-500">{news.filter((n) => n.tags?.includes(tag)).length}</span>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Newsletter Subscription */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Подписка на новости</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Получайте последние новости отрасли на свою почту</p>
                <div className="space-y-2">
                  <Input placeholder="Ваш email" type="email" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Подписаться</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
