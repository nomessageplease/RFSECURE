import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Получаем общую статистику по новостям
    const { data: newsData, error: newsError } = await supabase
      .from("news")
      .select("id, status, views, comments_count, likes_count, category, created_at")

    if (newsError) {
      console.error("Error fetching news stats:", newsError)
      return NextResponse.json({ error: newsError.message }, { status: 500 })
    }

    // Получаем статистику по категориям
    const { data: categoriesData, error: categoriesError } = await supabase.from("news_categories").select("id, name")

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError)
      return NextResponse.json({ error: categoriesError.message }, { status: 500 })
    }

    // Получаем топ новостей по просмотрам
    const { data: topNews, error: topNewsError } = await supabase
      .from("news")
      .select("id, title, views, created_at")
      .order("views", { ascending: false })
      .limit(5)

    if (topNewsError) {
      console.error("Error fetching top news:", topNewsError)
      return NextResponse.json({ error: topNewsError.message }, { status: 500 })
    }

    // Вычисляем статистику
    const totalNews = newsData.length
    const publishedNews = newsData.filter((item) => item.status === "published").length
    const draftNews = newsData.filter((item) => item.status === "draft").length
    const totalViews = newsData.reduce((sum, item) => sum + (item.views || 0), 0)
    const totalComments = newsData.reduce((sum, item) => sum + (item.comments_count || 0), 0)
    const totalLikes = newsData.reduce((sum, item) => sum + (item.likes_count || 0), 0)

    // Вычисляем количество новостей по категориям
    const categoryCounts: Record<string, number> = {}
    newsData.forEach((item) => {
      if (item.category) {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
      }
    })

    // Вычисляем количество новых новостей за последний месяц
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const recentNews = newsData.filter((item) => new Date(item.created_at) > oneMonthAgo).length

    // Вычисляем вовлеченность (комментарии + лайки / просмотры * 100)
    const engagement = totalViews > 0 ? Math.round(((totalComments + totalLikes) / totalViews) * 100) : 0

    const stats = {
      totalNews,
      publishedNews,
      draftNews,
      totalViews,
      totalComments,
      totalLikes,
      categoryCounts,
      topNews,
      recentNews,
      engagement,
    }

    return NextResponse.json({ data: stats })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
