import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AuthContext } from "../../contexts/auth";

export default function Profile() {
    const { signOut } = useContext(AuthContext)

    async function handleSignOut() {
        await signOut()
    }

    return (
        <View>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}