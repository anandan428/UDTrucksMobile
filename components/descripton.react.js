import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Card, CardItem, View, Right } from 'native-base';
import Timeline from 'react-native-timeline-listview';
import { getPartsInfo, getAllMovementLog, getAllLocation } from '../services/api.service';
import ProgressCircle from 'react-native-progress-circle'

export default class Descriptions extends React.Component {
    static navigationOptions = {
        title: 'Description',
      };
      constructor(){
          super();
          this.state = {
              momentLogs: [],
              allLocation: [],
              type: '',
              key: '',
              itemId: '',
              timeline: [],
              parts: {
                  partsLocation: [],
                  total: '',
                  partsInfo: [],
                  timeLine: []
              }
          }
      }
    componentDidMount(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId');
        const type = navigation.getParam('type');
        this.setState({type: type});
        this.setState({itemId: itemId});
        switch(type){
            case 'Part': this.setState({key: 'PartNo'});
                getPartsInfo(itemId).then((data) => {
                    let totalInventory = 0;
                    let records = data.data;
                    let parts = JSON.parse(JSON.stringify(this.state.parts));
                    for (const iterator of records) {
                        totalInventory += iterator.Quantity;
                        parts.partsLocation.push(iterator);
                    }
                    parts.total = '' + totalInventory;
                    this.setState({parts: parts});

                }).catch(error => {
                    Alert.alert(
                        'Not Found',
                        'The entity was not found',
                        [
                            {text: 'OK', onPress: () => this.props.navigation.navigation.goBack()}
                        ]
                    );
                });
        }
        getAllMovementLog().then((data) => {
                    this.data = [];
                    let filteredMomentLogs = data.data.filter(element => element[this.state.key] === this.state.itemId);
                    this.setState({momentLogs : filteredMomentLogs});
                    for (const iterator of filteredMomentLogs) {
                        this.data.push({
                            time: '09:00', title: iterator.MovementType, description: iterator.LocationName + ", by " + iterator.OperatorName + ", quantity " + iterator.Quantity
                        });
                    }
                    this.setState({timeline: this.data});
                   }).catch(error => console.log(error));
        // getPartsInfo(this.state.itemId).then((data) => {
        //     let locationData = data.data;

        // })
    }
    
    render(){
        showPrimary = () => {
            if(this.state.type === 'Buffer'){
                return (
                    <Card>
                        <CardItem>
                            <View>
                                <View style={{flexDirection: 'row', alignItems:'center'}}>
                                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                                        ID: 
                                    </Text>
                                    <Right>
                                        <Text style={{fontSize: 13, fontWeight: '400'}}>
                                            {this.state.itemId}
                                        </Text>
                                    </Right>
                                </View>
                                <View style={{flexDirection: 'row', alignItems:'center'}} >
                                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                                        Location: 
                                    </Text>
                                    <Right>
                                        <Text style={{fontSize: 13, fontWeight: '400'}}>
                                            Some dummy text
                                        </Text>
                                    </Right>
                                </View>
                                <View style={{flexDirection: 'row', alignItems:'center'}}>
                                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                                        Quantity: 
                                    </Text>
                                    <Right>
                                        <Text style={{fontSize: 13, fontWeight: '400'}}>
                                            Some dummy text
                                        </Text>
                                    </Right>
                                </View>
                                <View style={{flexDirection: 'row', alignItems:'center'}}>
                                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                                        Primary Buffer: 
                                    </Text>
                                    <Text style={{fontSize: 13, fontWeight: '400', marginLeft: 20}}>
                                        Some dummy Id
                                    </Text>
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                );
            }            
            else{
                return null;
            }
        }
        partsInformation = () => {
            if(this.state.type === 'Part'){
                return (
                    <View>
                        <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                            Parts Information
                        </Text>
                        <Card>
                            <CardItem>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                                        <Text style={{fontSize: 17, fontWeight: '600'}}>
                                            ID: 
                                        </Text>
                                        <Text style={{fontSize: 15, fontWeight: '400', marginLeft: 20}}>
                                            {this.state.itemId}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: 17, fontWeight: '600'}}>
                                            Total: 
                                        </Text>
                                        <Text style={{fontSize: 15, fontWeight: '400', marginLeft: 20}}>
                                            {this.state.parts.total}
                                        </Text>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                        <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                            Status
                        </Text>
                        <Card>
                            <View style={{flex: 1, padding: 10}}>
                                <View style={{flexDirection: 'row', alignItems:'center'}}>
                                    <Text style={{fontSize: 17, fontWeight: '600'}}>
                                        Total Orders: 50
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', padding: 10, paddingLeft: 20, paddingRight: 20,flex: 1, justifyContent: 'space-between'}}>
                                    <View style={{alignItems: 'flex-start'}}>
                                        <Text style={styles.quantityHeader}>Picked</Text>
                                        <ProgressCircle
                                            percent={60}
                                            radius={50}
                                            borderWidth={8}
                                            color="#3399FF"
                                            shadowColor="#999"
                                            bgColor="#fff">
                                                <Text style={{ fontSize: 18 }}>{'60%'}</Text>
                                        </ProgressCircle>
                                    </View>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.quantityHeader}>Packed</Text>
                                        <ProgressCircle
                                            percent={50}
                                            radius={50}
                                            borderWidth={8}
                                            color="#ff9f1e"
                                            shadowColor="#999"
                                            bgColor="#fff">
                                                <Text style={{ fontSize: 18 }}>{'50%'}</Text>
                                        </ProgressCircle>
                                    </View>
                                </View>
                            </View>
                        </Card>
                        <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                            Other Locations
                        </Text>
                        <Card>
                            {this.state.parts.partsLocation.map((location) => {
                                return (
                                    <CardItem style={styles.borderStyle}>
                                        <Text style={[{fontSize: 17, fontWeight: '500'}, styles.defaultFontFamily]}>{location.LocationName}</Text>
                                        <Right>
                                            <Text>{location.Quantity}</Text>
                                        </Right>
                                    </CardItem>
                                );
                            })}
                        </Card>
                    </View>
                )
            } 
            return null;
        }
        return(
            <ScrollView style={{backgroundColor: '#f1f1f1', flexGrow: 1}}>
            <View>
                {showPrimary()}
                {partsInformation()}
                <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                    Time Line
                </Text>
                <Card>
                    <CardItem>
                        <Timeline
                            data={this.state.timeline} showTime = {false} descriptionStyle={{color: 'gray', fontSize: 15}}/>
                    </CardItem>
                </Card>              
            </View>            
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    quantityHeader: {
        fontSize: 15,
    }, 
    quantityBody: {
        fontSize: 30,
        fontWeight: '500',
        color: '#777777'
    },
    defaultFontFamily: {
        fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    borderStyle: {
        borderBottomColor:'grey', 
        borderStyle: 'solid', 
        borderBottomWidth: 0.5
    }
})



