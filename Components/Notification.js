import React from 'react'
import {View, Text, StyleSheet, SafeAreaView,Dimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default class Notification extends React.Component {
    render () {
        return (
            <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#75EAEA', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: Dimensions.get('window').height * 1.2,
                }}
            />
        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E616E6',
        paddingVertical: 15
    },
})