import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, Platform} from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";

export default class Message extends React.Component {
    state = {
        messages: [],
        displayName: ""
    }

    get user() {
        return {
            _id: Fire.uid,
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
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />;

        if (Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboradVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            );
        }
        return <SafeAreaView style={{ flex: 1}}>{chat}</SafeAreaView>;
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#14142d'
    },
})


