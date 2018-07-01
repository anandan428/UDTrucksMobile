import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../components/login.react';



export const LoginStack = createStackNavigator({
    Login: {
        screen: LoginScreen
    }
},
{
    initialRouteName: 'Login',
    headerMode: 'none'
})