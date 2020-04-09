import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PatientLoginSignup from '../screens/patientLoginSignup';
import DoctorLoginSignup from '../screens/doctorLoginSingnup';
import AppDiscription from '../screens/appdescription';
import PatientDoctor from '../screens/patientORdoctor';
import AvtarSelection from "../screens/avatar";
import DoctorCreateProfile from "../screens/doctorCreateProfile";

const Stack = createStackNavigator();
export const  SignedOut = () =>(
    <Stack.Navigator
        initialRouteName="appdescription"
        screenOptions={{
        header: () => null,
    }}>
        <Stack.Screen name="appdescription" component={AppDiscription} />
        <Stack.Screen name="patientDoctor" component={PatientDoctor} />
        <Stack.Screen name="ploginSignup" component={PatientLoginSignup} />
        <Stack.Screen name="dloginSignup" component={DoctorLoginSignup} />
        <Stack.Screen name="doctorCreateProfile" component={DoctorCreateProfile} />
        <Stack.Screen name="Avatar" component={AvtarSelection} />
    </Stack.Navigator>
);

