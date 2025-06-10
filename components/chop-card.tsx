"use client"

import { Star, MapPin, Users, Phone, Award, Clock, Briefcase, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { AuthRequiredOverlay } from "@/components/auth-guard"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

export interface ChopCardProps {
  id: number
  name: string
  rating: number
  reviewCount: number
  location: string
  verified: boolean
  logo: string
  specialization: string[]
  employees: number
  experience: number
  activeJobs: number
  recentReview: string
  phone: string
  email: string
  description: string
  price: string
}

export function ChopCard({
  id,
  name,
  rating,
  reviewCount,
  location,
  verified,
  logo,
  specialization,
  employees,
  experience,
  activeJobs,
  recentReview,
  phone,
  email,
  description,
  price,
}: ChopCardProps) {
  const { user } = useAuth()

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={logo}
              alt={`Логотип ${name}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{name}</h3>
              {verified && (
                <CheckCircle className="h-4 w-4 text-primary" aria-label="Верифицирован" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-current" />
              <span>{rating.toFixed(1)}</span>
              <span>•</span>
              <span>{reviewCount} отзывов</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            {specialization.map((spec) => (
              <span
                key={spec}
                className="rounded-full bg-secondary px-2 py-1 text-xs"
              >
                {spec}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{employees} сотрудников</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{experience} лет опыта</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>{activeJobs} вакансий</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium">{price}</p>
          <p className="mt-1 text-sm text-muted-foreground">{recentReview}</p>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/50 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">{phone}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <Button variant="outline" size="sm">
            Подробнее
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
