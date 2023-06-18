import { StyleSheet, View, SafeAreaView, Dimensions, Alert } from 'react-native';
import React,  { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import PostCard from '../PostCard';
import { Skeleton, LinearGradient, BottomSheet, ListItem } from '@rneui/themed';
import { FlashList } from "@shopify/flash-list";

export default function Home({navigation, route}) {
  let client = route.params.client

  const [posts, setPosts] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Active');
  const [page, setPage] = useState(1);

  const sortList = [
    { title: 'Active', onPress: () => changeSort(`Active`) },
    { title: 'Hot', onPress: () => changeSort(`Hot`) },
    { title: 'Most Comments', onPress: () => changeSort(`MostComments`) },
    { title: 'New', onPress: () => changeSort(`New`) },
    { title: 'New Comments', onPress: () => changeSort(`NewComments`) },
    { title: 'Old', onPress: () => changeSort(`Old`) },
    { title: 'Top All', onPress: () => changeSort(`TopAll`) },
    { title: 'Top Day', onPress: () => changeSort(`TopDay`) },
    { title: 'Top Week', onPress: () => changeSort(`TopWeek`) },
    { title: 'Top Month', onPress: () => changeSort(`TopMonth`) },
    { title: 'Top Year', onPress: () => changeSort(`TopYear`) },
  ];

  const toggleSortDrawer = () => {
    setIsVisible(!isVisible)
  }

  const changeSort = async (newSortOption) => {
    setSortOption(newSortOption)

    const initPosts = await fetchPosts(newSortOption)
    setPosts(initPosts.posts)

    toggleSortDrawer()
  }

  useEffect(() => {
    const initLoadPosts = async () => {
      const initPosts = await fetchPosts()
      setPosts(initPosts.posts)
    }

    initLoadPosts()
    route.params.toggleSortDrawer = toggleSortDrawer
  }, []);

  const fetchMore = async () => {
    try {
      client.getPosts({
        auth: await SecureStore.getItemAsync('server_jwt'),
        type_: `Local`,
        sort: sortOption,
        limit: 25,
        page: page+1
      }).
      then((sitePosts) => {
        setPosts((m) => {
          return m.concat(sitePosts.posts);
        });
      })
      
      setPage(page+1)
    }
    catch(e) {
      Alert(`Error Loading More Posts`, e)
    }
  }

  const fetchPosts = async (selectedSortOption = sortOption) => {
    try {
      return client.getPosts({
        auth: await SecureStore.getItemAsync('server_jwt'),
        type_: `Local`,
        sort: selectedSortOption,
        limit: 25,
      })
    }
    catch(e) {
      console.log(`Error Loading Posts`)
    }
  }

  const _renderitem = (post) => {
    return <PostCard data={post.item} navigation={navigation} client={client} />
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {
      (!posts) ?
        <View style={styles.loadingIcon}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={80}
            height={40}
          />
        </View>
      :
        <View style={{height: Dimensions.get("screen").height-130, width: Dimensions.get("screen").width}}>
          <FlashList 
          onEndReached={fetchMore}
          onEndReachedThreshold={0.2}
          style={styles.scrollView}
          data={posts}
          estimatedItemSize={200}
          renderItem={_renderitem} />
        </View>
      }

      <BottomSheet backdropStyle={styles.backDrop} isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        {sortList.map((l, i) => (
          <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17212D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  loadingIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  backDrop: {
    backgroundColor: `rgba(0,0,0,.8)`
  },
  button: {
    margin: 10,
  }
});
