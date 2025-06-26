"use client"
import HeroTitle from "@/components/hero-title"
import HeroQuickButtons from "@/components/hero-quick-buttons"

interface HeroSectionProps {
  role?: string
}

export default function HeroSection({ role = "Гость" }: HeroSectionProps) {
  return (
    <section className="relative py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Основной контент в две колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая часть - заголовок (2 колонки) */}
          <div className="lg:col-span-2">
            <HeroTitle role={role} />

            {/* Статистика под заголовком */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Организаций</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">3,891</div>
                <div className="text-sm text-gray-600">Вакансий</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">15,632</div>
                <div className="text-sm text-gray-600">Пользователей</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">28,459</div>
                <div className="text-sm text-gray-600">Сообщений</div>
              </div>
            </div>
          </div>

          {/* Правая часть - преимущества (1 колонка) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Почему RusGuard?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Проверенные ЧОПы</h4>
                    <p className="text-xs text-gray-600">Только лицензированные организации</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">💼</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Работа мечты</h4>
                    <p className="text-xs text-gray-600">Тысячи актуальных вакансий</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">👥</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Сообщество</h4>
                    <p className="text-xs text-gray-600">Общение с профессионалами</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">🔒</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Безопасность данных</h4>
                    <p className="text-xs text-gray-600">Надежная защита информации</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Быстрые действия под основным контентом */}
        <div className="mt-12">
          <div className="max-w-6xl mx-auto">
            <HeroQuickButtons role={role} />
          </div>
        </div>
      </div>
    </section>
  )
}
