import { DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION } from '../actions/types';
import { actionTypes } from 'react-redux-firebase';


export default function(state = {}, action) {
    
    switch(action.type) {
        case DISABLE_BALANCE_ON_ADD:
           return {
               ...state, 
               disableBalanceOnAdd: action.payload
           };
        case DISABLE_BALANCE_ON_EDIT:
           return {
               ...state, 
               disableBalanceOnEdit: action.payload
           };
        case ALLOW_REGISTRATION:
        console.log(state.allowRegistration);
           return {
               ...state, 
               allowRegistration: action.payload
           };
        default:
           return state;
    }
}