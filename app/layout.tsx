import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserRoleProvider } from "@/components/user-role-switcher"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import SupabaseConfigWarning from "@/components/supabase-config-warning"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Чопы РФ - Рейтинг охранных компаний",
  description: "Платформа для оценки и выбора охранных компаний в России",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserRoleProvider>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <SupabaseConfigWarning />
                {children}
              </main>
            </div>
            <Toaster />
          </UserRoleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
