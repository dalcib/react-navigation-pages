import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import PagesAuthAuth from './pages/auth/auth'
import PagesAuthHome from './pages/auth/home'
import PagesAuthConfig from './pages/auth/_config'
import PagesCustomIndex from './pages/custom/index'
import PagesCustomIndex2 from './pages/custom/index2'
import PagesCustomIndex3 from './pages/custom/index3'
import PagesCustomNavigator from './pages/custom/_navigator'
import PagesDrawerIndex from './pages/drawer/index'
import PagesDrawerSettings from './pages/drawer/settings'
import PagesDrawerConfigJson from './pages/drawer/_config.json'
import PagesDrawerDrawerContent from './pages/drawer/_drawerContent'
import PagesMBottomAlpha from './pages/m-bottom/alpha'
import PagesMBottomBeta from './pages/m-bottom/beta'
import PagesMBottomConfig from './pages/m-bottom/_config'
import PagesNativeIndex from './pages/native/index'
import PagesNativeConfigJson from './pages/native/_config.json'
import PagesStackIndex from './pages/stack/index'
import PagesStackConfigJson from './pages/stack/_config.json'
import PagesTabsProfileAlpha from './pages/tabs/profile/alpha'
import PagesTabsProfileBeta from './pages/tabs/profile/beta'
import PagesTabsProfileZeta from './pages/tabs/profile/zeta'
import PagesTabsProfileConfigJson from './pages/tabs/profile/_config.json'
import PagesTabsConfigJson from './pages/tabs/_config.json'
import PagesConfigJson from './pages/_config.json'

const BottomTabs = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const MaterialBottomTabs = createMaterialBottomTabNavigator()
const MaterialTopTabs = createMaterialTopTabNavigator()


function AuthScreen (props){
  return (
    <Stack.Navigator {...props} {...PagesAuthConfig}>
      <Stack.Screen name={'auth'} key={'auth'}  component={PagesAuthAuth}/>
      <Stack.Screen name={'home'} key={'home'}  component={PagesAuthHome}/>
    </Stack.Navigator>
  )
}

function CustomScreen (props){
  return (
    <PagesCustomNavigator {...props}>
      <Stack.Screen name={'index'} key={'index'}  component={PagesCustomIndex}/>
      <Stack.Screen name={'index2'} key={'index2'}  component={PagesCustomIndex2}/>
      <Stack.Screen name={'index3'} key={'index3'}  component={PagesCustomIndex3}/>
    </PagesCustomNavigator>
  )
}

function DrawerScreen (props){
  return (
    <Drawer.Navigator {...props} {...PagesDrawerConfigJson} drawerContent={PagesDrawerDrawerContent}>
      <Drawer.Screen name={'index'} key={'index'}  component={PagesDrawerIndex}/>
      <Drawer.Screen name={'settings'} key={'settings'}  component={PagesDrawerSettings}/>
    </Drawer.Navigator>
  )
}

function MBottomScreen (props){
  return (
    <MaterialBottomTabs.Navigator {...props} {...PagesMBottomConfig}>
      <MaterialBottomTabs.Screen name={'alpha'} key={'alpha'}  component={PagesMBottomAlpha}/>
      <MaterialBottomTabs.Screen name={'beta'} key={'beta'}  component={PagesMBottomBeta}/>
    </MaterialBottomTabs.Navigator>
  )
}

function NativeScreen (props){
  return (
    <Stack.Navigator {...props} {...PagesNativeConfigJson}>
      <Stack.Screen name={'index'} key={'index'}  component={PagesNativeIndex}/>
    </Stack.Navigator>
  )
}

function StackScreen (props){
  return (
    <Stack.Navigator {...props} {...PagesStackConfigJson}>
      <Stack.Screen name={'index'} key={'index'}  component={PagesStackIndex}/>
    </Stack.Navigator>
  )
}

function TabsProfileScreen (props){
  return (
    <MaterialTopTabs.Navigator {...props} {...PagesTabsProfileConfigJson}>
      <MaterialTopTabs.Screen name={'alpha'} key={'alpha'}  component={PagesTabsProfileAlpha}/>
      <MaterialTopTabs.Screen name={'beta'} key={'beta'}  component={PagesTabsProfileBeta}/>
      <MaterialTopTabs.Screen name={'zeta'} key={'zeta'}  component={PagesTabsProfileZeta}/>
    </MaterialTopTabs.Navigator>
  )
}

function TabsScreen (props){
  return (
    <Stack.Navigator {...props} {...PagesTabsConfigJson}>
      <Stack.Screen name={'profile'} key={'profile'}  component={TabsProfileScreen}/>
    </Stack.Navigator>
  )
}

function AutoNavigation (props){
  return (
    <BottomTabs.Navigator {...props} {...PagesConfigJson}>
      <BottomTabs.Screen name={'auth'} key={'auth'}  component={AuthScreen}/>
      <BottomTabs.Screen name={'custom'} key={'custom'}  component={CustomScreen}/>
      <BottomTabs.Screen name={'drawer'} key={'drawer'}  component={DrawerScreen}/>
      <BottomTabs.Screen name={'m-bottom'} key={'m-bottom'}  component={MBottomScreen}/>
      <BottomTabs.Screen name={'native'} key={'native'}  component={NativeScreen}/>
      <BottomTabs.Screen name={'stack'} key={'stack'}  component={StackScreen}/>
      <BottomTabs.Screen name={'tabs'} key={'tabs'}  component={TabsScreen}/>
    </BottomTabs.Navigator>
  )
}

export default AutoNavigation
