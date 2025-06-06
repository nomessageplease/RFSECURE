"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useJobs } from "@/hooks/use-jobs"
import { useAuth } from "@/hooks/use-auth"
import { Briefcase, MapPin, DollarSign, Clock, Users, Plus, X, AlertCircle, CheckCircle } from "lucide-react"

interface CreateJobFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function CreateJobForm({ onSuccess, onCancel }: CreateJobFormProps) {
  const { createJob } = useJobs()
  const { profile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Состояние формы
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    salary_from: "",
    salary_to: "",
    salary_period: "месяц",
    schedule: "",
    experience_level: "",
    job_type: "full-time",
    category: "security",
    is_urgent: false,
    expires_at: "",
  })

  // Состояние для требований и преимуществ
  const [requirements, setRequirements] = useState<string[]>([])
  const [benefits, setBenefits] = useState<string[]>([])
  const [newRequirement, setNewRequirement] = useState("")
  const [newBenefit, setNewBenefit] = useState("")

  const cities = ["Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск", "Казань", "Краснодар", "Ростов-на-Дону"]
  const scheduleTypes = ["Полный день", "Сменный график", "Вахта", "Гибкий график", "2/2", "1/3", "5/2"]
  const experienceLevels = ["Без опыта", "От 1 года", "От 3 лет", "От 5 лет", "Более 10 лет"]
  const categories = ["security", "senior", "manager", "admin"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements((prev) => [...prev, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index))
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits((prev) => [...prev, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setBenefits((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!profile || !["chop", "admin"].includes(profile.role)) {
      setMessage({ type: "error", text: "У вас нет прав для создания вакансий" })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        requirements,
        benefits,
        location: formData.location,
        address: formData.address || null,
        salary_from: formData.salary_from ? Number.parseInt(formData.salary_from) : null,
        salary_to: formData.salary_to ? Number.parseInt(formData.salary_to) : null,
        salary_period: formData.salary_period,
        schedule: formData.schedule || null,
        experience_level: formData.experience_level || null,
        job_type: formData.job_type,
        category: formData.category,
        is_urgent: formData.is_urgent,
        is_verified: false,
        status: "pending" as const,
        expires_at: formData.expires_at || null,
      }

      await createJob(jobData)

      setMessage({ type: "success", text: "Вакансия успешно создана и отправлена на модерацию!" })

      // Сбросить форму
      setFormData({
        title: "",
        description: "",
        location: "",
        address: "",
        salary_from: "",
        salary_to: "",
        salary_period: "месяц",
        schedule: "",
        experience_level: "",
        job_type: "full-time",
        category: "security",
        is_urgent: false,
        expires_at: "",
      })
      setRequirements([])
      setBenefits([])

      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500)
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Ошибка при создании вакансии",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Создание новой вакансии
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Основная информация</h3>

            <div>
              <Label htmlFor="title">Название вакансии *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Например: Охранник торгового центра"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Описание вакансии *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Опишите обязанности, условия работы и другую важную информацию..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Город *</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                  <SelectTrigger>
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address">Адрес (необязательно)</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Уточните место работы"
                />
              </div>
            </div>
          </div>

          {/* Зарплата и условия */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Зарплата и условия</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="salary_from">Зарплата от</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="salary_from"
                    type="number"
                    value={formData.salary_from}
                    onChange={(e) => handleInputChange("salary_from", e.target.value)}
                    placeholder="50000"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="salary_to">Зарплата до</Label>
                <Input
                  id="salary_to"
                  type="number"
                  value={formData.salary_to}
                  onChange={(e) => handleInputChange("salary_to", e.target.value)}
                  placeholder="80000"
                />
              </div>

              <div>
                <Label htmlFor="salary_period">Период</Label>
                <Select
                  value={formData.salary_period}
                  onValueChange={(value) => handleInputChange("salary_period", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="месяц">За месяц</SelectItem>
                    <SelectItem value="смена">За смену</SelectItem>
                    <SelectItem value="день">За день</SelectItem>
                    <SelectItem value="час">За час</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schedule">График работы</Label>
                <Select value={formData.schedule} onValueChange={(value) => handleInputChange("schedule", value)}>
                  <SelectTrigger>
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Выберите график" />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleTypes.map((schedule) => (
                      <SelectItem key={schedule} value={schedule}>
                        {schedule}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience_level">Опыт работы</Label>
                <Select
                  value={formData.experience_level}
                  onValueChange={(value) => handleInputChange("experience_level", value)}
                >
                  <SelectTrigger>
                    <Users className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Требуемый опыт" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Требования */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Требования</h3>

            <div className="flex gap-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Добавить требование"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
              />
              <Button type="button" onClick={addRequirement}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {requirements.map((req, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {req}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeRequirement(index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Преимущества */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Преимущества</h3>

            <div className="flex gap-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Добавить преимущество"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
              />
              <Button type="button" onClick={addBenefit}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {benefit}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeBenefit(index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Дополнительные настройки */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Дополнительные настройки</h3>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_urgent"
                checked={formData.is_urgent}
                onCheckedChange={(checked) => handleInputChange("is_urgent", !!checked)}
              />
              <Label htmlFor="is_urgent">Срочная вакансия</Label>
            </div>

            <div>
              <Label htmlFor="expires_at">Дата окончания (необязательно)</Label>
              <Input
                id="expires_at"
                type="date"
                value={formData.expires_at}
                onChange={(e) => handleInputChange("expires_at", e.target.value)}
              />
            </div>
          </div>

          {message && (
            <Alert className={message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Кнопки */}
          <div className="flex gap-4 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Отмена
              </Button>
            )}
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? "Создание..." : "Создать вакансию"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
