import {AUTH, LOGOUT} from '../constants/index'

const authReducer=async(state={authData:null},action)=> {
    switch (action.type) {
        case AUTH:
            console.log('action',action.payload);
            localStorage.setItem('profile',JSON.stringify({...action.payload}));
            return {...state,authData:action.payload};
        case LOGOUT:
            localStorage.clear();
            return {...state,authData:null};
        default:
            return state;
    }
}

export default authReducer;