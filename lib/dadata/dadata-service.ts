/**
 * Сервис для работы с API DaData
 */

const DADATA_API_URL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs"
const DADATA_API_KEY = "1d6de454930e097b2b7870ea3723bcb45607cb02"
const DADATA_SECRET_KEY = "0c0a7b4e506e2e50b8118ecb135c4f131ea954f2"

/**
 * Интерфейс для данных организации из DaData
 */
export interface DadataCompanyData {
  name: {
    full_with_opf: string
    short_with_opf: string
  }
  inn: string
  ogrn: string
  okved: string
  okved_type: string
  management?: {
    name: string
    post: string
  }
  address: {
    value: string
    unrestricted_value: string
  }
  state: {
    status: string
    registration_date: string
  }
  employee_count?: number
  phones?: string[]
  emails?: string[]
}

/**
 * Интерфейс для ответа от DaData API
 */
interface DadataResponse {
  suggestions: Array<{
    value: string
    unrestricted_value: string
    data: DadataCompanyData
  }>
}

/**
 * Получить данные организации по ИНН
 * @param inn ИНН организации
 * @returns Данные организации или null, если организация не найдена
 */
export async function getCompanyByInn(inn: string): Promise<DadataCompanyData | null> {
  try {
    const response = await fetch(`${DADATA_API_URL}/findById/party`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${DADATA_API_KEY}`,
        "X-Secret": DADATA_SECRET_KEY,
      },
      body: JSON.stringify({ query: inn }),
    })

    if (!response.ok) {
      throw new Error(`Ошибка DaData API: ${response.status}`)
    }

    const data = (await response.json()) as DadataResponse

    if (data.suggestions && data.suggestions.length > 0) {
      return data.suggestions[0].data
    }

    return null
  } catch (error) {
    console.error("Ошибка при запросе к DaData API:", error)
    return null
  }
}

/**
 * Проверить валидность ИНН
 * @param inn ИНН для проверки
 * @returns true если ИНН валиден, иначе false
 */
export function validateInn(inn: string): boolean {
  // Проверка на пустую строку
  if (!inn || inn.length === 0) return false

  // Проверка на длину (ИНН юр. лица - 10 цифр, ИП - 12 цифр)
  if (inn.length !== 10 && inn.length !== 12) return false

  // Проверка на содержание только цифр
  if (!/^\d+$/.test(inn)) return false

  // Для ИНН юр. лица (10 цифр) - проверка контрольной суммы
  if (inn.length === 10) {
    const checkDigit = calculateCheckDigit10(inn)
    return checkDigit === Number.parseInt(inn[9])
  }

  // Для ИНН ИП (12 цифр) - проверка контрольных сумм
  if (inn.length === 12) {
    const checkDigit11 = calculateCheckDigit11(inn)
    const checkDigit12 = calculateCheckDigit12(inn)
    return checkDigit11 === Number.parseInt(inn[10]) && checkDigit12 === Number.parseInt(inn[11])
  }

  return false
}

/**
 * Рассчитать контрольную цифру для 10-значного ИНН
 */
function calculateCheckDigit10(inn: string): number {
  const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8]
  let sum = 0

  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(inn[i]) * weights[i]
  }

  return (sum % 11) % 10
}

/**
 * Рассчитать первую контрольную цифру для 12-значного ИНН
 */
function calculateCheckDigit11(inn: string): number {
  const weights = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
  let sum = 0

  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(inn[i]) * weights[i]
  }

  return (sum % 11) % 10
}

/**
 * Рассчитать вторую контрольную цифру для 12-значного ИНН
 */
function calculateCheckDigit12(inn: string): number {
  const weights = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
  let sum = 0

  for (let i = 0; i < 11; i++) {
    sum += Number.parseInt(inn[i]) * weights[i]
  }

  return (sum % 11) % 10
}

/**
 * Объект сервиса DaData с методами для работы с API
 */
export const dadataService = {
  getCompanyByInn,
  validateInn,
}
