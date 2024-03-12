
import React, { useEffect, useState } from 'react'
import { getUsers } from '../../api';
import UserCard from './UserCard';

const Pages = () => {

    const user=JSON.parse(localStorage.getItem('profile')).data;
    const [allUsers, setAllUsers] = useState([]);

    useEffect(()=> {
        const newFunc=async()=> {
            const data=await getUsers(user._id);
            console.log(data.data);
            setAllUsers(data.data);
        }
        newFunc();
    },[]);

  return (
    <div className=' py-2'>
        <h1 className=' text-xl font-semibold'>Users</h1>
        <div className=' flex flex-col'>
        {allUsers.map((newUser)=> (
            <UserCard key={newUser._id} newUser={newUser} />
        ))}
        </div>
    </div>
  )
}

export default Pages