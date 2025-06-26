import NotificationsTitle from "../notifications-title"
import NotificationsList from "../notifications-list"

interface NotificationsPageProps {
  role?: string
}

export default function NotificationsPage({ role = "Гость" }: NotificationsPageProps) {
  return (
    <main className="flex-1">
      {/* Шапка страницы уведомлений - полная ширина */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-gray-300 rounded-lg p-6">
            <NotificationsTitle role={role} />
          </div>
        </div>
      </section>

      {/* Список уведомлений - центральная колонка */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <NotificationsList role={role} />
        </div>
      </section>
    </main>
  )
}
