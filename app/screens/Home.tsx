import { View, Text, Pressable } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function Home({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Mi Plantilla de Juegos</Text>

      <Pressable
        onPress={() => navigation.navigate('Play')}
        style={{ padding: 16, backgroundColor: '#111', borderRadius: 12 }}
      >
        <Text style={{ color: '#fff' }}>Jugar demo</Text>
      </Pressable>
    </View>
  )
}