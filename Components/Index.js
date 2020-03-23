import React from 'react'
import {View,Text, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';


class Index extends React.Component {
    state = {
        email: "",
        displayName: ""
    };

    componentDidMount(){
        const {email, displayName} = firebase.auth().currentUser;
        this.setState({ email, displayName});
    }
    signOutUser = () => {
        firebase.auth().signOut();
    };

    render(){
        return (
            <View style={styles.container}>
                <Text style={{color: "#FFF", fontWeight: "bold", fontSize: 16}}>Bienvenue {this.state.displayName} ! </Text>
                <TouchableOpacity style={styles.row} onPress={this.signOutUser}>
                    <Text style={{color: "#E616E6"}}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#14142d'
    },
    row : {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        paddingVertical: 2,
        justifyContent:'flex-end',
        alignItems: 'flex-start'
    }
})
export default Index