import React, {useEffect} from 'react';
import {SignedIn} from './SignedIn';
import {SignedOut} from './SignedOut';
import Loading from "../screens/welcome";
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
    const userFetchLoading = useSelector(state => state.auth.userFetchLoading)
    switch(userFetchLoading){
        case true:
            return(
                     <Stack.Navigator
                        screenOptions={{
                        header: () => null,
                    }}>
                        <Stack.Screen name="welcome" component={Loading} />
                     </Stack.Navigator>
            )
        default:
            if(isAuthenticated){
                return(
                    <SignedIn/>
                )
            }else{
                return(
                    <SignedOut/>
                )
            }
    }
}
export default AuthStack;
