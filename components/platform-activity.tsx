"use client"

interface ActivityItem {
  id: number
  name: string
  action: string
  date: string
  timeAgo: string
}

export default function PlatformActivity() {
  // Создаем массив из 10 последних действий
  const activities: ActivityItem[] = [
    {
      id: 1,
      name: "Иван Петров",
      action: "создал новую тему на форуме",
      date: "2025-06-11 16:45",
      timeAgo: "15 минут назад",
    },
    {
      id: 2,
      name: "ЧОП Безопасность",
      action: "разместил новую вакансию",
      date: "2025-06-11 16:30",
      timeAgo: "30 минут назад",
    },
    {
      id: 3,
      name: "Мария Сидорова",
      action: "оставила отзыв о компании",
      date: "2025-06-11 16:15",
      timeAgo: "45 минут назад",
    },
    {
      id: 4,
      name: "Алексей Козлов",
      action: "ответил в теме форума",
      date: "2025-06-11 16:00",
      timeAgo: "1 час назад",
    },
    {
      id: 5,
      name: "ЧОП Охрана Плюс",
      action: "обновил профиль организации",
      date: "2025-06-11 15:45",
      timeAgo: "1 час 15 минут назад",
    },
    {
      id: 6,
      name: "Дмитрий Волков",
      action: "подал заявку на вакансию",
      date: "2025-06-11 15:30",
      timeAgo: "1 час 30 минут назад",
    },
    {
      id: 7,
      name: "Елена Морозова",
      action: "создала новую тему на форуме",
      date: "2025-06-11 15:15",
      timeAgo: "1 час 45 минут назад",
    },
    {
      id: 8,
      name: "ЧОП Стражник",
      action: "разместил новую вакансию",
      date: "2025-06-11 15:00",
      timeAgo: "2 часа назад",
    },
    {
      id: 9,
      name: "Сергей Николаев",
      action: "оставил отзыв о компании",
      date: "2025-06-11 14:45",
      timeAgo: "2 часа 15 минут назад",
    },
    {
      id: 10,
      name: "Анна Федорова",
      action: "ответила в теме форума",
      date: "2025-06-11 14:30",
      timeAgo: "2 часа 30 минут назад",
    },
  ]

  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="inline-block w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 mr-3 rounded-full"></span>
        <span className="text-lg font-semibold text-gray-700">Активность</span>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border border-gray-100 bg-white shadow-sm"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">{activity.name}</span>
                <span className="text-gray-600">{activity.action}</span>
              </div>
              <div className="text-sm text-gray-500">{activity.date}</div>
            </div>
            <div className="text-sm text-blue-600 whitespace-nowrap ml-4 bg-blue-50 px-2 py-1 rounded-full">
              {activity.timeAgo}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
