import type { ReactNode } from 'react'
import styles from './Header.module.css'

interface HeaderProperties {
  trailing: ReactNode
}

export function Header({ trailing }: HeaderProperties) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Word Counter</h1>
      <div className={styles.trailing}>{trailing}</div>
    </header>
  )
}
