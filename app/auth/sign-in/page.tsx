import { SignInForm } from "@/components/auth/sign-in-form"
import { DebugAuth } from "@/components/auth/debug-auth"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <SignInForm />
        <DebugAuth />
        <div className="text-center">
          <p className="text-gray-600">
            Нет аккаунта?{" "}
            <Link href="/auth/sign-up" className="text-blue-600 hover:text-blue-800 font-medium">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
