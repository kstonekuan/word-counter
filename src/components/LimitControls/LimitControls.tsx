import type { LimitMode } from '../../utils/textAnalysis.ts'
import styles from './LimitControls.module.css'

interface LimitControlsProperties {
  limitMode: LimitMode | null
  limitValue: string
  onLimitModeChange: (mode: LimitMode | null) => void
  onLimitValueChange: (value: string) => void
  currentCount: number
}

export function LimitControls({
  limitMode,
  limitValue,
  onLimitModeChange,
  onLimitValueChange,
  currentCount,
}: LimitControlsProperties) {
  const parsedLimit = Number.parseInt(limitValue, 10)
  const hasValidLimit =
    limitMode !== null && !Number.isNaN(parsedLimit) && parsedLimit > 0
  const isOverLimit = hasValidLimit && currentCount > parsedLimit
  const unitLabel = limitMode === 'words' ? 'words' : 'chars'

  return (
    <div className={styles.limitBar}>
      <span className={styles.limitPrefix}>Set limit:</span>
      <div className={styles.toggleGroup}>
        <button
          type="button"
          className={`${styles.toggleButton} ${limitMode === 'words' ? styles.active : ''}`}
          onClick={() =>
            onLimitModeChange(limitMode === 'words' ? null : 'words')
          }
        >
          Words
        </button>
        <button
          type="button"
          className={`${styles.toggleButton} ${limitMode === 'characters' ? styles.active : ''}`}
          onClick={() =>
            onLimitModeChange(limitMode === 'characters' ? null : 'characters')
          }
        >
          Characters
        </button>
      </div>

      {limitMode !== null && (
        <div className={styles.limitInputGroup}>
          <label className={styles.limitLabel} htmlFor="limitInput">
            Limit
          </label>
          <input
            id="limitInput"
            className={styles.limitInput}
            type="number"
            min="1"
            value={limitValue}
            onChange={(event) => onLimitValueChange(event.target.value)}
            placeholder="e.g. 500"
          />
          {hasValidLimit && (
            <span
              className={`${styles.progressIndicator} ${isOverLimit ? styles.overLimit : ''}`}
            >
              <span className={styles.progressCount}>{currentCount}</span>
              <span className={styles.progressSeparator}>/</span>
              <span className={styles.progressTotal}>{parsedLimit}</span>
              <span className={styles.progressUnit}>{unitLabel}</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
