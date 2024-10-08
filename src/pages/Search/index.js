import React, { useState, useEffect } from "react";
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'

import {
    Container,
    AreaInput,
    Input,
    List
} from "./styles";
import SearchList from "../../components/SearchList";

export default function Search() {
    const [input, setInput] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (input === '' || input === undefined) {
            setUsers([])
            return
        }
        const subscriber = firestore().collection('users')
            .where('name', '>=', input)
            .where('name', '<=', input + "\uf8ff")
            .onSnapshot(snapshot => {
                const listUsers = []

                snapshot.forEach(doc => {
                    listUsers.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })

                setUsers(listUsers)
            })

        return () => subscriber()
    }, [input])

    return (
        <Container>
            <AreaInput>
                <Feather
                    name='search'
                    size={20}
                    color='#e52246'
                />
                <Input
                    placeholder="Procurando alguém?"
                    placeholderTextColor='#353840'
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
            </AreaInput>

            <List
                showsVerticalScrollIndicator={false}
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <SearchList data={item} />}
            />
        </Container>
    )
}