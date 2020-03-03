import React from 'react'
import {View, ActivityIndicator,StatusBar, AsyncStorage, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Login from '../Components/Login'
import Index from '../Components/Index'
import Register from '../Components/Register'

const AppStack = createStackNavigator({
    Index: { //Ici la vue "Index est appel�, c'est la premi�re vue affich� apr�s connexion
        screen: Index,
        navigationOptions: {
            title: 'Tampo',
            headerStyle: {
                height: 80,
                backgroundColor: '#14142d'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            }
        },
    }
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

class AuthLoadingScreen extends React.Component {
    constructor(props){
        super(props);
        this._loadData();
    }
    
    _loadData = async() => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        this.props.navigation.navigate(isLoggedIn !== '1'? 'Auth' : 'App');
    }
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle='default'/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#14142d'
    }
})

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));