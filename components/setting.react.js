import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Item, Input, Button, Switch, Picker, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Settings extends React.Component {

    constructor(){
        super();
        this.state = {
            userId: '',
            role: 'Inbound'
        }
    }

    onInputChange = (text) => {
        this.setState({userId: text});
    }

    onRoleChange = (val) => {
        this.setState({role: val});
    }

    onSave = async () => {
        // if(this.state.userId && this.state.role){
        //     await AsyncStorage.clear();
        //     await AsyncStorage.setItem('userToken', JSON.stringify(this.state));
        //     this.props.navigation.navigate('Order');    
        // } else {
        //     alert('Please fill all the fields');
        // }
    }

    render(){
        return(
            <View style={{padding: 10, backgroundColor: '#F2F2F2', flex: 1}}>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>User ID</Text>
                <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40}}>
                    <Input onChangeText={this.onInputChange} value = {this.state.userId} />
                </Item>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Role</Text>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" style={{color: 'black'}}/>}
                        style={{ width: undefined}} selectedValue = {this.state.role} onValueChange = {this.onRoleChange}>
                        <Picker.Item label="Binning" value="Inbound" />
                        <Picker.Item label="Picking" value="Outbound" />
                        <Picker.Item label="Packing" value="Packed" />
                    </Picker>
                </Item>
                <View style={{justifyContent: 'center', alignItems:'center', alignSelf: 'stretch', flexDirection: 'row', marginTop: 20}}>
                    <Button rounded style={{justifyContent: 'center', alignItems:'center', width: 250}} onPress={this.onSubmit}>
                        <Text style={{color: '#fff', padding: 5}}>SAVE</Text>
                    </Button>
                </View>
            </View>
        );
    }
}



