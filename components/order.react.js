import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import ScanScreen from '../containers/BarCodeScanner.react';
import { Item, Input, Button, Switch, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { getPartsInfo, sendMovementLog } from '../services/api.service'

export default class Order extends React.Component {

    constructor(){
        super();
        this.blurListener;
        this.focusListener;
        this.state = {
            formData: {
                PartNo: '',
                MovementType: '',
                Quantity: '',
                OperatorName: 'A242230',
                isInbound: false
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
        // this.props.navigation.navigate('Description', {title: 'Whatever'});
    }
    
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', this._onFocus);
        this.blurListener = this.props.navigation.addListener('didBlur', this._onBlur);
        
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    _onFocus = () => {
        debugger;
        AsyncStorage.getItem('userToken').then(data => {
            if(data){
                debugger;
                alert(JSON.stringify(data));
                this.setState({isFocused: true});
            } else {
                this.props.navigation.navigate('Setting');
            }
        }).catch(error => alert(error));
      };

      _onBlur = () => {
        this.setState({isFocused: false});
      };

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

    onScanned = (value) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData.PartNo = value.itemId;
        this.setState({formData: formData});
    }



    render(){
        displayCamera = () => {
            if(this.state.isFocused){
                return(<ScanScreen onScan= {this.onScanned}/>);
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



