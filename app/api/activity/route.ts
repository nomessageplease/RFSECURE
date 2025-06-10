import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Временная заглушка для активности
    const mockActivity = [
      {
        id: 1,
        type: "review",
        title: "Новый отзыв о компании Авангард",
        time: "2 мин назад",
        icon: "MessageSquare",
        color: "text-blue-600",
      },
      {
        id: 2,
        type: "job",
        title: "Добавлена вакансия охранника в ТЦ",
        time: "15 мин назад",
        icon: "Briefcase",
        color: "text-green-600",
      },
    ]

    return NextResponse.json({ data: mockActivity })
  } catch (error) {
    console.error("Activity API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
