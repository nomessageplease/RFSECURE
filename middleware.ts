import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Защищаем админские страницы
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/auth/sign-in"
      redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Проверяем роль пользователя для админских страниц
    try {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (!profile || !["admin", "moderator"].includes(profile.role)) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = "/"
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error("Ошибка проверки роли:", error)
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/"
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Перенаправляем авторизованных пользователей с auth страниц только если они пытаются зайти на них напрямую
  // НЕ перенаправляем если пользователь уже на главной странице
  if (user && request.nextUrl.pathname.startsWith("/auth") && request.nextUrl.pathname !== "/") {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/"
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
