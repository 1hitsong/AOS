import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import PostCard from '../PostCard';

export default function Home({navigation, route}) {
  let client = route.params.client

  const [posts, setPosts] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let sitePosts = await client.getPosts({
      auth: await SecureStore.getItemAsync('server_jwt'),
      type_: `Local`,
      sort: 'Active',
      limit: 25
    })

    setPosts(sitePosts)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      {posts && posts.posts && posts.posts.map(post => (
        <Pressable key={post.post.id} onPress={ () => navigation.navigate('SinglePostScreen', {client: client, post: post}) }>
          <PostCard data={post} client={client} />
        </Pressable>
        ))}
      </ScrollView>
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
});
