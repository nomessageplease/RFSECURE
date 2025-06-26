"use client"

export const useNewsActions = () => {
  const likeNews = (newsId: number) => {
    console.log(`Лайк новости ${newsId}`)
    // Здесь будет логика лайка новости
    // Например, отправка запроса на сервер
  }

  const saveNews = (newsId: number) => {
    console.log(`Сохранение новости ${newsId}`)
    // Здесь будет логика сохранения новости в избранное
  }

  const shareNews = (newsId: number) => {
    console.log(`Поделиться новостью ${newsId}`)

    // Проверяем поддержку Web Share API и что мы не в iframe
    if (navigator.share && window.self === window.top) {
      navigator
        .share({
          title: `Новость ${newsId}`,
          url: window.location.href,
        })
        .catch(() => {
          // Если Web Share API не сработал, используем fallback
          fallbackShare()
        })
    } else {
      // Используем fallback для браузеров без поддержки или в iframe
      fallbackShare()
    }

    function fallbackShare() {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            alert("Ссылка скопирована в буфер обмена")
          })
          .catch(() => {
            // Если и clipboard API не работает
            alert("Поделиться: " + window.location.href)
          })
      } else {
        // Совсем старые браузеры
        alert("Поделиться: " + window.location.href)
      }
    }
  }

  const commentNews = (newsId: number) => {
    console.log(`Комментирование новости ${newsId}`)
    // Здесь будет логика перехода к комментариям
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "news", newsId },
      }),
    )
  }

  const readNews = (newsId: number) => {
    console.log(`Чтение новости ${newsId}`)
    // Здесь будет логика перехода к полному тексту новости
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "news", newsId },
      }),
    )
  }

  return {
    likeNews,
    saveNews,
    shareNews,
    commentNews,
    readNews,
  }
}
