import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    title: string
}
class TabIcon extends Component<Props> {
      /** some styling **/
      componentWillMount() {
          console.log(this.props.title + 'mounted');
      }
      render() {
        return (
            <Text>
                {this.props.title}
            </Text>
            // <View style={styles.buttonStyle}>
            //     <Text style={styles.textStyle}>{this.props.title}</Text>
            // </View>
        );
    }
}

  let styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        height: 45,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between'
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600'
    }
});

export { TabIcon }