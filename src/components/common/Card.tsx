import React from 'react';
import { View } from 'react-native';

type Props = {
    children: JSX.Element[]
}
const Card = (props: Props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
            {/* <Text>{props.album.title}</Text> */}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};

export { Card };
