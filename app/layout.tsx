import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserRoleProvider } from "@/hooks/use-user-role"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "RFSECURE - Платформа для поиска и управления охранными услугами",
  description: "Найдите надежную охрану для вашего бизнеса или мероприятия",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <UserRoleProvider>{children}</UserRoleProvider>
      </body>
    </html>
  )
}
