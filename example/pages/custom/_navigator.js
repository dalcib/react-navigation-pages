import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExamplePagesDrawerCustomIndex3 from './index3'

const Stack = createStackNavigator()

export default function StackScreen(props) {
  return <Stack.Navigator {...props}>{props.children}</Stack.Navigator>
}
//<Stack.Screen name={'index'} key={'index'} component={ExamplePagesStackIndex} />
