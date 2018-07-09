import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

type Props = {
    //could be {} inside loginUser
}

class Classes extends Component<Props> {
    render(){
        return (

            <Text> Classes </Text>
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

type State = {
    auth: any
}

// const mapStateToProps = ({ auth }: State) => {
//     console.log(auth);
//     const { email, password, error, loading } = auth;

//     return { email, password, error, loading };
// };

export default connect(null, { 
})(Classes as any);
