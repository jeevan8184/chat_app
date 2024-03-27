
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
export const getUserWithId=async(id)=> API.get(`/onBoard/${id}`);
export const fetchUser=async(userId)=>API.get(`/onBoard/fetch/${userId}`);

export const createChat=async(body)=> API.post('/chats/post',body);
export const fetchChatMessages=async(chatId)=>API.get(`/chats/fetch/${chatId}`);

export const createMessage=async(body)=>API.post('/messages/post',body);
export const createGroupMessage=async(body)=>API.post('messages/group/post',body);
export const deleteMsg=async(id)=>API.delete(`/messages/delete/${id}`);
export const DeleteMultiple=async(deleteMsgs)=>API.delete('/messages/delete',{data:deleteMsgs});

export const createGroup=async(formdata)=>API.post('/group/post',formdata);
export const fetchGroups=async(id)=>API.get(`/group/fetch?userId=${id}`);
export const fetchGroup=async(chatId)=>API.get(`/group/fetch/${chatId}`);
export const fetchGroupDetails=async(chatId)=>API.get(`/group/details/${chatId}`);
export const fetchGroupMessages=async(chatId)=>API.get(`/group/fetch/msgs/${chatId}`);
export const AddMemberToGroup=async(body)=>API.put('/group/post/addMember',body);
export const removeGroup=async(chatId)=>API.delete(`/group/del/${chatId}`);
export const exitGroup=async(body)=>API.put('/group/exit',body);
export const RemoveMember=async(body)=>API.put('/group/remove',body);
