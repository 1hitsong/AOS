import React from 'react'
import {
    Text,
    StyleSheet,
    View, Image
} from 'react-native'

const CommunityListItem = ({navigationRef, drawer, data}) => 
    <View style={styles.communityListItem}>
        {data.community.icon ?
            <Image source={{uri: data.community.icon}} style={styles.communityIcon} />
        :
            <View style={styles.missingIcon} />
        }
        <Text style={styles.communityName} onPress={() => {
            drawer.current.closeDrawer()
            navigationRef.navigate('Community', { communityName: `${data.community.name}@${data.community.actor_id.split('/')[2]}` })
        }}>
            {data.community.name}
        </Text>
    </View>

const styles = StyleSheet.create({
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
    missingIcon: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        width: 32,
        height: 32,
        marginRight: 10,
        borderRadius: 16
    },
    communityName: {
        fontSize: 16,
        color: '#ffffff',
    },
})

export default CommunityListItem