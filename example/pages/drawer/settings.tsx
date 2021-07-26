import * as React from 'react';
import { Text, View } from 'react-native';

import { TabBarIcon } from '../../components/TabBarIcon';

export default function Screen({ navigation }) {

  React.useLayoutEffect(() => {
    if (navigation)
      navigation.setOptions({
        title: "Duo",
        drawerIcon: ({ color }) => (
          <TabBarIcon name="airplane" color={color} />
        ),
      })
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold' }} onPress={() => {
        navigation.navigate('index')
      }}>Hello Duo</Text>
      <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold' }} onPress={() => {
        navigation.toggleDrawer()
      }}>Toggle</Text>
    </View>
  );
}