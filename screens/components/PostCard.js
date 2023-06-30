import React, { useState, memo } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Modal, Share } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import Markdown from '@jonasmerlin/react-native-markdown-display';
import { savePost, votePost, blockCommunity } from '../../store/lemmyAPI';
import { fuzzyTimeStamp } from '../helpers/dateTime'

const truncate = (input) => input.length > 150 ? `${input.substring(0, 150)}…` : input;

const markdownRules = {
  list_item: (node, children, parent, styles) =>
    <Text key={node.key} style={[styles.list_item]}>
      • {children}</Text>
};

export default memo(PostCard);

function PostCard(props) {
  const postData = props.data
  let navigation = props.navigation
  let postContent
  let postDomain
  let postTimeStamp

  if (postData.post.published) {
    postTimeStamp = fuzzyTimeStamp(postData.post.published)
    postTimeStamp = ` • ` + postTimeStamp
  }

  if (postData.post.url) {
    postDomain = postData.post.url
    postDomain = postDomain.split('/')[2]

    if ((postDomain.match(/\./g)||[]).length > 1) {
      postDomain = `${postDomain.split('.')[1]}.${postDomain.split('.')[2]}`
    }

    postDomain = ` • ` + postDomain
  }

  if (!postData) return
  if (!postData.post) return
  
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
  const [isFavorite, setIsFavorite] = useState(postData.saved);

  const onFavorite = async () => {
    try {
      savePost({
        postID: postData.post.id, 
        isFavorite: !isFavorite
      })

      setIsFavorite(!isFavorite)
    } catch(e) {
      console.log(`Error`, e)
      return;
    }
  };

  const onVote = async (value) => {
    if (postVote === value) { value = 0 }

    setPostVote(value)
    try {
      await votePost({
        postID: postData.post.id,
        score: value
      });
    } catch(e) {
      return;
    }
  };

  const onBlockCommunity = async (communityID) => {
    try {
      blockCommunity({
        community_id: communityID,
        block: true
      }).
      then( () => {
        setModalVisible(false)
      });
    } catch(e) {
      return;
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${postData.post.name}\n\n${postData.post.url}`,
        title: postData.post.name,
        url: postData.post.url,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const titleContainerType = (postData.post.body && postData.post.thumbnail_url) ? styles.titleShareWidth : styles.titleFullWidth

  const upVoteIconColor = (postVote === 1) ? `#3498db` : `#eee`
  const downVoteIconColor = (postVote === -1) ? `#3498db` : `#eee`
  const favoriteIconColor = (isFavorite) ? `#3498db` : `#eee`

  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onBlockCommunity(postData.community.id)}>
              <Text style={styles.textStyle}>Block Community</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable key={postData.post.id} onPress={ () => navigation.navigate('SinglePostScreen') }>
        <Card containerStyle={styles.container}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            { postData.community.icon &&
              <Pressable onLongPress={ () => setModalVisible(true) }>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: postData.community.icon }}
                />
              </Pressable>
            }
            <Text style={styles.community} onPress={() => {
              navigation.navigate('Community', { communityName: `${postData.community.name}@${postData.community.actor_id.split('/')[2]}` })
              }
            }>{postData.community.name}</Text>
            <Text style={styles.domain}>{postDomain}</Text>
            <Text style={styles.timestamp}>{postTimeStamp}</Text>
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
            <Icon onPress={onFavorite} name='bookmark' type='MaterialIcons' color={favoriteIconColor} />
            <Icon name='comment' type='MaterialIcons' color='#eee' />
            <Icon name='content-copy' type='MaterialIcons' color='#eee' />
            <Icon onPress={onShare} name='share' type='MaterialIcons' color='#eee' />
          </View>
        </Card>
      </Pressable>
    </View>
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
  domain: {
    color: '#888',
    textAlign: 'left',
    fontSize: 12
  },
  timestamp: {
    color: '#888',
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
