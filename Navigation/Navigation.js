import React from 'react';
import { View, ActivityIndicator, StatusBar, AsyncStorage, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from "@expo/vector-icons";

import Login from '../Components/Login';
import Register from '../Components/Register';
import Loading from '../Components/Loading';

import Index from '../Components/Index';
import Message from '../Components/Message';
import Notification from '../Components/Notification';
import Post from '../Components/Post';
import Profile from '../Components/Profile';

import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyC5mBmYcaZywjWq2kKFQrNR4wlS_wnHu4o",
    authDomain: "tampo-41ba7.firebaseapp.com",
    databaseURL: "https://tampo-41ba7.firebaseio.com",
    projectId: "tampo-41ba7",
    storageBucket: "tampo-41ba7.appspot.com",
    messagingSenderId: "815374756118",
    appId: "1:815374756118:web:cfb7be8850379aa668c837",
    measurementId: "G-GJPWTJYBVP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator({
    Accueil: {
        screen: Index,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
        }
    },
    Messages: {
        screen: Message,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={24} color={tintColor} />
        }
    },
    Publier: {
        screen: Post,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons
             name="ios-add-circle"
             size={44} 
             color={"rgba(230,22,230, 0.6)"}
             style={{ shadowColor: "rgba(230,22,230, 0.6)",
                      shadowOffset: { width: 0, height: 0, shadowRadius: 10, shadowOpacity: 0.3}
            }}/>
        }
    },
    Notifications : {
        screen: Notification,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor} />
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
        }
    },
},
{
    tabBarOptions: {
        activeTintColor: "#75EAEA",
        inactiveTintColor: "#B8BBC4",
        showLabel: false,
        backgroundColor: "#000"
    }
}
);

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
            App: AppTabNavigator,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'Loading',
        }
    ));