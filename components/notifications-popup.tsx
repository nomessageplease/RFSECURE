"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface NotificationsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsPopup({ isOpen, onClose }: NotificationsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  // Закрытие по клику вне попапа
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleViewAll = () => {
    onClose()
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "notifications" },
      }),
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-6">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg border border-gray-200 w-80 max-h-96 overflow-hidden"
      >
        {/* Заголовок с кнопкой закрытия */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Уведомления</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Список уведомлений */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Список уведомлений</h4>
        </div>

        {/* Кнопка "смотреть все" */}
        <div className="p-4">
          <Button variant="outline" className="w-full" onClick={handleViewAll}>
            Смотреть все
          </Button>
        </div>
      </div>
    </div>
  )
}
