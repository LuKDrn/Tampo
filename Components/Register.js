import React from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native';
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
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>{`Salut ! \n Créer un compte pour commencer.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <TextInput style={styles.textInput} placeholder="Prenom et nom" placeholderTextColor='#FFF'
                        onChangeText={(name) => this.setState({ name })}
                        autoCapitalize='none' />
                    <TextInput style={styles.textInput} placeholder="Adresse mail " placeholderTextColor='#FFF'
                        onChangeText={(email) => this.setState({ email })}
                        autoCapitalize='none' />
                    <TextInput style={styles.textInput} placeholder="Mot de passe " placeholderTextColor='#FFF' secureTextEntry onChangeText={(password) => this.setState({ password })} />
                    <TextInput style={styles.textInput} placeholder="Confirmation du mot de passe " placeholderTextColor='#FFF' secureTextEntry onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableOpacity style={styles.userBtnRegister} onPress={this.handleSignUp}>
                    <Text style={styles.textBtn}>Que l'aventure commence ! </Text>
                </TouchableOpacity>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.textBtnCreate}>Déjà un compte ? </Text>
                        <Text style={styles.textBtnCreate, { color: "#E616E6", textAlign: 'center', fontWeight: 'bold' }}>Connectez vous  </Text>
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
    },
    header: {
        marginTop: 32,
        fontSize: 28,
        textAlign: 'center',
        color: "#FFF",
        paddingBottom: 10,
        marginBottom: 20,
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
        marginBottom: 22,
        width: '80%',
    },
    textInput: {
        height: 40,
        color: "#FFF",
        marginBottom: 30,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF'
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
