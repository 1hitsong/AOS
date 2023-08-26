import {View, Text, StyleSheet} from 'react-native';
import { useState } from 'react';
import Creator from './Creator';
import CommentReactions from './CommentReactions';
import { useDispatch } from 'react-redux';
import { getComment } from '../../store/commentSlice';
import { fuzzyTimeStamp } from '../helpers/dateTime';

const Comment = (props) => {
    const [comment, setComment] = useState(props.comment);
    const dispatch = useDispatch();

    let commentDate = fuzzyTimeStamp(comment.counts.published);


    const handleCommentEvent = async () => {
        var updatedCommentResponse = await dispatch(getComment(comment.comment.id));
        var updatedComment = updatedCommentResponse.payload;
        setComment(updatedComment);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.content}>{comment.comment.content}</Text>
        <Text style={styles.votes}>Upvotes: {comment.counts.upvotes} Downvotes: {comment.counts.downvotes}</Text>
        <Text style={styles.details}>Posted:{commentDate}</Text>
        <Creator style={styles.creator} creator={comment.creator} />
        <CommentReactions comment={comment}  onCommentEvent={handleCommentEvent}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B2836',
        padding: 20,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1
      },
    creator: {
        fontWeight: 'bold',
        margin: 10,
        color: '#ffffff',
        textAlign: 'right'
    },
    content: {
        fontSize: 16,
        color: '#ffffff'
    },
    votes: {
        color: '#ffffff',
        margin: 10
    },
    details: {
        color: '#ffffff',
        margin: 10
    }
});

export default Comment;