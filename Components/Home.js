//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, Dimensions, Alert } from 'react-native'
import { Video } from 'expo-av'
import * as firebase from 'firebase'
import { TouchableOpacity, LongPressGestureHandler } from 'react-native-gesture-handler';
import { Ionicons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import moment from "moment";
import Fire from '../Fire';

var posts = [];

export default class Home extends React.Component {
    componentDidMount() {
        //On récupère la base "Posts"
        var lesPosts = Fire.shared.firestore.collection('posts').orderBy("timestamp", "desc").limit(10).get();
        //On récupère tous les Posts souhaités
        lesPosts.then(function (query) {
            query.forEach(function (doc) {
                const { video, text, timestamp, uid } = doc.data();
                //On récupère la base "users"
                Fire.shared.firestore.collection('users')
                    .doc(uid)
                    .onSnapshot(function (documentSnapshot) {
                        if (documentSnapshot.exists) {
                            posts.push({
                                id: doc.id,
                                video,
                                text,
                                timestamp,
                                uid,
                                user: documentSnapshot.data()
                            });
                        }
                        else {
                            // user sera null si l'utilisateur à supprimé son compte
                            //On ajoute dans le tableau "posts"
                            posts.push({
                                id: doc.id,
                                video,
                                text,
                                timestamp,
                                uid: null,
                                user: null
                            });
                        }
                    });
            })
        })
    };

    moreOptions = (post, user) => {
        if (post.uid === user) {
            console.log("Le bon utilisateur")
        }
        else {
            console.log("Pas l'utilisateur correspondant !")
        }
    }


    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Video source={post.video ? { uri: post.video } : require("../Images/music_icon.png")}
                    shouldPlay={false}
                    isLooping={false}
                    useNativeControls
                    style={styles.videoPost} />
                <View style={{ position: "absolute", top: "5%", zIndex: 1 }}>
                    <View style={styles.postHeader}>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Image source={
                                post.user.avatar ? { uri: post.user.avatar }
                                    : require("../Images/music_icon.png")
                            } style={styles.avatar}
                                resizeMode="cover" />
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.name}>{post.user.name}</Text>
                                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="ios-more" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{position: "absolute", bottom: "10%", marginHorizontal: 15}}>
                <Text style={styles.post}>{post.text}</Text>
                <View style={{flexDirection: "row"}}>
                <TouchableOpacity>
                        <AntDesign name="closecircleo" size={48} color="#E61E6E" style={{ marginHorizontal: 12 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={48} color="#E616E6" style={{ marginHorizontal: 12 }} />
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#14142d", }}>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    showsVerticalScrollIndicator={false} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 6,
        backgroundColor: "#14142d",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "rgb(13, 16, 33)",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10,
    },
    headerLogo: {
        width: 52,
        height: 52
    },
    feedItem: {
        height: Dimensions.get('window').height * 1,
        backgroundColor: "#14142d",
        borderRadius: 5,
        padding: 8,
        flexDirection: "column",
        marginBottom: 32,
        borderWidth: 2,
        borderColor: "#FFF"
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 16,
        borderWidth: 2,
        borderColor: "#FFF"
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#FFF"
    },
    timestamp: {
        fontSize: 11,
        color: '#FFF',
        marginTop: 4
    },
    postHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 25
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
        height: Dimensions.get('window').height * 0.95,
        zIndex: -1,
        marginTop: -7,
        borderRadius: 8
    }
});