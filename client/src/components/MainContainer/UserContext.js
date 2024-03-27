import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchGroups, getUser, getUsers } from '../../api';
import { ChatGroupContext } from '../ChatGroup/ChatGroupProvider';

export const UserContext=createContext();

export const UserProvider = ({children}) => {
  const localData=JSON.parse(localStorage.getItem('profile'))?.data;
  const id=localData?._id;
  const [users, setUsers] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [newUser, setNewUser] = useState(null);

  useEffect(()=> {
    const newFunc=async()=> {
       if(id) {
        const newUsers=await getUsers(id);
        const user=await getUser(id);
        setNewUser(user.data);
        setUsers(newUsers.data);
       }
    }
    newFunc();
  },[id])

  const fetchAllgroups=async()=> {
    if(newUser) {
      const data=await fetchGroups(newUser._id);
      setAllGroups(data.data);
    }
  }

  useEffect(()=> {
    fetchAllgroups();
  },[newUser])


  return (
    <UserContext.Provider value={{
        users,
        setUsers,
        allGroups,
        newUser,
        fetchAllgroups

    }}>
        {children}
    </UserContext.Provider>
  )
}

