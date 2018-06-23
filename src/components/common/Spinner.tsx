import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native';

type Props = {
    size: any
}

const Spinner = ({ size }: Props) => {
    return (
        <View style={styles.spinnerStyle}>
            {/* accept props otherwise default set as large */}
            <ActivityIndicator size={size || "large"} />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export { Spinner }