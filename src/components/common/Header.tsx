// purpose of the center compoent is just nice rectangle 
// with some text inside of it

// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
// function headerHelper(props) {
//     const { textStyle, viewStyle } = styles;

//     return (
//         <View style={viewStyle}>
//             <Text style={textStyle}>{props.headerText}</Text>;
//         </View>
//     );
// }

// const Header = headerHelper;

const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    // const textStyle = styles.textStyle;
    // const viewStyle = styles.viewStyle;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>;
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        // how shadow is dark and heavy it is. num between 0-1
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textSytle: {
        fontSize: 20
    }
};

// Make the component available to other parts of the app
export { Header };
