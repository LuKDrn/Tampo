import React from 'react'
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'

export default class Notification extends React.Component {
    render () {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Notifications</Text>
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