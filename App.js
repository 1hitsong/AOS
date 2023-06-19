import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Icon } from '@rneui/themed'
import * as SecureStore from 'expo-secure-store'
import { LemmyHttp } from 'lemmy-js-client'

import Home from './screens/Home'
import Login from './screens/Login'
import SinglePost from './screens/SinglePost'

const Stack = createNativeStackNavigator()

export default function App() {
  let client;
  let initialRouteName

  const isLoggedIn = async () => {
    let JWT = await SecureStore.getItemAsync('server_jwt')
    return JWT ? true : false
  }

  const setClient = async () => {
    let instance = await SecureStore.getItemAsync('server_instanceURI')
    client = new LemmyHttp(instance, null);
  }

  if (isLoggedIn()) {
    setClient().then( () => {
      initialRouteName = 'Front Page'
    })
  }
  else {
    initialRouteName = 'LoginScreen'
  }


  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#233447',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="LoginScreen" 
          component={Login} 
          initialParams={{client: client, logout: null}} />
        
        <Stack.Screen 
          name="Front Page" 
          component={Home}
          initialParams={{client: client, logout: null}}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <>
                <Icon name='filter-list' type='MaterialIcons' color='#eee' onPress={() => route.params.toggleFilterDrawer() } />
                <Icon name='sort' type='MaterialIcons' color='#eee' onPress={() => route.params.toggleSortDrawer() } />
              </>
            ),
          })} />
        
        <Stack.Screen 
          name="SinglePostScreen" 
          component={SinglePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
