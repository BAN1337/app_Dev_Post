import React, { useLayoutEffect, useState, useCallback, useContext } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from "../../contexts/auth";

import {
    Container,
    ListPosts
} from "./styles";
import PostsList from "../../components/PostsList";

export default function PostsUser() {
    const route = useRoute()
    const navigation = useNavigation()
    const { user } = useContext(AuthContext)

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        if (route?.params?.comeTab) {
            navigation.setOptions({
                title: route?.params?.title === '' ? '' : route?.params?.title,
                // Aqui usamos o "headerLeft" padrão
                headerLeft: () => null,  // Isso remove o padrão
            });

            // Adicionamos um listener para interceptar o botão de voltar
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();  // Previne o comportamento padrão

                // Navega de volta para a tela Search
                navigation.navigate('Search')
                navigation.dispatch(e.data.action)
            });

        } else {
            navigation.setOptions({
                title: route?.params?.title === '' ? '' : route?.params?.title
            })
        }
    }, [navigation, route?.params?.title, route?.params?.userId])

    useFocusEffect(
        useCallback(() => {
            let isActive = true

            firestore().collection('posts')
                .where('userId', '==', route.params?.userId)
                .orderBy('createdAt', 'desc')
                .get()
                .then((snapshot) => {
                    const postList = []

                    snapshot.docs.map(post => {
                        postList.push({
                            ...post.data(),
                            id: post.id
                        })
                    })

                    if (isActive) {
                        setPosts(postList)
                        setLoading(false)
                    }
                })

            return () => {
                isActive = false
            }
        }, [route?.params?.title, route?.params?.userId])
    )

    return (
        <Container>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={50} color='#e52246' />
                </View>
            ) : (
                <ListPosts
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <PostsList
                            data={item}
                            userId={user?.uid}
                        />
                    )}
                />
            )}
        </Container>
    )
}