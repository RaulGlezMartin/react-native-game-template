import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function usePersistedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial)

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key)
        if (raw != null) setValue(JSON.parse(raw) as T)
      } catch {}
    })()
  }, [key])

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
      } catch {}
    })()
  }, [key, value])

  return [value, setValue] as const
}
