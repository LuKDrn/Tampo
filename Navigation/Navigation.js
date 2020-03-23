import React from 'react'
import {View, ActivityIndicator,StatusBar, AsyncStorage, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Login from '../Components/Login'
import Index from '../Components/Index'
import Register from '../Components/Register'
import Loading from '../Components/Loading'

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

const AppStack = createStackNavigator({
    Index: { //Ici la vue "Index est appel�, c'est la premi�re vue affich� apr�s connexion
        screen: Index,
        navigationOptions: {
            headerShown: false
            },
            headerTintColor: '#FFF'
        },
    })
const AuthStack = createStackNavigator({
    Connexion: { // Ici j'ai appel� la vue "Login".
    screen: Login,
    navigationOptions: {
        headerShown: false
    }        
},
Register: { // Ici j'ai appel� la vue "Register".
    screen: Register,
    navigationOptions: {
        title: null,
        headerStyle: {
            height: 70,
            backgroundColor: '#14142d'
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
            textAlign: 'center',
            flex: 1
        }
    }        
},
})

export default createAppContainer(
    createSwitchNavigator(
    {
        Loading : Loading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Loading',
    }
));