import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginSignup from '../screens/loginSignup';
import AppDiscription from '../screens/appdescription';
import AvtarSelection from "../screens/avatar";

const Stack = createStackNavigator();
export const  SignedOut = () =>(
    <Stack.Navigator
        initialRouteName="appdescription"
        screenOptions={{
        header: () => null,
    }}>
        <Stack.Screen name="appdescription" component={AppDiscription} />
        <Stack.Screen name="loginSignup" component={LoginSignup} />
        <Stack.Screen name="Avatar" component={AvtarSelection} />
    </Stack.Navigator>
);

