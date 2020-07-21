//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import Fire from '../Fire';

export default class MyProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userId: Fire.shared.uid,
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
    }

    render() {
        const user = this.state.user;
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={['#75EAEA', 'transparent']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: Dimensions.get('window').height * 1.2,
                    }}
                />
                <View style={styles.myProfileActions}>
                    <View style={styles.avatarContainer}>
                        <FontAwesome style={{ zIndex: -1, opacity: 0.4 }} name="circle" size={190} color="#2C3034" />
                        <Image
                            style={styles.avatar}
                            source={
                                user.avatar
                                    ? { uri: user.avatar }
                                    : require("../Images/Icone_appli.png")
                            }
                        />
                    </View>
                    <View style={styles.btnBlue}>
                        <TouchableOpacity style={styles.buttonsBlue} onPress={() => this.props.navigation.navigate("ProfileParameter")}><Text style={styles.buttonsText}>Réglages</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttonsBlue} onPress={() => this.props.navigation.navigate("MyProfileInfo")}><Text style={styles.buttonsText}>Mon profil</Text></TouchableOpacity>
                        <View style={{ position: 'relative', top: "20%" }}>
                            <TouchableOpacity style={styles.Post} onPress={() => this.props.navigation.navigate("Post")}>
                                <Ionicons name="ios-add-circle-outline" size={52} color="#75EAEA" />
                                <Text style={{ color: "#FFF", fontWeight: 'bold', textTransform: "uppercase",fontSize: 24 }}>Ajouter une vidéo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.btnRed}>
                        <TouchableOpacity style={styles.buttonsRed}><Text style={styles.buttonsText}>Supprimer mon compte</Text></TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#75EAEA'
    },
    myProfileActions: {
        zIndex: 1,
        position: "absolute",
        padding: 5,
        flexDirection: "column",
        alignItems: "center",
        bottom: 0,
        backgroundColor: "#2C3034",
        height: Dimensions.get('window').height * 0.75,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4,
        position: "absolute",
        flexDirection: 'column',
        alignItems: 'center',
        top: "-20%",
        zIndex: 10
    },
    avatar: {
        position: "relative",
        top: "-50%",
        bottom: 5,
        width: 136,
        height: 136,
        borderRadius: 68
    },
    btnBlue: {
        height: Dimensions.get("window").height * 0.3,
        justifyContent: "space-between",
        position: "absolute",
        top: "20%",
    },
    buttonsBlue: {
        width: Dimensions.get("window").width * 0.9,
        backgroundColor: "#75EAEA",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 55,
        borderRadius: 15
    },
    Post: {
        width: Dimensions.get("window").width * 0.9,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonsText: {
        color: "#2C3034",
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    btnRed: {
        height: Dimensions.get("window").height * 0.08,
        position: "absolute",
        bottom: "15%",
    },
    buttonsRed: {
        width: Dimensions.get("window").width * 0.9,
        backgroundColor: "#F86F6F",
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15
    },
})