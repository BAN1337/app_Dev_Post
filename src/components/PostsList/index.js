import React, { useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ptBR } from "date-fns/locale";
import { formatDistance } from "date-fns";
import firestore from '@react-native-firebase/firestore'

import {
    Container,
    HeaderPost,
    Avatar,
    Name,
    ContentView,
    Content,
    Actions,
    LikeButton,
    LikeAmount,
    TimePost
} from "./styles";

export default function PostsList({ data, userId }) {

    const [likePost, setLikePost] = useState(data?.likes)

    function formatTimePost() {
        const datePost = new Date(data.createdAt.seconds * 1000)

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    }

    async function handleLikePost(id, likes) {
        const docId = `${userId}_${id}`

        const doc = await firestore().collection('likes')
            .doc(docId).get()

        if (doc.exists) {
            await firestore().collection('posts')
                .doc(id)
                .update({
                    likes: likes - 1
                })

            await firestore().collection('likes')
                .doc(docId)
                .delete()
                .then(() => {
                    setLikePost(likes - 1)
                })
        } else {
            await firestore().collection('likes')
                .doc(docId)
                .set({
                    postId: id,
                    userId
                })

            await firestore().collection('posts')
                .doc(id)
                .update({
                    likes: likes + 1
                })
                .then(() => {
                    setLikePost(likes + 1)
                })
        }
    }

    return (
        <Container>
            <HeaderPost>
                {data.avatarURL ? (
                    <Avatar
                        source={{ uri: data.avatarURL }}
                    />
                ) : (
                    <Avatar
                        source={require('../../assets/avatar.png')}
                    />
                )}

                <Name numberOfLines={1}>
                    {data?.author}
                </Name>
            </HeaderPost>

            <ContentView>
                <Content>{data?.content}</Content>
            </ContentView>

            <Actions>
                <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
                    {likePost > 0 && (
                        <LikeAmount>
                            {likePost}
                        </LikeAmount>
                    )}
                    <MaterialCommunityIcons
                        name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
                        color='#e52246'
                        size={20}
                    />
                </LikeButton>

                <TimePost>
                    {formatTimePost()}
                </TimePost>
            </Actions>
        </Container>
    )
}