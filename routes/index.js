import React from 'react';
import { TabNavigator, TabBarBottom, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Order from '../components/order.react';
import Parts from '../components/parts.react';
import Buffers from '../components/buffer.react';
import Descriptions from '../components/descripton.react';

export const DefaultRoute = createStackNavigator(
  {
    Home: TabNavigator(
      {
        Order: {
          screen: Order
        },
        Parts: {
          screen: Parts
        },
        Buffers: {
          screen: Buffers 
        }
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({focused, tintColor}) => {
            const { routeName } = navigation.state;
            let iconName;
            if(routeName === 'Order') {
              iconName = `ios-add-circle${focused ? '' : '-outline'}`;
            } else if(routeName === 'Parts') {
              iconName = `ios-cog${focused ? '' : '-outline'}`;
            } else if(routeName === 'Buffers') {
               iconName = `ios-basket${focused ? '' : '-outline'}`;
            }
            return <Icon name = {iconName} size={25} color = {tintColor} />;
          },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
          activeTintColor: '#2E86C1',
          inactiveTintColor: 'grey',
          labelStyle: {
            fontSize: 12
          }
        },
        animationEnabled: false,
        swipeEnabled: false
      }
    ),
    Description: {
      screen: Descriptions
    }
  }, {
    initialRouteName: 'Description',
    navigationOptions:{
      title: 'Buffer Managment',
      headerStyle: {
        backgroundColor: '#2E86C1',
        elevation: 0
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: '400',
        color: '#fff'
      }
    }
  }
)
