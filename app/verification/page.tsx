"use client"

import { useState } from "react"
import {
  Shield,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Building2,
  Phone,
  Mail,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { UserRoleSwitcher } from "@/components/user-role-switcher"
import Header from "@/components/header"

const verificationResults = [
  {
    id: 1,
    company: "Охранное Агентство Авангард",
    license: "ЧО-001234",
    inn: "7712345678",
    status: "verified",
    details: {
      name: "Соответствует",
      address: "Соответствует",
      phone: "Соответствует",
      email: "Соответствует",
      website: "Соответствует",
    },
  },
  {
    id: 2,
    company: "Щит-Безопасность",
    license: "ЧО-005678",
    inn: "7809876543",
    status: "mismatch",
    details: {
      name: "Соответствует",
      address: "Не соответствует",
      phone: "Соответствует",
      email: "Соответствует",
      website: "Соответствует",
    },
  },
  {
    id: 3,
    company: "Барс-Охрана",
    license: "ЧО-009012",
    inn: "5402123456",
    status: "pending",
    details: {
      name: "Ожидает проверки",
      address: "Ожидает проверки",
      phone: "Ожидает проверки",
      email: "Ожидает проверки",
      website: "Ожидает проверки",
    },
  },
]

export default function VerificationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredResults = verificationResults.filter((result) => {
    const matchesSearch =
      result.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.license.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.inn.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || result.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <UserRoleSwitcher />

      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Проверка ЧОПов</h1>
          </div>
          <p className="text-lg text-gray-600">Проверка соответствия данных об охранных организациях</p>
        </div>

        {/* Verification Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="license">Номер лицензии</Label>
                <Input id="license" placeholder="ЧО-123456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inn">ИНН</Label>
                <Input id="inn" placeholder="1234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-name">Название компании</Label>
                <Input id="company-name" placeholder="Название ЧОП" />
              </div>
            </div>
            <div className="mt-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Проверить
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Поиск по компаниям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Статус проверки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="verified">Проверено</SelectItem>
                <SelectItem value="mismatch">Несоответствие</SelectItem>
                <SelectItem value="pending">Ожидает проверки</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Экспорт отчета
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredResults.map((result) => (
            <Card key={result.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.company}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Лицензия: {result.license}</span>
                      <span>ИНН: {result.inn}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.status === "verified" && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Проверено</span>
                      </div>
                    )}
                    {result.status === "mismatch" && (
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="h-5 w-5" />
                        <span className="font-medium">Несоответствие</span>
                      </div>
                    )}
                    {result.status === "pending" && (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="font-medium">Ожидает проверки</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Название</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.details.name === "Соответствует" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : result.details.name === "Не соответствует" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-600">{result.details.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Адрес</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.details.address === "Соответствует" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : result.details.address === "Не соответствует" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-600">{result.details.address}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Телефон</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.details.phone === "Соответствует" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : result.details.phone === "Не соответствует" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-600">{result.details.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.details.email === "Соответствует" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : result.details.email === "Не соответствует" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-600">{result.details.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Сайт</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.details.website === "Соответствует" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : result.details.website === "Не соответствует" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-600">{result.details.website}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="text-sm text-gray-500">Последняя проверка: 15.01.2024</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Подробный отчет
                    </Button>
                    <Link href={`/catalog/${result.id}`}>
                      <Button size="sm">Перейти к профилю</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-8 border-0 shadow-sm bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">О системе проверки</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Наша система автоматически сверяет данные охранных организаций с официальными реестрами Росгвардии,
                  ФНС и других государственных органов. Проверка включает в себя валидацию лицензий, соответствие
                  контактных данных и актуальность информации.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
