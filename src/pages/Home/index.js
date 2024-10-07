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
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingRefresh, setLoadingRefresh] = useState(false)
    const [lastItem, setLastItem] = useState('')
    const [emptyList, setEmptyList] = useState(false)

    const { user } = useContext(AuthContext)

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

                            setEmptyList(!!snapshot.empty)
                            setPosts(postList)
                            setLastItem(snapshot.docs[snapshot.docs.length - 1])
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

    //Buscar por posts mais recentes ou atualizar, quando puxar sua lista para cima
    async function handleRefreshPosts() {
        setLoadingRefresh(true)

        await firestore().collection('posts')
            .orderBy('createdAt', 'desc')
            .limit(5)
            .get()
            .then((snapshot) => {
                setPosts([])
                const postList = []

                snapshot.docs.map(post => {
                    postList.push({
                        ...post.data(),
                        id: post.id
                    })
                })

                setEmptyList(false)
                setPosts(postList)
                setLastItem(snapshot.docs[snapshot.docs.length - 1])
                setLoading(false)
            })

        setLoadingRefresh(false)
    }

    //Buscar mais posts quando chegar no final da lista
    async function getListPosts() {
        if (emptyList) {
            setLoading(false)
            return null
        }

        if (loading) return

        firestore().collection('posts')
            .orderBy('createdAt', 'desc')
            .limit(5)
            .startAfter(lastItem)
            .get()
            .then((snapshot) => {
                const postList = []

                snapshot.docs.map(post => {
                    postList.push({
                        ...post.data(),
                        id: post.id
                    })
                })

                setEmptyList(!!snapshot.empty)
                setLastItem(snapshot.docs[snapshot.docs.length - 1])
                setPosts(oldPosts => [...oldPosts, ...postList])
                setLoading(false)
            })
    }

    return (
        <Container>
            <Header />

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
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
                    refreshing={loadingRefresh} //Serve para mostrar a bolinha de refresh, se estiver true fica mostrando, quando estiver falso, para de mostrar
                    onRefresh={handleRefreshPosts} //Quando for atualizado ele executa a função
                    onEndReached={() => getListPosts()} //Quando chega no final da lista ele executa a função
                    onEndReachedThreshold={0.1} //O quando perto do final para que seja executado a função
                />
            )}

            <ButtonPost activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
                <Feather name='edit-2' color='#fff' size={25} />
            </ButtonPost>
        </Container>
    )
}