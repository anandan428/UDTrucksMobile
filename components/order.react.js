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
import { Item, Input, Button, Switch, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { getPartsInfo, sendMovementLog } from '../services/api.service'

export default class Order extends React.Component {

    constructor(){
        super();
        this.state = {
            formData: {
                PartNo: '',
                MovementType: '',
                Quantity: '',
                OperatorName: 'A242230',
                isInbound: false
            }, 
            locationForPart: []
        }
    }

    onInputChange = (text, field) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData[field] = text;
        this.setState({
            formData : formData
        });
    }

    onSubmit = () => {
        // this.props.navigation.navigate('Description', {title: 'Whatever'});
    }

    momentType = (type) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData.isInbound = type;
        if(formData.isInbound){
            formData.MovementType = 'OUTBOUND'
        } else {
            formData.MovementType = 'INBOUND'
        }
        this.setState({
            formData: formData
        });
    }

    onEditingOver = () => {
        if(this.state.formData.Quantity && this.state.formData.PartNo){
            getPartsInfo(this.state.formData.PartNo).then(data => {this.setState({locationForPart: data.data}); alert(JSON.stringify(this.state.locationForPart))}).catch((error) => alert(JSON.stringify(error)));
        }
    }

    render(){
        return(
           <ScrollView contentContainerStyle={{ padding: 10}}>
               <ScanScreen />
               <View style={{padding: 10}}>
                <Text style={{fontSize: 19, marginTop: 15, fontWeight: '600', alignSelf: 'center'}}> OR </Text>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Part ID</Text>
                <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40}}>
                    <Input onChangeText={(text) => this.onInputChange(text, 'PartNo')} onEndEditing={this.onEditingOver} value={this.state.formData.PartNo}/>
                </Item>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Moment Type: Picking</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Quantity</Text>
                        <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40, width: 100}}>
                            <Input onEndEditing={this.onEditingOver} onChangeText={(text) => this.onInputChange(text, 'Quantity')} value={this.state.formData.Quantity}/>
                        </Item>
                    </View>
                    <View >
                        <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>User ID</Text>
                        <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40, width: 200}}>
                            <Input disabled = {true} onChangeText={(text) => this.onInputChange(text, 'OperatorName')} value={this.state.formData.OperatorName}/>
                        </Item>
                    </View>
                    <View>
                    </View>
                </View>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Location</Text>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={{ width: undefined }}>
                            {this.state.locationForPart.map((picker) => {return <Picker.Item value={picker.PartNo} label={picker.LocationName} key={picker.ID}/>})}
                    </Picker>
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



