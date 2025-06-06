import { TestRegistration } from "@/components/auth/test-registration"

export default function TestAuthPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Тестирование системы аутентификации</h1>
        <TestRegistration />
      </div>
    </div>
  )
}
