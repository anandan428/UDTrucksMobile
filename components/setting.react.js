import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Item, Input, Button, Switch, Picker, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Settings extends React.Component {

    constructor(){
        super();
        this.state = {
            userInfo: {
                userId: '',
                role: 'key0'
            }            
        }
    }

    onInputChange = (text) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.userInfo));
        userInfo.userId = text;
        this.setState({userInfo: userInfo});
    }

    updateRole = (value) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.userInfo));
        userInfo.role = value;
        this.setState({userInfo: userInfo});
    }

    onSave = () => {
        debugger;
        if(this.state.userInfo.userId){
            AsyncStorage.setItem('userToken', JSON.stringify(this.state.userInfo));
            alert('User Information saved');
        }
    }

    render(){
        return(
            <View style={{padding: 10, backgroundColor: '#F2F2F2', flex: 1}}>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>User Name</Text>
                <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40}}>
                    <Input onChangeText = {this.onInputChange} value = {this.state.userInfo.userId}/>
                </Item>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Role</Text>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" style={{color: 'black'}}/>}
                        style={{ width: undefined}}
                        selectedValue = {this.state.role} onValueChange = {this.updateRole}>
                        <Picker.Item label="Picking" value="key0" />
                        <Picker.Item label="Packing" value="key1" />
                        <Picker.Item label="Binning" value="key2" />
                    </Picker>
                </Item>
                <View style={{justifyContent: 'center', alignItems:'center', alignSelf: 'stretch', flexDirection: 'row', marginTop: 20}}>
                    <Button rounded style={{justifyContent: 'center', alignItems:'center', width: 250}} onPress={this.onSave}>
                        <Text style={{color: '#fff', padding: 5}}>SAVE</Text>
                    </Button>
                </View>
            </View>
        );
    }
}



