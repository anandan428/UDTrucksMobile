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
        this.scanner;
    }

    onSuccess(e) {
        this.props.onScan(e.data);
        this.scanner.reactivate();
    }
    render() {
        return(
            <QRCodeScanner
                ref = {(node) => { this.scanner = node }}
                onRead = {(e) => this.onSuccess(e)}
                cameraStyle = {{width: 300, height: 250}}
                containerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}
            />
        )
    }
}