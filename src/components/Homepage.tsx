import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

type Props = {
    //could be {} inside loginUser
}

class Homepage extends Component<Props> {
    render(){
        return (
            <Text> Hello </Text>
        );
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
})

// type State = {
//     auth: any
// }

// const mapStateToProps = ({ auth }: State) => {
//     console.log(auth);
//     const { email, password, error, loading } = auth;

//     return { email, password, error, loading };
// };

export default connect(null, { 
})(Homepage as any);
