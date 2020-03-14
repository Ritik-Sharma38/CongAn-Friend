import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from "../screens/profile";
import AvtarSelection from "../screens/avatar";
import Loading from "../screens/welcome";
import ProfileScreen from "../screens/profile";
const Stack = createStackNavigator();

export const SignedIn =()=> (
    <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{
        header: () => null,
    }}>
        <Stack.Screen name="welcome" component={Loading} />
        <Stack.Screen name="Avatar" component={AvtarSelection} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
);

