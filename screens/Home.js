import { StyleSheet, View, SafeAreaView, Dimensions, Alert } from 'react-native';
import React,  { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Timeline from './components/Timeline';
import {BottomSheet, ListItem } from '@rneui/themed';
import LoadingIcon from './components/LoadingIcon';

export default function Home({navigation, route}) {
  let client = route.params.client

  const [posts, setPosts] = useState();
  const [sortIsVisible, setSortIsVisible] = useState(false);
  const [filterIsVisible, setFilterIsVisible] = useState(false);

  const [sortOption, setSortOption] = useState('Active');
  const [filterOption, setFilterOption] = useState('Local');
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false)

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

  const filterList = [
    { title: 'All', onPress: () => changeFilter(`All`) },
    { title: 'Local', onPress: () => changeFilter(`Local`) },
    { title: 'Subscribed', onPress: () => changeFilter(`Subscribed`) },
  ];

  const toggleSortDrawer = () => {
    setSortIsVisible(!sortIsVisible)
  }

  const toggleFilterDrawer = () => {
    setFilterIsVisible(!filterIsVisible)
  }

  const changeSort = async (newSortOption) => {
    setSortOption(newSortOption)

    const initPosts = await fetchPosts(newSortOption, filterOption)
    setPosts(initPosts.posts)

    toggleSortDrawer()
  }

  const changeFilter = async (newFilterOption) => {
    setFilterOption(newFilterOption)

    const initPosts = await fetchPosts(sortOption, newFilterOption)
    setPosts(initPosts.posts)

    toggleFilterDrawer()
  }

  const initLoadPosts = () => {
    try {
      fetchPosts().then( (data) => {
        setPosts(data.posts)
        setIsRefreshing(false)
      })
    }
    catch(e) {
      console.log(`Error Loading Posts`, e.message)
    }
  }

  useEffect(() => {
    initLoadPosts()
    route.params.toggleSortDrawer = toggleSortDrawer
    route.params.toggleFilterDrawer = toggleFilterDrawer
  }, []);

  const fetchMore = async () => {
    try {
      client.getPosts({
        auth: await SecureStore.getItemAsync('server_jwt'),
        type_: filterOption,
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

  const fetchPosts = async (newSortOption = sortOption, newFilterOption = filterOption) => {
    try {
      return client.getPosts({
        auth: await SecureStore.getItemAsync('server_jwt'),
        type_: newFilterOption,
        sort: newSortOption,
        limit: 25,
        page: 1
      })
    }
    catch(e) {
      console.log(`Error Loading Posts`)
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {
      (posts) ?
        <Timeline posts={posts} refresh={initLoadPosts} isRefreshing={isRefreshing} setIsRefreshing={setIsRefreshing} fetchMore={fetchMore} navigation={navigation} client={client} />
      :
        <LoadingIcon />        
      }

      <BottomSheet backdropStyle={styles.backDrop} isVisible={sortIsVisible} onBackdropPress={() => setSortIsVisible(false)}>
        {sortList.map((l, i) => (
          <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>

      <BottomSheet backdropStyle={styles.backDrop} isVisible={filterIsVisible} onBackdropPress={() => setFilterIsVisible(false)}>
        {filterList.map((l, i) => (
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
  backDrop: {
    backgroundColor: `rgba(0,0,0,.8)`
  },
  button: {
    margin: 10,
  }
});
