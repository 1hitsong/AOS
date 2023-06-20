import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

const upVoteIconColor = `#eee`;
const downVoteIconColor = `#eee`;

const CommentReactions = ({ onVote }) => {
    return (
        <View style={styles.actions}>
            <Icon onPress={() => onVote(1)} name='thumb-up' type='MaterialIcons' color={upVoteIconColor} />
            <Icon onPress={() => onVote(-1)} name='thumb-down' type='MaterialIcons' color={downVoteIconColor} />
            <Icon name='bookmark' type='MaterialIcons' color='#eee' />
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
