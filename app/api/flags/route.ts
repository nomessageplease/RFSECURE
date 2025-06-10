import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Временная заглушка для флагов
    return NextResponse.json({ data: [] })
  } catch (error) {
    console.error("Flags API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
