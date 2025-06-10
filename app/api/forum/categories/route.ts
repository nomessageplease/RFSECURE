import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET() {
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

    // Получаем категории
    const { data: categories, error } = await supabase
      .from("forum_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Для каждой категории получаем статистику и последний пост
    const categoriesWithStats = await Promise.all(
      categories.map(async (category) => {
        // Получаем количество тем в категории
        const { count: topicsCount } = await supabase
          .from("forum_topics")
          .select("*", { count: "exact", head: true })
          .eq("category_id", category.id)
          .eq("status", "active")

        // Получаем количество постов в категории
        const { count: postsCount } = await supabase
          .from("forum_posts")
          .select("forum_posts.id", { count: "exact", head: true })
          .eq("status", "active")
          .in(
            "topic_id",
            supabase.from("forum_topics").select("id").eq("category_id", category.id).eq("status", "active"),
          )

        // Получаем последнюю активную тему в категории
        const { data: lastTopic } = await supabase
          .from("forum_topics")
          .select("id, title, author_name, last_reply_at")
          .eq("category_id", category.id)
          .eq("status", "active")
          .order("last_reply_at", { ascending: false })
          .limit(1)
          .single()

        // Формируем объект с информацией о последнем посте
        const lastPost = lastTopic
          ? {
              title: lastTopic.title,
              author: lastTopic.author_name,
              time: new Date(lastTopic.last_reply_at).toLocaleString("ru-RU", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              }),
              avatar: "/placeholder.svg?height=40&width=40",
            }
          : null

        return {
          ...category,
          topics: topicsCount || 0,
          posts: postsCount || 0,
          icon: "MessageSquare", // Фронтенд преобразует строку в компонент
          color: category.color || "bg-blue-100 text-blue-700",
          lastPost,
        }
      }),
    )

    return NextResponse.json({ categories: categoriesWithStats })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
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

    // Проверяем авторизацию и права
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || !["admin", "moderator"].includes(profile.role)) {
      return NextResponse.json({ error: "Недостаточно прав" }, { status: 403 })
    }

    const body = await request.json()
    const { name, description, icon, color, sort_order } = body

    const { data: category, error } = await supabase
      .from("forum_categories")
      .insert({
        name,
        description,
        icon,
        color: color || "blue",
        sort_order: sort_order || 0,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ category })
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
