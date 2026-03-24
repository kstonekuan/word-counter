import { useCallback, useMemo, useState } from 'react'
import styles from './App.module.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LimitControls } from './components/LimitControls'
import { StatCategory } from './components/StatCategory'
import { TextInput } from './components/TextInput'
import { ThemeToggle } from './components/ThemeToggle'
import { WordFrequency } from './components/WordFrequency'
import { useCopyToClipboard } from './hooks/useCopyToClipboard.ts'
import { useDarkMode } from './hooks/useDarkMode.ts'
import { useLocalStorage } from './hooks/useLocalStorage.ts'
import { useTextAnalysis } from './hooks/useTextAnalysis.ts'
import {
  findLimitOverflowIndex,
  formatStatisticsForClipboard,
  type LimitMode,
} from './utils/textAnalysis.ts'

export default function App() {
  const [text, setText] = useLocalStorage('wordCounterText', '')
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const stats = useTextAnalysis(text)
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const [limitMode, setLimitMode] = useState<LimitMode | null>(null)
  const [limitValue, setLimitValue] = useState('')

  const parsedLimit = Number.parseInt(limitValue, 10)
  const hasValidLimit =
    limitMode !== null && !Number.isNaN(parsedLimit) && parsedLimit > 0

  const overflowIndex = useMemo(() => {
    if (!hasValidLimit || !limitMode) return null
    return findLimitOverflowIndex(text, limitMode, parsedLimit)
  }, [text, limitMode, parsedLimit, hasValidLimit])

  const currentLimitCount =
    limitMode === 'words' ? stats.wordCount : stats.charCount

  const handleLimitModeChange = useCallback((mode: LimitMode | null) => {
    setLimitMode(mode)
    if (mode === null) {
      setLimitValue('')
    }
  }, [])

  const handleCopyStats = useCallback(() => {
    copyToClipboard(formatStatisticsForClipboard(stats))
  }, [copyToClipboard, stats])

  const handleClear = useCallback(() => {
    setText('')
  }, [setText])

  return (
    <div className={styles.container}>
      <Header
        trailing={
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        }
      />
      <div className={styles.mainGrid}>
        <TextInput
          text={text}
          onTextChange={setText}
          onClear={handleClear}
          onCopyStats={handleCopyStats}
          copyButtonLabel={isCopied ? '✓ Copied!' : 'Copy Stats'}
          isCopied={isCopied}
          overflowIndex={overflowIndex}
          limitControls={
            <LimitControls
              limitMode={limitMode}
              limitValue={limitValue}
              onLimitModeChange={handleLimitModeChange}
              onLimitValueChange={setLimitValue}
              currentCount={currentLimitCount}
            />
          }
        />
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <StatCategory
              title="Basic Counts"
              icon="📊"
              iconColorClass="basic"
              items={[
                { label: 'Words', value: stats.wordCount },
                { label: 'Characters', value: stats.charCount },
                { label: 'No Spaces', value: stats.charNoSpaceCount },
                { label: 'Lines', value: stats.lineCount },
              ]}
            />
            <StatCategory
              title="Complexity"
              icon="🧮"
              iconColorClass="complexity"
              items={[
                {
                  label: 'Avg Word Length',
                  value: stats.averageWordLength.toFixed(1),
                },
                { label: 'Longest Word', value: stats.longestWordLength },
                { label: 'Unique Words', value: stats.uniqueWordCount },
              ]}
            />
            <StatCategory
              title="Character Types"
              icon="🔤"
              iconColorClass="characters"
              items={[
                { label: 'Letters', value: stats.letterCount },
                { label: 'Digits', value: stats.digitCount },
                { label: 'Whitespace', value: stats.whitespaceCount },
              ]}
            />
          </div>
        </div>
      </div>
      <WordFrequency frequencyData={stats.wordFrequency} />
      <Footer />
    </div>
  )
}
