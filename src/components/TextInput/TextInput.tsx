import { type ReactNode, useCallback, useRef } from 'react'
import styles from './TextInput.module.css'

interface TextInputProperties {
  text: string
  onTextChange: (text: string) => void
  onClear: () => void
  onCopyStats: () => void
  copyButtonLabel: string
  isCopied: boolean
  overflowIndex: number | null
  limitControls: ReactNode
}

export function TextInput({
  text,
  onTextChange,
  onClear,
  onCopyStats,
  copyButtonLabel,
  isCopied,
  overflowIndex,
  limitControls,
}: TextInputProperties) {
  const textareaReference = useRef<HTMLTextAreaElement>(null)
  const backdropReference = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (textareaReference.current && backdropReference.current) {
      backdropReference.current.scrollTop = textareaReference.current.scrollTop
    }
  }, [])

  const hasOverflow = overflowIndex !== null && overflowIndex < text.length

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
      {limitControls}
      <div className={styles.editorContainer}>
        <div
          ref={backdropReference}
          className={styles.backdrop}
          aria-hidden="true"
        >
          <div className={styles.backdropContent}>
            {hasOverflow ? (
              <>
                {text.slice(0, overflowIndex)}
                <mark className={styles.overflowHighlight}>
                  {text.slice(overflowIndex)}
                </mark>
              </>
            ) : (
              text
            )}
            {/* Trailing newline to match textarea behavior */}
            {'\n'}
          </div>
        </div>
        <textarea
          ref={textareaReference}
          className={`${styles.textarea} ${hasOverflow ? styles.textareaWithOverflow : ''}`}
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          onScroll={handleScroll}
          placeholder="Start typing or paste your text here..."
          spellCheck={false}
        />
      </div>
    </div>
  )
}
