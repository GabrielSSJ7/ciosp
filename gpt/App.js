/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import Routes from "./src/Routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./src/reducers";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";

export default class App extends Component {
  constructor(props) {
    super(props);

    let config = {
      apiKey: "-",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}
