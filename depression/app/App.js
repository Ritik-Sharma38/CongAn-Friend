import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignedIn} from './navigators/SignedIn';
import {SignedOut} from './navigators/SignedOut';
import {fetchUser} from './actions/authAction'
function App(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUser())
    })
    const Stack = createStackNavigator();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    return (
            <NavigationContainer>
                {isAuthenticated ? <SignedIn/> : <SignedOut/>}
            </NavigationContainer>
    );
  }
export default App;

{/**import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Depression from './app/Depression';
import Loading from './app/Welcome';
import AppDiscription from './app/AppDiscription';
import Avtar from './app/Avtar';

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
            name="AppDiscription"
            component={AppDiscription}
          />
          <Stack.Screen
            name="Depression"
            component={Depression}
          />
          <Stack.Screen
            name="SelectYourAvtar"
            component={Avtar}
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

});**/}


