
import React, { useContext, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ChatGroupContext } from './ChatGroupProvider';
import { Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SocketContext } from '../ChatForm/ChatContext';
import { exitGroup, removeGroup } from '../../api';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { DeleteGroup, ExitDialog } from './GroupProfile/AllDialogs';
import { UserContext } from '../MainContainer/UserContext';

const GroupTopbar = ({newGroup,setIsDeleteTrue}) => {
  const {setDeleteTrue}=useContext(ChatGroupContext);
  const {chatSender}=useContext(SocketContext);
  const {fetchAllgroups}=useContext(UserContext);

  const Navigate=useNavigate();


  const [open, setOpen] = useState(false);
  const [tick, setTick] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  const handleRemoveGroup=async()=> {
    
    try {
      await removeGroup(newGroup._id);
      fetchAllgroups();
      
      setGroupOpen(false);
      setOpen(false);
      Navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const handleExit=async()=> {

     try {
      await exitGroup({chatId:newGroup._id,memberId:chatSender._id});
      fetchAllgroups();
      
      setNewOpen(false);
      setOpen(false);
      Navigate('/');
     } catch (error) {
      console.log(error);
     }
  }

  return (
    <div className=' sticky top-0 z-10 right-0'>
      <div className=' text-white bg-blue-500 px-3 py-1 sticky top-0 z-20 flex-between'>
        <div className=' flex flex-row gap-1 cursor-pointer' onClick={()=> Navigate(`/groupProfile/${newGroup._id}`)}>
          <button className=' cursor-pointer' onClick={(e)=> {
              e.stopPropagation();
              Navigate('/')
          }}>
            <ArrowBackIcon fontSize='small' />
          </button>
          <img className=' object-contain rounded-full'
            src={newGroup.profilePic}
            alt='profile'
            height={30}
            width={30}
          />
          <div className=' flex flex-col'>
            <p className=' flex-center font-semibold'>{newGroup.groupName}</p>
          </div>
        </div>
        <div className=' flex flex-col'>
                {tick ? (
                     <button onClick={()=> {
                        setDeleteTrue(true);
                        setTick(false);
                        setIsDeleteTrue(false);
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
                        <Paper className=' absolute right-0 px-2 py-2 z-10 bg-white text-black rounded-md' elevation={1}>
                            <div className=' w-[150px] text-[14px] flex flex-col'>
                                <button className=' flex add gap-0.5 ' onClick={()=> {
                                    setIsDeleteTrue((prev)=> !prev);
                                    setOpen(false);
                                    setTick(true);
                                    }}><DeleteIcon /> Delete
                                </button>
                                {newGroup.creator===chatSender?._id && (
                                   <button className=' flex add gap-0.5' onClick={()=> Navigate('/search')}>
                                      <PersonAddAlt1Icon /> Add Member
                                   </button>
                                )}
                                {newGroup.creator===chatSender?._id && (
                                   <button className=' flex add gap-0.5' onClick={()=> setGroupOpen(true)}>
                                      <GroupRemoveIcon /> remove group
                                   </button>
                                )}
                                 {newGroup.creator !==chatSender?._id && (
                                   <button className=' flex add gap-0.5' onClick={()=> setNewOpen(true)}>
                                      <GroupRemoveIcon /> Exit group
                                   </button>
                                 )}
                                  {newGroup.creator ===chatSender?._id && (
                                   <button className=' flex add gap-0.5' onClick={()=> Navigate(`/groupProfile/${newGroup._id}`)}>
                                      <PersonRemoveIcon /> remove member
                                   </button>
                                 )}
                            </div>
                        </Paper>
                    )}
                </div>
                {newOpen && (
                  <ExitDialog newOpen={newOpen} handleExit={handleExit} />
                )}
                {groupOpen && (
                  <DeleteGroup groupOpen={groupOpen} handleRemoveGroup={handleRemoveGroup} />
                )}
            </div>
      </div> 
    </div>
  )
}

export default GroupTopbar