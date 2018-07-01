import React from 'react';
import {
  AsyncStorage,
  Button,
  View,
  StyleSheet,
  Text,
  Image, 
  TextInput, 
  TouchableOpacity
} from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={require('../assets/images/bufferHome.png')} style={styles.loginIcon}/>
            <View style={{marginVertical: 20, flex: 1, justifyContent: 'flex-end'}}>
              <TextInput placeholder="Login Id" underlineColorAndroid = "transparent" style={styles.input}/>
              <TextInput placeholder="Password" underlineColorAndroid = "transparent" style={styles.input}/>
              <TouchableOpacity style={styles.button} onPress = {this._signInAsync} >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                SIGN IN
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('NonAdmin');
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      backgroundColor: 'white',
      elevation: 3,
      width: 350,
      height: 550,
      padding: 20,
    },
    loginIcon: {
      width: 150, 
      height: 150, 
      alignSelf: 'center',
      marginTop: 30
    },
    input: {
      height: 60,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#ECF0F3',
      paddingHorizontal: 19,
      marginVertical: 10
    }, 
    button: {
      height: 60,
      borderRadius: 3,
      backgroundColor: '#11B8FF',
      justifyContent: 'center',
      alignItems: 'center'
    }
});