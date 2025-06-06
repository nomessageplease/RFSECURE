"use client"

import type React from "react"
import Link from "next/link"
import { Shield, User, LogIn, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const Header: React.FC = () => {
  const { user, profile, signOut, loading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Решает проблему гидратации
  useEffect(() => {
    setMounted(true)
  }, [])

  // Закрываем мобильное меню при переходе на другую страницу
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Отладочная информация
  useEffect(() => {
    console.log("Header auth state:", { user: user?.email, profile: profile?.role, loading })
  }, [user, profile, loading])

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "guard":
        return "👤 Охранник"
      case "chop":
        return "🏢 ЧОП"
      case "moderator":
        return "🛡️ Модератор"
      case "admin":
        return "⚙️ Админ"
      default:
        return "👤 Пользователь"
    }
  }

  // Не рендерим ничего до монтирования компонента
  if (!mounted) {
    return (
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-7 w-7 text-gray-800" />
              <h1 className="text-xl font-bold text-gray-900">Охрана РФ</h1>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-gray-800" />
            <h1 className="text-xl font-bold text-gray-900">Охрана РФ</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-4 ml-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
              Главная
            </Link>
            <Link href="/chops" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
              Организации
            </Link>
            <Link href="/forum" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
              Форум
            </Link>
            <Link href="/jobs" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
              Вакансии
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
              Новости
            </Link>
            <Link href="/ratings" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
              Рейтинги
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {!mounted ? (
              // Показываем skeleton до полной загрузки
              <div className="flex items-center gap-3">
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : loading ? (
              // Показываем skeleton во время загрузки auth
              <div className="flex items-center gap-3">
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : user && profile ? (
              // Авторизованный пользователь
              <>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                  <span>{getRoleDisplayName(profile.role)}</span>
                  <span>•</span>
                  <span>{profile.full_name}</span>
                </div>
                <Link href="/profile" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
                  Личный кабинет
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log("Выход из системы")
                    signOut().then(() => {
                      console.log("Выход выполнен")
                      window.location.href = "/"
                    })
                  }}
                  className="text-gray-700"
                >
                  Выйти
                </Button>
              </>
            ) : (
              // Неавторизованный пользователь
              <>
                <Link href="/auth/sign-in">
                  <Button variant="outline" size="sm" className="text-gray-700">
                    <LogIn className="h-4 w-4 mr-2" />
                    Войти
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                    <User className="h-4 w-4 mr-2" />
                    Регистрация
                  </Button>
                </Link>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                Главная
              </Link>
              <Link href="/chops" className="text-gray-700 hover:text-gray-900 transition-colors">
                Организации
              </Link>
              <Link href="/forum" className="text-gray-700 hover:text-gray-900 transition-colors">
                Форум
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-gray-900 transition-colors">
                Вакансии
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-gray-900 transition-colors">
                Новости
              </Link>
              <Link href="/ratings" className="text-gray-700 hover:text-gray-900 transition-colors">
                Рейтинги
              </Link>
              {user && profile && (
                <div className="pt-2 border-t">
                  <div className="text-sm text-gray-600 mb-2">
                    {getRoleDisplayName(profile.role)} • {profile.full_name}
                  </div>
                  <Link href="/profile" className="text-gray-700 hover:text-gray-900 transition-colors block mb-2">
                    Личный кабинет
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
