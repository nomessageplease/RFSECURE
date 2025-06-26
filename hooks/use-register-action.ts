export const useRegisterAction = () => {
  const handleRegister = () => {
    console.log("Navigating to registration page...")
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "register" },
      }),
    )
  }

  return { handleRegister }
}
