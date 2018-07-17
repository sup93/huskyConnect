import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { classUpdate, classFormSave } from '../actions';
import { CardSection, Input, Button } from './common';

type Props = {
    //could be {} inside loginUser

}

class NewMessage extends Component<Props> {

    render() {
        return (
            <View >
                <Text style={styles.textStyle}>New Message</Text>
            </View>
        )
    }
}

const styles =StyleSheet.create({
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'blue'
    }
});

// type State = 
// {
//     classForm: any
// }

// const mapStateToProps = ({ classForm }: State) => {
//     const {
//         classcode,
//         classname,
//         profname,
//         time,
//         credits,
//         subject
//     } = classForm;

//     return classForm;
// };

export default connect(undefined, { })(NewMessage as any);
