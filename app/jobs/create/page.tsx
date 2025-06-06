"use client"

import { useAuth } from "@/hooks/use-auth"
import { CreateJobForm } from "@/components/jobs/create-job-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/header"

export default function CreateJobPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !profile || !["chop", "admin"].includes(profile.role))) {
      router.push("/auth/sign-in")
    }
  }, [user, profile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Загрузка...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !profile || !["chop", "admin"].includes(profile.role)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Создание вакансии</h1>
          <p className="text-gray-600 mt-1">Заполните информацию о вакансии для публикации</p>
        </div>

        <CreateJobForm onSuccess={() => router.push("/jobs")} onCancel={() => router.push("/jobs")} />
      </div>
    </div>
  )
}
