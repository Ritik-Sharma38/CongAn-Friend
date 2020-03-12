import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Depression from '../screens/depression';
import Loading from '../screens/welcome';
import AppDiscription from '../screens/appdescription';
const Stack = createStackNavigator();
export const  SignedOut = () =>(
    <Stack.Navigator
        initialRouteName="Depression"
        screenOptions={{
        header: () => null,
    }}>
        <Stack.Screen name="Depression" component={Depression} />
    {/**<Stack.Screen name="AppDiscription" component={AppDiscription} />**/}
    </Stack.Navigator>
);

