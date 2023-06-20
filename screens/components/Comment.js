import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Creator from './Creator';
import CommentReactions from './CommentReactions';

const commentVote = (voteTotal) => {
    if (voteTotal > 1 || voteTotal < -1) {
        console.log("Invalid vote total");
    }
    else if (voteTotal === 1) {
        return "upvote";
    }
    else if (voteTotal === -1) {
        return "downvote";
    }
}

const Comment = ({ comment }) => {

    return (
        <View style={styles.container}>
        <Text style={styles.content}>{comment.comment.content}</Text>
        <Creator creator={comment.creator} />
        <CommentReactions onVote={commentVote}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17212D',
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 10
      },
    author: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff',
        textAlign: 'right'
    },
    content: {
        fontSize: 16,
        color: '#ffffff'
    }
});

export default Comment;