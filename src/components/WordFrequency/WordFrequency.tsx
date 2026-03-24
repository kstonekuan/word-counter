import type { WordFrequencyItem } from '../../utils/textAnalysis.ts'
import styles from './WordFrequency.module.css'

interface WordFrequencyProperties {
  frequencyData: WordFrequencyItem[]
}

export function WordFrequency({ frequencyData }: WordFrequencyProperties) {
  return (
    <div className={styles.frequencySection}>
      <h3 className={styles.categoryTitle}>
        <span className={styles.categoryIcon}>📈</span>
        Top 10 Most Frequent Words
      </h3>
      <div className={styles.frequencyList}>
        {frequencyData.length === 0 ? (
          <div className={styles.emptyState}>
            Start typing to see word frequency analysis...
          </div>
        ) : (
          frequencyData.map((item, index) => (
            <div key={item.word} className={styles.frequencyItem}>
              <span className={styles.frequencyRank}>#{index + 1}</span>
              <span className={styles.frequencyWord}>{item.word}</span>
              <div className={styles.frequencyBarContainer}>
                <div
                  className={styles.frequencyBar}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className={styles.frequencyCount}>{item.count}×</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
