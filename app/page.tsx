"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MainPage from "@/components/pages/main-page"
import OrganizationsPage from "@/components/pages/organizations-page"
import VacanciesPage from "@/components/pages/vacancies-page"
import ForumPage from "@/components/pages/forum-page"
import NewsPage from "@/components/pages/news-page"
import LoginPage from "@/components/pages/login-page"
import RegisterPage from "@/components/pages/register-page"
import NotificationsPage from "@/components/pages/notifications-page"
import ProfilePage from "@/components/pages/profile-page"
import RoleSwitcher from "@/components/role-switcher"

export default function Page() {
  const [currentPage, setCurrentPage] = useState("main")

  useEffect(() => {
    const handlePageChange = (event: CustomEvent) => {
      setCurrentPage(event.detail.page)
    }

    window.addEventListener("pageChanged", handlePageChange as EventListener)
    return () => window.removeEventListener("pageChanged", handlePageChange as EventListener)
  }, [])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "main":
        return <MainPage />
      case "organizations":
        return <OrganizationsPage />
      case "vacancies":
        return <VacanciesPage />
      case "forum":
        return <ForumPage />
      case "news":
        return <NewsPage />
      case "login":
        return <LoginPage />
      case "register":
        return <RegisterPage />
      case "notifications":
        return <NotificationsPage />
      case "profile":
        return <ProfilePage />
      default:
        return <MainPage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {renderCurrentPage()}
      <Footer />
      <RoleSwitcher />
    </div>
  )
}
