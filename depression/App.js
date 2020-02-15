import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Depression from './app/Depression';
import Loading from './app/Welcome';

const Stack = createStackNavigator();

export default function App( { naivgation } ) {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Loading}
        
        />
        <Stack.Screen
          name="Depression"
          component={Depression}
        
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
  },

});


