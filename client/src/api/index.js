
import axios from 'axios';

const API=axios.create({baseURL:'http://localhost:8002'});

API.interceptors.request.use((req)=> {
    if(JSON.parse(localStorage.getItem('profile'))) {
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const signin=async(formData)=>API.post('/auth/signin',formData);
export const signup=async(formData)=>API.post('/auth/signup',formData);
export const getData=async(id)=>API.get(`/auth/${id}`);
export const PostData=async(formData)=>API.post('/onBoard/data',formData);
export const getUser=async(author)=>API.get(`/onBoard/author?author=${author}`);
export const getUsers=async(id)=>API.get(`/onBoard/users/${id}`);