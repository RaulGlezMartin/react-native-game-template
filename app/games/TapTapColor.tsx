import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import type { GameAPI } from '../components/GameShell'

type Color = 'RED' | 'BLUE'

export default function TapTapColor({ api }: { api: GameAPI }) {
  const [target, setTarget] = useState<Color>('RED')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Cambia el objetivo cada 1s (solo si el juego está corriendo)
  useEffect(() => {
    if (api.isRunning) {
      timerRef.current = setInterval(() => {
        setTarget(prev => (prev === 'RED' ? 'BLUE' : 'RED'))
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [api.isRunning])

  const handlePress = (c: Color) => {
    if (!api.isRunning) return
    if (c === target) {
      api.addScore(1)
    } else {
      // Fallo → termina el juego
      api.endGame()
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text style={{ color: 'white', fontSize: 18 }}>¡Toca {target}!</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable onPress={() => handlePress('RED')}>
          <View style={{ width: 120, height: 120, backgroundColor: 'red', borderRadius: 16 }} />
        </Pressable>
        <Pressable onPress={() => handlePress('BLUE')}>
          <View style={{ width: 120, height: 120, backgroundColor: 'blue', borderRadius: 16 }} />
        </Pressable>
      </View>
      <Text style={{ color: '#bbb', marginTop: 12, paddingHorizontal: 24, textAlign: 'center' }}>
        Si fallas el color, la partida termina. Pausa para descansar 😉
      </Text>
    </View>
  )
}
