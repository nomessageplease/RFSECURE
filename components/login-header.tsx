"use client"

interface LoginHeaderProps {
  role?: string
}

export default function LoginHeader({ role = "Гость" }: LoginHeaderProps) {
  const getTitleContent = () => {
    return (
      <>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Вход в систему</h1>
        <p className="text-lg text-gray-600">
          Войдите в свой аккаунт, чтобы получить полный доступ ко всем возможностям платформы RusGuard
        </p>
      </>
    )
  }

  return <div className="text-center">{getTitleContent()}</div>
}
