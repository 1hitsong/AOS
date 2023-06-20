import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import PostCard from './PostCard';

const TimeLine = (props) => {

    const {posts, refresh, isRefreshing, setIsRefreshing, fetchMore, navigation} = props

    const onRefresh = () => {
        setIsRefreshing(true)
        refresh()
    }

    const _renderitem = (post) => {
        return <PostCard data={post.item} navigation={navigation} />
    }

    return (
        <View style={{height: Dimensions.get("screen").height-130, width: Dimensions.get("screen").width}}>
            <FlashList 
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.3}
                style={styles.scrollView}
                data={posts}
                estimatedItemSize={200}
                renderItem={_renderitem} 
            />
        </View>
    )
};

const styles = StyleSheet.create({

});

export default TimeLine;