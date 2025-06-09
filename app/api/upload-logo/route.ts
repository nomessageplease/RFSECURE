import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    console.log("API: Начало загрузки логотипа")

    // Проверяем аутентификацию
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.error("API: Пользователь не авторизован")
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
    }

    console.log("API: Пользователь авторизован:", user.id)

    // Получаем файл из запроса
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("API: Файл не найден в запросе")
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 })
    }

    console.log("API: Получен файл:", file.name, file.size, file.type)

    // Проверка типа файла
    if (!file.type.startsWith("image/")) {
      console.error("API: Неверный тип файла:", file.type)
      return NextResponse.json({ error: "Можно загружать только изображения" }, { status: 400 })
    }

    // Проверка размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error("API: Файл слишком большой:", file.size)
      return NextResponse.json({ error: "Размер файла не должен превышать 5MB" }, { status: 400 })
    }

    // Генерируем уникальное имя файла
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
    console.log("API: Сгенерировано имя файла:", fileName)

    // Загружаем файл в Vercel Blob
    console.log("API: Загрузка в Vercel Blob...")
    const blob = await put(`chops/logos/${fileName}`, file, {
      access: "public",
    })

    console.log("API: Файл успешно загружен:", blob.url)

    // Возвращаем URL загруженного файла
    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("API: Ошибка загрузки файла:", error)
    return NextResponse.json({ error: "Ошибка загрузки файла" }, { status: 500 })
  }
}
