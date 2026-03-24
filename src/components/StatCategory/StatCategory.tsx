import styles from './StatCategory.module.css'

interface StatItem {
  label: string
  value: string | number
}

interface StatCategoryProperties {
  title: string
  icon: string
  iconColorClass: 'basic' | 'complexity' | 'characters'
  items: StatItem[]
}

const iconColorMap = {
  basic: styles.iconBasic,
  complexity: styles.iconComplexity,
  characters: styles.iconCharacters,
}

export function StatCategory({
  title,
  icon,
  iconColorClass,
  items,
}: StatCategoryProperties) {
  return (
    <div className={styles.statCategory}>
      <h3 className={styles.categoryTitle}>
        <span
          className={`${styles.categoryIcon} ${iconColorMap[iconColorClass]}`}
        >
          {icon}
        </span>
        {title}
      </h3>
      <div className={styles.statItems}>
        {items.map((item) => (
          <div key={item.label} className={styles.statItem}>
            <span className={styles.statLabel}>{item.label}</span>
            <span className={styles.statValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
