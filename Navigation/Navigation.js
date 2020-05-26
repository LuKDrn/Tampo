import React from 'react';
import Fire from '../Fire';
import { View, ActivityIndicator, StatusBar, AsyncStorage, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons,AntDesign,Entypo } from "@expo/vector-icons";

import Login from '../Components/Login';
import Register from '../Components/Register';
import Loading from '../Components/Loading';

import Home from '../Components/Home';
import Chat from '../Components/Chat';
import Notification from '../Components/Notification';
import Post from '../Components/Post';
import Profile from '../Components/Profile';

import * as firebase from 'firebase'
import { color } from 'react-native-reanimated';

const AppContainer = createStackNavigator (
    {
        default : createBottomTabNavigator (
                {
                    Accueil: {
                        screen: Home,
                        navigationOptions: {
                            tabBarIcon: ({ tintColor }) => <AntDesign 
                            name="home" 
                            size={24} 
                            color={tintColor}/>
                        }
                    },
                    Messages : {
                        screen: Chat,
                        navigationOptions: {
                            tabBarIcon: ({ tintColor }) => <Entypo 
                            name="chat" 
                            size={24} 
                            color={tintColor}/>
                        }
                    },
                    Publier: {
                        screen: Post,
                        navigationOptions: {
                            tabBarIcon: ({ tintColor }) => <Ionicons
                            name="ios-add-circle"
                            size={44} 
                            color={"#75EAEA"}
                            />
                        }
                    },
                    Notifications : {
                        screen: Notification,
                        navigationOptions: {
                            tabBarIcon: ({ tintColor }) => <Entypo 
                            name="notification" 
                            size={24} 
                            color={tintColor} />
                        }
                    },
                    Profil : {
                        screen: Profile,
                        navigationOptions: {
                            tabBarIcon: ({ tintColor }) => <AntDesign 
                            name="user" 
                            size={24} 
                            color={tintColor}/>
                        }
                    }
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({navigation, defaultHandler}) => {
                        if (navigation.state.key === "Post"){
                            navigation.navigate("postModal");
                        }
                        else {
                            defaultHandler();
                        }
                    }
                },
                tabBarOptions: {
                    activeTintColor: "#75EAEA",
                    inactiveTintColor: "#FFF",
                    showLabel: false,
                    style: {
                        backgroundColor: '#14142d',
                        borderWidth: 0,
                        borderColor: "#14142d"
                    }
                }
            }
        ),
        postModal: {
            screen: Post
        }
    },
    {
        mode: "modal",
        headerMode: "none"
    }
)

const AuthStack = createStackNavigator({
    Connexion: { // Ici est appelé la vue "Login".
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },
    Register: { // Ici j'ai appel� la vue "Register".
        screen: Register,
        navigationOptions: {
            headerShown: false
        }
    },
})

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: Loading,
            App: AppContainer,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'Loading',
        }
    ));