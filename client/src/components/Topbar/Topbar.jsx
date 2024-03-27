import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat'
import { Link } from 'react-router-dom';
import Drawer from './Drawer';
import { getUser } from '../../api';

const Topbar = ({children}) => {
  
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem('profile'))?.data);
  const [orgUser, setOrgUser] = useState({});

  useEffect(()=> {
    const newFunc=async()=> {
      if(user) {
        const author=user?._id;
        const data=await getUser(author);
        setOrgUser(data?.data);
      }
    }
    newFunc();
  },[user])

  // console.log(orgUser);

  return (
    <div className='topbar flex '>
      <div className=''>
        <div className=' flex flex-row items-center gap-2'>
          <Link to='/'><ChatIcon fontSize='large' /></Link>
          <h1 className=' text-2xl font-semibold '>Chat System</h1>
        </div>
      </div>
      <div className=' flex-end float-end items-center absolute right-3'>
        <Drawer orgUser={orgUser} setOrgUser={setOrgUser} />
      </div>
      {children}
    </div>
    
  )
}

export default Topbar