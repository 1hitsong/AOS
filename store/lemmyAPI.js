import * as SecureStore from 'expo-secure-store';
import { init } from './client'

export async function fetchSiteData() {
    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.getSite({
            auth: server.jwt,
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function fetchPageData(props) {
    const {page, filter, sort, communityName} = props

    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.getPosts({
            auth: server.jwt,
            type_: filter,
            sort: sort,
            limit: 25,
            page: page,
            community_name: communityName
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function savePost(props) {
    const {postID, isFavorite} = props

    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    return server.client.savePost({
        auth: server.jwt,
        post_id: postID,
        save: isFavorite
    })
}

export async function votePost(props) {
    const {postID, score} = props

    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    return server.client.likePost({
        auth: await SecureStore.getItemAsync('server_jwt'),
        post_id: postID,
        score: score
    });
}

export async function blockCommunity(props) {
    const {communityID, block} = props

    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    return server.client.blockCommunity({
        auth: await SecureStore.getItemAsync('server_jwt'),
        community_id: communityID,
        block: block
    })
}

export async function fetchPostComments(postID) {
    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.getComments({
            auth: await SecureStore.getItemAsync('server_jwt'),
            post_id: postID,
            limit: 15
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function fetchComment(commentID) {
    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try{
        return server.client.getComment({
            auth: await SecureStore.getItemAsync('server_jwt'),
            id: commentID,
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function upvoteComment(commentID) {
    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.likeComment({
            auth: await SecureStore.getItemAsync('server_jwt'),
            comment_id: commentID,
            score: 1
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function downvoteComment(commentID) {
    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.likeComment({
            auth: await SecureStore.getItemAsync('server_jwt'),
            comment_id: commentID,
            score: -1
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function unvoteComment(commentID) {
    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.likeComment({
            auth: await SecureStore.getItemAsync('server_jwt'),
            comment_id: commentID,
            score: 0
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function saveComment(commentID) {
    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.saveComment({
            auth: await SecureStore.getItemAsync('server_jwt'),
            comment_id: commentID,
            save: true
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function unsaveComment(commentID) {
    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.saveComment({
            auth: await SecureStore.getItemAsync('server_jwt'),
            comment_id: commentID,
            save: false
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function commentOnPost(props) {
    const {postID, body} = props

    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.createComment({
            auth: await SecureStore.getItemAsync('server_jwt'),
            post_id: postID,
            body: body
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}

export async function commentOnComment(props) {
    const {commentID, body} = props

    const server = await init(await SecureStore.getItemAsync('server_instanceURI'))

    try {
        return server.client.createComment({
            auth: await SecureStore.getItemAsync('server_jwt'),
            comment_id: commentID,
            body: body
        })
    }
    catch (e) {
        console.log(`Error`, e)
    }
}