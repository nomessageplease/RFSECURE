import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserRoleProvider } from "@/components/user-role-switcher"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Охрана РФ - Модульная платформа",
  description: "Единая экосистема охранной отрасли России",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <UserRoleProvider>
          <div className="min-h-screen flex flex-col">{children}</div>
        </UserRoleProvider>
      </body>
    </html>
  )
}
