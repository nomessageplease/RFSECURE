"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Menu, X, Shield, User, LogOut, Settings, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"

export default function Header() {
  const { user, profile, loading, initialized, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [displayName, setDisplayName] = useState<string>("")

  // Стабилизируем отображаемое имя
  useEffect(() => {
    if (initialized && user && profile) {
      if (profile.full_name && profile.full_name !== "Пользователь") {
        setDisplayName(profile.full_name)
      } else if (user.email) {
        const emailName = user.email.split("@")[0]
        setDisplayName(emailName.charAt(0).toUpperCase() + emailName.slice(1))
      } else {
        setDisplayName("Пользователь")
      }
    }
  }, [user, profile, initialized])

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/"
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") {
      return false
    }
    return pathname?.startsWith(path)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getAvatarFallback = () => {
    if (displayName) {
      return getInitials(displayName)
    }
    return "У" // Пользователь
  }

  const navItems = [
    { name: "Главная", path: "/" },
    { name: "Организации", path: "/chops" },
    { name: "Вакансии", path: "/jobs" },
    { name: "Форум", path: "/forum" },
    { name: "Новости", path: "/news" },
  ]

  // Показываем загрузку только если не инициализировано
  const showLoading = !initialized || (loading && !user && !profile)
  // Показываем авторизованное состояние если есть пользователь ИЛИ если есть displayName
  const showAuthorized = initialized && user && (profile || displayName)
  // Показываем неавторизованное состояние только если точно не авторизован
  const showUnauthorized = initialized && !user && !loading

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Перейти на главную страницу">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <span className="font-bold text-lg">Охрана РФ</span>
              <span className="text-xs text-gray-500 block -mt-1">Модульная платформа</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Основная навигация">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                }`}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {showAuthorized ? (
            <>
              <Button variant="ghost" size="icon" className="relative" aria-label="Уведомления (3 новых)">
                <Bell className="h-5 w-5" aria-hidden="true" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
                <span className="sr-only">У вас 3 новых уведомления</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                    aria-label={`Меню пользователя ${displayName || "Пользователь"}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium">{displayName || "Пользователь"}</div>
                      {profile?.role && <RoleBadge role={profile.role} className="text-xs" />}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Профиль</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/notifications">
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Уведомления</span>
                      <Badge className="ml-auto bg-red-500 text-white text-xs" aria-label="3 новых уведомления">
                        3
                      </Badge>
                    </DropdownMenuItem>
                  </Link>
                  {profile?.role === "admin" && (
                    <Link href="/admin/dashboard">
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" aria-hidden="true" />
                        <span>Админ-панель</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <Link href="/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Настройки</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : showUnauthorized ? (
            <>
              <Link href="/auth/sign-in">
                <Button variant="ghost">Войти</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Регистрация</Button>
              </Link>
            </>
          ) : showLoading ? (
            <div className="flex items-center gap-2" aria-label="Загрузка данных пользователя">
              <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" aria-hidden="true"></div>
              <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" aria-hidden="true"></div>
            </div>
          ) : null}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть мобильное меню" : "Открыть мобильное меню"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t" id="mobile-menu">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col gap-2" role="navigation" aria-label="Мобильная навигация">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
