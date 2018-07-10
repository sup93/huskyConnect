import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';


type Props = {
    //could be {} inside loginUser
    classObject: {
        classcode: string,
        classname: string,
        profname: string,
        time: string,
        credits: string,
        subject: string
    }
}

class ListItem extends Component<Props> {
    // onRowPress() {
    //     // this navigation method is called the Employee-create-form
    //     // will be rendered and it will be given an additional prop of employee
    //     // we are in the list item now, each list item is called with one employee
    //     // which is provided as this.prop.employee
    //     Actions.employeeEdit({ class: this.props.class });
    // }

    render() {
        const { classname } = this.props.classObject;

        return (
            // <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style = {styles.titleStyle}>
                            {classname}
                        </Text>
                    </CardSection>
                </View>
            // </TouchableWithoutFeedback>
        );
    }
}
const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,

    }
}

export default ListItem;