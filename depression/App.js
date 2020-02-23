import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Depression from './app/Depression';
import Loading from './app/Welcome';
import AppDiscription from './app/AppDiscription';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

const Stack = createStackNavigator();

const reducer = () => {
  return
}

const store = createStore(reducer)

export default function App( { naivgation } ) {
    return (
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown : false}}>
          <Stack.Screen
            name="Welcome"
            component={Loading}
          />
          <Stack.Screen
            name="Depression"
            component={Depression}
          />
          <Stack.Screen
            name="AppDiscription"
            component={AppDiscription}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
   flexGrow: 1,
  },

});


