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

export default class Descriptions extends React.Component {
    static navigationOptions = {
        title: 'Description',
      };
      constructor(){
          super();
          this.data = [
            {time: '09:00', title: 'Inbound, 27 July 09:00', description: 'Part something, from primary location, quantity 100'},
            {time: '10:45', title: 'Outbound, 27 July 10:45', description: 'Part something, from primary location, quantity 100'},
            {time: '12:00', title: 'Inbound, 27 July 12:00', description: 'Part something, from primary location, quantity 100'},
            {time: '14:00', title: 'Outbound, 27 July 14:00', description: 'Part something, from primary location, quantity 100'},
            {time: '16:30', title: 'Outbound, 27 July 16:30', description: 'Part something, from primary location, quantity 100'}
          ]
          this.state = {
              momentLogs: [],
              allLocation: [],
              type: '',
              key: '',
              itemId: '',
              data: [],
              parts: {
                  partsLocation: [],
                  total: '',
                  partsInfo: [],
                  timeLine: []
              }
          }
      }
    // componentDidUpdate(){
    //     if(this.state.momentLogs.length > 0){
    //         alert(this.state.momentLogs);
    //         let filteredMomentLogs = this.state.momentLogs.filter(element => element[this.state.key] === this.state);
    //         this.setState({momentLogs: filteredMomentLogs});
    //     }
    // }
    componentDidMount(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId');
        const type = navigation.getParam('type');
        this.setState({type: type});
        this.setState({itemId: itemId});
        switch(type){
            case 'Part': this.setState({key: 'PartNo'});
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
                    this.setState({data: this.data});
                   }).catch(error => console.log(error));
        // getPartsInfo(this.state.itemId).then((data) => {
        //     let locationData = data.data;

        // })
    }
    render(){
        showPrimary = () => {
            if(this.state.type === 'Part')
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
            else{
                return null;
            }
        }
        return(
            <ScrollView style={{backgroundColor: '#f1f1f1', flexGrow: 1}}>
            <View>
                {showPrimary}
                <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                    Parts Information
                </Text>
                <Card>
                    <CardItem>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{fontSize: 20, fontWeight: '600'}}>
                                    ID: 
                                </Text>
                                <Text style={{fontSize: 17, fontWeight: '400', marginLeft: 20}}>
                                    {this.state.itemId}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                <View style={{alignItems: 'flex-start'}}>
                                    <Text style={styles.quantityHeader}>Total</Text>
                                    <Text style={styles.quantityBody}>88</Text>
                                </View>
                                {/* <View>
                                    <Text style={styles.quantityHeader}>In Bound</Text>
                                    <Text style={styles.quantityBody}>1000</Text>
                                </View>
                                <View style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
                                    <Text style={styles.quantityHeader}>Out Bound</Text>
                                    <Text style={styles.quantityBody}>1000</Text>
                                </View> */}
                            </View>
                        </View>
                    </CardItem>
                </Card>
                <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                    Other Locations
                </Text>
                <Card>
                    <CardItem style={styles.borderStyle}>
                        <Text style={[{fontSize: 17, fontWeight: '500', color: '#07AEF1'}, styles.defaultFontFamily]}>PrimeLocation1</Text>
                        <Right>
                            <Text>35</Text>
                        </Right>
                    </CardItem>
                    <CardItem >
                        <Text style={[{fontSize: 17, fontWeight: '500'}, styles.defaultFontFamily]}>BufferLocation1</Text>
                        <Right>
                            <Text>43</Text>
                        </Right>
                    </CardItem>
                    {/* <CardItem >
                        <Text style={[{fontSize: 17, fontWeight: '500'}, styles.defaultFontFamily]}>Secondary Location ID</Text>
                        <Right>
                            <Text>25/100</Text>
                        </Right>
                    </CardItem>
                    <CardItem >
                        <Text style={[{fontSize: 17, fontWeight: '500'}, styles.defaultFontFamily]}>Secondary Location ID</Text>
                        <Right>
                            <Text>25/100</Text>
                        </Right>
                    </CardItem>
                    <CardItem >
                        <Text style={[{fontSize: 17, fontWeight: '500'}, styles.defaultFontFamily]}>Secondary Location ID</Text>
                        <Right>
                            <Text>25/100</Text>
                        </Right>
                    </CardItem>
                    <CardItem >
                        <Text style={[{fontSize: 17, fontWeight: '500'}, styles.defaultFontFamily]}>Secondary Location ID</Text>
                        <Right>
                            <Text>70/100</Text>
                        </Right>
                    </CardItem>
                    <CardItem >
                        <Text style={[{fontSize: 17, fontWeight: '500'}, styles.defaultFontFamily]}>Secondary Location ID</Text>
                        <Right>
                            <Text>25/100</Text>
                        </Right>
                    </CardItem>                     */}
                </Card>
                <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                    Time Line
                </Text>
                <Card>
                    <CardItem>
                        <Timeline
                            data={this.state.data} showTime = {false} descriptionStyle={{color: 'gray', fontSize: 15}}/>
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



