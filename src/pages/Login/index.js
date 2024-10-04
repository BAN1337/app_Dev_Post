import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { Text, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
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

    const { signUp, signIn, loadingAuth } = useContext(AuthContext)

    function toggleLogin() {
        setLogin(!login)
        setName('')
        setEmail('')
        setPassword('')
    }

    async function handleSignIn() {
        if (email.trim().length > 0 && password.trim().length > 0) {
            await signIn(email, password)
        } else {
            alert('Preencha todos os campos!')
        }
    }

    async function handleSignUp() {
        if (name.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0) {
            await signUp(name, email, password)
        } else {
            alert('Preencha todos os campos!')
        }
    }

    if (login) {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                        secureTextEntry={true}
                    />

                    <Button onPress={handleSignIn}>
                        {loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff' />
                        ) : (
                            <TextButton>Acessar</TextButton>
                        )}
                    </Button>

                    <SignUpButton onPress={toggleLogin}>
                        <SignUpTextButton>Criar uma conta</SignUpTextButton>
                    </SignUpButton>
                </Container>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                    secureTextEntry={true}
                />

                <Button onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color='#fff' />
                    ) : (
                        <TextButton>Cadastrar</TextButton>
                    )}
                </Button>

                <SignUpButton onPress={toggleLogin}>
                    <SignUpTextButton>Já possuo uma conta</SignUpTextButton>
                </SignUpButton>
            </Container>
        </TouchableWithoutFeedback>
    )
}