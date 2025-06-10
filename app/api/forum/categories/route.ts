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

    // Получаем категории - используем заглушки, если таблицы не существуют
    let categories = []
    try {
      const { data: categoriesData, error } = await supabase
        .from("forum_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (error) {
        console.log("Forum categories table doesn't exist yet, using default categories")
        // Возвращаем заглушки категорий
        categories = getDefaultCategories()
      } else {
        categories = categoriesData || []

        // Для каждой категории получаем статистику
        const categoriesWithStats = await Promise.all(
          categories.map(async (category) => {
            try {
              // Получаем количество тем в категории
              const { count: topicsCount } = await supabase
                .from("forum_topics")
                .select("*", { count: "exact", head: true })
                .eq("category_id", category.id)
                .eq("status", "active")

              // Получаем количество постов в категории
              const { data: topicIds } = await supabase
                .from("forum_topics")
                .select("id")
                .eq("category_id", category.id)
                .eq("status", "active")

              let postsCount = 0
              if (topicIds && topicIds.length > 0) {
                const { count } = await supabase
                  .from("forum_posts")
                  .select("*", { count: "exact", head: true })
                  .in(
                    "topic_id",
                    topicIds.map((t) => t.id),
                  )
                  .eq("status", "active")
                postsCount = count || 0
              }

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
                posts: postsCount,
                lastPost,
              }
            } catch (statError) {
              console.log("Error getting category stats:", statError)
              return {
                ...category,
                topics: 0,
                posts: 0,
                lastPost: null,
              }
            }
          }),
        )

        categories = categoriesWithStats
      }
    } catch (dbError) {
      console.log("Database error, using default categories:", dbError)
      categories = getDefaultCategories()
    }

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Error in forum categories API:", error)
    return NextResponse.json({
      categories: getDefaultCategories(),
    })
  }
}

function getDefaultCategories() {
  return [
    {
      id: 1,
      name: "Общие вопросы",
      description: "Общие вопросы о работе охранных компаний",
      icon: "Shield",
      color: "bg-blue-100 text-blue-700",
      topics: 0,
      posts: 0,
      lastPost: null,
    },
    {
      id: 2,
      name: "Отзывы и рекомендации",
      description: "Делитесь опытом работы с охранными компаниями",
      icon: "ThumbsUp",
      color: "bg-green-100 text-green-700",
      topics: 0,
      posts: 0,
      lastPost: null,
    },
    {
      id: 3,
      name: "Правовые вопросы",
      description: "Юридические аспекты охранной деятельности",
      icon: "Filter",
      color: "bg-purple-100 text-purple-700",
      topics: 0,
      posts: 0,
      lastPost: null,
    },
    {
      id: 4,
      name: "Технические средства",
      description: "Обсуждение охранного оборудования и технологий",
      icon: "Bell",
      color: "bg-orange-100 text-orange-700",
      topics: 0,
      posts: 0,
      lastPost: null,
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
        color: color || "bg-blue-100 text-blue-700",
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
