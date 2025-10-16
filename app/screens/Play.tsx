import { View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../navigation'
import GameShell from '../components/GameShell'
import TapTapColor from '../games/TapTapColor'

type Props = NativeStackScreenProps<RootStackParamList, 'Play'>

export default function Play({ navigation }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <GameShell
        title="Tap Tap Color"
        storageKey="TAP_TAP_COLOR"
        onExit={() => navigation.goBack()}
      >
        {(api) => <TapTapColor api={api} />}
      </GameShell>
    </View>
  )
}
