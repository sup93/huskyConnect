/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import React from 'react'; 
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import Router from './Router';

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
    const store= createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <Router />
      </Provider>
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
