import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/profile/doctor';
import Video from '../screens/video';
import Test from '../screens/test';

const Drawer = createDrawerNavigator();

export const DoctorSignedIn =()=> (
    <Drawer.Navigator
        initialRouteName="Profile"
        screenOptions={{
            header: () => null,
        }}>
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Video" component={Video} />
        <Drawer.Screen name="Testt" component={Test} />
    </Drawer.Navigator>
);

