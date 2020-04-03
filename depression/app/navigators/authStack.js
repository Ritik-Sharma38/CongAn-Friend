import React, {useEffect} from 'react';
import {SignedIn} from './SignedIn';
import {SignedOut} from './SignedOut';
import {fetchUser} from '../actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const AuthStack = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        async function fetchUserAuth() {
            console.log("auth stack")
            await dispatch(fetchUser())
            console.log("fetch user success")
            
        }
        fetchUserAuth()
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
