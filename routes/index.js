import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import { NonAdminStack } from './nonAdminStack';
import { LoginStack } from './login';


class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      this.props.navigation.navigate(userToken ? 'NonAdmin' : 'Login');
    };
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  
  export const RootStack = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      NonAdmin: NonAdminStack,
      Login: LoginStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
);