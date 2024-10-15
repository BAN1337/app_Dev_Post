import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { launchImageLibrary } from "react-native-image-picker";

import { Modal, Platform } from "react-native";
import {
    Container,
    UploadButton,
    UploadText,
    Avatar,
    Name,
    Email,
    Button,
    ButtonText,
    ModalContainer,
    ButtonBack,
    Input
} from "./styles";
import Header from "../../components/Header";

export default function Profile() {
    const { user, signOut, setUser, storageUser } = useContext(AuthContext)

    const [name, setName] = useState(user?.name)
    const [url, setUrl] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)

    useEffect(() => {
        let isActive = true;

        async function loadAvatar() {
            try {
                if (isActive) {
                    let response = await storage().ref('users').child(user.uid).getDownloadURL()

                    setUrl(response)
                }
            } catch (err) {
                console.log('Não encontramos nenhuma foto!')
            }
        }

        loadAvatar()

        return () => isActive = false
    }, [])

    async function handleSignOut() {
        await signOut()
    }

    async function updateProfile() {
        if (name.trim().length > 0) {
            await firestore().collection('users')
                .doc(user?.uid)
                .update({
                    name: name
                })

            const postDocs = await firestore().collection('posts')
                .where('userId', '==', user?.uid)
                .get()

            postDocs.forEach(async doc => {
                await firestore().collection('posts')
                    .doc(doc.id)
                    .update({
                        author: name
                    })
            })

            let data = {
                uid: user?.uid,
                name: name,
                email: user?.email
            }

            setUser(data)
            storageUser(data)
            setVisibleModal(false)
        } else {
            alert('Nome incorreto!')
        }
    }

    function uploadFile() {
        const options = {
            noData: true,
            mediaType: 'photo'
        }

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('Cancelou!')
            } else if (response.error) {
                alert('Houve algum erro ao carregar a foto!')
            } else {
                uploadFileStorage(response)
                    .then(() => {
                        uploadAvatarPosts()
                    })

                setUrl(response.assets[0].uri)
            }
        })
    }

    function getFileLocalPath(response) {
        return response.assets[0].uri;
    }

    async function uploadFileStorage(response) {
        const fileSource = getFileLocalPath(response)

        const storageRef = storage().ref('users').child(user?.uid)

        return await storageRef.putFile(fileSource)
    }

    async function uploadAvatarPosts() {
        const storageRef = storage().ref('users').child(user?.uid)
        await storageRef.getDownloadURL()
            .then(async (image) => {
                const postDocs = await firestore().collection('posts')
                    .where('userId', '==', user?.uid).get()

                postDocs.forEach(async doc => {
                    await firestore().collection('posts')
                        .doc(doc.id)
                        .update({
                            avatarURL: image
                        })
                })
            })
            .catch((err) => {
                alert('Erro ao atualizar a foto dos posts!')
            })
    }

    return (
        <Container>
            <Header />

            {url ? (
                <UploadButton onPress={uploadFile}>
                    <UploadText>+</UploadText>

                    <Avatar
                        source={{ uri: url }}
                    />
                </UploadButton>
            ) : (
                <UploadButton onPress={uploadFile}>
                    <UploadText>+</UploadText>

                    <Avatar
                        source={require('../../assets/avatar.png')}
                    />
                </UploadButton>
            )}

            <Name numberOfLines={1}>{name}</Name>

            <Email>{user?.email}</Email>

            <Button bg='#428cfd' onPress={() => setVisibleModal(true)}>
                <ButtonText color='#fff'>Atualizar Perfil</ButtonText>
            </Button>

            <Button bg='#ddd' onPress={handleSignOut} >
                <ButtonText color='#3b3b3b'>Sair</ButtonText>
            </Button>

            <Modal visible={visibleModal} animationType='slide' transparent={true}>
                <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
                    <ButtonBack onPress={() => setVisibleModal(false)}>
                        <Feather name='arrow-left' size={22} color='#121212' />
                        <ButtonText color='#121212'>Voltar</ButtonText>
                    </ButtonBack>

                    <Input
                        placeholder={user?.name}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    <Button bg='#428cfd' onPress={updateProfile}>
                        <ButtonText color='#fff'>Salvar</ButtonText>
                    </Button>
                </ModalContainer>
            </Modal>
        </Container>
    )
}