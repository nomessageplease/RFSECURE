import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("category_id")
    const status = searchParams.get("status") || "active"
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("forum_topics")
      .select(`
        *,
        forum_categories!inner(name, color)
      `)
      .eq("status", status)
      .order("is_pinned", { ascending: false })
      .order("last_reply_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (categoryId) {
      query = query.eq("category_id", categoryId)
    }

    const { data: topics, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ topics })
  } catch (error) {
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
    const { category_id, title, content } = body

    // Определяем статус темы (модерация для обычных пользователей)
    const status = ["admin", "moderator"].includes(profile.role) ? "active" : "pending"

    const { data: topic, error } = await supabase
      .from("forum_topics")
      .insert({
        category_id,
        title,
        content,
        author_id: user.id,
        author_name: profile.full_name || user.email?.split("@")[0] || "Пользователь",
        status,
      })
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
