import React, { JSX, useMemo, useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { usePersistedState } from '../hooks/usePersistedState'

export type GameAPI = {
  addScore: (n: number) => void
  endGame: () => void
  isRunning: boolean
}

type Props = {
  title?: string
  storageKey?: string            // clave para guardar récord
  children: (api: GameAPI) => JSX.Element
  onExit?: () => void
}

export default function GameShell({
  title = 'Juego',
  storageKey = 'BEST_SCORE_DEFAULT',
  children,
  onExit,
}: Props) {
  const [score, setScore] = useState(0)
  const [best, setBest] = usePersistedState<number>(`${storageKey}:best`, 0)
  const [isRunning, setIsRunning] = useState(true)
  const [isOver, setIsOver] = useState(false)

  const api: GameAPI = useMemo(() => ({
    addScore: (n: number) => {
      if (!isRunning || isOver) return
      setScore((s) => s + n)
    },
    endGame: () => {
      setIsRunning(false)
      setIsOver(true)
      setBest((b) => (score > b ? score : b))
    },
    isRunning,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [isRunning, isOver, score])

  const togglePause = () => setIsRunning(r => !r)
  const handleExit = () => {
    onExit?.()
  }
  const handleRetry = () => {
    setScore(0)
    setIsOver(false)
    setIsRunning(true)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0e0e12' }}>
      {/* HUD */}
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, backgroundColor: '#12121a'
      }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>{title}</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Text style={{ color: 'white' }}>Score: {score}</Text>
          <Text style={{ color: '#9cf' }}>Best: {best}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable onPress={togglePause}>
            <Text style={{ color: '#fff' }}>{isRunning ? 'Pausa' : 'Reanudar'}</Text>
          </Pressable>
          <Pressable onPress={handleExit}>
            <Text style={{ color: '#ff9' }}>Salir</Text>
          </Pressable>
        </View>
      </View>

      {/* Zona de juego */}
      <View style={{ flex: 1, paddingTop: 64 }}>
        {children(api)}
      </View>

      {/* Modal Game Over */}
      <Modal visible={isOver} transparent animationType="fade">
        <View style={{
          flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{
            width: '80%', backgroundColor: '#1a1a24', borderRadius: 16, padding: 20, gap: 12
          }}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>¡Game Over!</Text>
            <Text style={{ color: 'white' }}>Score: {score}</Text>
            <Text style={{ color: '#9cf' }}>Mejor: {best}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16, marginTop: 8 }}>
              <Pressable onPress={handleRetry}><Text style={{ color: '#fff' }}>Reintentar</Text></Pressable>
              <Pressable onPress={handleExit}><Text style={{ color: '#ff9' }}>Salir</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Overlay Pausa */}
      {!isRunning && !isOver && (
        <View style={{
          position: 'absolute', top: 64, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 12 }}>Pausado</Text>
          <Pressable onPress={togglePause}>
            <Text style={{ color: '#fff' }}>Reanudar</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}
