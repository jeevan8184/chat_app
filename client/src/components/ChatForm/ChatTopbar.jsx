import React, { useContext,useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './ChatContext';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Paper } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const ChatTopbar = ({user,setisDeleteTrue}) => {
    const {typingNow, onlineUsers,setDeleteTrue,chatRoom}=useContext(SocketContext);

    const Navigate=useNavigate();
    const [open, setOpen] = useState(false);
    const [tick, setTick] = useState(false);
   
    const isOnline=onlineUsers.find((newUsers)=>newUsers.userId===user?._id);

  return (
        <div className=' bg-blue-500 text-white px-3 py-1 sticky top-0 w-full z-10 flex-between'>
            <div className=' flex gap-2 cursor-pointer' onClick={()=> Navigate(`/chatProfile/${user._id}`)}>
                <button 
                    onClick={(e)=>{
                        Navigate('/');
                        e.stopPropagation();
                    } } 
                    className=' cursor-pointer'>
                        <ArrowBackIcon fontSize='small' className=' cursor-pointer' /> 
                </button>
                <img alt='profile' src={user?.profilePic} height={30} width={30} className=' rounded-full object-contain' />
                <div className=' flex flex-col'>
                    <p className=' text-lg'>{user?.username}</p>
                    <div className=' text-white font-semibold text-[14px]'>{(typingNow && "typing...") || (isOnline && "online")}</div>
                </div>
            </div>
            <div className=' flex flex-col'>
                {tick ? (
                     <button onClick={()=> {
                        setDeleteTrue(true);
                        setTick(false);
                        setisDeleteTrue(false);
                     }}>
                         <DoneIcon />
                    </button>
                ):(
                    <button onClick={()=> setOpen((prev)=> !prev) }>
                        <MoreHorizIcon />
                    </button>
                )}
                <div className=' relative'>
                    {open && (
                        <Paper className=' absolute right-0 px-3 py-2 z-10 bg-white text-black rounded-md' elevation={1}>
                            <div className=' w-[100px] text-[14px] fle flex-col'>
                                <button className=' flex' onClick={()=> {
                                    setisDeleteTrue((prev)=> !prev);
                                    setOpen(false);
                                    setTick(true);
                                }}><DeleteIcon />Delete</button>
                            </div>
                        </Paper>
                    )}
                </div>
            </div>
        </div>
  )
}

export default ChatTopbar