"use client"

import { useCallback } from "react"

export const useVacancyActions = (role = "Гость") => {
  const applyToVacancy = useCallback(
    (vacancyId: number) => {
      if (role === "Гость") {
        alert("Для отклика на вакансию необходимо войти в систему")
        return
      }
      if (role === "Представитель организации") {
        alert("Представители организаций не могут откликаться на вакансии")
        return
      }
      console.log(`Applying to vacancy: ${vacancyId}`)
      // Здесь будет логика отправки отклика
    },
    [role],
  )

  const saveVacancy = useCallback(
    (vacancyId: number) => {
      if (role === "Гость") {
        alert("Для сохранения вакансии необходимо войти в систему")
        return
      }
      console.log(`Saving vacancy: ${vacancyId}`)
      // Здесь будет логика сохранения вакансии
    },
    [role],
  )

  const favoriteVacancy = useCallback(
    (vacancyId: number) => {
      if (role === "Гость") {
        alert("Для добавления в избранное необходимо войти в систему")
        return
      }
      console.log(`Adding vacancy to favorites: ${vacancyId}`)
      // Здесь будет логика добавления в избранное
    },
    [role],
  )

  const shareVacancy = useCallback((vacancyId: number) => {
    console.log(`Sharing vacancy: ${vacancyId}`)
    // Здесь будет логика поделиться вакансией
    if (navigator.share) {
      navigator.share({
        title: "Вакансия",
        text: "Посмотрите эту вакансию",
        url: window.location.href,
      })
    } else {
      // Fallback для браузеров без поддержки Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Ссылка скопирована в буфер обмена")
    }
  }, [])

  const viewVacancyDetails = useCallback((vacancyId: number) => {
    console.log(`Viewing vacancy details: ${vacancyId}`)
    // Здесь будет логика перехода к детальной странице вакансии
  }, [])

  // Вспомогательные функции для проверки возможности действий
  const canApplyToVacancy = useCallback(() => {
    return role !== "Гость" && role !== "Представитель организации"
  }, [role])

  const canSaveVacancy = useCallback(() => {
    return role !== "Гость"
  }, [role])

  const canFavoriteVacancy = useCallback(() => {
    return role !== "Гость"
  }, [role])

  // Функции для получения текста кнопок
  const getApplyButtonText = useCallback(() => {
    if (role === "Гость") return "Войдите для отклика"
    if (role === "Представитель организации") return "Недоступно для представителей"
    return "Откликнуться"
  }, [role])

  const getSaveButtonText = useCallback(() => {
    if (role === "Гость") return "Войдите для сохранения"
    return "Сохранить"
  }, [role])

  return {
    // Основные действия
    applyToVacancy,
    saveVacancy,
    favoriteVacancy,
    shareVacancy,
    viewVacancyDetails,

    // Проверки возможности действий
    canApplyToVacancy,
    canSaveVacancy,
    canFavoriteVacancy,

    // Тексты для кнопок
    getApplyButtonText,
    getSaveButtonText,
  }
}
