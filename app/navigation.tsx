import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home'
import Play from './screens/Play'

export type RootStackParamList = {
    Home: undefined
    Play: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Play" component={Play} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}