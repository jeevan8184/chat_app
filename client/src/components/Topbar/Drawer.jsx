import React, { useState } from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants';

const Drawer = ({orgUser,setOrgUser}) => {
    const user=JSON.parse(localStorage.getItem('profile'));
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    const Navigate=useNavigate();
    
 const handleOpen=()=> {
    setOpen(true);
  }
  const handleClose=()=> {
    setOpen(false);
  }

  const handleLogout=()=> {
    dispatch({type:LOGOUT});
    Navigate('/auth');
    setOpen(false);
  }


  return (
    <div className=''>
    {!user ? (
      <Link to='/auth' className=' bg-white px-2 py-1 text-black rounded-lg active:bg-gray-100'>
        <LoginIcon />
      </Link>
    ):(
      <div className=''>
         {!open && (
          <button  onClick={handleOpen}>
            <DehazeIcon className=' cursor-pointer'/>
          </button>
         )}
         {open && (
          <div className=' flex flex-col'>
            <div className='flex flex-col'>
              <button  onClick={handleClose} className=''>
                <CloseIcon  className=' cursor-pointer'/>
              </button>
              <div className=' mt-11 absolute right-0 flex-1 top-0 min-h-screen'>
                <Paper elevation={6} className=' mt-4 w-72 bg-gray-400  min-h-screen px-4 py-3'>
                  <div className=' flex flex-col gap-4'>
                  <Link to='/' className=' flex gap-2'>
                    <img src={orgUser?.profilePic} height={40} width={40} alt='profile' fill className=' rounded-full object-contain' />
                    <div className=''>
                      <p className=' font-semibold'>{orgUser?.author.email}</p>
                      <p className=' text-gray-500'>{orgUser?.username}</p>
                    </div>
                  </Link>
                  <Divider className='' />
                  <div className=' flex gap-2 items-center cursor-pointer' onClick={handleLogout}>
                    <LogoutIcon fontSize='small' />
                     <p className=''>Logout</p>
                  </div>
                  <Divider className='' />
                  </div>
                </Paper>
              </div>
            </div>
          </div>
         )}
      </div>
    )}
  </div>
  )
}

export default Drawer;