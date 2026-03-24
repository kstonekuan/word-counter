import { useCallback, useState } from 'react'

export function useLocalStorage(
  key: string,
  initialValue: string,
): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = localStorage.getItem(key)
    return item ?? initialValue
  })

  const setValue = useCallback(
    (value: string) => {
      setStoredValue(value)
      if (value === '') {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, value)
      }
    },
    [key],
  )

  return [storedValue, setValue]
}
