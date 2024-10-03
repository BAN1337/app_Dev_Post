import React, { useState, createContext } from "react";

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    async function signUp(name, email, password) {
        await auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid

                await firestore().collection('users')
                    .doc(uid).set({
                        name: name,
                        createdAt: new Date(),

                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email
                        }

                        setUser(data)
                    })
            })
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    alert('Email já em uso por outro usuário!')
                } else if (err.code === 'auth/missing-email') {
                    alert('O email é obrigatório')
                } else if (err.code === 'auth/invalid-email') {
                    alert('E-mail Inválido')
                } else if (err.code === 'auth/missing-password') {
                    alert('A senha é obrigatória')
                } else if (err.code === 'auth/weak-password') {
                    alert('A senha precisa ter no mínimo 6 caracteres')
                }
                console.log(err.code)
            })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}