import React from 'react';
import { useSelector } from 'react-redux';
import { selectSiteData } from '../store/siteSlice'
import * as SecureStore from 'expo-secure-store';
import {
    Text,
    StyleSheet,
    View, Image, Button
} from 'react-native'

export default function UserProfile({navigation, route}) {

    // Data used for side menu
    const siteData = useSelector(selectSiteData)

    let person = siteData?.my_user?.local_user_view?.person

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
                    <Image source={{uri: person.avatar}} style={styles.bioAvatar} />
                    <Text style={styles.bioName}>{person.name}</Text>
                    <Button onPress={onLogout} title='Logout' />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
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
    bioName: {
        fontSize: 16,
        color: '#ffffff',
    },
});
