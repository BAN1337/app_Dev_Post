import React, { useState, useContext, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from "../../contexts/auth";
import firestore from '@react-native-firebase/firestore'

import { View } from "react-native";
import {
    Container,
    ButtonPost,
    ListPosts
} from "./styles";
import Header from "../../components/Header";
import PostsList from "../../components/PostsList";

export default function Home() {
    const { user } = useContext(AuthContext)

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            let isActive = true

            function loadPosts() {
                firestore().collection('posts')
                    .orderBy('createdAt', 'desc')
                    .limit(5)
                    .get()
                    .then((snapshot) => {
                        if (isActive) {
                            setPosts([])
                            const postList = []

                            snapshot.docs.map(post => {
                                postList.push({
                                    ...post.data(),
                                    id: post.id
                                })
                            })

                            setPosts(postList)
                            setLoading(false)
                        }
                    })
            }

            loadPosts()

            return () => {
                isActive = false
            }
        }, [])
    )

    return (
        <Container>
            <Header />

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
                    <ActivityIndicator size={50} color='#e52246' />
                </View>
            ) : (
                <ListPosts
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <PostsList
                            data={item}
                            userId={user?.uid}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <ButtonPost activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
                <Feather name='edit-2' color='#fff' size={25} />
            </ButtonPost>
        </Container>
    )
}