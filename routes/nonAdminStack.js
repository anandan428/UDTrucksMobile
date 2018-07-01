import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../components/homescreen.react';
import OtherScreen from '../components/otherscreen.react';

export const NonAdminStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Other: {
        screen: OtherScreen
    }
},
{
    initialRouteName: 'Home',
}
)