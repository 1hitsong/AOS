import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { upvote, downvote, save, zerovote } from '../../store/commentSlice';
import { useDispatch } from 'react-redux';

const notSelectedColor = `#eee`;
const selectedColor = `#3498db`;

const CommentReactions = ({ comment, onCommentEvent }) => {
    const commentId = comment.comment.id;
    const isUpvoted = comment.my_vote === 1;
    const isDownvoted = comment.my_vote === -1;
    const isSaved = comment.saved;

    const dispatch = useDispatch();

    const upPressed = async () => {
        try{
            if (isUpvoted) {
                dispatch(zerovote(commentId));
                onCommentEvent({type: 'zerovote'});
            }
            else
            {
                dispatch(upvote(commentId));
                onCommentEvent({type: 'upvote'});
            }
        } catch (err) {
            console.log(err);
        }
    }

    const downPressed = () => {
        try {
            if (isDownvoted) {
                dispatch(zerovote(commentId));
                onCommentEvent({type: 'zerovote'});
            }
            else
            {
                dispatch(downvote(commentId));
                onCommentEvent({type: 'downvote'});
            }
        } catch (err) {
            console.log(err);
        }
    }

    const savePressed = () => {
        try {
            if (isSaved) {
                dispatch(unsave(commentId));
                onCommentEvent({type: 'unsave'});
            }
            else
            {
                dispatch(save(commentId));
                onCommentEvent({type: 'save'});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.actions}>
            <Icon onPress={() => upPressed()} name='thumb-up' type='MaterialIcons' color={isUpvoted ? selectedColor : notSelectedColor} />
            <Icon onPress={() => downPressed()} name='thumb-down' type='MaterialIcons' color={isDownvoted ? selectedColor : notSelectedColor} />
            <Icon onPress={() => savePressed()} name='bookmark' type='MaterialIcons' color={isSaved ? selectedColor : notSelectedColor} />
            <Icon name='comment' type='MaterialIcons' color='#eee' />
            <Icon name='content-copy' type='MaterialIcons' color='#eee' />
            <Icon name='share' type='MaterialIcons' color='#eee' />
        </View>
    );
};

const styles = StyleSheet.create({
    actions: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 10
    }
});

export default CommentReactions;
