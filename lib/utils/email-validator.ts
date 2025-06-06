export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isBlockedEmailDomain(email: string): boolean {
  const blockedDomains = ["example.com", "test.com", "localhost", "temp-mail.org", "10minutemail.com"]

  const domain = email.split("@")[1]?.toLowerCase()
  return blockedDomains.includes(domain)
}

export function validateEmailForRegistration(email: string): { isValid: boolean; error?: string } {
  if (!email) {
    return { isValid: false, error: "Email обязателен" }
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: "Неверный формат email" }
  }

  if (isBlockedEmailDomain(email)) {
    return {
      isValid: false,
      error: "Этот домен email не поддерживается. Используйте gmail.com, yandex.ru или другой реальный домен",
    }
  }

  return { isValid: true }
}
