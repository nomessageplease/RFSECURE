"use client"

interface RegisterHeaderProps {
  role?: string
}

export default function RegisterHeader({ role = "Гость" }: RegisterHeaderProps) {
  const getTitleContent = () => {
    return (
      <>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Регистрация на RusGuard</h1>
        <p className="text-lg text-gray-600">
          Присоединяйтесь к крупнейшему сообществу профессионалов охранной отрасли России
        </p>
      </>
    )
  }

  return <div className="text-center">{getTitleContent()}</div>
}
