import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, Platform} from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";

export default class Message extends React.Component {
    state = {
        messages: []
    }

    get user() {
        return {
            _id: Fire.uid,
            name: this.props.navigation.state.params.name
        }
    }

    ComponentDidMount() {
        Fire.get(messages => 
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }))
        );
    }

    ComponentWillUnmount() {
        Fire.off();
    }

    render () {
        const chat = <GiftedChat message={this.state.messages} onSend={Fire.Send} user={this.user} />

        if (Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboradVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            );
        }
        return (
            <View style={styles.container}>
                <Text>Sreen</Text>
            </View>
        )
    }
}


