import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from "../screens/profile";
import AvtarSelection from "../screens/avatar";

const Stack = createStackNavigator();

export const SignedIn =()=> (
    <Stack.Navigator
        initialRouteName="Avatar"
        screenOptions={{
            header: () => null,
        }}>
        <Stack.Screen name="Avatar" component={AvtarSelection} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
);

