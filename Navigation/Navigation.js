import React from 'react';
import Fire from '../Fire';
import { View, ActivityIndicator, StatusBar, AsyncStorage, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons,AntDesign,Entypo } from "@expo/vector-icons";

import Login from '../Components/Login';
import Register from '../Components/Register';
import RegisterSecond from '../Components/RegisterSecond';
import Loading from '../Components/Loading';


import Home from '../Components/Home';
import Chat from '../Components/Chat';
import Notification from '../Components/Notification';
import Post from '../Components/Post';
import MyProfile from '../Components/MyProfile';
import MyProfileInfo from '../Components/MyProfileInfo';
import ProfileParameter from '../Components/ProfileParameter';
import User from '../Components/User';

const AppContainer = createStackNavigator (
    {
        default : createBottomTabNavigator (
            {        
                MyProfil: {
                    screen: MyProfile,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <AntDesign
                            name="user"
                            size={36}
                            color={tintColor} />
                    }
                },
                Accueil: {
                    screen: Home,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) =>
                            <AntDesign
                                name="home"
                                size={36}
                                color={tintColor} />
                    }
                },
                Notifications: {
                    screen: Notification,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons 
                        name="ios-notifications-outline" 
                        size={36} 
                        color={tintColor} />
                    }
                },
                Messages: {
                    screen: Chat,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Entypo
                            name="chat"
                            size={36}
                            color={tintColor} />
                    }
                },
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
                    activeTintColor: "#E616E6",
                    inactiveTintColor: "#FFF",
                    lazyLoad: true,
                    showLabel: false,
                    style: {
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        position: 'absolute',
                        marginTop: 10,
                        width: Dimensions.get("window").width,

                    }
                }
            }
        ),
        User: {
            screen: User,
            navigationOptions: {
              title: 'Utilisateur'
            }
          },
          MyProfileInfo: {
            screen: MyProfileInfo,
            navigationOptions: {
                title: 'Mon profil'
            }
          },
          Post: {
              screen: Post,
              navigationOptions: {
                  title: "Publier"
              }
          },
          Loading: {
              screen: Loading,
              navigationOptions: {
                  title: "Chargement"
              }
          },
          ProfileParameter: {
              screen: ProfileParameter,
              navigationOptions: {
                  title: "Paramètres du profil"
              }
          }
    },
    {
        mode: "modal",
        headerMode: "none"
    },
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
    RegisterSecond: {
        screen: RegisterSecond,
        navigationOptions: {
            headerShown: false
        }
    }
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