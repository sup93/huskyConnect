import React, { Component } from 'react';
import { ListView, StyleSheet, ListViewDataSource, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ChatBubble from './ChatBubble';
import { messagesFetch } from '../actions';
import firebase from 'firebase';
import {CardSection, Input, Button} from './common';
import { inputUpdate, sendMessage } from '../actions';

type Props = {
    messagesFetch: (any: any) => void,
    inputUpdate: (any: any) => void,
    sendMessage: (any: any) => void,
    messagesList: any,
    conversationId: string,
    message: string,
}

export interface ClassesState {
    dataSource: ListViewDataSource,
}

class ConversationThread extends Component<Props, ClassesState> {

    renderButton() {
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Send
            </Button>
        );
    }
    onButtonPress() {
        console.log(this.props);
        const { conversationId, message } = this.props;
        // 1. user clicks send message button, which will call sendMessage action below
        // this will jump over to husky-actions.ts sendMessage code
        this.props.sendMessage({ conversationId, message });
    }
    constructor(props: Props) {
        props.messagesFetch(props.conversationId);
        console.log("in constructor");
        super(props);
        console.log("in super");
        console.log(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (old, oldnew) => old !== oldnew
        });
        console.log("ds");
        this.state = {
            dataSource: ds.cloneWithRows(props.messagesList)
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log('in component will receive props')
        const ds = new ListView.DataSource({
            rowHasChanged: (old, oldnew) => old !== oldnew
        });
        console.log(nextProps);
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.messagesList)
        });
    }

    private renderRow(message: any, email: string): JSX.Element {
        console.log('in renderRow of classes');
        return <ChatBubble message={message} isFromMe={email===message.sender}/>;
    }

    render(): JSX.Element {
        console.log("conversationId: " + this.props.conversationId);
        console.log('rendering view')
        //@ts-ignore
        const { currentUser } = firebase.auth();
        return (
            <View style={styles.containerStyle}>
                <ListView
                    // @ts-ignore
                    ref={ref => this.listView = ref}
                    onLayout={event => {
                        // @ts-ignore
                        this.listViewHeight = event.nativeEvent.layout.height
                    }}
                    onContentSizeChange={() => {
                        // @ts-ignore
                        this.listView.scrollTo({y: this.listView.getMetrics().contentLength - this.listViewHeight})
                    }}
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    // @ts-ignore
                    renderRow={(message: any) => this.renderRow(message, currentUser.email)}
                />

                <CardSection>
                    <Input
                        label="Message"
                        placeholder="Write Something..."
                        onChangeText={(value: string) => this.props.inputUpdate({ prop: 'message', value })}
                        value={this.props.message}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </View>            
        )
    }
}

type State = 
{
    messagesInfo: any
}

//map will pull out classList
const mapStateToProps = ({ messagesInfo }: State) => {
    console.log("MSTP");
    console.log(messagesInfo);
    const { messagesList, message } = messagesInfo;
    const messages: any = _.map(messagesList, (val) => {
        return { ...val };
    });
    return { messagesList: messages, message };
} 

//connect helper
export default connect(mapStateToProps,{ messagesFetch, inputUpdate, sendMessage })(ConversationThread as any);

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    containerStyle: {
        flex: 1,
        justifyContent: "flex-start",
    }
});
