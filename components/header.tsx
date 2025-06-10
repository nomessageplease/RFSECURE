"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Shield, Menu, X, User, LogOut, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRoleSwitcher } from "@/components/user-role-switcher"
import { useAuth } from "@/hooks/use-auth"

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Организации", href: "/chops" },
  { name: "Вакансии", href: "/jobs" },
  { name: "Форум", href: "/forum" },
  { name: "Новости", href: "/news" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile, signOut, loading } = useAuth()
  const [displayName, setDisplayName] = useState<string>("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (profile?.full_name) {
      setDisplayName(profile.full_name)
    } else if (user?.email && !displayName) {
      setDisplayName(user.email.split("@")[0])
    }
  }, [profile?.full_name, user?.email, displayName])

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleAdminPanelClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push("/admin")
  }

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push("/profile")
  }

  const handleNotificationsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push("/notifications")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Охрана РФ</span>
              <p className="text-xs text-gray-500 leading-none">Модульная платформа</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Role Switcher */}
            <UserRoleSwitcher />

            {/* Auth Section */}
            {mounted && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative" onClick={handleNotificationsClick}>
                      <Bell className="h-4 w-4" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                        3
                      </Badge>
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="hidden sm:inline">{displayName || "Пользователь"}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                          <p className="text-sm font-medium">{displayName || "Пользователь"}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                          {profile?.role && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              {profile.role === "admin"
                                ? "Администратор"
                                : profile.role === "moderator"
                                  ? "Модератор"
                                  : profile.role === "chop"
                                    ? "ЧОП"
                                    : "Охранник"}
                            </Badge>
                          )}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleProfileClick}>
                          <User className="h-4 w-4 mr-2" />
                          Личный кабинет
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleNotificationsClick}>
                          <Bell className="h-4 w-4 mr-2" />
                          Уведомления
                        </DropdownMenuItem>
                        {profile?.role === "admin" && (
                          <DropdownMenuItem onClick={handleAdminPanelClick}>
                            <Settings className="h-4 w-4 mr-2" />
                            Админ-панель
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                          <LogOut className="h-4 w-4 mr-2" />
                          Выйти
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/auth/sign-in">
                      <Button variant="ghost" size="sm">
                        Войти
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Регистрация
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
