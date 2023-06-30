import React, { useEffect } from 'react'
import {
    Text,
    StyleSheet,
    View, Image, FlatList
} from 'react-native'
import CommunityListItem from './CommunityListItem'
import { useSelector, useDispatch } from 'react-redux'
import { selectSiteData, getSiteData } from '../../store/siteSlice'

const SideMenu = ({navigationRef, drawer}) => {
    const dispatch = useDispatch()

    // Data used for side menu
    const siteData = useSelector(selectSiteData)
  
    // Get data for side menu
    useEffect(() => {
        dispatch(getSiteData())
    }, [])

    let person = siteData?.my_user?.local_user_view?.person
    let communityFollows = siteData?.my_user?.follows
    let communityMod = siteData?.my_user?.moderates
  
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
                        renderItem={({item}) => <CommunityListItem navigationRef={navigationRef} drawer={drawer} data={item} />}
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
                            renderItem={({item}) => <CommunityListItem navigationRef={navigationRef} drawer={drawer} data={item} />}
                            keyExtractor={item => item.community.id}
                        />
                    </View>
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
})

export default SideMenu