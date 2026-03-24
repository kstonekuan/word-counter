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
      <span className={`${styles.icon} ${isDarkMode ? styles.hidden : ''}`}>
        ☀️
      </span>
      <span className={`${styles.icon} ${isDarkMode ? '' : styles.hidden}`}>
        🌙
      </span>
    </button>
  )
}
