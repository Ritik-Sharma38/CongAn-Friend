import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from "../screens/profile";
import AvtarSelection from "../screens/avatar";
import SignedInWelcome from "../screens/welcome/signinWelcom";
import AppDiscription from '../screens/appdescription';
import ProfileScreen from "../screens/profile";
import LoginSignup from "../screens/loginSignup";

const Stack = createStackNavigator();

export const SignedIn =()=> (
    <Stack.Navigator
        initialRouteName="Avatar"
        screenOptions={{
            header: () => null,
        }}>
        {/*<Stack.Screen name="welcome" component={SignedInWelcome} />*/}
        <Stack.Screen name="Avatar" component={AvtarSelection} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="appdiscription" component={AppDiscription} />
    </Stack.Navigator>
);

