"use client"

import { useUserRole } from "@/components/user-role-switcher"
import Header from "@/components/header"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCompaniesSection } from "@/components/home/featured-companies-section"
import { ActivitySection } from "@/components/home/activity-section"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  const { userRole } = useUserRole()

  return (
    <>
      <Header />
      <main role="main" className="flex-1">
        <HeroSection userRole={userRole} />
        <FeaturedCompaniesSection />
        <ActivitySection />
      </main>
      <Footer />
    </>
  )
}
