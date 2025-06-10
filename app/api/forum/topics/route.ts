import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const categoryId = searchParams.get("categoryId")

    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    let topics = []
    try {
      let query = supabase
        .from("forum_topics")
        .select("*")
        .eq("status", "active")
        .order("last_reply_at", { ascending: false })
        .limit(limit)

      if (categoryId) {
        query = query.eq("category_id", Number.parseInt(categoryId))
      }

      const { data: topicsData, error } = await query

      if (error) {
        console.log("Forum topics table doesn't exist yet, using default topics")
        topics = getDefaultTopics()
      } else {
        topics = (topicsData || []).map((topic) => ({
          id: topic.id,
          title: topic.title,
          author: topic.author_name,
          authorAvatar: "/placeholder.svg?height=40&width=40",
          replies: topic.replies_count || 0,
          views: topic.views_count || 0,
          lastReply: new Date(topic.last_reply_at).toLocaleString("ru-RU", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
          isPinned: topic.is_pinned || false,
          isHot: (topic.views_count || 0) > 100,
          status: topic.status,
        }))
      }
    } catch (dbError) {
      console.log("Database error, using default topics:", dbError)
      topics = getDefaultTopics()
    }

    return NextResponse.json({ topics })
  } catch (error) {
    console.error("Error in forum topics API:", error)
    return NextResponse.json({
      topics: getDefaultTopics(),
    })
  }
}

function getDefaultTopics() {
  return [
    {
      id: 1,
      title: "Добро пожаловать на форум!",
      author: "Администратор",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 5,
      views: 150,
      lastReply: "2 часа назад",
      isPinned: true,
      isHot: true,
      status: "active",
    },
    {
      id: 2,
      title: "Правила форума",
      author: "Администратор",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 2,
      views: 89,
      lastReply: "1 день назад",
      isPinned: true,
      isHot: false,
      status: "active",
    },
    {
      id: 3,
      title: "Как оставить отзыв о ЧОП",
      author: "Администратор",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 8,
      views: 67,
      lastReply: "3 часа назад",
      isPinned: false,
      isHot: false,
      status: "active",
    },
  ]
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    // Проверяем авторизацию
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
    }

    // Получаем профиль пользователя
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Профиль не найден" }, { status: 404 })
    }

    const body = await request.json()
    const { category_id, title, content } = body

    // Определяем статус темы (для обычных пользователей - на модерации)
    const status = ["admin", "moderator"].includes(profile.role) ? "active" : "pending"

    const { data: topic, error } = await supabase
      .from("forum_topics")
      .insert({
        category_id,
        title,
        content,
        author_id: user.id,
        author_name: profile.full_name || profile.username || "Пользователь",
        status,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ topic })
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
