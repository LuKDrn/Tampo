//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import Fire from '../Fire';

export default class ProfileParameter extends React.Component {
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
                <View style={{marginVertical:12}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header}>
                    <Ionicons name="ios-arrow-back" size={48} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonsBlue} onPress={() =>  this.props.navigation.goBack()}>
                        <Text style={styles.buttonsText}>Retour</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.buttonsBlue} onPress={() => this.props.navigation.navigate("ProfileParameter")}><Text style={styles.buttonsText}>Réglages</Text></TouchableOpacity> */}
                </View>
                <View style={{marginVertical:12}}>
                    <TouchableOpacity style={styles.buttonsRed} onPress={() => { Fire.shared.signOut() }}>
                        <Text style={styles.buttonsText}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E616E6',
        alignItems: 'center',
        justifyContent:'center'
    },
    header: {
        paddingTop: 26,
        paddingHorizontal: 12,
        position:'absolute',
        top: '20%'
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