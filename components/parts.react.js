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

export default class Parts extends React.Component {
    constructor(){
        super();
        this.state = {
            itemID: '',
            type: 'Part',
            isFocused: false
        }
    }
    onSubmit = () => {
        if(this.state.itemID){
            this.props.navigation.navigate('Description', {
                itemId: this.state.itemID,
                type: this.state.type
            });    
        } else {
            alert('Enter part or buffer ID');
        }        
    }
    onInputChange = (text) => {
        this.setState({
            itemID: text
        });
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this._onFocus);
        this.props.navigation.addListener('didBlur', this._onBlur);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('didFocus', this._onBlur);
        this.props.navigation.removeListener('didBlur', this._onFocus);
    }

    _onFocus = () => {
        this.setState({isFocused: true});
      };

      _onBlur = () => {
        this.setState({isFocused: false});
    };

    onScanned = (value) => {
        this.setState({itemID: value});
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
                <Text style={{justifyContent: 'flex-start', fontSize: 19, color: 'black', fontWeight: '500', marginTop: 20}}>Part ID</Text>
                <Item rounded style={{borderColor: '#5c5b5a', backgroundColor: 'white', marginTop: 10}}>
                    <Input onChangeText={this.onInputChange} value = {this.state.itemID}/>
                </Item>
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



