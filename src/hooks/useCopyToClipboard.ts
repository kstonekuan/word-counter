import { useCallback, useRef, useState } from 'react'

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyToClipboard = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    if (timeoutReference.current) {
      clearTimeout(timeoutReference.current)
    }
    timeoutReference.current = setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }, [])

  return { copyToClipboard, isCopied }
}
