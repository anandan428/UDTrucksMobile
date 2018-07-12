import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class ScanScreen extends React.Component {

    constructor(){
        super();
    }
    onSuccess(e) {
        this.props.onScan(JSON.parse(e.data));
    }
    render() {
        return(
            <QRCodeScanner
                onRead = {(e) => this.onSuccess(e)}
                cameraStyle = {{width: 300, height: 250}}
                containerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}
            />
        )
    }
}