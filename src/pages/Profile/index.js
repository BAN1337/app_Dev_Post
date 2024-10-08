import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import {
    Container,
    Name,
    Email,
    Button,
    ButtonText
} from "./styles";
import Header from "../../components/Header";

export default function Profile() {
    const { user, signOut } = useContext(AuthContext)

    async function handleSignOut() {
        await signOut()
    }

    return (
        <Container>
            <Header />

            <Name>{user.name}</Name>

            <Email>{user.email}</Email>

            <Button>
                <ButtonText>Atualizar Perfil</ButtonText>
            </Button>

            <Button onPress={() => signOut()}>
                <ButtonText>Sair</ButtonText>
            </Button>
        </Container>
    )
}