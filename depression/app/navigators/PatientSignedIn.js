import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/profile/patient';
import Video from '../screens/video';
import AvtarSelection from "../screens/avatar";
import Test from '../screens/test';

const Drawer = createDrawerNavigator();

export const PatientSignedIn =()=> (
    <Drawer.Navigator
        initialRouteName="Profile"
        screenOptions={{
            header: () => null,
        }}>
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Video" component={Video} />
        <Drawer.Screen name="Avatar" component={AvtarSelection} />
        <Drawer.Screen name="Testt" component={Test} />
    </Drawer.Navigator>
);

