import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

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
    const { content } = body

    // Получаем текущее сообщение для проверки прав
    const { data: currentPost } = await supabase.from("forum_posts").select("author_id").eq("id", params.id).single()

    if (!currentPost) {
      return NextResponse.json({ error: "Сообщение не найдено" }, { status: 404 })
    }

    // Получаем профиль пользователя
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    // Проверяем права: автор может редактировать свое сообщение, модераторы - любое
    const isAuthor = currentPost.author_id === user.id
    const isModerator = profile && ["admin", "moderator"].includes(profile.role)

    if (!isAuthor && !isModerator) {
      return NextResponse.json({ error: "Недостаточно прав" }, { status: 403 })
    }

    const { data: post, error } = await supabase
      .from("forum_posts")
      .update({
        content,
        is_edited: true,
        edited_at: new Date().toISOString(),
        edited_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
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

    const { error } = await supabase.from("forum_posts").delete().eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
