import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { inputUpdate, sendMessage } from '../actions';
import { CardSection, Input, Button,Spinner } from './common';

type Props = {
    //could be {} inside loginUser
    inputUpdate: (any: any) => void,
    sendMessage: (any: any) => void,
    //could be {} inside loginUser
    loading: boolean,
    email: string,
    message: string,
    error: string

}

class NewMessage extends Component<Props> {
    componentWillMount() {
        console.log('component will mount');
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Send
            </Button>
        );
    }

    onButtonPress() {
        const { email, message } = this.props;
        this.props.sendMessage({ email, message });
    }

    render() {
        return (
            <View >
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="cherishgreentea@gmail.com"
                        onChangeText={(value: string) => this.props.inputUpdate({ prop: 'email', value })}
                        value={this.props.email}
                    />
                </CardSection>                
                <CardSection>
                    <Input
                        label="Message"
                        placeholder="Write Something..."
                        onChangeText={(value: string) => this.props.inputUpdate({ prop: 'message', value })}
                        value={this.props.message}
                    />
                </CardSection>
                <Text style = {styles.errorTextStyle}>
                    {this.props.error}
                </Text>

                <CardSection>

                    {this.renderButton()}
                </CardSection>
            </View>
        )
    }
}

const styles =StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});


type State = {
    input: any
}

const mapStateToProps = ({ input }: State) => {
    console.log(input);
    const { email, message } = input;

    return input;
};

export default connect(mapStateToProps, { inputUpdate, sendMessage })(NewMessage as any);
