import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { classUpdate, classFormSave } from '../actions';
import { CardSection, Input, Button } from './common';

type Props = {
    //could be {} inside loginUser
    course: {
        classcode: string,
        classname: string,
        profname: string,
        time: string,
        credits: string,
        subject: string
    }
}

class CourseBoard extends Component<Props> {

    render() {
        const { classcode, classname } = this.props.course;

        return (
            
            <View>
                <Text style = {styles.titleStyle}>
                    {classcode}
                </Text>
                <Text style = {styles.titleStyle}>
                    {classname}
                </Text>
            </View>
        )
    }
}

const styles ={
    titleStyle: {
        fontSize: 33,
        paddingLeft: 15,

    }
};

type State = 
{
    classForm: any
}

const mapStateToProps = ({ classForm }: State) => {
    const {
        classcode,
        classname,
        profname,
        time,
        credits,
        subject
    } = classForm;

    return classForm;
};

export default connect(mapStateToProps, {})(CourseBoard as any);
