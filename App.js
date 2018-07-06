import React from 'react';
// import { RootStack } from './routes';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { DefaultRoute } from './routes';

export default class App extends React.Component{
  render(){
    return (
      <DefaultRoute />
    );
  }
}

