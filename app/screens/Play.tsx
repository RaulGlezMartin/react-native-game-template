import { View, Text, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'Play'>
type Color = 'RED' | 'BLUE'

export default function Play({ navigation }: Props) {
  const [target, setTarget] = useState<Color>('RED')
  const [score, setScore] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTarget(prev => (prev === 'RED' ? 'BLUE' : 'RED')), 1000)
    return () => clearInterval(t)
  }, [])

  const handlePress = (c: Color) => {
    if (c === target) setScore(s => s + 1)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#0e0e12' }}>
      <Text style={{ color: 'white', fontSize: 18 }}>¡Toca {target}!  •  Score: {score}</Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable onPress={() => handlePress('RED')}>
          <View style={{ width: 100, height: 100, backgroundColor: 'red', borderRadius: 12 }} />
        </Pressable>
        <Pressable onPress={() => handlePress('BLUE')}>
          <View style={{ width: 100, height: 100, backgroundColor: 'blue', borderRadius: 12 }} />
        </Pressable>
      </View>

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={{ color: '#9cf', marginTop: 24 }}>Salir</Text>
      </Pressable>
    </View>
  )
}
