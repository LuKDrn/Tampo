import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList } from 'react-native'
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

var posts = [
    {
        id: "1",
        name: "Julie Lescaut",
        text: "Vingt-neuf ans : premiers coups bas et premières trahisons pour s'élever. Demeurons, me dit avec un soupir, presque un toussotement.",
        timestamp: 1569109273726,
        avatar: require("../Images/avatar_persona.png"),
        image: require("../Images/Icone_appli.png")
    },
    {
        id: "2",
        name: "Julie Lescaut",
        text: "Vingt-neuf ans : premiers coups bas et premières trahisons pour s'élever. Demeurons, me dit avec un soupir, presque un toussotement.",
        timestamp: 1569109273726,
        avatar: require("../Images/avatar_persona.png"),
        image: require("../Images/Logo_complete.png")
    },
    {
        id: "3",
        name: "Julie Lescaut",
        text: "Vingt-neuf ans : premiers coups bas et premières trahisons pour s'élever. Demeurons, me dit avec un soupir, presque un toussotement.",
        timestamp: 1569109273726,
        avatar: require("../Images/avatar_persona.png"),
        image: require("../Images/Logo_complete.png")
    }
];

export default class Home extends React.Component {
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <View style={{ flex: 1, padding: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={post.avatar} style={styles.avatar} />
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.name}>{post.name}</Text>
                                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                            </View>
                        </View>
                        <Ionicons name="ios-more" size={24} color="#14142d" />
                    </View>

                    <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                    <Text style={styles.post}>{post.text}</Text>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Ionicons name="ios-close-circle-outline" size={56} color="#E61E6E" style={{ marginHorizontal: 8 }} />
                        <Ionicons name="ios-heart-empty" size={56} color="#E616E6" style={{ marginHorizontal: 8 }} />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.header} onPress={() => this.props.navigation.navigate("Loading")}>
                    <Image style={styles.headerLogo} source={require('../Images/Icone_appli.png')} />
                </TouchableOpacity>

                <FlatList style={styles.feed} data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#14142d'
    },
    header: {
        paddingVertical: 12,
        backgroundColor: "#14142d",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#FFF",
        shadowColor: "rgb(13, 16, 33)",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerLogo: {
        width: 52,
        height: 52
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "column",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 24,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#14142d"
    },
    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4
    },
    post: {
        fontSize: 14,
        color: "black",
        marginBottom: 24
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16,
        justifyContent: "center"
    }
});