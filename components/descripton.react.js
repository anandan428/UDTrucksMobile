import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Card, CardItem, View, Right } from 'native-base';
import Timeline from 'react-native-timeline-listview';

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
      }
    
    render(){
        return(
            <ScrollView style={{backgroundColor: '#f1f1f1', flexGrow: 1}}>
            <View>
                <Card>
                <CardItem>
                        <View>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{fontSize: 15, fontWeight: '500'}}>
                                    ID: 
                                </Text>
                                <Right>
                                    <Text style={{fontSize: 13, fontWeight: '400'}}>
                                        Some dummy text
                                    </Text>
                                </Right>
                            </View>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
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
                                    Some dummy text
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                <View style={{alignItems: 'flex-start'}}>
                                    <Text style={styles.quantityHeader}>Total</Text>
                                    <Text style={styles.quantityBody}>1000</Text>
                                </View>
                                <View>
                                    <Text style={styles.quantityHeader}>In Bound</Text>
                                    <Text style={styles.quantityBody}>1000</Text>
                                </View>
                                <View style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
                                    <Text style={styles.quantityHeader}>Out Bound</Text>
                                    <Text style={styles.quantityBody}>1000</Text>
                                </View>
                            </View>
                        </View>
                    </CardItem>
                </Card>
                <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                    Other Locations
                </Text>
                <Card>
                    <CardItem style={styles.borderStyle}>
                        <Text style={[{fontSize: 17, fontWeight: '500', color: '#07AEF1'}, styles.defaultFontFamily]}>Primary Location ID</Text>
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
                    </CardItem>                    
                </Card>
                <Text style={[{padding: 10, fontSize: 20, color: '#373737'}, styles.defaultFontFamily]}>
                    Time Line
                </Text>
                <Card>
                    <CardItem>
                        <Timeline
                            data={this.data} showTime = {false} descriptionStyle={{color: 'gray', fontSize: 15}}/>
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



