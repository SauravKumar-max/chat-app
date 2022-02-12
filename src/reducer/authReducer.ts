import { AuthInitialState } from "../context/context.types";
import { AUTH_ACTIONTYPE } from "./reducer.types";

export const authReducer = (authState: AuthInitialState, action: AUTH_ACTIONTYPE) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...authState, token: action.payload };
        
        case "SET_LOGIN": 
            return { ...authState, login: action.payload };

        case "ADD_USER_DETAILS": 
            return { ...authState, userDetails: action.payload };
        
        case "UPDATE_PROFILE": 
            return {...authState, userDetails: authState.userDetails ? { ...authState.userDetails, ...action.payload } : null }
    
        default:
            return authState;
    }
}