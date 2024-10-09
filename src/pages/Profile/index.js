import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Feather from 'react-native-vector-icons/Feather'


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
    const { user, signOut } = useContext(AuthContext)

    const [name, setName] = useState(user?.name)
    const [url, setUrl] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)

    async function handleSignOut() {
        await signOut()
    }

    async function updateProfile() {
        alert('teste')
    }

    return (
        <Container>
            <Header />

            {url ? (
                <UploadButton>
                    <UploadText>+</UploadText>

                    <Avatar
                        source={{ uri: url }}
                    />
                </UploadButton>
            ) : (
                <UploadButton>
                    <UploadText>+</UploadText>

                    <Avatar
                        source={require('../../assets/avatar.png')}
                    />
                </UploadButton>
            )}

            <Name numberOfLines={1}>{user?.name}</Name>

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