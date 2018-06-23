import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

type Props = {
    label: string,
    value: string,
    onChangeText?: () => void,
    placeholder: string,
    secureTextEntry?: boolean
}

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }: Props) => {
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        //equally seperate from total space for both input and label
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export { Input };