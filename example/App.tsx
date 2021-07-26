import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
//@ts-ignore
import AutoNavigator from './AutoNavigator.js'
import registerRootComponent from 'expo/build/launch/registerRootComponent'

console.log(AutoNavigator)

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <AutoNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
)

registerRootComponent(App)
