"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    userType: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToNewsletter: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1) // 1 - основная информация, 2 - пароль и согласия

  const cities = [
    { value: "moscow", label: "Москва" },
    { value: "spb", label: "Санкт-Петербург" },
    { value: "novosibirsk", label: "Новосибирск" },
    { value: "ekaterinburg", label: "Екатеринбург" },
    { value: "kazan", label: "Казань" },
    { value: "nizhny-novgorod", label: "Нижний Новгород" },
    { value: "chelyabinsk", label: "Челябинск" },
    { value: "samara", label: "Самара" },
    { value: "omsk", label: "Омск" },
    { value: "rostov", label: "Ростов-на-Дону" },
    { value: "ufa", label: "Уфа" },
    { value: "krasnoyarsk", label: "Красноярск" },
    { value: "voronezh", label: "Воронеж" },
    { value: "perm", label: "Пермь" },
    { value: "volgograd", label: "Волгоград" },
    { value: "other", label: "Другой город" },
  ]

  const userTypes = [
    { value: "guard", label: "Охранник" },
    { value: "company-rep", label: "Представитель ЧОП" },
    { value: "job-seeker", label: "Ищу работу в охране" },
    { value: "other", label: "Другое" },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    })
    // Очищаем ошибку при изменении данных
    if (error) setError("")
  }

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError("Введите имя")
      return false
    }
    if (!formData.lastName.trim()) {
      setError("Введите фамилию")
      return false
    }
    if (!formData.email.trim()) {
      setError("Введите email адрес")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("Введите корректный email адрес")
      return false
    }
    if (!formData.phone.trim()) {
      setError("Введите номер телефона")
      return false
    }
    if (!formData.city) {
      setError("Выберите город")
      return false
    }
    if (!formData.userType) {
      setError("Выберите тип пользователя")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.password) {
      setError("Введите пароль")
      return false
    }
    if (formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают")
      return false
    }
    if (!formData.agreeToTerms) {
      setError("Необходимо согласиться с условиями использования")
      return false
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
      setError("")
    }
  }

  const handlePrevStep = () => {
    setStep(1)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep2()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Имитация запроса к серверу
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Имитация успешной регистрации
      console.log("Registration data:", formData)
      alert("Регистрация прошла успешно! Проверьте email для подтверждения аккаунта.")

      // Здесь будет редирект на страницу входа
      window.dispatchEvent(
        new CustomEvent("pageChanged", {
          detail: { page: "login" },
        }),
      )
    } catch (err) {
      setError("Произошла ошибка при регистрации. Попробуйте еще раз.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginRedirect = () => {
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "login" },
      }),
    )
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Имя и Фамилия */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            Имя *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="firstName"
              type="text"
              placeholder="Иван"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Фамилия *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="lastName"
              type="text"
              placeholder="Петров"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email адрес *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="example@mail.ru"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Телефон */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Номер телефона *
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            placeholder="+7 (999) 123-45-67"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Город */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Город *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Select
            value={formData.city}
            onValueChange={(value) => handleInputChange("city", value)}
            disabled={isLoading}
          >
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Тип пользователя */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Кто вы? *</Label>
        <Select
          value={formData.userType}
          onValueChange={(value) => handleInputChange("userType", value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите тип пользователя" />
          </SelectTrigger>
          <SelectContent>
            {userTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Error message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Next button */}
      <Button type="button" onClick={handleNextStep} className="w-full" disabled={isLoading}>
        Продолжить
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Пароль */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Пароль *
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Минимум 6 символов"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="pl-10 pr-10"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Подтверждение пароля */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Подтвердите пароль *
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Повторите пароль"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="pl-10 pr-10"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Согласия */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            disabled={isLoading}
            className="mt-1"
          />
          <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
            Я согласен с{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
              условиями использования
            </a>{" "}
            и{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
              политикой конфиденциальности
            </a>{" "}
            *
          </Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToNewsletter"
            checked={formData.agreeToNewsletter}
            onCheckedChange={(checked) => handleInputChange("agreeToNewsletter", checked as boolean)}
            disabled={isLoading}
            className="mt-1"
          />
          <Label htmlFor="agreeToNewsletter" className="text-sm text-gray-600 leading-relaxed">
            Я хочу получать новости и обновления на email
          </Label>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Buttons */}
      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1" disabled={isLoading}>
          Назад
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Шаг {step} из 2</span>
            <span className="text-sm text-gray-500">{step === 1 ? "Основная информация" : "Пароль и согласия"}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>{step === 1 ? renderStep1() : renderStep2()}</form>

        {/* Login link */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              disabled={isLoading}
            >
              Войти
            </button>
          </p>
        </div>

        {/* Benefits */}
        {step === 1 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Что вы получите:</h3>
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>Доступ к базе вакансий</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>Участие в форуме</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>Рейтинги организаций</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>Персональные рекомендации</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
