import React, { useRef } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { selectPageData } from '../../store/timelineSlice';
import LoadingIcon from '../components/LoadingIcon';

const TimeLine = (props) => {

    const timeLineScrollList = useRef()

    const {refresh, isRefreshing, setIsRefreshing, fetchMore, navigation} = props

    const posts = useSelector(selectPageData);

    const onRefresh = () => {
        setIsRefreshing(true)
        refresh()
    }

    const _renderitem = (post) => {
        return <PostCard data={post.item} navigation={navigation} />
    }

    return (
        (!posts) ?
            <LoadingIcon />  
        :
            <View style={{height: Dimensions.get("screen").height-130, width: Dimensions.get("screen").width}}>
                <FlashList 
                    ref={timeLineScrollList}
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    onEndReached={fetchMore}
                    onEndReachedThreshold={0.3}
                    style={styles.scrollView}
                    data={posts}
                    onTouchMove={ (e) => {
                        if (e.nativeEvent.touches.length === 3) {
                            timeLineScrollList.current.scrollToOffset({ offset: 0, animated: true });
                        }
                    }}
                    estimatedItemSize={200}
                    renderItem={_renderitem} 
                />
            </View>
    )
};

const styles = StyleSheet.create({

});

export default TimeLine;