import React from 'react'
import {View,StatusBar,TouchableOpacity,Text,Image,TextInput,StyleSheet } from 'react-native'

class Register extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#14142d' barStyle="light-content" />
                <Image source={require('../Images/Logo_complete.png')} style={styles.logo} />
                <Text style={styles.label}>Adresse mail : </Text>
                    <TextInput style={styles.textInput} placeholder="Adresse mail " 
                        onChangeText={(username) => this.setState({ username })} 
                        autoCapitalize='none'/>
                <Text style={styles.label}>Mot de passe : </Text>
                    <TextInput style={styles.textInput} placeholder="Mot de passe " secureTextEntry onChangeText={(password) => this.setState({ password })}/>
                <Text style={styles.label}>Confirmer votre mot de passe : </Text>
                    <TextInput style={styles.textInput} placeholder="Confirmation du mot de passe " secureTextEntry onChangeText={(password) => this.setState({ password })}/>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.userBtn} onPress={this._login}>
                        <Text style={styles.textBtn}>Que l'aventure commence !</Text>
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
        justifyContent: 'flex-start',
    },
    logo: {
        height: '20%',
        width: "100%",
        marginBottom: 25
    },
    welcome: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        padding: 5,
        paddingLeft: 25
    },
    textInput: {
        width: '90%',
        padding: 15,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginLeft: 25
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    userBtn: {
        backgroundColor: '#643c94',
        color: '#FFF',
        padding: 15,
        margin: 25,
        borderRadius: 15
    },
    textBtn: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    label:  {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 35
    }
});
export default Register