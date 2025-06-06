import { SignUpForm } from "@/components/auth/sign-up-form"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpForm />
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Уже есть аккаунт?{" "}
            <Link href="/auth/sign-in" className="text-blue-600 hover:text-blue-800 font-medium">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
