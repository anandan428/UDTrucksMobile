import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class ScanScreen extends React.Component {
    onSuccess(e) {
        alert('read');
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