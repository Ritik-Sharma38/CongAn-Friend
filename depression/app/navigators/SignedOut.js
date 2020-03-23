import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginSignup from '../screens/loginSignup';
import SignedOutWelcome from '../screens/welcome/loginWelcome';
import AppDiscription from '../screens/appdescription';
const Stack = createStackNavigator();
export const  SignedOut = () =>(
    <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{
        header: () => null,
    }}>
        <Stack.Screen name="welcome" component={SignedOutWelcome} />
        <Stack.Screen name="appdescription" component={AppDiscription} />
        <Stack.Screen name="loginSignup" component={LoginSignup} />
    </Stack.Navigator>
);

