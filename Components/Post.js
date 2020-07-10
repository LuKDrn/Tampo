//Copyright TAMPO 
// Author : Lucas DEROUIN

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { Feather, Ionicons } from '@expo/vector-icons';
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import UserPermissions from "../Utilities/UserPermissions";
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
const firebase = require('firebase');
require("firebase/firestore");

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
export default class Post extends React.Component {
    state = {
        text: "",
        video: null,
        user: {},
        isLoading: false,
        videoPicked: false
    };
    componentDidMount() {
        this.setState({
            isLoading: true,
        });
        UserPermissions.getCameraPermission();
        //Récupère les informations de l'utilisateur connecté 
        const user = this.props.uid || Fire.shared.uid;
        Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({
                    user: doc.data(),
                    isLoading: false,
                });
            });
    }

    // Envoie de la publication sur la base Firebase
    handlePost = () => {
        if (this.state.text.length > 0 && this.state.user != null && this.state.video != null) {
            this.setState({
                isLoading: true,
            }) // Lancement du chargement
            Fire.shared
                .addPost({ text: this.state.text.trim(), localUri: this.state.video })
                .then(ref => {
                    this.setState({ text: "", video: "", isLoading: false });
                    this.props.navigation.goBack();

                })
                .catch(error => {
                    alert(error);
                });
        }
    };
    // Retirer la vidéo séléctionné
    removeVideo = () => {
        this.setState({
            video: null,
            pickVideo: false
        });
    }
    //Le rendu de la sélection d'une vidéo si une vidéo est séléctionné ou pas 
    renderPickVideo = () => {
        if (this.state.video != null && this.state.videoPicked == true) {
            return (
                <TouchableOpacity onPress={this.removeVideo}>
                    <View style={styles.media}>
                        <View style={{ borderRadius: 24, padding: 5 }}>
                            <View style={styles.photo}>
                                <Feather name="trash" size={32} style={{ color: "#FFF", paddingHorizontal: 5 }} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.media}>
                        <Text style={{ color: "#FFF", fontWeight: 'bold' }}>Retirer la vidéo</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity onPress={this.pickVideo}>
                    <View style={styles.media}>
                        <View style={{ borderRadius: 24, padding: 5 }}>
                            <View style={styles.photo}>
                                <Feather name="video" size={32} style={{ color: "#FFF", paddingHorizontal: 5 }} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.media}>
                        <Text style={{ color: "#FFF", fontWeight: 'bold' }}>Ajouter une vidéo</Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }
    //Affichage d'une vidéo si elle est ajouté 
    displayVideo = () => {
        if (this.state.video == null) { }
        else {
            return (
                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    <Video source={{ uri: this.state.video }}
                        shouldPlay={true}
                        isLooping={false}
                        useNativeControls
                        resizeMode="cover"
                        style={{ height: Dimensions.get('window').height * 0.5, borderRadius: 8 }} />
                </View>
            )
        }
    }
    // Récupère la vidéo séléctionnée depuis la galerie 
    pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if (!result.cancelled) {
            this.setState({
                video: result.uri,
                videoPicked: true,
            })
        }
    }

    render() {
        return (
            <DismissKeyboard>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={24} color="rgba(230,22,230, 0.8)" ></Ionicons>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handlePost}>
                            <Text style={{ color: "rgba(230,22,230, 0.8)", fontWeight: 'bold' }}>Publier</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Image source={this.state.user.avatar ? { uri: this.state.user.avatar } : require("../Images/music_icon.png")} style={styles.avatar}></Image>
                        <TextInput
                            style={{ flex: 1, color: "#FFF" }}
                            placeholder="Une description pour cette vidéo ?" placeholderTextColor="#FFF"
                            onChangeText={text => this.setState({ text })}
                            onSubmitEditing={DismissKeyboard}
                            value={this.state.text}>
                        </TextInput>
                    </View>
                    {this.renderPickVideo()}
                    {this.displayVideo()}
                </SafeAreaView>
            </DismissKeyboard>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#14142d'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingVertical: 12,
        shadowColor: "rgb(13, 16, 33)",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row'
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 24,
        marginRight: 16,
    },
    media: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    video: {
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})