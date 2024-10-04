import React, { useState, createContext, useEffect } from "react";

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@devapp')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
            }

            setLoading(false)
        }

        loadStorage()
    }, [])

    async function signUp(name, email, password) {
        setLoadingAuth(true)

        await auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid

                await firestore().collection('users')
                    .doc(uid).set({
                        name: name,
                        email: value.user.email,
                        createdAt: new Date()
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email
                        }

                        setUser(data)
                        storageUser(data)
                        setLoadingAuth(false)
                    })
            })
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    alert('Email já em uso por outro usuário!')
                } else if (err.code === 'auth/missing-email') {
                    alert('O email é obrigatório!')
                } else if (err.code === 'auth/invalid-email') {
                    alert('E-mail Inválido!')
                } else if (err.code === 'auth/missing-password') {
                    alert('A senha é obrigatória!')
                } else if (err.code === 'auth/weak-password') {
                    alert('A senha precisa ter no mínimo 6 caracteres!')
                }

                setLoadingAuth(false)
            })
    }

    async function signIn(email, password) {
        setLoadingAuth(true)

        await auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid

                await firestore().collection('users')
                    .doc(uid).get()
                    .then((value) => {
                        let data = {
                            uid: uid,
                            name: value.data().name,
                            email: value.data().email
                        }

                        setUser(data)
                        storageUser(data)
                        setLoadingAuth(false)
                    })
            })
            .catch((err) => {
                if (err.code === 'auth/missing-password') {
                    alert('A senha é obrigatória')
                } else if (err.code === 'auth/invalid-credential') {
                    alert('Email incorreto ou senha incorreta!')
                } else if (err.code === 'auth/invalid-email') {
                    alert('O email é obrigatório')
                }

                setLoadingAuth(false)
            })
    }

    async function signOut() {
        setLoading(true)
        await auth().signOut()
            .then(async () => {
                await AsyncStorage.clear().then(() => {
                    setUser(null)
                    setLoading(false)
                })
            })
            .catch(() => {
                alert('Erro ao sair da conta')
                setLoading(false)
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('@devapp', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{ user, signed: !!user, signUp, signIn, signOut, loadingAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}