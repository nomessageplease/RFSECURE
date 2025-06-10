"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { UserRoleSwitcher } from "@/components/user-role-switcher"

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Каталог", href: "/catalog" },
  { name: "Вакансии", href: "/jobs" },
  { name: "Новости", href: "/news" },
  { name: "Форум", href: "/forum" },
]

export default function Header() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">RFSECURE</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск..."
                className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-2">
            <UserRoleSwitcher />
            {user ? (
              <>
                <Button variant="ghost" size="icon" aria-label="Уведомления">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Профиль">
                  <User className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/auth/login">Войти</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
