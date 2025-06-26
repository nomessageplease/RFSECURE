"use client"

import { useLeaderboardData } from "@/hooks/use-leaderboard-data"
import { useLeaderboardConfig } from "@/hooks/use-leaderboard-config"
import LeaderboardFilters from "./leaderboard-filters"
import OrganizationCard from "./organization-card"
import ForumUserCard from "./forum-user-card"

interface LeaderboardProps {
  type: "organizations" | "forum"
  role?: string
}

export default function Leaderboard({ type, role = "Гость" }: LeaderboardProps) {
  const { selectedFilter, sortedData, handleFilterChange, handleProfileClick, getCurrentRating } = useLeaderboardData(
    type,
    role,
  )

  const { availableFilters, getRoleColor, getRoleShort } = useLeaderboardConfig(type, role)

  return (
    <div className="space-y-3 overflow-visible">
      {/* Меню фильтров */}
      <LeaderboardFilters
        filters={availableFilters}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        role={role}
        type={type}
      />

      {/* Лента карточек */}
      <div className="p-8 overflow-visible">
        <div className="overflow-x-auto overflow-y-visible">
          <div className="flex gap-6 pb-4 pt-4" style={{ width: "max-content" }}>
            {type === "organizations"
              ? sortedData.map((chop: any) => (
                  <OrganizationCard
                    key={chop.id}
                    chop={chop}
                    currentRating={getCurrentRating(chop)}
                    role={role}
                    onClick={handleProfileClick}
                  />
                ))
              : sortedData.map((user: any) => (
                  <ForumUserCard
                    key={user.id}
                    user={user}
                    getRoleColor={getRoleColor}
                    getRoleShort={getRoleShort}
                    onClick={handleProfileClick}
                  />
                ))}

            {/* Кнопка регистрации для гостей */}
            {role === "Гость" && (
              <div className="text-center p-4 bg-gray-50 rounded-lg flex-shrink-0 w-80">
                <p className="text-sm text-gray-600 mb-2">
                  {type === "organizations"
                    ? "Зарегистрируйтесь для доступа к расширенным параметрам рейтинга"
                    : "Зарегистрируйтесь, чтобы участвовать в рейтинге форума"}
                </p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Зарегистрироваться →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
