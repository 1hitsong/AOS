import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import PostCard from './components/PostCard';
import Comment from './components/Comment';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getPostComments, setPostData } from '../store/postSlice'

export default function SinglePost() {
  const route = useRoute();
  const postData = route.params?.postData;
  const dispatch = useDispatch();

  const [comments, setComments] = useState();

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const fetchPostAndComments = async () => {
    try {
      const responses = await Promise.all([
        dispatch(setPostData(postData)),
        dispatch(getPostComments(postData.post.id))
      ]);
      
      const commentsData = responses[1].payload;
      setComments(commentsData);
    } catch (err) {
      console.log(err);
    }
  };

  const renderComment = ({ item }) => <Comment comment={item} />;
  
  return (
    <SafeAreaView style={styles.container}>
      {comments && 
        <FlatList
          ListHeaderComponent={() => {
            return (<PostCard key={postData.post.id} data={postData} />)
          }}
          data={comments}
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
