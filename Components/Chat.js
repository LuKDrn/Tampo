import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, Platform,Dimensions} from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import { LinearGradient } from 'expo-linear-gradient';
import Fire from "../Fire";

export default class Chat extends React.Component {
    state = {
        messages: [],
        displayName: ""
    }

    get user() {
        return {
            _id: Fire.shared.uid,
            name: this.props.navigation.state.displayName
        }
    }

    ComponentDidMount() {
        const displayName = firebase.auth().currentUser;
        Fire.get(messages => 
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }, displayName))
        );
    }

    ComponentWillUnmount() {
        Fire.off();
    }

    render () {
        return(
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


