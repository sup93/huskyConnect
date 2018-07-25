import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';


type Props = {
    //could be {} inside loginUser
    message: {
        sender: string,
        message: string
    },
    isFromMe: boolean
}

class ChatBubble extends Component<Props> {
    render() {
        const { sender, message } = this.props.message;

        return (
                <View style={this.props.isFromMe ? styles.containerSenderStyle : styles.containerReceiverStyle}>
                    <Text style = {this.props.isFromMe ? styles.messageSenderStyle : styles.messageReceiverStyle}>
                        {message}
                    </Text>
                    <Text style = {this.props.isFromMe ? styles.senderStyle : styles.receiverStyle}>
                        {sender}
                    </Text>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    messageSenderStyle: {
        fontSize: 18,
        paddingLeft: 15,
        textAlign: 'right'
    },
    messageReceiverStyle: {
        fontSize: 18,
        paddingRight: 15,
        textAlign: 'left'
    },
    senderStyle: {
        fontSize: 10,
        color: 'blue'
    },
    receiverStyle: {
        fontSize: 10,
        color: 'red'
    },
    containerReceiverStyle: {
        borderBottomWidth: 1,
        padding: 5,
        flexDirection: 'column',
        borderColor: '#ddd',
        position: 'relative',
        alignItems: 'flex-start'
    },
    containerSenderStyle: {
        borderBottomWidth: 1,
        padding: 5,
        flexDirection: 'column',
        borderColor: '#ddd',
        position: 'relative',
        alignItems: 'flex-end'
    }

})

export default ChatBubble;