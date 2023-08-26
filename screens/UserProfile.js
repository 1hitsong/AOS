import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@rneui/themed'
import { selectSiteData } from '../store/siteSlice'
import * as SecureStore from 'expo-secure-store';
import { format } from '../screens/helpers/dateTime'
import {
    Text,
    StyleSheet,
    View, Image, Button
} from 'react-native'

export default function UserProfile({navigation, route}) {

    // Data used for side menu
    const siteData = useSelector(selectSiteData)

    let person = siteData?.my_user?.local_user_view?.person

    useEffect(() => {
        navigation.setOptions({ title: person.name })
    }, [])

    const onLogout = () => {
        SecureStore.setItemAsync(`server_instanceURI`, '')
        SecureStore.setItemAsync(`user_username`, '')
        SecureStore.setItemAsync(`server_jwt`, '')
        navigation.navigate('LoginScreen')
    }
  
    return (
        <View style={[styles.container, styles.mainMenu]}>
            {person &&
                <View style={styles.bio}>
                    { person.banner && <Image source={{uri: person.banner}} resizeMode='cover' style={styles.bioBanner} /> }
                    { person.avatar && <Image source={{uri: person.avatar}} style={styles.bioAvatar} /> }
                    <View style={styles.bioContent}>
                        <View style={styles.cakeDay}>
                            <Icon name='cake' type='material' color='#d9d9d9' />
                            <Text style={styles.cakeDayDate}>{format(person.published)}</Text>
                        </View>
                    </View>
                    <View style={styles.logout}>
                        <Button onPress={onLogout} title='Logout' />
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 0,
        backgroundColor: '#222',
    },
    bio: {
        flexDirection:'column', 
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    bioContent: {
        padding: 16,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 50
    },
    bioAvatar: {
        width: 100,
        height: 100,
        marginLeft: 16,
        marginTop: 50,
        borderRadius: 50,
        borderColor: '#222',
        borderWidth: 3
    },
    bioBanner: {
        width: '100%',
        position: 'absolute',

        height: 100,
        marginRight: 10,
    },
    cakeDay: {
        flexDirection:'row', 
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        color: '#ddd',
        fontSize: 18,
    },
    cakeDayDate: {
        color: '#ddd',
        marginLeft: 10
    },
    bioName: {
        fontSize: 17,
        color: '#ddd',
    },
    logout: {
        padding: 16
    },
});
