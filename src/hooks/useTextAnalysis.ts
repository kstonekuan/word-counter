import { useMemo } from 'react'
import { analyzeText, type TextAnalysisResult } from '../utils/textAnalysis.ts'

export function useTextAnalysis(text: string): TextAnalysisResult {
  return useMemo(() => analyzeText(text), [text])
}
