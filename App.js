import React from 'react';
import { NavigationContainer, navigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native';
import { Icon } from '@rneui/themed';

import Home from './screens/Home';
import Login from './screens/Login';
import SinglePost from './screens/SinglePost';

const Stack = createNativeStackNavigator();

export default function App() {
  let client;
  
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
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
          options={({ navigation, route }) => ({
            headerRight: () => (
              <Icon name='sort' type='MaterialIcons' color='#eee' onPress={() => route.params.toggleSortDrawer() } />
            ),
          })} />
        
        <Stack.Screen 
          name="SinglePostScreen" 
          component={SinglePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
