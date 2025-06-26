export const useLoginAction = () => {
  const handleLogin = () => {
    console.log("Navigating to login page...")
    window.dispatchEvent(
      new CustomEvent("pageChanged", {
        detail: { page: "login" },
      }),
    )
  }

  return { handleLogin }
}
