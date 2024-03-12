import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat'
import { Link } from 'react-router-dom';
import Drawer from './Drawer';
import { getUser } from '../../api';

const Topbar = () => {
  
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem('profile'))?.data);
  const [orgUser, setOrgUser] = useState({});

  useEffect(()=> {
    const newFunc=async()=> {
      if(user) {
        const author=user?._id;
        // console.log('author',author);
        const data=await getUser(author);
        // console.log('data',data);
        setOrgUser(data?.data);
      }
    }
    newFunc();
  },[user])

  // console.log(orgUser);

  return (
    <div className='topbar'>
      <div className=''>
        <div className=' flex flex-row items-center gap-2'>
          <Link to='/'><ChatIcon fontSize='large' /></Link>
          <h1 className=' text-3xl font-semibold '>Chat System</h1>
        </div>
      </div>
      <Drawer orgUser={orgUser} setOrgUser={setOrgUser} />
    </div>
    
  )
}

export default Topbar