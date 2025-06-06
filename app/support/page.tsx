"use client"

import { useState } from "react"
import {
  HelpCircle,
  Search,
  MessageSquare,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { UserRoleSwitcher } from "@/components/user-role-switcher"
import Header from "@/components/header"

const faqCategories = [
  {
    id: "general",
    name: "Общие вопросы",
    count: 12,
    questions: [
      {
        id: 1,
        question: "Как найти надежную охранную компанию?",
        answer:
          "Для поиска надежной охранной компании рекомендуем: 1) Проверить наличие действующей лицензии в реестре Росгвардии, 2) Изучить отзывы клиентов на нашем портале, 3) Обратить внимание на рейтинг и опыт работы компании, 4) Уточнить наличие страхования ответственности.",
        helpful: 45,
        notHelpful: 3,
      },
      {
        id: 2,
        question: "Как проверить лицензию ЧОП?",
        answer:
          "Лицензию можно проверить на официальном сайте Росгвардии в разделе 'Реестр лицензий'. Также на нашем портале мы указываем номер лицензии и срок её действия для каждой компании.",
        helpful: 38,
        notHelpful: 1,
      },
    ],
  },
  {
    id: "ratings",
    name: "Рейтинги и отзывы",
    count: 8,
    questions: [
      {
        id: 3,
        question: "Как формируется рейтинг ЧОП?",
        answer:
          "Рейтинг формируется на основе нескольких факторов: отзывы клиентов (40%), опыт работы (20%), наличие лицензий и сертификатов (20%), количество сотрудников (10%), финансовая стабильность (10%).",
        helpful: 52,
        notHelpful: 2,
      },
    ],
  },
  {
    id: "jobs",
    name: "Вакансии и работа",
    count: 15,
    questions: [
      {
        id: 4,
        question: "Как найти работу охранником?",
        answer:
          "В разделе 'Вакансии' вы можете найти актуальные предложения работы. Используйте фильтры по городу, зарплате и типу объекта. Также можете создать резюме в личном кабинете.",
        helpful: 67,
        notHelpful: 4,
      },
    ],
  },
]

const contactMethods = [
  {
    icon: Mail,
    title: "Email поддержка",
    description: "Ответим в течение 24 часов",
    contact: "support@ohrana-rf.ru",
    action: "Написать письмо",
  },
  {
    icon: MessageSquare,
    title: "Онлайн чат",
    description: "Быстрые ответы на вопросы",
    contact: "Доступен 24/7",
    action: "Начать чат",
  },
  {
    icon: Phone,
    title: "Телефон",
    description: "Звонки принимаем с 9:00 до 18:00",
    contact: "+7 (495) 123-45-67",
    action: "Позвонить",
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [openQuestions, setOpenQuestions] = useState<number[]>([])
  const [feedbackType, setFeedbackType] = useState("")

  const toggleQuestion = (questionId: number) => {
    setOpenQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  const filteredQuestions =
    faqCategories
      .find((cat) => cat.id === selectedCategory)
      ?.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <UserRoleSwitcher />

      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Центр поддержки</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Найдите ответы на часто задаваемые вопросы или свяжитесь с нашей службой поддержки
          </p>
        </div>

        {/* Quick Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Поиск по базе знаний..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Связаться</TabsTrigger>
            <TabsTrigger value="feedback">Обратная связь</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Категории</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {faqCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                      <Card key={question.id} className="border-0 shadow-sm">
                        <Collapsible>
                          <CollapsibleTrigger className="w-full" onClick={() => toggleQuestion(question.id)}>
                            <CardHeader className="hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-left text-lg font-medium">{question.question}</CardTitle>
                                {openQuestions.includes(question.id) ? (
                                  <ChevronDown className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                            </CardHeader>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <CardContent className="pt-0">
                              <p className="text-gray-700 leading-relaxed mb-4">{question.answer}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-gray-500">Был ли ответ полезен?</span>
                                  <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="h-8">
                                      <ThumbsUp className="h-4 w-4 mr-1" />
                                      {question.helpful}
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-8">
                                      <ThumbsDown className="h-4 w-4 mr-1" />
                                      {question.notHelpful}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </CollapsibleContent>
                        </Collapsible>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-0 shadow-sm">
                      <CardContent className="text-center py-12">
                        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Ничего не найдено</h3>
                        <p className="text-gray-600 mb-4">
                          Попробуйте изменить поисковый запрос или выберите другую категорию
                        </p>
                        <Button variant="outline">Задать вопрос поддержке</Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                    <p className="font-medium text-gray-900 mb-4">{method.contact}</p>
                    <Button className="w-full">{method.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-sm max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Написать в поддержку</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Тема обращения</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тему" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Общий вопрос</SelectItem>
                      <SelectItem value="technical">Техническая проблема</SelectItem>
                      <SelectItem value="account">Проблемы с аккаунтом</SelectItem>
                      <SelectItem value="billing">Вопросы по оплате</SelectItem>
                      <SelectItem value="complaint">Жалоба</SelectItem>
                      <SelectItem value="suggestion">Предложение</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    placeholder="Опишите вашу проблему или вопрос подробно..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Отправить сообщение
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Обратная связь</CardTitle>
                  <p className="text-gray-600">Помогите нам улучшить портал. Ваше мнение очень важно для нас.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Тип обратной связи</Label>
                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bug">Сообщить об ошибке</SelectItem>
                        <SelectItem value="feature">Предложить функцию</SelectItem>
                        <SelectItem value="improvement">Улучшение</SelectItem>
                        <SelectItem value="content">Проблема с контентом</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {feedbackType === "bug" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-800 mb-1">Сообщение об ошибке</h4>
                          <p className="text-sm text-red-700">
                            Пожалуйста, опишите ошибку максимально подробно: что вы делали, что ожидали увидеть и что
                            произошло на самом деле.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {feedbackType === "feature" && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800 mb-1">Предложение функции</h4>
                          <p className="text-sm text-blue-700">
                            Опишите, какую функцию вы хотели бы видеть на портале и как она поможет вам в работе.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="feedback-title">Заголовок</Label>
                    <Input id="feedback-title" placeholder="Краткое описание" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-description">Подробное описание</Label>
                    <Textarea
                      id="feedback-description"
                      placeholder="Опишите вашу проблему или предложение..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-email">Email для связи (необязательно)</Label>
                    <Input id="feedback-email" type="email" placeholder="your@email.com" />
                  </div>

                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Отправить отзыв
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Feedback */}
              <Card className="border-0 shadow-sm mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Последние обновления
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Добавлена карта ЧОПов</h4>
                      <p className="text-sm text-green-700">
                        По многочисленным просьбам пользователей добавлена интерактивная карта
                      </p>
                      <span className="text-xs text-green-600">2 дня назад</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Улучшен поиск по вакансиям</h4>
                      <p className="text-sm text-blue-700">
                        Добавлены новые фильтры и улучшена релевантность результатов
                      </p>
                      <span className="text-xs text-blue-600">1 неделю назад</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Исправлена ошибка с уведомлениями</h4>
                      <p className="text-sm text-orange-700">Устранена проблема с отправкой email-уведомлений</p>
                      <span className="text-xs text-orange-600">2 недели назад</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
