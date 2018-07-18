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
import { getPartsInfo, sendMovementLog, getPossOrderbyptno, getMovementLogInfobyDate } from '../services/api.service'

export default class Order extends React.Component {

    constructor(){
        super();
        this.blurListener;
        this.focusListener;
        this.state = {
            formData: {
                PartNo: '',
                MovementType: 'Outbound',
                Quantity: '',
                OperatorName: 'A242230',
                LocationName: '',
                PrimaryName: '',
                MovementTimeStamp: ''
            }, 
            locationForPart: [],
            isFocused: false,
            totalEO: 0,
            totalAO: 0,
            pickedEO: 0,
            pickedAO: 0,
            packedAO: 0,
            packedEO: 0
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
        debugger;
        let totalQty = parseInt(this.state.formData.Quantity, 10);
        let d = new Date();
        if(this.state.formData.MovementType === 'Packed'){
            if(this.state.totalEO > 0 && this.state.packedEO < this.state.totalEO){
                let postData = JSON.parse(JSON.stringify(this.state.formData));
                postData.MovementTimeStamp = d.toISOString().split('T')[0];
                postData.OrderType = 'EO';
                postData.LocationName = 'Dispatch';
                let eoQty = 0;
                if((this.state.totalEO - this.state.packedEO) >= totalQty){
                    eoQty = postData.Quantity = totalQty;
                }
                else{
                    eoQty = postData.Quantity = (this.state.totalEO - this.state.packedEO);
                }
                totalQty -= eoQty;
                let records = this.state.locationForPart.filter(ele => ele.Quantity >= eoQty);
                postData.LocationName = records[0].LocationName;
                sendMovementLog(postData).then(data => {
    
                }).catch(error => alert("Error Occured"));
            }
            if(totalQty > 0 && this.state.totalAO > 0 && this.state.packedAO < this.state.totalAO){
                let aoData  = JSON.parse(JSON.stringify(this.state.formData));
                aoData.MovementTimeStamp = d.toISOString().split('T')[0];
                aoData.OrderType = 'AO';
                let aoQty = 0;
                if((this.state.totalAO - this.state.packedAO) >= totalQty){
                    aoQty = aoData.Quantity = totalQty;
                } else {
                    aoQty = aoData.Quantity = (this.state.totalAO - this.state.packedAO);
                }
                totalQty -= aoQty;
                let records = this.state.locationForPart.filter(ele => ele.Quantity >= aoQty);
                aoData.LocationName = records[0].LocationName;
                sendMovementLog(aoData).then(data => {
    
                }).catch(error => alert("Error Occured"));
            }
            alert('Data submitted');
        }
        if(this.state.formData.MovementType === 'Outbound'){
            if(this.state.totalEO > 0 && this.state.pickedEO < this.state.totalEO){
                let postData = JSON.parse(JSON.stringify(this.state.formData));
                postData.MovementTimeStamp = d.toISOString().split('T')[0];
                postData.OrderType = 'EO';
                let eoQty = 0;
                if((this.state.totalEO - this.state.pickedEO) >= totalQty){
                    eoQty = postData.Quantity = totalQty;
                }
                else{
                    eoQty = postData.Quantity = (this.state.totalEO - this.state.pickedEO);
                }
                totalQty -= eoQty;
                let records = this.state.locationForPart.filter(ele => ele.Quantity >= eoQty);
                postData.LocationName = records[0].LocationName;
                sendMovementLog(postData).then(data => {
    
                }).catch(error => alert("Error Occured"));
            }
            if(totalQty > 0 && this.state.totalAO > 0 && this.state.pickedAO < this.state.totalAO){
                let aoData  = JSON.parse(JSON.stringify(this.state.formData));
                aoData.MovementTimeStamp = d.toISOString().split('T')[0];
                aoData.OrderType = 'AO';
                let aoQty = 0;
                if((this.state.totalAO - this.state.pickedAO) >= totalQty){
                    aoQty = aoData.Quantity = totalQty;
                } else {
                    aoQty = aoData.Quantity = (this.state.totalAO - this.state.pickedAO);
                }
                totalQty -= aoQty;
                let records = this.state.locationForPart.filter(ele => ele.Quantity >= aoQty);
                aoData.LocationName = records[0].LocationName;
                sendMovementLog(aoData).then(data => {
    
                }).catch(error => alert("Error Occured"));
            }
            alert('Data submitted');
        }        
        if(totalQty > 0){
            alert("Extra parts picked");
        }
    }
    
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', this._onFocus);
        this.blurListener = this.props.navigation.addListener('didBlur', this._onBlur);
        this._getToken();
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    onScanned = (itemId) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData[PartNo] = text;
        this.setState({
            formData : formData
        });
    }

