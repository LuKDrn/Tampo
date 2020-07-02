//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Video } from 'expo-av'
import * as firebase from 'firebase';
import Fire from '../Fire';
import { FlatList } from 'react-native-gesture-handler';

export default class MyProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: undefined,
            isLoading: false,
            user: {}
        }
    }

    unsubscribe = null;
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <Text>Chargement...</Text>
                    <ActivityIndicator size='large'></ActivityIndicator>
                </View>
            )
        }
    }
    componentDidMount(){
        //Récupère les informations de l'utilisateur connecté
        this.setState({ isLoading: true });
        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data()});  
                console.log(this.state.user);      
            })  
            var lesPosts = Fire.shared.firestore.collection('posts').where("uid", "==", this.state.user).limit(10).get();
        };

        

    // renderPost = post => {
    //     return (
    //         <View style={styles.feedItem}>
    //             <Video source={post.video ? { uri: post.video } : require("../Images/music_icon.png")}
    //                 shouldPlay={false}
    //                 isLooping={false}
    //                 useNativeControls
    //                 style={styles.videoPost} />
    //             <View style={{ position: "absolute", top: "5%", zIndex: 1 }}>
    //             </View>
    //             <View style={{ position: "absolute", bottom: "10%", marginHorizontal: 15 }}>
    //                 <Text style={styles.post}>{post.text}</Text>
    //             </View>
    //         </View>
    //     );
    // };
    render() {
        const user = this.state.user;
        return (
            <SafeAreaView style={styles.container}>
                {/* {this.profilIncomplet()} */}
                <View style={{ marginTop: 64, alignItems: "center" }}>
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatar}
                            source={
                                user.avatar
                                    ? { uri: user.avatar }
                                    : require("../Images/music_icon.png")
                            }
                        />
                    </View>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { Fire.shared.signOut() }}>
                    <Text style={{ color: "#E616E6" }}>Se déconnecter</Text>
                </TouchableOpacity>
                <View style={{ padding: 5, marginVertical: 20 }}>
                    <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 16, marginLeft: 25 }}>Genre(s)</Text>
                </View>
                <View style={{ padding: 5, marginVertical: 20 }}>
                    <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 16, marginLeft: 25 }}>Vidéos(s)</Text>
                    {/* <FlatList
                        data={postArray}
                        extra={this.props.favoritesVideo}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => this.renderPost(item)}
                        showsVerticalScrollIndicator={false} /> */}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#14142d',
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600",
        color: "#FFF"
    },
    feedItem: {
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: "#14142d",
        borderRadius: 5,
        padding: 8,
        flexDirection: "column",
        marginBottom: 32,
        borderWidth: 2,
        borderColor: "#FFF"
    },
    post: {
        fontSize: 14,
        color: "#FFF",
        marginVertical: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        fontWeight: 'bold',
        zIndex: 1
    },
    videoPost: {
        height: Dimensions.get('window').height * 0.45,
        zIndex: -1,
        marginTop: -7,
        borderRadius: 8
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})