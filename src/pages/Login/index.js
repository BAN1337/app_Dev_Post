import React, { useState } from "react";
import { Text } from "react-native";
import {
    Button,
    Container,
    Input,
    TextButton,
    Title,
    SignUpButton,
    SignUpTextButton
} from "./styles";

export default function Login() {
    const [login, setLogin] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function toggleLogin() {
        setLogin(!login)
        setName('')
        setEmail('')
        setPassword('')
    }

    function handleSignIn() {
        if (email.trim().length > 0 && password.trim().length > 0) {

        } else {
            alert('PREENCHA TODOS OS CAMPOS')
        }
    }

    function handleSignUp() {
        if (name.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0) {

        } else {
            alert('PREENCHA TODOS OS CAMPOS')
        }
    }

    if (login) {
        return (
            <Container>
                <Title>
                    Dev<Text style={{ color: '#e52246' }}>Post</Text>
                </Title>

                <Input
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder="********"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button onPress={handleSignIn}>
                    <TextButton>Acessar</TextButton>
                </Button>

                <SignUpButton onPress={toggleLogin}>
                    <SignUpTextButton>Criar uma conta</SignUpTextButton>
                </SignUpButton>
            </Container>
        )
    }

    return (
        <Container>
            <Title>
                Dev<Text style={{ color: '#e52246' }}>Post</Text>
            </Title>

            <Input
                placeholder="Seu nome"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Input
                placeholder="email@email.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Input
                placeholder="********"
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <Button onPress={handleSignUp}>
                <TextButton>Cadastrar</TextButton>
            </Button>

            <SignUpButton onPress={toggleLogin}>
                <SignUpTextButton>Já possuo uma conta</SignUpTextButton>
            </SignUpButton>
        </Container>
    )
}