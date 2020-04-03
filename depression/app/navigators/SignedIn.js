import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from "../screens/profile";


const Stack = createStackNavigator();

export const SignedIn =()=> (
    <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{
            header: () => null,
        }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
);

