import React from 'react'
import {View,TouchableOpacity,TextInput,Text,StyleSheet } from 'react-native'

class Register extends React.Component {

    render() {
        return (
            <View style={styles.container}>          
                    <Text style={styles.header}>Créer un compte</Text>
                    <TextInput style={styles.textInput} placeholder="Adresse mail " placeholderTextColor='#FFF' 
                        onChangeText={(username) => this.setState({ username })} 
                        autoCapitalize='none'/>
                    <TextInput style={styles.textInput} placeholder="Mot de passe " placeholderTextColor='#FFF' secureTextEntry onChangeText={(password) => this.setState({ password })}/>
                    <TextInput style={styles.textInput} placeholder="Confirmation du mot de passe " placeholderTextColor='#FFF' secureTextEntry onChangeText={(password) => this.setState({ password })}/>
                    <TouchableOpacity style={styles.userBtn} onPress={this._login}>
                        <Text style={styles.textBtn}>Que l'aventure commence !</Text>
                    </TouchableOpacity>
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
    header: {
        fontSize: 28,
        alignSelf: 'flex-start',
        color: "#FFF",
        paddingBottom: 10,
        marginBottom: 40,
        marginLeft: 50,
    },
    textInput: {
        width: '80%',
        height: 40,
        color: '#FFF',
        marginBottom: 40,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF'
    },
    userBtn: {
        backgroundColor: '#643c94',
        color: '#FFF',
        padding: 20,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center'
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