import { LoginManager,AccessToken } from 'react-native-fbsdk';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { AsyncStorage } from "react-native";
import {START_FB_SIGNIN,FB_SIGNIN_SUCCESS,FB_SIGNIN_FAILED, START_GOOGLE_SIGN_IN,GOOGLE_SIGN_IN_SUCCESS,GOOGLE_SIGN_IN_FAILED,START_EMAIL_PASSWORD_LOGIN,EMAIL_PASSWORD_LOGIN_SUCCESS,EMAIL_PASSWORD_LOGIN_FAILED,START_USER_FETCH_FROM_ASYNC,USER_FETCH_FROM_ASYNC_FAILED,USER_FETCH_FROM_ASYNC_SUCCESS,
    SIGN_OUT_SUCCESS,SIGN_OUT_FAILED,START_SIGN_OUT} from './types';


function bootstrap() {
   GoogleSignin.configure({
    scopes: ['profile', 'email'],
    webClientId: '183699983634-m4vtpe1dhvcftno84ksgsm5ttemdqo17.apps.googleusercontent.com'
  });
}

async function logout(){
    firebase.auth().signOut()
        .then(function() {
            // Sign-out successful.
            alert("Signed out")
            return true
        })
        .catch(function(error) {
            console.log("signout failed",error)
            return false
            // An error happened
        });
}

async function saveUser (user) {
  try {
    await AsyncStorage.setItem('user_details', JSON.stringify(user));
      console.log("saved user")
  } catch (error) {
      console.log("error saving user",error)
    // Error saving data
  }
};

async function clearUser(){
try {
    console.log("clear data")
    await AsyncStorage.removeItem('user_details')
    return true
  } catch (error) {
      console.log("error saving user",error)
      return false
    // Error saving data
  }

}

export const userSignout=()=>{
    console.log("signout start")
    return async dispatch =>{
        dispatch({
            type: START_SIGN_OUT
        })
        try{
            if(logout){
                console.log("signout success")
                clearUser()
                dispatch({
                    type: SIGN_OUT_SUCCESS
                 })
            }else{
                 console.log("signout failed")
                 dispatch({
                    type: SIGN_OUT_FAILED
                })
            }
        }catch(error){
            console.log("signout failed",error)
            dispatch({
                type: SIGN_OUT_FAILED
            })
        }
    }
}
export const fetchUser=()=>{
    return async (dispatch) =>{
        dispatch({
            type: START_USER_FETCH_FROM_ASYNC
        })
        try {
            const value = await AsyncStorage.getItem('user_details');
            if (value !== null) {
            // We have data!!
            console.log(" value from async storage",value);
            dispatch({
                type: USER_FETCH_FROM_ASYNC_SUCCESS,
                payload: JSON.parse(value)
            })
            }else{
                console.log("value not saved its null")
                dispatch({
                    type: USER_FETCH_FROM_ASYNC_FAILED
                })
            }
        } catch (error) {
            console.log("error loading timestamp")
            dispatch({
                    type: USER_FETCH_FROM_ASYNC_FAILED
                })
            // Error retrieving data
        }
    }
}
export const googleSignin=()=>{

    bootstrap()
    return async dispatch =>{
        dispatch({
            type: START_GOOGLE_SIGN_IN
        })
        try{
            //await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            console.log("user fetch google login",user)
            console.log("fetch tokens",GoogleSignin.getTokens())
            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
            firebase.auth().signInWithCredential(credential).then(result =>{
                var user = result.user;
                var userDict = {
                        id: user.uid,
                        fullname: user.displayName,
                        email: user.email,
                        profileURL: user.photoURL
                    };

                var temp = {
                        id: user.uid,
                        google:{
                            fullname: user.displayName,
                            email: user.email,
                            profileURL: user.photoURL
                        }
                    };
                firestore()
                  .collection("users")
                  .doc(user.uid)
                  .set(temp);
                 saveUser(userDict)
                dispatch({
                  type: GOOGLE_SIGN_IN_SUCCESS,
                  payload: userDict
                });


            }).catch(error => {
                    dispatch({
                    type: GOOGLE_SIGN_IN_FAILED,
                        payload: error.code
                    })

                    alert("Please try again! " + error.code);
              });
        }catch(error){
            console.log("google login error",error)
            dispatch({
                type:GOOGLE_SIGN_IN_FAILED,
                payload: error.message
            })
            alert("Please try again! " + error.code);

        }
    }
}
export const fbSignin=()=>{
    return async (dispatch) =>{
        dispatch({
            type: START_FB_SIGNIN
        })
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            throw new Error('User cancelled the login process');
            dispatch({
                type: FB_SIGNIN_FAILED,
                payload: 'User cancelled the login process'
            })
        }else{
            const data = await AccessToken.getCurrentAccessToken();
            if(!data){
                dispatch({
                type: FB_SIGNIN_FAILED,
                 payload: 'Fetching fb token failed'
                })
            }else{
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                firebase.auth().signInWithCredential(credential).then(result => {
                    var user = result.user;
                    var userDict = {
                        id: user.uid,
                        fullname: user.displayName,
                        email: user.email,
                        profileURL: user.photoURL
                    };
                    var temp = {
                        id: user.uid,
                        fb:{
                            fullname: user.displayName,
                            email: user.email,
                            profileURL: user.photoURL
                        }
                    };

                firestore()
                  .collection("users")
                  .doc(user.uid)
                  .set(temp);
                 saveUser(userDict)
                dispatch({
                  type: FB_SIGNIN_SUCCESS,
                  payload: userDict
                });
              })
              .catch(error => {
                    dispatch({
                    type: FB_SIGNIN_FAILED,
                        payload: error
                    })

                    alert("Please try again! " + error);
              });
            }
        }
    }
}

