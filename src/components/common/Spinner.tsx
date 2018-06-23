import React from 'react'
import { View, ActivityIndicator } from 'react-native';

type Props = {
    size: string
}

const Spinner = ({ size }: Props) => {
    return (
        <View style={styles.spinnerStyle}>
            {/* accept props otherwise default set as large */}
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { Spinner }