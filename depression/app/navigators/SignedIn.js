import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from "../screens/profile";
import Avtar from "../screens/avatar";
import ProfileScreen from "../screens/profile";
const Stack = createStackNavigator();

export const SignedIn =()=> (
    <Stack.Navigator
        initialRouteName="Avatar"
        screenOptions={{
        header: () => null,
    }}>
        <Stack.Screen name="Avatar" component={Avtar} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
);

