import { IconMoon, IconSun } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import { useEffect, useState } from "react"

type Theme = "dark" | "light"

const STORAGE_KEY = "rald-folio-theme"

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const nextTheme = stored === "light" ? "light" : "dark"
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </Button>
  )
}
