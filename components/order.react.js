import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import ScanScreen from '../containers/BarCodeScanner.react';
import { Item, Input, Button} from 'native-base';

export default class Order extends React.Component {
    onSubmit = () => {
        debugger;
        console.log(this.props)
        this.props.navigation.navigate('Description', {title: 'Whatever'});
    }
    render(){
        return(
           <ScrollView contentContainerStyle={{ padding: 10}}>
               <ScanScreen />
               <View style={{padding: 10}}>
                <Text style={{fontSize: 19, marginTop: 15, fontWeight: '600', alignSelf: 'center'}}> OR </Text>
                <Text style={{justifyContent: 'flex-start', fontSize: 19, color: 'black', fontWeight: '500', marginTop: 20}}>Part Number</Text>
                <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 10}}>
                    <Input />
                </Item>
                <View style={{justifyContent: 'center', alignItems:'center', alignSelf: 'stretch', flexDirection: 'row', marginTop: 20}}>
                    <Button rounded style={{justifyContent: 'center', alignItems:'center', width: 250}} onPress={this.onSubmit}>
                        <Text style={{color: '#fff', padding: 5}}>SUBMIT</Text>
                    </Button>
                </View>
               </View>
           </ScrollView> 
        );
    }
}


