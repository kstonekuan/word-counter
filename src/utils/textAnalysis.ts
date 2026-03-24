export interface TextAnalysisResult {
  wordCount: number
  charCount: number
  charNoSpaceCount: number
  lineCount: number
  averageWordLength: number
  longestWordLength: number
  uniqueWordCount: number
  letterCount: number
  digitCount: number
  whitespaceCount: number
  wordFrequency: WordFrequencyItem[]
}

export interface WordFrequencyItem {
  word: string
  count: number
  percentage: number
}

export function getWords(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)
}

export function countWords(text: string): number {
  return getWords(text).length
}

export function countLines(text: string): number {
  if (!text.trim()) return 0
  return text.split('\n').length
}

export function calculateAverageWordLength(words: string[]): number {
  if (words.length === 0) return 0
  return words.reduce((sum, word) => sum + word.length, 0) / words.length
}

export function calculateLongestWordLength(words: string[]): number {
  if (words.length === 0) return 0
  return Math.max(...words.map((w) => w.length))
}

export function countUniqueWords(words: string[]): number {
  return new Set(words.map((w) => w.toLowerCase())).size
}

export function countLetters(text: string): number {
  return (text.match(/[a-zA-Z]/g) || []).length
}

export function countDigits(text: string): number {
  return (text.match(/\d/g) || []).length
}

export function countWhitespace(text: string): number {
  return (text.match(/\s/g) || []).length
}

export function calculateWordFrequency(
  words: string[],
  limit = 10,
): WordFrequencyItem[] {
  if (words.length === 0) return []

  const frequency: Record<string, number> = {}
  for (const word of words) {
    const lowerWord = word.toLowerCase()
    if (lowerWord.length > 2) {
      frequency[lowerWord] = (frequency[lowerWord] || 0) + 1
    }
  }

  const sortedWords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)

  if (sortedWords.length === 0) return []

  const maxCount = sortedWords[0][1]

  return sortedWords.map(([word, count]) => ({
    word,
    count,
    percentage: (count / maxCount) * 100,
  }))
}

export function analyzeText(text: string): TextAnalysisResult {
  const words = getWords(text)

  return {
    wordCount: words.length,
    charCount: text.length,
    charNoSpaceCount: text.replace(/\s/g, '').length,
    lineCount: countLines(text),
    averageWordLength: calculateAverageWordLength(words),
    longestWordLength: calculateLongestWordLength(words),
    uniqueWordCount: countUniqueWords(words),
    letterCount: countLetters(text),
    digitCount: countDigits(text),
    whitespaceCount: countWhitespace(text),
    wordFrequency: calculateWordFrequency(words),
  }
}

export function formatStatisticsForClipboard(
  stats: TextAnalysisResult,
): string {
  return `WORD COUNTER STATISTICS
========================

BASIC COUNTS
- Words: ${stats.wordCount}
- Characters: ${stats.charCount}
- Characters (no spaces): ${stats.charNoSpaceCount}
- Lines: ${stats.lineCount}

COMPLEXITY
- Average Word Length: ${stats.averageWordLength.toFixed(1)}
- Longest Word: ${stats.longestWordLength} characters
- Unique Words: ${stats.uniqueWordCount}

CHARACTER TYPES
- Letters: ${stats.letterCount}
- Digits: ${stats.digitCount}
- Whitespace: ${stats.whitespaceCount}`
}
