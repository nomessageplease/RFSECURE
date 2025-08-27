export default function NotificationsPage() {
  return (
    <main className="flex-1">
      {/* Шапка страницы уведомлений - полная ширина */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900">Шапка страницы уведомлений</h2>
        </div>
      </section>

      {/* Список уведомлений - центральная колонка */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900">Список уведомлений</h2>
        </div>
      </section>
    </main>
  )
}
