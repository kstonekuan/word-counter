import styles from './TextInput.module.css'

interface TextInputProperties {
  text: string
  onTextChange: (text: string) => void
  onClear: () => void
  onCopyStats: () => void
  copyButtonLabel: string
  isCopied: boolean
}

export function TextInput({
  text,
  onTextChange,
  onClear,
  onCopyStats,
  copyButtonLabel,
  isCopied,
}: TextInputProperties) {
  return (
    <div className={styles.inputSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Your Text</h2>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.button}
            onClick={onClear}
            title="Clear all text"
          >
            Clear
          </button>
          <button
            type="button"
            className={`${styles.button} ${isCopied ? styles.copiedButton : ''}`}
            onClick={onCopyStats}
            title="Copy statistics"
          >
            {copyButtonLabel}
          </button>
        </div>
      </div>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
        placeholder="Start typing or paste your text here..."
        spellCheck={false}
      />
    </div>
  )
}
