interface OrganizationsTitleProps {
  role?: string
}

export default function OrganizationsTitle({ role = "Гость" }: OrganizationsTitleProps) {
  const getTitleContent = () => {
    switch (role) {
      case "Гость":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Охранные организации России</h1>
            <p className="text-lg text-gray-600">
              Зарегистрируйтесь, чтобы видеть полную информацию об организациях, рейтинги и отзывы
            </p>
          </>
        )
      case "Новичок":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Охранные организации России</h1>
            <p className="text-lg text-gray-600">
              Заполните профиль охранника или подайте заявку на подключение ЧОП для полного доступа
            </p>
          </>
        )
      case "Охранник":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Охранные организации России</h1>
            <p className="text-lg text-gray-600">Найдите лучших работодателей и изучите отзывы коллег</p>
          </>
        )
      case "Представитель организации":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Охранные организации России</h1>
            <p className="text-lg text-gray-600">Управляйте профилем вашей организации и анализируйте конкурентов</p>
          </>
        )
      case "Модератор":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Охранные организации России</h1>
            <p className="text-lg text-gray-600">Модерируйте организации и проверяйте заявки на подключение</p>
          </>
        )
      case "Админ":
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Охранные организации России</h1>
            <p className="text-lg text-gray-600">Полное управление разделом организаций и системными настройками</p>
          </>
        )
      default:
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Охранные организации России</h1>
            <p className="text-lg text-gray-600">Найдите надежных партнеров в сфере безопасности</p>
          </>
        )
    }
  }

  return <div className="text-left">{getTitleContent()}</div>
}
