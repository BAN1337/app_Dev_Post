import React, { useState } from "react";
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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function PostsList({ data, userId }) {

    const [likePost, setLikePost] = useState(data?.likes)

    function handleLike() {

    }

    return (
        <Container>
            <HeaderPost>
                <Avatar
                    source={require('../../assets/avatar.png')}
                />
                <Name numberOfLines={1}>
                    {data.author}
                </Name>
            </HeaderPost>

            <ContentView>
                <Content>{data.content}</Content>
            </ContentView>

            <Actions>
                <LikeButton onPress={handleLike}>
                    <LikeAmount>{likePost}</LikeAmount>
                    <MaterialCommunityIcons
                        name='heart-plus-outline'
                        color='#e52246'
                        size={20}
                    />
                </LikeButton>

                <TimePost>
                    há um minuto
                </TimePost>
            </Actions>
        </Container>
    )
}