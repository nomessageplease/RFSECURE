"use client"

export const useNavigationActions = () => {
  const navigateToVacancies = () => {
    console.log("Navigating to vacancies page")
    // В реальном приложении здесь будет router.push('/vacancies')
    window.location.href = "/vacancies"
  }

  const navigateToOrganizations = () => {
    console.log("Navigating to organizations page")
    // В реальном приложении здесь будет router.push('/organizations')
    window.location.href = "/organizations"
  }

  const navigateToForum = () => {
    console.log("Navigating to forum page")
    // В реальном приложении здесь будет router.push('/forum')
    window.location.href = "/forum"
  }

  const navigateToNews = () => {
    console.log("Navigating to news page")
    // В реальном приложении здесь будет router.push('/news')
    window.location.href = "/news"
  }

  const navigateToProfile = () => {
    console.log("Navigating to profile page")
    // В реальном приложении здесь будет router.push('/profile')
    window.location.href = "/profile"
  }

  const navigateToMain = () => {
    console.log("Navigating to main page")
    // В реальном приложении здесь будет router.push('/')
    window.location.href = "/"
  }

  const navigateToLogin = () => {
    console.log("Navigating to login page")
    // В реальном приложении здесь будет router.push('/login')
    window.location.href = "/login"
  }

  const navigateToRegister = () => {
    console.log("Navigating to register page")
    // В реальном приложении здесь будет router.push('/register')
    window.location.href = "/register"
  }

  const navigateToHowItWorks = () => {
    console.log("Navigating to how it works page")
    // В реальном приложении здесь будет router.push('/how-it-works')
    window.location.href = "/how-it-works"
  }

  return {
    navigateToVacancies,
    navigateToOrganizations,
    navigateToForum,
    navigateToNews,
    navigateToProfile,
    navigateToMain,
    navigateToLogin,
    navigateToRegister,
    navigateToHowItWorks,
  }
}
