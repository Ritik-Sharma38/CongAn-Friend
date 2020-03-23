import React, {useEffect} from 'react';
import {SignedIn} from './SignedIn';
import {SignedOut} from './SignedOut';
import {fetchUser} from '../actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
function AuthStack(){
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("auth stack")
        dispatch(fetchUser())
    },[])
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    console.log("value of isAuth", isAuthenticated)
    if(isAuthenticated){
        return(
            <SignedIn/>
        )
    }
    else{
        return(
            <SignedOut/>
        )
    }
}
export default AuthStack;
