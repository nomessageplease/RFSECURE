import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  console.log("Middleware: Обработка запроса:", request.nextUrl.pathname)

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: any) {
            request.cookies.set({
              name,
              value: "",
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: "",
              ...options,
            })
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log("Middleware: Пользователь:", user?.id || "не авторизован")

    // Защищенные маршруты, требующие авторизации
    const protectedRoutes = ["/profile", "/admin", "/jobs/create", "/reviews/create", "/complaints/create"]

    // Маршруты только для админов и модераторов
    const adminRoutes = ["/admin"]

    // Проверяем, требует ли маршрут авторизации
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

    // Если маршрут защищен и пользователь не авторизован
    if (isProtectedRoute && !user) {
      console.log("Middleware: Перенаправление на страницу входа")
      const redirectUrl = new URL("/auth/sign-in", request.url)
      redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Проверяем доступ к админ-панели
    if (adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && user) {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (!profile || !["admin", "moderator"].includes(profile.role)) {
        console.log("Middleware: Нет доступа к админ-панели")
        return NextResponse.redirect(new URL("/", request.url))
      }
    }

    return response
  } catch (error) {
    console.error("Middleware: Ошибка:", error)
    // В случае ошибки, продолжаем без проверки авторизации
    return response
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
