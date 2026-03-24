import { Moon, Sun } from 'lucide-react'
import styles from './ThemeToggle.module.css'

interface ThemeToggleProperties {
  isDarkMode: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProperties) {
  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={onToggle}
      title="Toggle dark mode"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun
        size={20}
        strokeWidth={1.5}
        className={`${styles.icon} ${isDarkMode ? styles.hidden : ''}`}
      />
      <Moon
        size={20}
        strokeWidth={1.5}
        className={`${styles.icon} ${isDarkMode ? '' : styles.hidden}`}
      />
    </button>
  )
}
