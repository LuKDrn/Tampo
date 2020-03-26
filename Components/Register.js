import React from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, SafeAreaView, StatusBar, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase';

export default class Register extends React.Component {
    state = {
        name: "",
        email: '',
        password: '',
        errorMessage: null
    };

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color={"#FFF"}></Ionicons>
                </TouchableOpacity>

                <View style={{ position: "absolute", top: 64, alignItems: 'center', width: "100%" }}>
                    <Text style={styles.header}>{`Créez toi un compte \n pour commencer.`}</Text>
                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Prenom Nom</Text>
                        <TextInput style={styles.input}
                            onChangeText={(name) => this.setState({ name })}
                            autoCapitalize='none' />
                    </View>
                    <View style={{ marginTop: 26 }}>
                        <Text style={styles.inputTitle}>Adresse mail</Text>
                        <TextInput style={styles.input}
                            onChangeText={(email) => this.setState({ email })}
                            autoCapitalize='none' />
                    </View>
                    <View style={{ marginTop: 26 }}>
                        <Text style={styles.inputTitle}>Mot de passe</Text>
                        <TextInput style={styles.input} secureTextEntry onChangeText={(password) => this.setState({ password })} />
                    </View>
                    <View style={{ marginTop: 26 }}>
                        <Text style={styles.inputTitle}>Confirmer votre mot de passe</Text>
                        <TextInput style={styles.input} secureTextEntry onChangeText={(password) => this.setState({ password })} />
                    </View>
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
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#14142d',
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        position: 'absolute',
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(230,22,230, 0.8)"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "rgba(230,22,230, 0.8)",
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 28,
        textAlign: 'center',
        color: "#FFF",
        paddingBottom: 10,
    },
    errorMessage: {
        height: 20
    },
    error: {
        color: "#E616E6",
        fontSize: 16,
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
        fontSize: 18,
        color: '#E616E6',
        fontWeight: 'bold'
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
