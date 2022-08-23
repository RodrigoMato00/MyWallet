import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import getStore from './store/storeSt';
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StackScreen from "./screens/StackScreen";
import ImportScreen from "./screens/ImportScreen";
import CreateNewScreen from "./screens/CreateNewScreen";
import SecretKeysScreen from "./screens/SecretKeysScreen";
import LoginScreen from "./screens/LoginScreen";
import WalletScreen from "./screens/WalletScreen";
import LoginImportScreen from "./screens/LoginImportScreen";
import LoginOpenScreen from "./screens/LoginOpenScreen";


const HomeStackNavigator = createNativeStackNavigator();

function MyStack () {

    const storePassword = getStore();

    return (

        <HomeStackNavigator.Navigator
            initialRouteName="HomeScreen"

        >
            <HomeStackNavigator.Screen
                name="HomeScreen"
                options={{
                    headerStyle: {
                        backgroundColor: "#000000",
                        },
                        headerTitleStyle: {
                            color: "#00c961",
                        },
                        navigatorStyle: {
                            backgroundColor: "#000000",
                        },
                        footerStyle: {
                            backgroundColor: "#000000",
                        },

                    }}
                component={HomeScreen}
            />
            <HomeStackNavigator.Screen
                name="Stack"
                component={StackScreen}
                options={{
                    headerBackTitleVisible: false,
                }}
            />
            <HomeStackNavigator.Screen
                name="LoginImport"
                component={LoginImportScreen}
                options={{
                        headerBackTitleVisible: false,
                        headerStyle: {
                            backgroundColor: "#000000",
                        },
                        headerTitleStyle: {
                            color: "#00c961",
                        },
                        navigatorStyle: {
                            backgroundColor: "#000000",
                        },
                        footerStyle: {
                            backgroundColor: "#000000",
                        },

                        }}

            />
            <HomeStackNavigator.Screen
                name="LoginOpen"
                component={LoginOpenScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTitleStyle: {
                        color: "#00c961",
                    },
                    navigatorStyle: {
                        backgroundColor: "#000000",
                    },
                    footerStyle: {
                        backgroundColor: "#000000",
                    },
                }}
            />
            <HomeStackNavigator.Screen
                name="Import"
                component={ImportScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTitleStyle: {
                        color: "#00c961",
                    },
                    navigatorStyle: {
                        backgroundColor: "#000000",
                    },
                    footerStyle: {
                        backgroundColor: "#000000",
                    },
                }}
            />
            <HomeStackNavigator.Screen
                name="CreateNew"
                component={CreateNewScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTitleStyle: {
                        color: "#00c961",
                    },
                    navigatorStyle: {
                        backgroundColor: "#000000",
                    },
                    footerStyle: {
                        backgroundColor: "#000000",
                    },
                }}
            />
            <HomeStackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTitleStyle: {
                        color: "#00c961",
                    },
                    navigatorStyle: {
                        backgroundColor: "#000000",
                    },
                    footerStyle: {
                        backgroundColor: "#000000",
                    },
                }}
            />
            <HomeStackNavigator.Screen
                name="SecretKeys"
                component={SecretKeysScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTitleStyle: {
                        color: "#00c961",
                    },
                    navigatorStyle: {
                        backgroundColor: "#000000",
                    },
                    footerStyle: {
                        backgroundColor: "#000000",
                    },
                }}
            />
            <HomeStackNavigator.Screen
                name="WalletView"
                component={WalletScreen}

                options={{
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTitleStyle: {
                        color: "#00c961",
                    },
                    navigatorStyle: {
                        backgroundColor: "#000000",
                    },
                    footerStyle: {
                        backgroundColor: "#000000",
                    },
                }}
            />

        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();



function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: "#00C961",
            }}
        >
            <Tab.Screen
                name="Home"
                component={MyStack}
                options={{
                    tabBarLabel: "Feed",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={'#00C961'} size={size} />
                    ),
                    headerShown: false,
                }}

            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTitleStyle: {
                        color: "#00c961",
                    },
                    navigatorStyle: {
                        backgroundColor: "#000000",
                    },
                    footerStyle: {
                        backgroundColor: "#000000",
                    },
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" color={'#00C961'} size={size} />
                    ),
                    //headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}