"use client"

import { Star, MapPin, Users, Phone, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { AuthRequiredOverlay } from "@/components/auth-guard"
import { useAuth } from "@/hooks/use-auth"

export interface ChopCardProps {
  chop: {
    id: number
    name: string
    rating: number
    reviewCount: number
    location: string
    verified: boolean
    logo: string
    specialization: string[]
    employees: number
    experience?: number
    activeJobs?: number
    recentReview?: string
    phone: string
    email: string
    description: string
    price: string
  }
  viewMode?: "grid" | "list"
  showRank?: boolean
}

export function ChopCard({ chop, viewMode = "grid", showRank = false }: ChopCardProps) {
  const { user } = useAuth()

  if (viewMode === "grid") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Header - фиксированной высоты */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 h-32 flex items-center relative">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white/50">
                <AvatarImage src={chop.logo || "/placeholder.svg"} alt={chop.name} />
                <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                  {chop.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-white leading-tight line-clamp-2">{chop.name}</h3>
                <div className="flex items-center gap-2 text-sm text-white/90 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{chop.location}</span>
                </div>
              </div>
            </div>
            {showRank && (
              <Badge className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 border-0 text-xs">
                <Award className="h-3 w-3 mr-1" />
                №1
              </Badge>
            )}
            {chop.verified && !showRank && (
              <Badge className="absolute top-3 right-3 bg-green-100 text-green-800 border-0 text-xs">
                <Award className="h-3 w-3 mr-1" />
                Проверена
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Rating */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(chop.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">{chop.rating}</span>
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Отзывов: </span>
                {chop.reviewCount}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{chop.employees} сотр.</span>
              </div>
              <div className="flex items-center gap-1">
                {chop.verified && <Badge className="bg-green-100 text-green-800 border-0 text-xs">Проверена</Badge>}
              </div>
            </div>

            {/* Specialization */}
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">Специализация</div>
              <div className="flex flex-wrap gap-2">
                {chop.specialization.slice(0, 3).map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
                {chop.specialization.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{chop.specialization.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            {/* Contact Info - Protected for non-authenticated users */}
            {user ? (
              <div className="text-sm text-gray-600 space-y-1 mt-auto">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{chop.phone}</span>
                </div>
                <div className="text-gray-500">{chop.email}</div>
              </div>
            ) : (
              <AuthRequiredOverlay action="увидеть контактную информацию" className="mt-auto">
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+7 (***) ***-**-**</span>
                  </div>
                  <div className="text-gray-500">***@***.ru</div>
                </div>
              </AuthRequiredOverlay>
            )}

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t mt-4">
              <div>
                <div className="text-lg font-semibold text-gray-900">{chop.price}</div>
                <div className="text-xs text-gray-500">за охрану объекта</div>
              </div>
              <Link href={`/chop/${chop.id}`}>
                <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                  Подробнее
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // List View
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white cursor-pointer w-full">
      <CardContent className="p-0">
        <div className="flex items-center gap-6 p-6">
          <Avatar className="h-20 w-20 border-2 border-gray-200 flex-shrink-0">
            <AvatarImage src={chop.logo || "/placeholder.svg"} alt={chop.name} />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
              {chop.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-xl text-gray-900 group-hover:text-gray-700 transition-colors">
                    {chop.name}
                  </h3>
                  {chop.verified && (
                    <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      Проверена
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(chop.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{chop.rating}</span>
                    <span className="text-gray-500">({chop.reviewCount} отзывов)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{chop.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold text-gray-900 mb-1">{chop.price}</div>
                <div className="text-sm text-gray-500">за охрану объекта</div>
              </div>
            </div>

            <p className="text-gray-600 mb-3 leading-relaxed">{chop.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                {chop.experience && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{chop.experience} лет опыта</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{chop.employees} сотрудников</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {chop.specialization.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {user ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{chop.phone}</span>
                  </div>
                ) : (
                  <AuthRequiredOverlay action="увидеть контакты">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>+7 (***) ***-**-**</span>
                    </div>
                  </AuthRequiredOverlay>
                )}
                <Link href={`/chop/${chop.id}`}>
                  <Button className="bg-gray-900 hover:bg-gray-800">Подробнее</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
