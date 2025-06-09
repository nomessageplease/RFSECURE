import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 })
    }

    // Проверка типа файла
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Можно загружать только изображения" }, { status: 400 })
    }

    // Проверка размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Размер файла не должен превышать 5MB" }, { status: 400 })
    }

    // Генерируем уникальное имя файла
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`

    // Загружаем файл в Vercel Blob
    const blob = await put(`chops/logos/${fileName}`, file, {
      access: "public",
    })

    // Возвращаем URL загруженного файла
    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Ошибка загрузки файла:", error)
    return NextResponse.json({ error: "Ошибка загрузки файла" }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
