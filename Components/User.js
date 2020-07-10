//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Ionicons,FontAwesome } from "@expo/vector-icons";
import { Video } from 'expo-av';
import * as firebase from 'firebase';
import Fire from '../Fire';
import { FlatList } from 'react-native-gesture-handler';

export default class MyProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            user: {},
            videos: [],
            userId: this.props.navigation.state.params.userId
        }
    }
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <Text>Chargement...</Text>
                <ActivityIndicator size='large'></ActivityIndicator>
            </View>
        )
    }
    componentDidMount() {
        //Récupère les informations de l'utilisateur connecté
        this.state.isLoading = true;
        Fire.shared.firestore
            .collection("users")
            .doc(this.state.userId)
            .onSnapshot(doc => {
                this.setState({
                    user: doc.data()
                })
            });
        //Ses vidéos
        var lesPosts = Fire.shared.firestore.collection('posts').where("uid", "==", this.state.userId).limit(10).get();
        var postArray = this.state.videos;
        lesPosts.then(function (query) {
            query.forEach(function (doc) {
                const { video, text, timestamp, uid } = doc.data();
                //On récupère la base "users"
                postArray.push({
                    id: doc.id,
                    video,
                    text,
                    timestamp,
                    uid,
                });
            });
        });
        this.setState({
            videos: postArray,
            isLoading: false
        });
    };

    _displaySexe = (sexe) => {
        var icon;
        if (sexe == "Masculin") {
            icon = "md-male"
        }
        else if (sexe == "Féminin") {
            icon = "md-female"
        }
        else {
            icon = "md-male"
        }
        return (
            <Ionicons name={icon} size={24} style={{ marginTop: 24 }} color="#E616E6" />
        )
    }


    renderVideo = (video) => {
        return (
            <View style={styles.feedItem}>
                <Video source={{ uri: video.video }}
                    repeat={false}
                    volume={1}
                    useNativeControls={true}
                    resizeMode="cover"
                    style={styles.videoPost} />
                <View>
                    <Text style={styles.post}>{video.text}</Text>
                </View>
            </View>
        );
    };
    render() {
        const user = this.state.user;
        const videos = this.state.videos;
        if (this.state.isLoading == false) {
            return (
                <SafeAreaView style={styles.container}>
                    {/* {this.profilIncomplet()} */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="remove" size={24} color="rgba(230,22,230, 0.8)"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 12, alignItems: "center" }}>
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
                        {this._displaySexe(user.sexe)}
                        <Text style={styles.name}>{user.name}</Text>
                        <View style={styles.underName}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Ville : </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'cetner' }}>
                                    <FontAwesome name="map-marker" size={19} color="#E616E6" style={{ marginHorizontal: 5 }} />
                                    <Text style={{ color: "#E616E6", fontWeight: 'bold', fontSize: 19 }}>{user.city}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Instruments : </Text>
                                <View stye={styles.instruments}>
                                    <FlatList
                                        data={user.instruments}
                                        renderItem={({ item }) => <Text style={{ color: "#E616E6", fontWeight: 'bold', fontSize: 19, marginLeft: 5 }}>{item}</Text>}
                                        showsVerticalScrollIndicator={false} />

                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 5, marginVertical: 20, textAlign:'center' }}>
                    <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 26, marginLeft: 25,textAlign: 'center' }}>Style(s)</Text>
                    <FlatList
                        horizontal={true}
                        data={user.styles}
                        renderItem={({ item }) => <Text style={{color:"#FFF", marginHorizontal: 5}}>{item}</Text>}
                        showsVerticalScrollIndicator={false} />
                </View>
                    <View style={{ padding: 5, marginVertical: 20 }}>
                        <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 16, marginLeft: 25 }}>Vidéos(s)</Text>
                        <FlatList
                            horizontal={true}
                            data={videos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => this.renderVideo(item)}
                            showsVerticalScrollIndicator={false} />
                    </View>
                </SafeAreaView>
            )
        }
        else {
            { this._displayLoading() }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#14142d',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingHorizontal: 32,
        paddingTop: 8,
        shadowColor: "rgb(13, 16, 33)",
        zIndex: 10
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
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF"
    },
    underName: {
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8
    },
    feedItem: {
        height: Dimensions.get('window').height * 0.35,
        backgroundColor: "#14142d",
        borderRadius: 5,
        padding: 8,
        marginHorizontal: 5,
        marginVertical: 8,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
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
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').width * 0.4,
        borderRadius: 8,
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