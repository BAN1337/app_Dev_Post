import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

import { View, ActivityIndicator } from "react-native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

export default function Routes() {
    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#353840' }}>
                <ActivityIndicator size={50} color='#e52246' />
            </View>
        )
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}