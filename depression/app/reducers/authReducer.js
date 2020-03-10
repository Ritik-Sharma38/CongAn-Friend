import {START_GOOGLE_SIGN_IN, GOOGLE_SIGN_IN_SUCCESS, GOOGLE_SIGN_IN_FAILED} from '../actions/types';

const DEFAULT_STATE={
    isAuthenticated: false,
    errorMessage: '',
    user:{}
}
export default (state=DEFAULT_STATE, action)=>{
    switch(action.type){
        case START_GOOGLE_SIGN_IN:
            return{
                ...state,

            }
        default:
            return state
    }
}
