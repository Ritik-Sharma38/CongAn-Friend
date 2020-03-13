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