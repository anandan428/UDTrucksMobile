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
import { Item, Input, Button, Switch} from 'native-base';

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
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Part/ Buffer ID</Text>
                <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40}}>
                    <Input />
                </Item>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Moment Type</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                    <Text style={{alignItems: 'flex-start', fontSize: 15, fontWeight: '500'}}>Inbound</Text>
                    <Switch value={false} />
                    <Text style={{alignItems: 'flex-end', fontSize: 15, fontWeight: '500'}}>Outbound</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Quantity</Text>
                        <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40, width: 100}}>
                            <Input />
                        </Item>
                    </View>
                    <View >
                        <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>User ID</Text>
                        <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40, width: 200}}>
                            <Input />
                        </Item>
                    </View>
                    <View>
                    </View>
                </View>
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



