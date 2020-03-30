import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, LayoutAnimation, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';
import Fire from '../Fire';

export default class Profile extends React.Component {       
            state = {
                user : {}
            };    

    unsubscribe = null;

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user : doc.data() });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 64, alignItems: "center" }}>
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatar}
                            source={
                                this.state.user.avatar  
                                    ? { uri: this.state.user.avatar }
                                    : require("../Images/music_icon.png")
                            }
                        />
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>22</Text>
                        <Text style={styles.statTitle}>Publications</Text>
                    </View>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>34</Text>
                        <Text style={styles.statTitle}>Abonnés</Text>
                    </View>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>105</Text>
                        <Text style={styles.statTitle}>Abonnement</Text>
                    </View>
                </View>
                <TouchableOpacity  style={{alignItems: 'center'}}onPress={() => {Fire.shared.signOut()}}>
                    <Text style={{ color: "#E616E6" }}>Se déconnecter</Text>
                </TouchableOpacity>
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
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 32
    },
    stat :{
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "300"
    },
    statTitle: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    }
})