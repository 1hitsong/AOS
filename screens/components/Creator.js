import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';

const Creator = ({ creator, navigation }) => {
    
        return (
            <View style={styles.container}>
                <Image 
                    source={{uri: creator.avatar}}
                    style={styles.image}
                    onPress={() => navigation.navigate('Profile', { profileId: creator.user_id })}
                />
                <Text style={styles.name}>{creator.name}</Text>
            </View>
        )
    }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        flex: 1,
    },
});

export default Creator;
