import React, {useRef, useEffect} from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Icon } from '@rneui/themed'
import { store } from './store/store'
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSortMenu, toggleFilterMenu } from './store/appSlice';
import { selectSiteData, getSiteData } from './store/siteSlice';

import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View, Image, FlatList
} from 'react-native';

import Home from './screens/Home'
import Community from './screens/Community'
import Login from './screens/Login'
import SinglePost from './screens/SinglePost'

const Stack = createNativeStackNavigator()

const AppWrapper = () =>
    <Provider store={store}>
        <App />
    </Provider>

export default AppWrapper

const App = () => {

  const dispatch = useDispatch();
  const drawer = useRef(null);
  const navigationRef = useNavigationContainerRef()
  const siteData = useSelector(selectSiteData);

  useEffect(() => {
    dispatch(getSiteData())
  }, []);

  const MainMenu = (drawer) => {
    let person = siteData?.my_user?.local_user_view?.person
    let communityFollows = siteData?.my_user?.follows
    let communityMod = siteData?.my_user?.moderates

    const CommunityListItem = ({data}) => (
      <View style={styles.communityListItem}>
        {data.community.icon ?
          <Image source={{uri: data.community.icon}} style={styles.communityIcon} />
          :
          <View style={styles.missingIcon} />
        }
        <Text style={styles.communityName} onPress={() => {
          drawer.current.closeDrawer()
          navigationRef.navigate('Community', { communityName: `${data.community.name}@${data.community.actor_id.split('/')[2]}` })
        }
        }>{data.community.name}</Text>
      </View>
    );

    return (
        <View style={[styles.container, styles.mainMenu]}>
          {person &&
            <View style={styles.bio}>
              <Image source={{uri: person.avatar}} style={styles.bioAvatar} />
              <Text style={styles.bioName}>{person.name}</Text>
            </View>
          }

          {communityMod && communityMod.length > 0 &&
            <View style={styles.communitySection}>
              <Text style={styles.bioName}>Moderates</Text>
              <View style={styles.communityList}>
                <FlatList
                  data={communityMod}
                  renderItem={({item}) => <CommunityListItem data={item} />}
                  keyExtractor={item => item.community.id}
                />
              </View>
            </View>
          }

          {communityFollows && communityFollows.length > 0 &&
            <View style={styles.communitySection}>
              <Text style={styles.bioName}>Subscribed</Text>
              <View style={styles.communityList}>
                <FlatList
                  data={communityFollows}
                  renderItem={({item}) => <CommunityListItem data={item} />}
                  keyExtractor={item => item.community.id}
                />
              </View>
            </View>
          }

            <Button title="Close drawer" onPress={() => drawer.current.closeDrawer()} />
        </View>
    )
}

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition='left'
      renderNavigationView={() => MainMenu(drawer)}>
    <NavigationContainer ref={navigationRef}>
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
            headerLeft: () => (
              <>
                <Icon name='menu' type='MaterialIcons' color='#eee' onPress={() => drawer.current.openDrawer() } />
              </>
            ),
            headerRight: () => (
              <>
                <Icon name='filter-list' type='MaterialIcons' color='#eee' onPress={() => dispatch(toggleFilterMenu()) } />
                <Icon name='sort' type='MaterialIcons' color='#eee' onPress={() => dispatch(toggleSortMenu()) } />
              </>
            ),
          })} />

        <Stack.Screen 
          name="Community" 
          component={Community}
          initialParams={{}}
          options={({ navigation, route }) => ({
            title: route.params.communityName,
            headerLeft: () => (
              <>
                <Icon name='menu' type='MaterialIcons' color='#eee' onPress={() => drawer.current.openDrawer() } />
              </>
            ),
            headerRight: () => (
              <>
                <Icon name='filter-list' type='MaterialIcons' color='#eee' onPress={() => dispatch(toggleFilterMenu()) } />
                <Icon name='sort' type='MaterialIcons' color='#eee' onPress={() => dispatch(toggleSortMenu()) } />
              </>
            ),
          })} />
        
        <Stack.Screen 
          name="SinglePostScreen" 
          component={SinglePost} />
      </Stack.Navigator>
    </NavigationContainer>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    navigationContainer: {
      backgroundColor: '#ecf0f1',
    },
    mainMenu: {
      flex: 1,
      backgroundColor: '#17212D',
      paddingTop: 75,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    bio: {
      flexDirection:'row', 
      alignItems: 'center',
      marginBottom: 10
    },
    bioAvatar: {
      width: 32,
      height: 32,
      marginRight: 10,
      borderRadius: 16
    },
    missingIcon: {
      backgroundColor: 'rgba(0, 0, 0, .5)',
      width: 32,
      height: 32,
      marginRight: 10,
      borderRadius: 16
    },
    bioName: {
      fontSize: 16,
      color: '#ffffff',
    },
    communitySection: {
      flexDirection:'column', 
      alignItems: 'center',
      marginBottom: 10,
    },
    communityList: {
      flexDirection:'row', 
      alignItems: 'center',
      marginBottom: 10
    },
    communityListItem: {
      flexDirection:'row', 
      alignItems: 'center',
      marginBottom: 10,
      color: '#ffffff',
      height: 50,
      borderBottomWidth: 1,
      borderColor: `#233447`,
      padding: 5
    },
    communityIcon: {
      width: 32,
      height: 32,
      marginRight: 10,
      borderRadius: 16
    },
    communityName: {
      fontSize: 16,
      color: '#ffffff',
    },
  });