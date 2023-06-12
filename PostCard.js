import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import Markdown from '@jonasmerlin/react-native-markdown-display';
import * as SecureStore from 'expo-secure-store';

const truncate = (input) => input.length > 150 ? `${input.substring(0, 150)}…` : input;

const markdownRules = {
  list_item: (node, children, parent, styles) =>
    <Text key={node.key} style={[styles.list_item]}>
      • {children}</Text>
};

export default function PostCard(props) {
  const postData = props.data
  let client = props.client
  let postContent
  
  if (postData.post.body) {
    postContent = <Markdown rules={markdownRules} style={styles.markdown}>{truncate(postData.post.body)}</Markdown>
  }
  else if (postData.post.thumbnail_url) {
    postContent = <Card.Image
      style={{ padding: 0 }}
      source={{
        uri:
        postData.post.thumbnail_url,
      }}
    />
  }
  else if (postData.post.embed_description) {
    postContent = <Markdown style={styles.markdown}>{truncate(postData.post.embed_description)}</Markdown>
  }

  const [postVote, setPostVote] = useState(postData.my_vote);

  const onVote = async (value) => {
    if (postVote === value) { value = 0 }

    setPostVote(value)
    try {
      await client.likePost({
        auth: await SecureStore.getItemAsync('server_jwt'),
        post_id: postData.post.id,
        score: value
      });
    } catch(e) {
      return;
    }
  };

  const titleContainerType = (postData.post.body && postData.post.thumbnail_url) ? styles.titleShareWidth : styles.titleFullWidth

  const upVoteIconColor = (postVote === 1) ? `#3498db` : `#eee`
  const downVoteIconColor = (postVote === -1) ? `#3498db` : `#eee`
  
  return (
    <React.Fragment key={postData.post.id}>
      <Card containerStyle={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          { postData.community.icon &&
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: postData.community.icon }}
            />
          }
          <Text style={styles.community}>{postData.community.name}</Text>
        </View>

        <View style={{flexDirection:'row', alignItems:'flex-start'}}>
          <View style={titleContainerType}>
            <Card.Title style={styles.title}>{postData.post.name}</Card.Title>
          </View>
          { postData.post.body && postData.post.thumbnail_url &&
            <View style={styles.thumbnailContainer}>
              <Image
                style={styles.thumbnail}
                resizeMode="cover"
                source={{ uri: postData.post.thumbnail_url }}
              />
            </View>
          }
        </View>
        
        <View style={styles.counts}>
          <Text style={styles.score}>{postData.counts.score}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.comments}>{postData.counts.comments} comments</Text>
        </View>

        {postContent}

        <View style={styles.actions}>
          <Icon onPress={() => onVote(1)} name='thumb-up' type='MaterialIcons' color={upVoteIconColor} />
          <Icon onPress={() => onVote(-1)} name='thumb-down' type='MaterialIcons' color={downVoteIconColor} />
          <Icon name='bookmark' type='MaterialIcons' color='#eee' />
          <Icon name='comment' type='MaterialIcons' color='#eee' />
          <Icon name='content-copy' type='MaterialIcons' color='#eee' />
          <Icon name='share' type='MaterialIcons' color='#eee' />
        </View>
      </Card>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    flex: 1,
    backgroundColor: '#1B2836',
    color: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 10,
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 10
  },
  font: {
    color: '#ffffff'
  },
  title: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 17,
    marginTop: 5
  },
  community: {
    color: '#F95151',
    textAlign: 'left',
    fontSize: 12
  },
  counts: {
    flexDirection:'row', 
    alignItems: 'baseline',
    marginBottom: 10
  },
  actions: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 10
  },
  score: {
    color: '#ddd',
    fontSize: 22,
    marginRight: 5
  },
  dot: {
    color: '#ddd',
    marginRight: 5
  },
  comments: {
    color: '#ddd',
    fontSize: 15,
  },
  markdown: {
    body: { 
      backgroundColor: '#233447', 
      borderRadius: 3, 
      borderWidth: 0, 
      color: '#ffffff', 
      paddingHorizontal: 7, 
      flexDirection: 'row', 
      flexWrap: 'wrap' 
    },
    blockquote: { 
      backgroundColor: '#304864' 
    },
    list_item: { 
      color: '#ffffff'
    },
    bullet_list: { 
      color: '#ffffff'
    },
    ordered_list: { 
      color: '#ffffff'
    }
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 10,
    borderRadius: 16
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginLeft: 10
  },
  titleShareWidth: {
    width: '85%'
  },
  titleFullWidth: {
    width: '100%'
  },
  thumbnailContainer: {
    justifyContent: 'flex-start',
    width: '15%'
  }
});
