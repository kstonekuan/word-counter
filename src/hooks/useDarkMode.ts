import { useCallback, useEffect, useState } from 'react'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') return true
    if (savedTheme === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(event.matches)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((previous) => {
      const next = !previous
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }, [])

  return { isDarkMode, toggleDarkMode }
}
