import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Получаем общую статистику
    const { data: totalNews, error: totalError } = await supabase.from("news").select("id", { count: "exact" })

    const { data: publishedNews, error: publishedError } = await supabase
      .from("news")
      .select("id", { count: "exact" })
      .eq("status", "published")

    const { data: draftNews, error: draftError } = await supabase
      .from("news")
      .select("id", { count: "exact" })
      .eq("status", "draft")

    // Получаем статистику просмотров
    const { data: viewsData, error: viewsError } = await supabase.from("news").select("views")

    const totalViews = viewsData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0

    // Получаем статистику комментариев
    const { data: commentsData, error: commentsError } = await supabase.from("news").select("comments_count")

    const totalComments = commentsData?.reduce((sum, item) => sum + (item.comments_count || 0), 0) || 0

    // Получаем статистику лайков
    const { data: likesData, error: likesError } = await supabase.from("news").select("likes")

    const totalLikes = likesData?.reduce((sum, item) => sum + (item.likes || 0), 0) || 0

    // Получаем статистику по категориям
    const { data: categoryStats, error: categoryError } = await supabase.from("news").select("category")

    const categoryCounts =
      categoryStats?.reduce((acc: Record<string, number>, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1
        return acc
      }, {}) || {}

    // Получаем топ новости по просмотрам
    const { data: topNews, error: topError } = await supabase
      .from("news")
      .select("id, title, views, created_at")
      .order("views", { ascending: false })
      .limit(5)

    // Получаем статистику за последние 30 дней
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: recentNews, error: recentError } = await supabase
      .from("news")
      .select("id", { count: "exact" })
      .gte("created_at", thirtyDaysAgo.toISOString())

    if (
      totalError ||
      publishedError ||
      draftError ||
      viewsError ||
      commentsError ||
      likesError ||
      categoryError ||
      topError ||
      recentError
    ) {
      console.error("Error fetching stats:", {
        totalError,
        publishedError,
        draftError,
        viewsError,
        commentsError,
        likesError,
        categoryError,
        topError,
        recentError,
      })
      return NextResponse.json({ error: "Error fetching statistics" }, { status: 500 })
    }

    return NextResponse.json({
      data: {
        totalNews: totalNews?.length || 0,
        publishedNews: publishedNews?.length || 0,
        draftNews: draftNews?.length || 0,
        totalViews,
        totalComments,
        totalLikes,
        categoryCounts,
        topNews: topNews || [],
        recentNews: recentNews?.length || 0,
        engagement: totalNews?.length
          ? Math.round(((totalViews + totalComments + totalLikes) / (totalNews.length * 3)) * 100)
          : 0,
      },
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
