import React, { useState, useLayoutEffect, useContext } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { AuthContext } from "../../contexts/auth";

import {
    Container,
    Input,
    Button,
    TextButton
} from "./styles";

export default function NewPost() {
    const [post, setPost] = useState('')

    const navigation = useNavigation()

    const { user } = useContext(AuthContext)

    useLayoutEffect(() => {
        const options = navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => handlePost()}>
                    <TextButton>Compartilhar</TextButton>
                </Button>
            )
        })
    }, [navigation, post])

    async function handlePost() {
        if (post.trim().length > 0) {
            let avatarURL = null

            try {
                let response = await storage().ref('users').child(user?.uid).getDownloadURL()

                avatarURL = response
            } catch (err) {
                avatarURL = null
            }

            await firestore().collection('posts')
                .add({
                    createdAt: new Date(),
                    content: post,
                    author: user?.name,
                    userId: user?.uid,
                    likes: 0,
                    avatarURL
                })
                .then(() => {
                    setPost('')
                    alert('Post compartilhado com sucesso!')

                })
                .catch((err) => {
                    alert('Erro ao compartilhar o post!')
                })

            navigation.goBack()
        } else (
            alert('Precisa digitar algo!')
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>

                <Input
                    placeholder="O que está acontecendo?"
                    value={post}
                    onChangeText={(text) => setPost(text)}
                    autoCorrect={false} //Para o corretor do celular não interferir no texto digitado
                    multiline={true}
                    placeholderTextColor='#ddd'
                    maxLength={300}
                />
            </Container>
        </TouchableWithoutFeedback>
    )
}