import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    let query = supabase.from("news").select("*").order("created_at", { ascending: false })

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (status) {
      query = query.eq("status", status)
    }

    if (featured === "true") {
      query = query.eq("featured", true)
    }

    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    if (offset) {
      query = query.range(Number.parseInt(offset), Number.parseInt(offset) + (Number.parseInt(limit) || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching news:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Проверяем права доступа
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Создаем slug из заголовка
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-zа-я0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    const newsData = {
      ...body,
      slug: `${slug}-${Date.now()}`,
      author_id: user.id,
      published_at: body.status === "published" ? new Date().toISOString() : null,
    }

    const { data, error } = await supabase.from("news").insert(newsData).select().single()

    if (error) {
      console.error("Error creating news:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
