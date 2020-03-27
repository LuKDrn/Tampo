import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";

const firebase = require('firebase');
require("firebase/firestore");

export default class Post extends React.Component {
    state = {
        text: "",
        image: null
    }

    componentDidMount() {
        this.getPhotoPermission();
    }
    getPhotoPermission = async () => {
        if (Contants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != "granted") {
                alert("Autorisez-vous Tampo à acceder à votre galerie ?")
            }
        }
    };
    handlePost = () => {
        Fire.shared.addPost({text: this.state.text.trim(), localUri: this.state.image})
        .then(ref => {
            this.setState({ text: "", image: null});
            this.props.navigation.goBack();
        })
        .catch(error => {
            alert(error);
        });
    };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if (!result.cancelled) {
            this.setState({ image: result.uri })
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="md-arrow-back" size={24} color="rgba(230,22,230, 0.8)" onPress={() => this.props.navigation.goBack()}></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ color: "rgba(230,22,230, 0.8)", fontWeight: 'bold' }}>Publier</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require("../Images/avatar_persona.png")} style={styles.avatar}></Image>
                    <TextInput multiline={true} numberOfLines={4} style={{ flex: 1, color: "#FFF" }}
                        placeholder="Quelque chose à partager ?" placeholderTextColor="#FFF"
                        onChangeText={text => this.setState({text})} value={this.state.text}>
                    </TextInput>
                </View>

                <TouchableOpacity onPress={this.pickImage}>
                    <View style={styles.media}>
                        <View style={{ borderRadius: 24, padding: 5 }}>
                            <TouchableOpacity style={styles.photo}>
                                <Ionicons name="md-camera" size={32} style={{ color: "#FFF", paddingHorizontal: 5 }}></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.media}>
                        <Text style={{ color: "#FFF", fontWeight: 'bold' }}>Ajouter une vidéo</Text>
                    </View>
                </TouchableOpacity>

                <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                    <Image source={{ uri: this.state.image }} style={{width: "100%", height: "100%"}}></Image>
                </View>
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth
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
    }
})