"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LogIn, UserPlus, Lock } from "lucide-react"
import Link from "next/link"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  requireAuth?: boolean
  action?: string
  showModal?: boolean
}

export function AuthGuard({
  children,
  fallback,
  requireAuth = true,
  action = "выполнить это действие",
  showModal = true,
}: AuthGuardProps) {
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (!requireAuth || user) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  const handleAuthRequired = () => {
    if (showModal) {
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <div onClick={handleAuthRequired} className="cursor-pointer">
        {children}
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-500" />
              Требуется авторизация
            </DialogTitle>
            <DialogDescription>Чтобы {action}, необходимо войти в систему или зарегистрироваться.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            <Link href="/auth/sign-in" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <LogIn className="h-4 w-4 mr-2" />
                Войти в систему
              </Button>
            </Link>

            <Link href="/auth/sign-up" className="w-full">
              <Button variant="outline" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Создать аккаунт
              </Button>
            </Link>

            <div className="text-center text-sm text-gray-500 mt-2">Регистрация займет всего минуту</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Компонент для блокировки контента
export function AuthRequiredOverlay({
  children,
  action = "просмотреть полную информацию",
}: {
  children: React.ReactNode
  action?: string
}) {
  const { user } = useAuth()

  if (user) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      <div className="filter blur-sm pointer-events-none">{children}</div>
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg border max-w-sm">
          <Lock className="h-8 w-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Войдите, чтобы {action}</h3>
          <p className="text-sm text-gray-600 mb-4">Зарегистрируйтесь или войдите для доступа к полной информации</p>
          <div className="flex gap-2">
            <Link href="/auth/sign-in" className="flex-1">
              <Button size="sm" className="w-full">
                Войти
              </Button>
            </Link>
            <Link href="/auth/sign-up" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Регистрация
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
