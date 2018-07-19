import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { inputUpdate, classFormSave } from '../actions';
import { CardSection, Input, Button } from './common';

type Props = {
    //could be {} inside loginUser
    inputUpdate: (any: any) => void,
    classFormSave: (any: any) => void,
    classcode: string,
    classname: string,
    profname: string,
    time: string,
    credits: string,
    subject: string
}

class ClassForm extends Component<Props> {
    onButtonPress() {
        const { classcode, classname, profname, time, credits, subject } = this.props;
        this.props.classFormSave({ classcode, classname, profname, time, credits, subject });
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Class Code"
                        placeholder="TMATH 100"
                        onChangeText={(value: string) => this.props.inputUpdate({ prop: 'classcode', value })}
                        value={this.props.classcode}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Class Name"
                        placeholder="Introduction to Math"
                        value={this.props.classname}
                        onChangeText={(value: string) => this.props.inputUpdate({ prop: 'classname', value })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Professor Name"
                        placeholder="Sue Park"
                        value={this.props.profname}
                        onChangeText={(value: string) => this.props.inputUpdate({ prop: 'profname', value })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Time"
                        placeholder="0235-530"
                        value={this.props.time}
                        onChangeText={(value: string) => this.props.inputUpdate({ prop: 'time', value })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Credit"
                        placeholder= "5"
                        value={this.props.credits}
                        onChangeText={(value: string) => this.props.inputUpdate({ prop: 'credits', value })}
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerTextStyle}>Shift</Text>
                    <Picker
                        // style ={{ flex: 1}}
                        selectedValue={this.props.subject}
                        onValueChange={value => this.props.inputUpdate({ prop: 'subject', value })}
                    >
                        <Picker.Item label="Math" value="Math" />
                        <Picker.Item label="Science" value="Science" />
                        <Picker.Item label="Psychology" value="Psychology" />
                        <Picker.Item label="Music" value="Music" />
                        <Picker.Item label="Literature" value="Literature" />
                        <Picker.Item label="Computer" value="Computer" />
                        <Picker.Item label="Business" value="Business" />
                    </Picker>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Add Class
                    </Button>
                </CardSection>
            </View>
        )
    }
}

const styles ={
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
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

export default connect(mapStateToProps, { inputUpdate, classFormSave })(ClassForm as any);
