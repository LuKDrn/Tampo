import React from 'react'
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'

export default class Message extends React.Component {
    render () {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Messages</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#14142d'
    }
})