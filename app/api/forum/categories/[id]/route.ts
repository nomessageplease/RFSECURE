import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
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
      .update({
        name,
        description,
        icon,
        color,
        sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
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

    // Проверяем, есть ли темы в этой категории
    const { data: topics } = await supabase
      .from("forum_topics")
      .select("id")
      .eq("category_id", params.id)
      .limit(1)

    if (topics && topics.length > 0) {
      return NextResponse.json({ error: "Нельзя удалить категорию с существующими темами" }, { status: 400 })
    }

    const { error } = await supabase.from("forum_categories").delete().eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
