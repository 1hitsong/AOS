import React, { useRef } from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Icon } from '@rneui/themed'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toggleSortMenu, toggleFilterMenu } from './store/appSlice'
import SideMenu from './screens/components/SideMenu'
import { DrawerLayoutAndroid, StyleSheet } from 'react-native'

const Stack = createNativeStackNavigator()

// Screens
import Home from './screens/Home'
import Community from './screens/Community'
import Login from './screens/Login'
import SinglePost from './screens/SinglePost'
import UserProfile from './screens/UserProfile'

const App = () => {

    const drawer = useRef()
    const navigationRef = useNavigationContainerRef()
    const dispatch = useDispatch()

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition='left'
            renderNavigationView={() => <SideMenu navigationRef={navigationRef} drawer={drawer} />}
        >
            <NavigationContainer ref={navigationRef}>
                <StatusBar style="light" />
                <Stack.Navigator
                    initialRouteName='LoginScreen'
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#2a2a2a',
                        },
                        headerTintColor: '#d9d9d9',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen name="LoginScreen" component={Login} />
        
                    <Stack.Screen 
                        name="Front Page" 
                        component={Home}
                        initialParams={{}}
                        options={({ navigation, route }) => ({
                            headerLeft: () => (
                                <>
                                    <Icon name='menu' type='MaterialIcons' color='#d9d9d9' onPress={() => drawer.current.openDrawer() } />
                                </>
                            ),
                            headerRight: () => (
                                <>
                                    <Icon name='filter-list' type='MaterialIcons' color='#d9d9d9' onPress={() => dispatch(toggleFilterMenu()) } />
                                    <Icon name='sort' type='MaterialIcons' color='#d9d9d9' onPress={() => dispatch(toggleSortMenu()) } />
                                </>
                            ),
                        })} 
                    />

                    <Stack.Screen 
                        name="Community" 
                        component={Community}
                        initialParams={{}}
                        options={({ navigation, route }) => ({
                            title: route.params.communityName,
                            headerLeft: () => (
                                <>
                                    <Icon name='menu' type='MaterialIcons' color='#d9d9d9' onPress={() => drawer.current.openDrawer() } />
                                </>
                            ),
                            headerRight: () => (
                                <>
                                    <Icon name='filter-list' type='MaterialIcons' color='#d9d9d9' onPress={() => dispatch(toggleFilterMenu()) } />
                                    <Icon name='sort' type='MaterialIcons' color='#d9d9d9' onPress={() => dispatch(toggleSortMenu()) } />
                                </>
                            ),
                        })} 
                    />
        
                    <Stack.Screen name="SinglePostScreen" component={SinglePost} />
                    <Stack.Screen name="UserProfile" component={UserProfile} />
                </Stack.Navigator>
            </NavigationContainer>
        </DrawerLayoutAndroid>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    navigationContainer: {
        backgroundColor: '#000000',
    },
})

export default AppWrapper = () =>
    <Provider store={store}>
        <App />
    </Provider>