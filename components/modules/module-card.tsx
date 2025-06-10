import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface ModuleCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
  stats: string
  featured: boolean
  submodules: string[]
}

export function ModuleCard({
  title,
  description,
  icon: Icon,
  href,
  color,
  stats,
  submodules,
}: ModuleCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`rounded-lg p-3 ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
              <div className="flex flex-wrap gap-2">
                {submodules.map((submodule) => (
                  <span
                    key={submodule}
                    className="rounded-full bg-secondary px-2 py-1 text-xs"
                  >
                    {submodule}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-primary">{stats}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 