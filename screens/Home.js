import { StyleSheet, View, SafeAreaView, Dimensions, Alert } from 'react-native';
import React,  { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import {BottomSheet, ListItem } from '@rneui/themed';
import LoadingIcon from './components/LoadingIcon';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectPageData,
    getPageData, reloadPageData
  } from '../store/timelineSlice';

export default function Home({navigation, route}) {

  const [sortIsVisible, setSortIsVisible] = useState(false);
  const [filterIsVisible, setFilterIsVisible] = useState(false);

  const [sortOption, setSortOption] = useState('Active');
  const [filterOption, setFilterOption] = useState('Local');
  const [pageNumber, setPageNumber] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false)

  const posts = useSelector(selectPageData);
  const dispatch = useDispatch();

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
    ReloadPosts(filterOption, newSortOption)
    toggleSortDrawer()
  }

  const changeFilter = async (newFilterOption) => {
    setFilterOption(newFilterOption)
    ReloadPosts(newFilterOption, sortOption)
    toggleFilterDrawer()
  }

  const ReloadPosts = (filter, sort) => {
    try {
      setIsRefreshing(true)

      const page = 1
      dispatch(reloadPageData({page, filter, sort}))
      setPageNumber(page)
      setIsRefreshing(false)
    }
    catch(e) {
      console.log(`Error Loading Posts`, e.message)
    }
  }

  const LoadPosts = (page, filter, sort) => {
    try {
      setIsRefreshing(true)
      dispatch(getPageData({page, filter, sort}))
      setIsRefreshing(false)
    }
    catch(e) {
      console.log(`Error Loading Posts`, e.message)
    }
  }

  useEffect(() => {
    LoadPosts(pageNumber, filterOption, sortOption)
    route.params.toggleSortDrawer = toggleSortDrawer
    route.params.toggleFilterDrawer = toggleFilterDrawer
  }, []);

  const onRefresh = async () => {
    ReloadPosts(filterOption, sortOption)
  }

  const fetchMore = async () => {
    const newPageNumber = pageNumber + 1
    LoadPosts(newPageNumber, filterOption, sortOption)
    setPageNumber(newPageNumber)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {
      (posts) ?
        <Timeline posts={posts} refresh={onRefresh} isRefreshing={isRefreshing} setIsRefreshing={setIsRefreshing} fetchMore={fetchMore} navigation={navigation} />
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
