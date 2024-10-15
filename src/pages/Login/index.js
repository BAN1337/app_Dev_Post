import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import * as Animatable from 'react-native-animatable'

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

const TitleAnimated = Animatable.createAnimatableComponent(Title)
const InputAnimated = Animatable.createAnimatableComponent(Input)
const ButtonAnimated = Animatable.createAnimatableComponent(Button)
const SignUpButtonAnimated = Animatable.createAnimatableComponent(SignUpButton)

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
                    <TitleAnimated animation='flipInY'>
                        Dev<Text style={{ color: '#e52246' }}>Post</Text>
                    </TitleAnimated>

                    <InputAnimated
                        animation='slideInLeft'
                        placeholder="email@email.com"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                    <InputAnimated
                        animation='slideInRight'
                        placeholder="********"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />

                    <ButtonAnimated animation='slideInLeft' onPress={handleSignIn}>
                        {loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff' />
                        ) : (
                            <TextButton>Acessar</TextButton>
                        )}
                    </ButtonAnimated>

                    <SignUpButtonAnimated animation='slideInUp' onPress={toggleLogin}>
                        <SignUpTextButton>Criar uma conta</SignUpTextButton>
                    </SignUpButtonAnimated>
                </Container>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
                <TitleAnimated animation='flipInX'>
                    Dev<Text style={{ color: '#e52246' }}>Post</Text>
                </TitleAnimated>

                <InputAnimated
                    animation='slideInRight'
                    placeholder="Seu nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <InputAnimated
                    animation='slideInLeft'
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <InputAnimated
                    animation='slideInRight'
                    placeholder="********"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />

                <ButtonAnimated animation='slideInLeft' onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color='#fff' />
                    ) : (
                        <TextButton>Cadastrar</TextButton>
                    )}
                </ButtonAnimated>

                <SignUpButtonAnimated animation='slideInUp' onPress={toggleLogin}>
                    <SignUpTextButton>Já possuo uma conta</SignUpTextButton>
                </SignUpButtonAnimated>
            </Container>
        </TouchableWithoutFeedback>
    )
}