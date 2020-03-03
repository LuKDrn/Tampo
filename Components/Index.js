import React from 'react'
import {View, Button, StyleSheet, AsyncStorage } from 'react-native'

class Index extends React.Component {

    _logOut = async() => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render(){
        return (
            <View style={styles.container}>
                <Button onPress={this._logOut} title="Se déconnecter" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#14142d'
    }
})
export default Index