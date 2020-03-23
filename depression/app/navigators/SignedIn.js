import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AvtarSelection from "../screens/avatar";
import AppDiscription from '../screens/appdescription';
import ProfileScreen from "../screens/profile";

const Stack = createStackNavigator();

export const SignedIn =()=> (
    <Stack.Navigator
        initialRouteName="Avatar"
        screenOptions={{
            header: () => null,
        }}>
        <Stack.Screen name="Avatar" component={AvtarSelection} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="appdiscription" component={AppDiscription} />
    </Stack.Navigator>
);

