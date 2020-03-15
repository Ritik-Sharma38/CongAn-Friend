import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginSignup from '../screens/loginSignup';
import Loading from '../screens/welcome';
import AppDiscription from '../screens/appdescription';
import AvtarSelection from "../screens/avatar";
const Stack = createStackNavigator();
export const  SignedOut = () =>(
    <Stack.Navigator
        initialRouteName="loginSignup"
        screenOptions={{
        header: () => null,
    }}>
        <Stack.Screen name="welcome" component={Loading} />
        <Stack.Screen name="appdescription" component={AppDiscription} />
        <Stack.Screen name="loginSignup" component={LoginSignup} />
        <Stack.Screen name="avatar" component={AvtarSelection} />
    </Stack.Navigator>
);

