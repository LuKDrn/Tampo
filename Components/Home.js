//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import { Video } from 'expo-av'
import { FontAwesome,AntDesign,Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import moment from "moment";
import Fire from '../Fire';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {},
            userPost: {},
            isLoading: false,
            user: Fire.shared.uid
        }
    }
    getRandomDatas() {
        //On récupère la base "Posts"
        this.state.isLoading = true;
        var postTempo = this.state.post;
        var userTempo = this.state.userPost;
        var postRef = Fire.shared.firestore.collection('posts').doc("A3hg7EkmZL9iscOQ3QAc");
        postRef.onSnapshot(doc => {
            if (doc.exists) {
                postTempo = doc.data();
                Fire.shared.firestore.collection('users')
                    .doc(postTempo.uid)
                    .onSnapshot(documentSnapshot => {
                        userTempo = documentSnapshot.data();
                        this.setState({
                            post: postTempo,
                            userPost: userTempo,
                            isLoading: false
                        })
                    });
            }
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        });
    }
    componentDidMount() {
        this.getRandomDatas();
    };
    componentDidUpdate(){
        this.getRandomDatas();
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
        this.state.post;
        this.componentDidUpdate();
    }

    _displayLike = (id) => {
        var size = 32;
        const f = this.props.favoritesVideo.findIndex(item => item.id === id);
        if (this.props.favoritesVideo.findIndex(item => item.id === id) !== -1) {
            size = 38;
        }
        return (
            <AntDesign name='heart' size={size} color="#E616E6" />
        )

    }

    render() {
        const post = this.state.post;
        const user = this.state.userPost
        return (
            <SafeAreaView style={{ backgroundColor: "#E616E6",height:Dimensions.get('window').height }}>
                <LinearGradient
                    colors={['#75EAEA', 'transparent']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: Dimensions.get('window').height*1.3,
                    }}
                />
                <View style={styles.feedItem}>
                    <View style={styles.postContainer}>
                        <Video source={{ uri: post.video }}
                            rate={1.0}
                            volume={1.0}
                            shouldPlay
                            isLooping
                            repeat={true}
                            useNativeControls={true}
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onError={this.videoError}               // Callback when video cannot be loaded
                            resizeMode="cover"
                            style={styles.videoPost} />
                        <View style={{ position: "absolute", top: "2%", zIndex: 1 }}>
                            <View style={styles.postHeader}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("User", { userId: post.uid })}>
                                    <FontAwesome name="info-circle" size={30} color="#B3B7BA" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    <TouchableOpacity style={{ flexDirection: "row", position: "relative" }} onPress={() => this.props.navigation.navigate("User", { userId: post.uid })}>
                        <View style={{ flexDirection: "column",alignItems:'center' }}>
                            <Text style={styles.name}>{user.name}</Text>
                                    <FlatList
                                        horizontal={true}
                                        data={user.instruments}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => <Text style={{ color: "#ABFEFE", fontWeight: 'bold', fontSize: 19, marginLeft: 5 }}>{item}</Text>}
                                        showsVerticalScrollIndicator={false} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.stylesContainer}>
                        </View>
                    </View>
                    <View style={{ width: Dimensions.get('window').width }}>
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.touchableIcons}>
                                <FontAwesome name="circle" size={62} color="#2C3034" style={{position:'absolute', zIndex:-1}} />
                                <Ionicons name="ios-close" size={62} color="#75EAEA" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._toggleFavorite(post)} style={styles.touchableIcons}>
                                <FontAwesome name="circle" size={62} color="#2C3034" style={{position:'absolute', zIndex:-1,marginHorizontal: 12}}/>
                                {this._displayLike(post.id)}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
//CSS
const styles = StyleSheet.create({
    feedItem: {
        marginTop: 15,
        height: Dimensions.get('window').height * 0.8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    postContainer: {
        height: Dimensions.get('window').height * 0.65,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        borderRadius: 35,
        zIndex: 2,
        width: Dimensions.get("window").width * 0.88,
        backgroundColor: "#2C3034",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.8,
        shadowRadius: 18.95,
        elevation: 30,
    },
    stylesContainer: {
        marginVertical: 15,
        flexDirection:'row',
        height: Dimensions.get('window').height*0.15,
        borderRadius: 15,
        zIndex: 2,
        width: Dimensions.get("window").width * 0.6,
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
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "#F86FF8",
        textTransform: 'uppercase'
    },
    timestamp: {
        fontSize: 11,
        color: '#14142d',
        marginTop: 4
    },
    postHeader: {
        flexDirection: "row",
        width: Dimensions.get('window').width * 0.7,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    post: {
        fontSize: 18,
        color: "#FFF",
        marginVertical: 16,
        fontWeight: 'bold',
        zIndex: 1
    },
    videoPost: {
        height: Dimensions.get('window').height * 0.35,
        width: Dimensions.get('window').width * 0.6,
        zIndex: 3,
        borderRadius: 160,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.8,
        shadowRadius: 18.95,
        elevation: 30,
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
    touchableIcons: {
        marginHorizontal:6,
        width: Dimensions.get('window').width*0.25,
        height:Dimensions.get('window').height*0.1,
        justifyContent:'center',
        alignItems:'center'
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesVideo: state.favoritesVideo
    }
}
export default connect(mapStateToProps)(Home)