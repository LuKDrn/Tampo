import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Image, StatusBar, AsyncStorage, SafeAreaView } from 'react-native'
import * as firebase from 'firebase'
class Login extends React.Component {
    state = {
            email: '',
            password: '',
            errorMessage: null    
    };

    handleLogin = () => {
        const { email, password} = this.state

        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}));
    };

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#14142d' barStyle="light-content" />
                <Image source={require('../Images/Logo_complete.png')} style={styles.logo} />
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <TextInput style={styles.textInput} placeholder="Adresse mail " placeholderTextColor="#FFF"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        autoCapitalize='none' />
                    <TextInput style={styles.textInput} placeholder="Mot de passe " placeholderTextColor="#FFF" secureTextEntry 
                    onChangeText={(password) => this.setState({ password })} 
                    value={this.state.password} />
                </View>
                    <TouchableOpacity style={styles.userBtnLogIn} onPress={this.handleLogin}>
                        <Text style={styles.textBtn}>Se connecter </Text>
                    </TouchableOpacity>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.textBtnCreate}>Pas encore de compte ? </Text>
                            <Text style={styles.textBtnCreate,{ color: "#E616E6", textAlign: 'center', fontWeight: 'bold'}}>Creer un compte </Text>
                        </TouchableOpacity>
                    </View>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11152F',
        alignItems: 'center',
    },
    logo: {
        height: 130,
        width: "90%",
        marginVertical: 32
    },
    errorMessage: {
        height: 30
    },
    error :{
        color: "#E616E6",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        width: '80%',
    },
    textInput: {
        height: 40,
        color: "#FFF",
        marginBottom: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF'
    },
    userBtnLogIn: {
        width: '80%',
        backgroundColor: '#E616E6',
        color: '#FFF',
        padding: 15,
        marginHorizontal: 30,
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

export default Login