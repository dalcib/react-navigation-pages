import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import ExamplePagesAuthAuth from './example/pages/auth/auth'
import ExamplePagesAuthHome from './example/pages/auth/home'
import ExamplePagesCustomIndex from './example/pages/custom/index'
import ExamplePagesCustomIndex2 from './example/pages/custom/index2'
import ExamplePagesCustomIndex3 from './example/pages/custom/index3'
import ExamplePagesCustomNavigator from './example/pages/custom/_navigator'
import ExamplePagesDrawerIndex from './example/pages/drawer/index'
import ExamplePagesDrawerSettings from './example/pages/drawer/settings'
import ExamplePagesDrawerDrawerContent from './example/pages/drawer/_drawerContent'
import ExamplePagesMBottomTabsAlpha from './example/pages/m-bottom-tabs/alpha'
import ExamplePagesMBottomTabsBeta from './example/pages/m-bottom-tabs/beta'
import ExamplePagesNativeIndex from './example/pages/native/index'
import ExamplePagesStackIndex from './example/pages/stack/index'
import ExamplePagesTabsProfileAlpha from './example/pages/tabs/profile/alpha'
import ExamplePagesTabsProfileBeta from './example/pages/tabs/profile/beta'
import ExamplePagesTabsProfileZeta from './example/pages/tabs/profile/zeta'

const BottomTabs = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const MaterialBottomTabs = createMaterialBottomTabNavigator()
const MaterialTopTabs = createMaterialTopTabNavigator()

function AuthScreen(props) {
  return (
    <Stack.Navigator
      {...props}
      {...{
        headerMode: 'none',
        gestureEnabled: false,
        screenOptions: {
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } },
            close: { animation: 'timing', config: { duration: 0 } },
          },
        },
      }}>
      <Stack.Screen name={'auth'} key={'auth'} component={ExamplePagesAuthAuth} />
      <Stack.Screen name={'home'} key={'home'} component={ExamplePagesAuthHome} />
    </Stack.Navigator>
  )
}

function CustomScreen(props) {
  return (
    <ExamplePagesCustomNavigator {...props}>
      <Stack.Screen name={'index'} key={'index'} component={ExamplePagesCustomIndex} />
      <Stack.Screen name={'index2'} key={'index2'} component={ExamplePagesCustomIndex2} />
      <Stack.Screen name={'index3'} key={'index3'} component={ExamplePagesCustomIndex3} />
    </ExamplePagesCustomNavigator>
  )
}

function DrawerScreen(props) {
  return (
    <Drawer.Navigator {...props} drawerContent={ExamplePagesDrawerDrawerContent}>
      <Drawer.Screen name={'index'} key={'index'} component={ExamplePagesDrawerIndex} />
      <Drawer.Screen name={'settings'} key={'settings'} component={ExamplePagesDrawerSettings} />
    </Drawer.Navigator>
  )
}

function MBottomTabsScreen(props) {
  return (
    <MaterialBottomTabs.Navigator {...props}>
      <MaterialBottomTabs.Screen
        name={'alpha'}
        key={'alpha'}
        component={ExamplePagesMBottomTabsAlpha}
      />
      <MaterialBottomTabs.Screen
        name={'beta'}
        key={'beta'}
        component={ExamplePagesMBottomTabsBeta}
      />
    </MaterialBottomTabs.Navigator>
  )
}

function NativeScreen(props) {
  return (
    <Stack.Navigator {...props}>
      <Stack.Screen name={'index'} key={'index'} component={ExamplePagesNativeIndex} />
    </Stack.Navigator>
  )
}

function StackScreen(props) {
  return (
    <Stack.Navigator {...props}>
      <Stack.Screen name={'index'} key={'index'} component={ExamplePagesStackIndex} />
    </Stack.Navigator>
  )
}

function TabsProfileScreen(props) {
  return (
    <MaterialTopTabs.Navigator {...props}>
      <MaterialTopTabs.Screen
        name={'alpha'}
        key={'alpha'}
        component={ExamplePagesTabsProfileAlpha}
      />
      <MaterialTopTabs.Screen name={'beta'} key={'beta'} component={ExamplePagesTabsProfileBeta} />
      <MaterialTopTabs.Screen name={'zeta'} key={'zeta'} component={ExamplePagesTabsProfileZeta} />
    </MaterialTopTabs.Navigator>
  )
}

function TabsScreen(props) {
  return (
    <Stack.Navigator {...props}>
      <Stack.Screen name={'profile'} key={'profile'} component={TabsProfileScreen} />
    </Stack.Navigator>
  )
}

function AutoNavigation(props) {
  return (
    <BottomTabs.Navigator
      {...props}
      {...{
        initialRouteName: 'stack',
        tabBarOptions: { activeTintColor: 'tomato', inactiveTintColor: 'gray' },
      }}>
      <BottomTabs.Screen name={'auth'} key={'auth'} component={AuthScreen} />
      <BottomTabs.Screen name={'custom'} key={'custom'} component={CustomScreen} />
      <BottomTabs.Screen name={'drawer'} key={'drawer'} component={DrawerScreen} />
      <BottomTabs.Screen
        name={'m-bottom-tabs'}
        key={'m-bottom-tabs'}
        component={MBottomTabsScreen}
      />
      <BottomTabs.Screen name={'native'} key={'native'} component={NativeScreen} />
      <BottomTabs.Screen name={'stack'} key={'stack'} component={StackScreen} />
      <BottomTabs.Screen name={'tabs'} key={'tabs'} component={TabsScreen} />
    </BottomTabs.Navigator>
  )
}

export default AutoNavigation
