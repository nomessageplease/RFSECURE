import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

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

    const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Профиль не найден" }, { status: 404 })
    }

    const body = await request.json()
    const { topic_id, content } = body

    // Проверяем, что тема существует и не заблокирована
    const { data: topic } = await supabase.from("forum_topics").select("is_locked, status").eq("id", topic_id).single()

    if (!topic) {
      return NextResponse.json({ error: "Тема не найдена" }, { status: 404 })
    }

    if (topic.is_locked && !["admin", "moderator"].includes(profile.role)) {
      return NextResponse.json({ error: "Тема заблокирована" }, { status: 403 })
    }

    // Определяем статус сообщения
    const status = ["admin", "moderator"].includes(profile.role) ? "active" : "pending"

    const { data: post, error } = await supabase
      .from("forum_posts")
      .insert({
        topic_id,
        content,
        author_id: user.id,
        author_name: profile.full_name || user.email?.split("@")[0] || "Пользователь",
        status,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
