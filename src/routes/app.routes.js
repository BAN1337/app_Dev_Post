import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from 'react-native-vector-icons/Feather'

import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import NewPost from "../pages/NewPost";
import PostsUser from "../pages/PostsUser";

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeStackRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "fade"
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="NewPost"
                component={NewPost}
                options={{
                    headerTitle: 'Novo post',
                    headerTintColor: '#fff',

                    headerStyle: {
                        backgroundColor: '#353840',
                    }
                }}
            />

            <Stack.Screen
                name="PostsUser"
                component={PostsUser}
                options={{
                    headerTintColor: '#fff',

                    headerStyle: {
                        backgroundColor: '#353840'
                    }
                }}
            />
        </Stack.Navigator>
    )
}

export default function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#fff',

                tabBarStyle: {
                    backgroundColor: '#222227',
                    borderTopColor: '#818387',
                    borderTopWidth: 1
                }
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStackRoutes}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="home" color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="search" color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="user" color={color} size={size} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}