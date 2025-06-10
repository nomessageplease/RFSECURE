"use client"

import { Shield, Bell, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <span className="text-2xl font-bold">Охрана РФ</span>
                <p className="text-sm text-gray-400">Модульная платформа</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Единая экосистема охранной отрасли России. 12 интегрированных модулей для поиска ЧОПов, работы, рейтингов
              и управления безопасностью.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Bell className="h-4 w-4 mr-2" />
                Подписаться
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Основные модули</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/chops" className="hover:text-white transition-colors">
                  Каталог ЧОПов
                </Link>
              </li>
              <li>
                <Link href="/ratings" className="hover:text-white transition-colors">
                  Рейтинги
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Отзывы и жалобы
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Работа и резюме
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white transition-colors">
                  Карта
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Сервисы</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/forum" className="hover:text-white transition-colors">
                  Форум
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Новости
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="hover:text-white transition-colors">
                  Уведомления
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Поиск
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Поддержка
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Контакты</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@ohrana-rf.ru</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Центр поддержки
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-white transition-colors">
                  Обратная связь
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Охрана РФ. Модульная платформа охранной отрасли. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
