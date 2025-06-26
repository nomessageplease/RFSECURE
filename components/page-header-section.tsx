"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRegisterAction } from "@/hooks/use-register-action"
import { useNavigationActions } from "@/hooks/use-navigation-actions"

interface PageHeaderSectionProps {
  page: string
  role?: string
}

export default function PageHeaderSection({ page, role = "Гость" }: PageHeaderSectionProps) {
  const [userName, setUserName] = useState("")
  const { handleRegister } = useRegisterAction()
  const { navigateToVacancies, navigateToOrganizations, navigateToForum, navigateToNews, navigateToHowItWorks } =
    useNavigationActions()

  // В реальном приложении это будет приходить из контекста авторизации
  useEffect(() => {
    // Имитация получения имени пользователя
    if (role !== "Гость") {
      setUserName("Иван")
    }
  }, [role])

  const handleButtonClick = (action: string) => {
    console.log(`Action clicked: ${action} for role: ${role} on page: ${page}`)

    // Обработка навигационных действий
    switch (action) {
      case "register":
        handleRegister()
        return
      case "find-vacancies":
        navigateToVacancies()
        return
      case "browse-vacancies":
        navigateToVacancies()
        return
      case "view-competitors":
        navigateToOrganizations()
        return
      case "browse-topics":
        navigateToForum()
        return
      case "popular-news":
        navigateToNews()
        return
      case "how-it-works":
        navigateToHowItWorks()
        return
      default:
        console.log(`Action ${action} not implemented yet`)
    }
  }

  const getPageContent = () => {
    switch (page) {
      case "organizations":
        return {
          title: "Охранные организации России",
          getDescription: () => {
            switch (role) {
              case "Гость":
                return "Зарегистрируйтесь, чтобы видеть полную информацию об организациях, рейтинги и отзывы"
              case "Новичок":
                return "Заполните профиль охранника или подайте заявку на подключение ЧОП для полного доступа"
              case "Охранник":
                return "Найдите лучших работодателей и изучите отзывы коллег"
              case "Представитель организации":
                return "Управляйте профилем вашей организации и анализируйте конкурентов"
              case "Модератор":
                return "Модерируйте организации и проверяйте заявки на подключение"
              case "Админ":
                return "Полное управление разделом организаций и системными настройками"
              default:
                return "Найдите надежных партнеров в сфере безопасности"
            }
          },
          getButtons: () => {
            switch (role) {
              case "Гость":
                return [
                  { text: "Зарегистрироваться", action: "register", variant: "default" as const },
                  { text: "Как это работает?", action: "how-it-works", variant: "outline" as const },
                ]
              case "Новичок":
                return [
                  { text: "Заполнить профиль охранника", action: "fill-guard-profile", variant: "default" as const },
                  {
                    text: "Подать заявку на подключение ЧОП",
                    action: "submit-chop-request",
                    variant: "outline" as const,
                  },
                ]
              case "Охранник":
                return [
                  { text: "Найти вакансии", action: "find-vacancies", variant: "default" as const },
                  { text: "Сравнить организации", action: "compare-organizations", variant: "outline" as const },
                  { text: "Мои избранные", action: "my-favorites", variant: "outline" as const },
                ]
              case "Представитель организации":
                return [
                  { text: "Редактировать профиль ЧОП", action: "edit-chop-profile", variant: "default" as const },
                  { text: "Посмотреть конкурентов", action: "view-competitors", variant: "outline" as const },
                  { text: "Аналитика просмотров", action: "view-analytics", variant: "outline" as const },
                ]
              case "Модератор":
                return [
                  { text: "Организации на проверке", action: "organizations-on-review", variant: "default" as const },
                  { text: "Жалобы", action: "complaints", variant: "outline" as const },
                  { text: "Статистика модерации", action: "moderation-stats", variant: "outline" as const },
                ]
              case "Админ":
                return [
                  { text: "Управление организациями", action: "manage-organizations", variant: "default" as const },
                  { text: "Системные настройки", action: "system-settings", variant: "outline" as const },
                  { text: "Полная аналитика", action: "full-analytics", variant: "outline" as const },
                ]
              default:
                return []
            }
          },
        }

      case "vacancies":
        return {
          title: "Вакансии в охранной отрасли",
          getDescription: () => {
            switch (role) {
              case "Гость":
                return "Добро пожаловать в раздел вакансий! Зарегистрируйтесь, чтобы откликаться на вакансии и сохранять избранное."
              case "Новичок":
                return `${userName ? `Привет, ${userName}! ` : "Привет! "}Ознакомьтесь с актуальными вакансиями и начните строить карьеру в охранной отрасли.`
              case "Охранник":
                return `${userName ? `${userName}, ` : ""}найдите лучшие предложения работы в вашем регионе и подайте заявку на подходящие вакансии.`
              case "Представитель организации":
                return "Управляйте вакансиями вашей организации: создавайте, редактируйте и анализируйте отклики кандидатов."
              case "Модератор":
                return "Проверяйте новые вакансии и следите за соблюдением правил размещения объявлений."
              case "Админ":
                return "Администрируйте раздел вакансий: управляйте вакансиями, категориями и модераторами."
              default:
                return "Найдите работу своей мечты в сфере охранной деятельности"
            }
          },
          getButtons: () => {
            switch (role) {
              case "Гость":
                return [
                  { text: "Зарегистрироваться", action: "register", variant: "default" as const },
                  { text: "Просмотреть вакансии", action: "browse-vacancies", variant: "outline" as const },
                ]
              case "Новичок":
                return [
                  { text: "Создать резюме", action: "create-resume", variant: "default" as const },
                  { text: "Найти вакансии для новичков", action: "find-entry-level", variant: "outline" as const },
                ]
              case "Охранник":
                return [
                  { text: "Найти вакансии", action: "find-vacancies", variant: "default" as const },
                  { text: "Мои отклики", action: "my-applications", variant: "outline" as const },
                  { text: "Избранные вакансии", action: "favorite-vacancies", variant: "outline" as const },
                ]
              case "Представитель организации":
                return [
                  { text: "Создать вакансию", action: "create-vacancy", variant: "default" as const },
                  { text: "Мои вакансии", action: "my-vacancies", variant: "outline" as const },
                  { text: "Отклики кандидатов", action: "candidate-responses", variant: "outline" as const },
                ]
              case "Модератор":
                return [
                  { text: "Вакансии на проверке", action: "vacancies-on-review", variant: "default" as const },
                  { text: "Жалобы на вакансии", action: "vacancy-complaints", variant: "outline" as const },
                  { text: "Статистика модерации", action: "moderation-stats", variant: "outline" as const },
                ]
              case "Админ":
                return [
                  { text: "Управление вакансиями", action: "manage-vacancies", variant: "default" as const },
                  { text: "Управление категориями", action: "manage-categories", variant: "outline" as const },
                  { text: "Аналитика раздела", action: "section-analytics", variant: "outline" as const },
                ]
              default:
                return []
            }
          },
        }

      case "forum":
        return {
          title: "Форум охранной отрасли",
          getDescription: () => {
            switch (role) {
              case "Гость":
                return "Добро пожаловать на форум! Зарегистрируйтесь, чтобы создавать темы и участвовать в обсуждениях."
              case "Новичок":
                return `${userName ? `Привет, ${userName}! ` : "Привет! "}Начните общение — создавайте темы и делитесь опытом.`
              case "Охранник":
                return `${userName ? `${userName}, ` : ""}ищите ответы и делитесь знаниями с коллегами.`
              case "Представитель организации":
                return `${userName ? `${userName}, ` : ""}участвуйте в обсуждениях и представляйте свою организацию.`
              case "Модератор":
                return `${userName ? `${userName}, ` : ""}следите за порядком на форуме и модерируйте обсуждения.`
              case "Админ":
                return `${userName ? `${userName}, ` : ""}управляйте форумом и контролируйте активность пользователей.`
              default:
                return "Место для профессионального общения охранников"
            }
          },
          getButtons: () => {
            switch (role) {
              case "Гость":
                return [
                  { text: "Зарегистрироваться", action: "register", variant: "default" as const },
                  { text: "Просмотреть темы", action: "browse-topics", variant: "outline" as const },
                ]
              case "Новичок":
                return [
                  { text: "Создать тему", action: "create-topic", variant: "default" as const },
                  { text: "Популярные темы", action: "popular-topics", variant: "outline" as const },
                  { text: "Помощь новичкам", action: "help-for-beginners", variant: "outline" as const },
                ]
              case "Охранник":
                return [
                  { text: "Создать тему", action: "create-topic", variant: "default" as const },
                  { text: "Мои темы", action: "my-topics", variant: "outline" as const },
                  { text: "Поиск по форуму", action: "search-forum", variant: "outline" as const },
                ]
              case "Представитель организации":
                return [
                  { text: "Создать тему", action: "create-topic", variant: "default" as const },
                  { text: "Темы организации", action: "organization-topics", variant: "outline" as const },
                  { text: "Объявления", action: "announcements", variant: "outline" as const },
                ]
              case "Модератор":
                return [
                  { text: "Жалобы", action: "complaints", variant: "default" as const },
                  { text: "Модерация тем", action: "moderate-topics", variant: "outline" as const },
                  { text: "Статистика форума", action: "forum-stats", variant: "outline" as const },
                ]
              case "Админ":
                return [
                  { text: "Панель управления", action: "admin-panel", variant: "default" as const },
                  { text: "Управление пользователями", action: "manage-users", variant: "outline" as const },
                  { text: "Настройки форума", action: "forum-settings", variant: "outline" as const },
                ]
              default:
                return []
            }
          },
        }

      case "news":
        return {
          title: "Новости охранной отрасли",
          getDescription: () => {
            switch (role) {
              case "Гость":
                return "Добро пожаловать в раздел новостей! Зарегистрируйтесь, чтобы видеть полный контент."
              case "Новичок":
                return `${userName ? `Привет, ${userName}! ` : "Привет! "}Ознакомьтесь с последними новостями отрасли.`
              case "Охранник":
                return `${userName ? `${userName}, ` : ""}следите за актуальными событиями и обновлениями.`
              case "Представитель организации":
                return `${userName ? `${userName}, ` : ""}публикуйте новости вашей организации и следите за отраслевыми событиями.`
              case "Модератор":
                return `${userName ? `${userName}, ` : ""}управляйте новостным контентом и проверяйте публикации.`
              case "Админ":
                return `${userName ? `${userName}, ` : ""}администрируйте раздел новостей и управляйте публикациями.`
              default:
                return "Будьте в курсе последних событий охранной отрасли"
            }
          },
          getButtons: () => {
            switch (role) {
              case "Гость":
                return [
                  { text: "Зарегистрироваться", action: "register", variant: "default" as const },
                  { text: "Популярные новости", action: "popular-news", variant: "outline" as const },
                ]
              case "Новичок":
                return [
                  { text: "Подписаться на рассылку", action: "subscribe-newsletter", variant: "default" as const },
                  { text: "Избранные новости", action: "favorite-news", variant: "outline" as const },
                ]
              case "Охранник":
                return [
                  { text: "Мои избранные", action: "my-favorites", variant: "default" as const },
                  { text: "Новости по регионам", action: "regional-news", variant: "outline" as const },
                  { text: "Подписки", action: "subscriptions", variant: "outline" as const },
                ]
              case "Представитель организации":
                return [
                  { text: "Опубликовать новость", action: "publish-news", variant: "default" as const },
                  { text: "Мои публикации", action: "my-publications", variant: "outline" as const },
                  { text: "Аналитика просмотров", action: "view-analytics", variant: "outline" as const },
                ]
              case "Модератор":
                return [
                  { text: "Новости на проверке", action: "news-on-review", variant: "default" as const },
                  { text: "Жалобы на новости", action: "news-complaints", variant: "outline" as const },
                  { text: "Статистика модерации", action: "moderation-stats", variant: "outline" as const },
                ]
              case "Админ":
                return [
                  { text: "Управление новостями", action: "manage-news", variant: "default" as const },
                  { text: "Управление категориями", action: "manage-categories", variant: "outline" as const },
                  { text: "Аналитика раздела", action: "section-analytics", variant: "outline" as const },
                ]
              default:
                return []
            }
          },
        }

      default:
        return {
          title: "Страница",
          getDescription: () => "Описание страницы",
          getButtons: () => [],
        }
    }
  }

  const pageContent = getPageContent()
  const buttons = pageContent.getButtons()

  return (
    <section className="py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-gray-300 rounded-lg p-6">
          {/* Заголовок и описание */}
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{pageContent.title}</h1>
            <p className="text-lg text-gray-600">{pageContent.getDescription()}</p>
          </div>

          {/* Быстрые действия под заголовком */}
          {buttons.length > 0 && (
            <div className="mt-12">
              <div className="max-w-6xl mx-auto">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {buttons.map((button, index) => (
                      <Button
                        key={index}
                        variant={button.variant}
                        className="h-auto py-3 px-4"
                        onClick={() => handleButtonClick(button.action)}
                      >
                        <span className="text-sm font-medium">{button.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
