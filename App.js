import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Icon } from '@rneui/themed'
import { store } from './store/store'
import { Provider } from 'react-redux';

import Home from './screens/Home'
import Login from './screens/Login'
import SinglePost from './screens/SinglePost'

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName='LoginScreen'
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
            initialParams={{}} />
          
          <Stack.Screen 
            name="Front Page" 
            component={Home}
            initialParams={{}}
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
    </Provider>
  );
}
