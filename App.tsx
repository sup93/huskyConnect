/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import firebase from 'firebase';
import React from 'react'; 
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: `hello it's sue`,
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDXo_jIgNEI7DUBGvEx_AfYqYvBDl4UxJ4",
      authDomain: "huskyconnect-f1fc2.firebaseapp.com",
      databaseURL: "https://huskyconnect-f1fc2.firebaseio.com",
      projectId: "huskyconnect-f1fc2",
      storageBucket: "huskyconnect-f1fc2.appspot.com",
      messagingSenderId: "886420119417"
    };
    firebase.initializeApp(config);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
