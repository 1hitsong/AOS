import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import PostCard from './components/PostCard';
import Comment from './components/Comment';
import Markdown from '@jonasmerlin/react-native-markdown-display';

const Item = (comment) => (
  <View key={comment.data.comment.id} style={styles.item}>
    <Markdown style={styles.title}>{comment.data.comment.content}</Markdown>
  </View>
);

export default function SinglePost({navigation, route}) {
  let client = route.params.client

  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    setPost(route.params.post)
    fetchComments(route.params.post.post.id);
  }, []);

  const fetchComments = async (singlePostID) => {
    let postComments = await client.getComments({
      auth: await SecureStore.getItemAsync('server_jwt'),
      post_id: singlePostID,
      limit: 15
    })

    setComments(postComments)
  }

  const renderComment = ({ item }) => <Comment comment={item} />;
  
  return (
    <SafeAreaView style={styles.container}>
      {comments && comments.comments && 
        <FlatList
          ListHeaderComponent={() => {
            return (<PostCard key={post.post.id} data={post} />)
          }}
          data={comments.comments}
          renderItem={renderComment}
          keyExtractor={item => item.comment.id}
        />
      }
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
});
