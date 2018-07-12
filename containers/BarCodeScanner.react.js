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
        this.props.onScan(e.data.itemId);
    }
    render() {
        return(
            <QRCodeScanner
                onRead = {this.onSuccess}
                cameraStyle = {{width: 300, height: 250}}
                containerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}
            />
        )
    }
}