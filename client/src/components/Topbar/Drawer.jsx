import React, { useContext, useState } from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SocketContext } from '../ChatForm/ChatContext';

const Drawer = ({orgUser,setOrgUser}) => {
    const {chatSender}=useContext(SocketContext);
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
    {!chatSender ? (
      <Link to='/auth' className=' bg-white px-2 py-1 text-black rounded-lg active:bg-gray-100'>
        <LoginIcon />
      </Link>
    ):(
      <div className=''>
        {!open ? (
          <Button  onClick={handleOpen}>
            <DehazeIcon className=' cursor-pointer text-white'/>
          </Button>
        ):(
          <div className=''>
            <div className=' relative'>
              <Button onClick={handleClose}>
                <CloseIcon className=' cursor-pointer text-white' />
              </Button>
              <div className=' absolute right-0 z-20'>
                <Paper className=' min-h-screen mt-4 w-72 bg-gray-400 px-4 py-3' elevation={2}>
                <div className=' flex flex-col gap-2'>
                    <Link to='/' className=' flex gap-2'>
                       <img src={orgUser?.profilePic} height={40} width={40} alt='profile' fill className=' rounded-full object-contain' />
                       <div className=''>
                         <p className=' font-semibold'>{orgUser?.author?.email}</p>
                         <p className=' text-gray-500'>{orgUser?.username}</p>
                       </div>
                     </Link>
                     <Divider className='' />
                     <div className=' flex gap-2 items-center cursor-pointer' onClick={handleLogout}>
                       <LogoutIcon fontSize='small' />
                        <p className=''>Logout</p>
                     </div>
                     <Divider className='' />
                     <div className=' flex gap-2 items-center cursor-pointer' onClick={()=> Navigate(`/chatProfile/${chatSender._id}`)}>
                       <AccountCircleIcon fontSize='medium'  />
                       <p className=''>View Profile</p>
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