    _onFocus = () => {
        AsyncStorage.getItem('userToken').then(data => {
            if(data){
                let pdata = JSON.parse(data)
                let formData = JSON.parse(JSON.stringify(this.state.formData));
                formData.MovementType = pdata.role;
                formData.OperatorName = pdata.userId;
                this.setState({formData: formData});
                this.setState({isFocused: true});
            } else {
                this.props.navigation.navigate('Setting');
            }
        }).catch(error => alert(error));
    };

    _onBlur = () => {
        this.setState({isFocused: false});
    };
    
    _getToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('data' + userToken);
    }
    onEditingOver = () => {
        debugger;
        if(this.state.formData.PartNo){
            getPossOrderbyptno(this.state.formData.PartNo, new Date().toISOString().split('T')[0]).then(data => {
                let records = data.data;
                if(records.length > 0){
                    let picktotalEO = 0;
                    let picktotalAO = 0;
                    let packtotalAO = 0;
                    let packtotalEO = 0;
                    for (const iterator of records) {
                        if(iterator.OrderType === 'EO'){
                            if(iterator.MovementType === 'Outbound')
                                picktotalEO += iterator.Quantity;
                            else if(iterator.MovementType === 'Packed')
                                packtotalEO += iterator.Quantity;
                        } else if(iterator.OrderType === 'AO'){
                            if(iterator.MovementType === 'Outbound')
                                picktotalAO += iterator.Quantity;
                            else if(iterator.MovementType === 'Packed')
                                packtotalAO += iterator.Quantity;
                        }
                    }
                    this.setState({totalAO: picktotalAO});
                    this.setState({totalEO: picktotalEO});
                    this.setState({packedAO: packtotalAO});
                    this.setState({packedEO: packtotalAO})
                }
            });
            getMovementLogInfobyDate(this.state.formData.PartNo, new Date().toISOString().split('T')[0]).then(data => {
                let records = data.data;
                if(records.length > 0){
                    let mvTotalEO = 0;
                    let mvTotalAO = 0;
                    for (const iterator of records) {
                        if(iterator.MovementType === 'Outbound'){
                            if(iterator.OrderType === 'EO'){
                                mvTotalEO += iterator.Quantity;
                            } else if(iterator.OrderType === 'AO'){
                                mvTotalAO += iterator.Quantity;
                            }
                        }                       
                    }
                    this.setState({pickedEO: mvTotalEO});
                    this.setState({pickedAO: mvTotalAO});
                }
            })
        }
        if(this.state.formData.Quantity && this.state.formData.PartNo && this.state.formData.MovementType !== 'Packed'){
            getPartsInfo(this.state.formData.PartNo).then(data => 
                {
                    if(data.data.length > 0){
                        this.setState({locationForPart : data.data});
                        // let records = data.data.filter(element => element.Quantity > parseInt(this.state.formData.Quantity), 10);
                        let formData = JSON.parse(JSON.stringify(this.state.formData));
                        formData.PrimaryName = data.data[0].LocationName;
                        this.setState({formData: formData});
                    } else {
                        alert("No location with required capacity found");
                    }                    
                }).catch((error) => alert(JSON.stringify(error)));
        } else if(this.state.formData.MovementType === 'Packed'){
            let formData = JSON.parse(JSON.stringify(this.state.formData));
            formData.LocationName = 'Dispatch';
            this.setState({formData: formData});
        }
    }
    onLocationChange = (val) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData.LocationName = val;
        this.setState({formData: formData});
    }

    onScanned = (value) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData.PartNo = value;
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
                        <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 5, height: 40}}>
                            {/* <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                selectedValue = {this.state.formData.LocationName}
                                onValueChange = {this.onLocationChange}
                                >
                                    {this.state.locationForPart.map((picker) => {return <Picker.Item value={picker.LocationName} label={picker.LocationName} key={picker.ID}/>})}
                            </Picker> */}
                            <Input disabled = {true} onChangeText={(text) => this.onInputChange(text, 'PrimaryName')} value={this.state.formData.PrimaryName} />
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
                    <Button rounded style={{justifyContent: 'center', alignItems:'center', width: 250, backgroundColor: 'rgba(210, 10, 15, 1)'}} onPress={this.onSubmit}>
                        <Text style={{color: '#fff', padding: 5}}>SUBMIT</Text>
                    </Button>
                </View>
               </View>
           </ScrollView> 
        );
    }
}



