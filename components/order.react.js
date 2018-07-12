import React from 'react';
import {
    ScrollView,
    StyleSheet,
    AsyncStorage,
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
                MovementType: 'Outbound',
                Quantity: '',
                OperatorName: 'A242230',
                LocationName: '',
                MovementTimeStamp: ''
            }, 
            locationForPart: [],
            isFocused: false
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
        let postData = JSON.parse(JSON.stringify(this.state.formData));
        postData.Quantity = parseInt(postData.Quantity, 10);
        let d = new Date();
        postData.MovementTimeStamp = d.toISOString().split('T')[0];
        if(this.state.formData.MovementType === 'Packed'){
            postData.LocationName = 'Dispatch';
        }
        sendMovementLog(postData).then(data => {
            alert('Data submitted');
        }).catch(error => alert(JSON.stringify(error)));
    }
    
    componentDidMount() {
        this.props.navigation.addListener('didFocus', this._onFocus);
        this.props.navigation.addListener('didBlur', this._onBlur);
        debugger;
        this._getToken();
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('didFocus', this._onBlur);
        this.props.navigation.removeListener('didBlur', this._onFocus);
    }

    onScanned = (itemId) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData[PartNo] = text;
        this.setState({
            formData : formData
        });
    }

    _onFocus = () => {
        // this._getToken();
        this.setState({isFocused: true});
      };

      _onBlur = () => {
        this.setState({isFocused: false});
      };
    _getToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('data' + userToken);
    }
    // _getToken = async () => {
    //     // debugger;
    //     // const userToken = await AsyncStorage.getItem('userToken');
    //     // if(!userToken){
    //     //     this.props.navigation.navigate('Setting');
    //     // }
    // }
    onEditingOver = () => {
        if(this.state.formData.Quantity && this.state.formData.PartNo && this.state.formData.MovementType !== 'Packed'){
            getPartsInfo(this.state.formData.PartNo).then(data => 
                {
                    debugger;
                    let records = data.data.filter(element => element.Quantity > parseInt(this.state.formData.Quantity), 10);
                    if(records.length > 0){
                        this.setState({locationForPart: records});
                        let formData = JSON.parse(JSON.stringify(this.state.formData));
                        formData.LocationName = records[0].LocationName;
                        this.setState({formData: formData});
                    } else {
                        alert('No buffer with required capacity found')
                    }
                }).catch((error) => alert(JSON.stringify(error)));
        } else if(this.state.formData.MovementType === 'Packed'){
            let formData = JSON.parse(JSON.stringify(this.state.formData));
            formData.LocationName = 'Dispatch';
            this.setState({formData: formData});
        }
    }
    onLocationChange = (val) => {
        debugger;
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData.LocationName = val;
        this.setState({formData: formData});
    }
    render(){
        displayCamera = () => {
            if(this.state.isFocused){
                return(<ScanScreen onScan = {this.onScanned}/>);
            } else {
                return null;
            }
        }
        movementDisplayName = () => {
            switch(this.state.formData.MovementType){
                case 'Inbound': return 'Binning';
                case 'Outbound': return 'Picking';
                case 'Packed': return 'Packing';
            }
            return null;
        }
        showLocation = () => {
            if(this.state.formData.MovementType === 'Inbound' || this.state.formData.MovementType === 'Outbound'){
                return(
                    <View>
                        <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Location</Text>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                selectedValue = {this.state.formData.LocationName}
                                onValueChange = {this.onLocationChange}
                                >
                                    {this.state.locationForPart.map((picker) => {return <Picker.Item value={picker.LocationName} label={picker.LocationName} key={picker.ID}/>})}
                            </Picker>
                        </Item>
                    </View>
                );
            } else {
                return null;
            }
        }
        return(
           <ScrollView contentContainerStyle={{ padding: 10}}>
               {displayCamera()}
               <View style={{padding: 10}}>
                <Text style={{fontSize: 19, marginTop: 15, fontWeight: '600', alignSelf: 'center'}}> OR </Text>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Part ID</Text>
                <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40}}>
                    <Input onChangeText={(text) => this.onInputChange(text, 'PartNo')} onEndEditing={this.onEditingOver} value={this.state.formData.PartNo}/>
                </Item>
                <Text style={{justifyContent: 'flex-start', fontSize: 17, color: 'black', fontWeight: '500', marginTop: 20}}>Movement Type: {movementDisplayName()}</Text>
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
                            <Input disabled = {true} onChangeText={(text) => this.onInputChange(text, 'OperatorName')} value={this.state.formData.OperatorName} keyboardType='numeric'/>
                        </Item>
                    </View>
                    <View>
                    </View>
                </View>
                {showLocation()}
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



