//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, FlatList,PixelRatio } from 'react-native';
import { Ionicons, FontAwesome, } from "@expo/vector-icons";
import { Video } from 'expo-av';
import * as firebase from 'firebase';
import Fire from '../Fire';

export default class MyProfileInfo extends React.Component {
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
        if (this.state.isLoading == true) {
            return (
                <View style={styles.loading_container}>
                    <Text>Chargement...</Text>
                    <ActivityIndicator size='large'></ActivityIndicator>
                </View>
            )
        }
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
        var postArray = this.state.videos;
        Fire.shared.firestore.collection("posts").where("uid", "==", this.state.userId).limit(10)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const { video, text, timestamp, uid } = doc.data();
                    // doc.data() is never undefined for query doc snapshots
                    postArray.push({
                        id: doc.id,
                        video,
                        text,
                        timestamp,
                        uid,
                    });
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        this.setState({
            videos: postArray,
            isLoading: false
        });
    };

    renderVideo = (video) => {
        return (
            <View style={styles.feedItem}>
                <Video source={{ uri: `${video.video}` }}
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
        { this._displayLoading() }
        return (
            <ScrollView>
                <View style={{backgroundColor:"#2C3034"}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header}>
                    <Ionicons name="ios-arrow-back" size={48} color="#ABFEFE" />
                </TouchableOpacity>
                <View style={styles.header2}>
                <TouchableOpacity>
                    <Ionicons name="ios-share-alt" size={36} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity >
                <Ionicons name="ios-more" size={24} color="#FFF" />
                </TouchableOpacity>
                </View>
                <Image resizeMode='cover' source={user.avatar ? { uri: user.avatar } : require("../Images/Icone_appli.png")} style={{ height: Dimensions.get('window').height * 0.55, zIndex: -1}} />
                </View>
                <View style={styles.userInfo}>
                    <View style={{alignItems: "center" }}>
                        <Text style={styles.name}>{user.name}</Text>
                        <View style={styles.underName}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: Dimensions.get("window").width * 0.3 }}>
                                    <Image reziseMode='cover' source={require("../Images/pin.png")} style={{ marginHorizontal: 5 }} />
                                    <Text style={{ color: "#E616E6", fontWeight: 'bold', fontSize: 19 }}>{user.city}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <View stye={styles.instruments}>
                                    <FlatList
                                        horizontal={true}
                                        data={user.instruments}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => <Text style={{ color: "#ABFEFE", fontWeight: 'bold', fontSize: 19, marginLeft: 5 }}>{item}</Text>}
                                        showsVerticalScrollIndicator={false} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column',alignItems:'center' }}>
                        <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 32, textTransform: 'uppercase', zIndex: 3}}>Style(s)</Text>
                        <View style={styles.stylesContainer}>
                            <Image reziseMode='cover' source={require("../Images/music.png")} style={{ marginHorizontal: 5 }} />
                            <FlatList
                                horizontal={true}
                                keyExtractor={(item) => item}
                                data={user.styles}
                                renderItem={({ item }) => <Text style={{ color: "#FFF", marginHorizontal: 5, textTransform: 'uppercase', fontWeight: 'bold' }}>{item}</Text>}
                                showsVerticalScrollIndicator={false} />
                            <TouchableOpacity>
                                <Ionicons name="ios-add" size={36} color="#E418E6" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column',alignItems:'center' }}>
                        <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 32, textTransform: 'uppercase', zIndex: 3}}>Artistes préférés</Text>
                        <View style={styles.likesContainer}>
                        </View>
                    </View> 
                    <View style={{flexDirection: 'column',alignItems:'center' }}>
                        <Text style={{ color: "#FFF", fontWeight: 'bold', fontSize: 32,textTransform:'uppercase',zIndex:3}}>Vidéos</Text>
                        <View style={styles.videosContainer}>
                        <FlatList
                            horizontal={true}
                            data={videos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => this.renderVideo(item)}
                            showsVerticalScrollIndicator={false} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: "5%",
        top: "3%",
        paddingTop: 26,
        paddingHorizontal: 12
    },
    header2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        width: Dimensions.get('window').width*0.2,
        position: 'absolute',
        right: "5%",
        top: "3%"
    },
    name: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#ABFEFE",
        textTransform: 'uppercase'
    },
    userInfo: {
        backgroundColor: '#2C3034',
        height: Dimensions.get('window').height*1.2,
        paddingVertical:15,
        flexDirection:'column',
        alignItems:'center',
        zIndex:1,
    },
    underName: {
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8
    },
    stylesContainer: {
        marginVertical: 15,
        flexDirection:'row',
        alignItems:'flex-end',
        paddingHorizontal:15,
        marginTop: "-5%",
        height: Dimensions.get('window').height*0.09,
        borderRadius: 15,
        zIndex: 2,
        width: Dimensions.get("window").width * 0.88,
        backgroundColor: "#3F4045",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 10,
    },
    likesContainer: {
        marginVertical: 15,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        marginTop: "-5%",
        height: Dimensions.get('window').height*0.3,
        borderRadius: 15,
        zIndex: 2,
        width: Dimensions.get("window").width * 0.88,
        backgroundColor: "#3F4045",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 10,
    },
    videosContainer: {
        marginVertical: 15,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        marginTop: "-5%",
        height: Dimensions.get('window').height*0.35,
        borderRadius: 15,
        zIndex: 2,
        width: Dimensions.get("window").width * 1,
        backgroundColor: "#3F4045",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 10,
    },
    feedItem: {
        height: Dimensions.get('window').height * 0.3,
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