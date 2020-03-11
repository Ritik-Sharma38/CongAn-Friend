import {START_GOOGLE_SIGN_IN, GOOGLE_SIGN_IN_SUCCESS, GOOGLE_SIGN_IN_FAILED,START_FB_SIGNIN,FB_SIGNIN_SUCCESS,FB_SIGNIN_FAILED,START_USER_FETCH_FROM_ASYNC,USER_FETCH_FROM_ASYNC_FAILED,USER_FETCH_FROM_ASYNC_SUCCESS, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED, START_SIGN_OUT} from '../actions/types';

const DEFAULT_STATE={
    isAuthenticated: false,
    errorMessage: '',
    user:{}
}
export default (state=DEFAULT_STATE, action)=>{
    switch(action.type){
        case START_SIGN_OUT:
            console.log("sign out reducer")
            return{
                ...state
            }
        case SIGN_OUT_SUCCESS:
            return{
                ...state,
                user:{},
                isAuthenticated: false
            }
        case SIGN_OUT_FAILED:
            return{
                ...state
            }
        case START_USER_FETCH_FROM_ASYNC:
            return{
                ...state,
                user:{}
            }
        case USER_FETCH_FROM_ASYNC_FAILED:
            return{
                ...state,
                user:{}
            }
        case USER_FETCH_FROM_ASYNC_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case START_FB_SIGNIN:
            return{
                ...state,
                isAuthenticated: false,
                user:{}
            }
        case FB_SIGNIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case FB_SIGNIN_FAILED:
            return{
                ...state,
                isAuthenticated: false,
                user:{}
            }
        case START_GOOGLE_SIGN_IN:
            return{
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }
}
