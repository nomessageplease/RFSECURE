import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Увеличиваем счетчик просмотров
    await supabase.rpc("increment_topic_views", { topic_uuid: params.id })

    // Получаем тему с категорией
    const { data: topic, error: topicError } = await supabase
      .from("forum_topics")
      .select(`
        *,
        forum_categories!inner(name, color, icon)
      `)
      .eq("id", params.id)
      .single()

    if (topicError) {
      return NextResponse.json({ error: topicError.message }, { status: 500 })
    }

    if (!topic) {
      return NextResponse.json({ error: "Тема не найдена" }, { status: 404 })
    }

    // Получаем сообщения темы
    const { data: posts, error: postsError } = await supabase
      .from("forum_posts")
      .select("*")
      .eq("topic_id", params.id)
      .eq("status", "active")
      .order("created_at", { ascending: true })

    if (postsError) {
      return NextResponse.json({ error: postsError.message }, { status: 500 })
    }

    return NextResponse.json({ topic, posts: posts || [] })
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, category_id, is_pinned, is_locked, status } = body

    // Получаем текущую тему для проверки прав
    const { data: currentTopic } = await supabase.from("forum_topics").select("author_id").eq("id", params.id).single()

    if (!currentTopic) {
      return NextResponse.json({ error: "Тема не найдена" }, { status: 404 })
    }

    // Получаем профиль пользователя
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    // Проверяем права: автор может редактировать содержимое, модераторы - все
    const isAuthor = currentTopic.author_id === user.id
    const isModerator = profile && ["admin", "moderator"].includes(profile.role)

    if (!isAuthor && !isModerator) {
      return NextResponse.json({ error: "Недостаточно прав" }, { status: 403 })
    }

    // Формируем объект обновления
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    // Автор может редактировать только содержимое
    if (isAuthor) {
      if (title) updateData.title = title
      if (content) updateData.content = content
    }

    // Модераторы могут редактировать все
    if (isModerator) {
      if (title) updateData.title = title
      if (content) updateData.content = content
      if (category_id) updateData.category_id = category_id
      if (typeof is_pinned === "boolean") updateData.is_pinned = is_pinned
      if (typeof is_locked === "boolean") updateData.is_locked = is_locked
      if (status) updateData.status = status
    }

    const { data: topic, error } = await supabase
      .from("forum_topics")
      .update(updateData)
      .eq("id", params.id)
      .select(`
        *,
        forum_categories!inner(name, color)
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ topic })
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { error } = await supabase.from("forum_topics").delete().eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
