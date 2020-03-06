import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Image, StatusBar, AsyncStorage } from 'react-native'

const userInfo = {username: 'admin@mail.com', password: 'pass1'}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password : ''
        }
    }

    _login = async () => {
        if (userInfo.username === this.state.username && userInfo.password === this.state.password) {
            await AsyncStorage.setItem('IsLoggedIn', '1');
            this.props.navigation.navigate('Index');
        }
        else {
            alert("Adresse mail ou mot de passe incorrecte.");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#14142d' barStyle="light-content" />
                <Text style={styles.welcome}>Bienvenue sur Tampo</Text>
                <Text style={styles.welcomeSmall}>Découvrez, connectez et collaborez entre musiciens</Text>
                <Image source={require('../Images/Logo_complete.png')} style={styles.logo} />
                <TextInput style={styles.textInput} placeholder="Adresse mail " placeholderTextColor="#FFF"
                    onChangeText={(username) => this.setState({ username })} 
                    value={this.state.username} 
                    autoCapitalize='none'/>
                <TextInput style={styles.textInput} placeholder="Mot de passe " placeholderTextColor="#FFF" secureTextEntry onChangeText={(password) => this.setState({ password })} value={this.state.password}/>
                    <TouchableOpacity style={styles.userBtnLogIn} onPress={this._login}>
                        <Text style={styles.textBtn}>Se connecter </Text>
                    </TouchableOpacity>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.textBtnCreate}>Pas encore de compte ? </Text>
                        <Text style={styles.textBtnCreate}>Creer un compte </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#14142d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: '30%',
        width: "100%"
    },
    welcome: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
    welcomeSmall: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        margin: 5
    },
    textInput: {
        width: '80%',
        height: 40,
        color: "#FFF",
        marginBottom: 40,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF'
    },
    userBtnLogIn: {
        backgroundColor: '#643c94',
        color: '#FFF',
        padding: 15,
        marginTop: 5,
        marginBottom: 20,
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
        fontSize: 13 ,
        textAlign: 'center',
        marginVertical: 2
    }
});

export default Login