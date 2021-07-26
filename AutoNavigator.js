import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
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

const Stack = createStackNavigator()
const MaterialBottomTabs = createMaterialBottomTabNavigator()


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
    <Stack.Navigator {...props} {...PagesDrawerConfig} drawerContent={PagesDrawerDrawerContent}>
      <Stack.Screen name={'index'} key={'index'}  component={PagesDrawerIndex}/>
      <Stack.Screen name={'settings'} key={'settings'}  component={PagesDrawerSettings}/>
    </Stack.Navigator>
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
    <Stack.Navigator {...props} {...PagesNativeConfig}>
      <Stack.Screen name={'index'} key={'index'}  component={PagesNativeIndex}/>
    </Stack.Navigator>
  )
}

function StackScreen (props){
  return (
    <Stack.Navigator {...props} {...PagesStackConfig}>
      <Stack.Screen name={'index'} key={'index'}  component={PagesStackIndex}/>
    </Stack.Navigator>
  )
}

function TabsProfileScreen (props){
  return (
    <Stack.Navigator {...props} {...PagesTabsProfileConfig}>
      <Stack.Screen name={'alpha'} key={'alpha'}  component={PagesTabsProfileAlpha}/>
      <Stack.Screen name={'beta'} key={'beta'}  component={PagesTabsProfileBeta}/>
      <Stack.Screen name={'zeta'} key={'zeta'}  component={PagesTabsProfileZeta}/>
    </Stack.Navigator>
  )
}

function TabsScreen (props){
  return (
    <Stack.Navigator {...props} {...PagesTabsConfig}>
      <Stack.Screen name={'profile'} key={'profile'}  component={TabsProfileScreen}/>
    </Stack.Navigator>
  )
}

function AutoNavigation (props){
  return (
    <Stack.Navigator {...props} {...PagesConfig}>
      <Stack.Screen name={'auth'} key={'auth'}  component={AuthScreen}/>
      <Stack.Screen name={'custom'} key={'custom'}  component={CustomScreen}/>
      <Stack.Screen name={'drawer'} key={'drawer'}  component={DrawerScreen}/>
      <Stack.Screen name={'m-bottom'} key={'m-bottom'}  component={MBottomScreen}/>
      <Stack.Screen name={'native'} key={'native'}  component={NativeScreen}/>
      <Stack.Screen name={'stack'} key={'stack'}  component={StackScreen}/>
      <Stack.Screen name={'tabs'} key={'tabs'}  component={TabsScreen}/>
    </Stack.Navigator>
  )
}

export default AutoNavigation
