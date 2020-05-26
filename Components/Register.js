import React from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, SafeAreaView, StatusBar, LayoutAnimation, Image,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase';
import UserPermissions from '../Utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';
import Fire from "../Fire";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class Register extends React.Component {
    state = {
        user : {
            name: "",
            email: '',
            password: '',
            avatar: "",
        },
        errorMessage: null,
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission()
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        if (!result.cancelled) {
            this.setState({ user : { ...this.state.user, avatar: result.uri} }),
            avatar => this.setState({ user: {...this.state.user.avatar, avatar} })
        }
    }
    handleSignUp = () => {
        Fire.shared.createUser(this.state.user);
    };

    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <DismissKeyboard>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="ios-arrow-round-back" size={32} color={"#FFF"}></Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                        <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                            <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                            <Ionicons 
                                name="ios-add"
                                size={40}
                                color="#14142d">                            
                            </Ionicons>
                        </TouchableOpacity>
                    <Text style={{color: "#FFF",marginVertical: 20, fontSize: 12,textTransform: "uppercase"}}>Photo de profil</Text>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Nom complet</Text>
                            <TextInput style={styles.input}
                                onChangeText={name=> this.setState({ user: { ...this.state.user, name} })}
                                onSubmitEditing={DismissKeyboard}
                                value={this.state.user.name}
                                autoCapitalize='none' />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.inputTitle}>Adresse mail</Text>
                            <TextInput style={styles.input}
                                onChangeText={email => this.setState({ user: { ...this.state.user, email} })}
                                onSubmitEditing={DismissKeyboard}
                                value={this.state.user.email}
                                autoCapitalize='none' />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.inputTitle}>Mot de passe</Text>
                            <TextInput style={styles.input} secureTextEntry
                                      onChangeText={password => this.setState({ user: { ...this.state.user, password} })}
                                      onSubmitEditing={DismissKeyboard}
                                      value={this.state.user.password} />
                        </View>
                        {/* <View style={{ marginTop: 20 }}>
                            <Text style={styles.inputTitle}>Confirmer votre mot de passe</Text>
                            <TextInput 
                                    style={styles.input} secureTextEntry 
                                    onChangeText={(password) => this.setState({ user: { ...this.state.user, password} })}
                                    onSubmitEditing={DismissKeyboard}/>
                        </View> */}
                    </View>

                    <TouchableOpacity style={styles.userBtnRegister} onPress={this.handleSignUp}>
                        <Text style={styles.textBtn}>Que l'aventure commence ! </Text>
                    </TouchableOpacity>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Loading')}>
                            <Text style={styles.textBtnCreate}>Déjà un compte ? </Text>
                            <Text style={styles.textBtnCreate, { color: "#E616E6", textAlign: 'center', fontWeight: 'bold' }}>Utilise-le  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            </DismissKeyboard>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#14142d',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingVertical: 8,
        shadowColor: "rgb(13, 16, 33)",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    back: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',      
    },
    avatarPlaceholder: {
        backgroundColor: '#E1E2E6',
        borderRadius: 50,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        justifyContent: "center",
        alignItems: "center"
    },
    errorMessage: {
        height: 20,
        marginTop: 12
    },
    error: {
        color: "#E61E16",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: 'center'
    },
    form: {
        marginVertical: 22,
        width: '80%',
    },
    inputTitle: {
        color: "#FFF",
        fontSize: 12,
        textTransform: "uppercase"
    },
    input: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#FFF',
        fontSize: 14,
        color: '#FFF',
        fontWeight: '500'
    },
    userBtnRegister: {
        width: '80%',
        backgroundColor: '#E616E6',
        color: '#FFF',
        padding: 15,
        marginVertical: 15,
        borderRadius: 4,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textBtn: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    textBtnCreate: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
        marginVertical: 2
    }
});
