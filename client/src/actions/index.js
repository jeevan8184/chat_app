
import * as api from '../api/index';
import { AUTH } from '../constants/index'

export const SignIn=(formData,Navigate)=>async(dispatch)=>{

    try {
        const {data}=await api.signin(formData);
        console.log(data.data);
        dispatch({type:AUTH,payload:data});
        Navigate('/');
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export const SignUp=(formData,Navigate)=>async(dispatch)=>{

    try {
        const {data}=await api.signup(formData);
        console.log(data);
        dispatch({type:AUTH,payload:data});
        Navigate(`/onboarding/${data.data._id}`);
    } catch (error) {
        console.log(error);
    }
}
