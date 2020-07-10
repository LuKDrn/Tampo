//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import { Video } from 'expo-av'
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import moment from "moment";
import Fire from '../Fire';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            isLoading: false,
            user: Fire.shared.uid
        }
    }
    componentDidMount() {
        //On récupère la base "Posts"
        this.state.isLoading = true;
        var lesPosts = Fire.shared.firestore.collection('posts').where("uid", "<=", this.state.user).limit(10).get();
        var postArray = this.state.posts;
        //On récupère tous les Posts souhaités
        lesPosts.then(function (query) {
            query.forEach(function (doc) {
                const { video, text, timestamp, uid } = doc.data();
                //On récupère la base "users"
                Fire.shared.firestore.collection('users')
                .doc(uid)
                .onSnapshot(function (documentSnapshot) {
                    postArray.push({
                            id: doc.id,
                            video,
                            text,
                            timestamp,
                            uid,
                            user: documentSnapshot.data()
                        });
                    });
                })
            })
        this.setState({
            posts: postArray,
            isLoading: false
        });
    };

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
    _moreOptions = (post, user) => {
        if (post.uid === user) {
            console.log("Oui")
        }
        else {
            console.log("Non")
        }
    }
    _toggleFavorite = (post) => {
        const action = { type: "TOGGLE_FAVORITE", value: post };
        this.props.dispatch(action)
        this.state.posts
    }
    componentDidUpdate() {
    }

    _displayLike = (id) => {
        var sourceImage = require('../Images/ic-favorite.png');
        const f = this.props.favoritesVideo.findIndex(item => item.id === id);
        if (this.props.favoritesVideo.findIndex(item => item.id === id) !== -1) {
            sourceImage = require('../Images/ic-favorite-complete.png');
        }
        return (
            <Image source={sourceImage} style={styles.favoriteIcon} color="#E616E6" />
        )

    }


    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Video source={{ uri: post.video }}
                    rate={1.0}
                    volume={1.0}
                    repeat={true}
                    useNativeControls={true}
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    resizeMode="cover"
                    style={styles.videoPost} />
                <View style={{ position: "absolute", top: "2%", zIndex: 1 }}>
                    <View style={styles.postHeader}>
                        <TouchableOpacity style={{ flexDirection: "row", position: "relative" }} onPress={() => this.props.navigation.navigate("User", { userId: post.uid })}>
                            <Image source={
                                post.user.avatar ? { uri: post.user.avatar }
                                    : require("../Images/music_icon.png")
                            } style={styles.avatar}
                            />
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.name}>{post.user.name}</Text>
                                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                                <Text style={styles.post}>{post.text}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._moreOptions(post.id, this.state.user)} style={{ position: "relative" }}>
                            <Ionicons name="ios-more" size={24} color="#14142d" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ position: "absolute", bottom: "10%", width: Dimensions.get('window').width }}>
                    <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <AntDesign name="closecircleo" size={48} color="#E61E6E" style={{ marginHorizontal: 12 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._toggleFavorite(post)}>
                            {this._displayLike(post.id)}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const posts = this.state.posts;
        return (
            <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: "#14142d", }}>
                <FlatList
                    data={posts}
                    extra={this.props.favoritesVideo}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => this.renderPost(item)}
                    showsVerticalScrollIndicator={false} />
            </SafeAreaView>
        )
    }
}
//CSS
const styles = StyleSheet.create({
    feedItem: {
        height: Dimensions.get('window').height,
        backgroundColor: "#14142d",
        flexDirection: "column",
        marginBottom: 32,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 42,
        marginRight: 16,
        borderWidth: 2,
        borderColor: "#FFF"
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#14142d"
    },
    timestamp: {
        fontSize: 11,
        color: '#14142d',
        marginTop: 4
    },
    postHeader: {
        flexDirection: "row",
        width: Dimensions.get('window').width * 0.8,
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 25
    },
    post: {
        fontSize: 18,
        color: "#FFF",
        marginVertical: 16,
        fontWeight: 'bold',
        zIndex: 1
    },
    videoPost: {
        height: Dimensions.get('window').height * 1,
        width: Dimensions.get('window').width,
        zIndex: -1,
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
    favoriteIcon: {
        width: 48,
        height: 48,
        marginHorizontal: 12
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesVideo: state.favoritesVideo
    }
}
export default connect(mapStateToProps)(Home)