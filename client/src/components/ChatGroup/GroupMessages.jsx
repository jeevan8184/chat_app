import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchGroup, fetchGroupMessages } from '../../api';
import { RotateLoader } from 'react-spinners';
import GroupTopbar from './GroupTopbar';
import MapGroupMessages from './MapGroupMessages';
import GroupInput from './GroupInput';
import { ChatGroupContext } from './ChatGroupProvider';
import { SocketContext } from '../ChatForm/ChatContext';

const GroupMessages = () => {
  const {chatSender}=useContext(SocketContext);
  const {
    setMessages,
    messages,
    newGroup,
    setNewGroup,
    groupNotifies,
    setGroupNotifies,
    groupNewNotify,
    setGroupNewNotify
  }=useContext(ChatGroupContext);


  const {id}=useParams();
  const [isDeleteTrue, setIsDeleteTrue] = useState(false);

  useEffect(()=> {
    const newFunc=async()=> {
      if(id) {
        const group=await fetchGroup(id);
        setNewGroup(group.data);
      }
    }
    newFunc(); 
  },[id])

  useEffect(()=> {
    const newFunc=async()=> {
      if(newGroup) {
        const groupMsgs=await fetchGroupMessages(newGroup._id);
        setMessages(groupMsgs.data);
        // console.log('groupMsgs',groupMsgs.data);
      }
    }
    newFunc();
  },[newGroup])

  useEffect(()=> {
    if(newGroup) {
      setGroupNotifies((prevNotifies)=> {
        return prevNotifies.map((n)=> n.groupId===newGroup._id && n.receiver===chatSender?._id ? {...n,isRead:true} : n )
      })
      setGroupNotifies((prevNotifies)=> {
        return prevNotifies.filter((n)=> n.isRead !== true);
      })
      setGroupNewNotify(null);
    }

  },[groupNewNotify,newGroup])

  return (
    <div className=''>
      {!newGroup ? (
        <div className=' flex-center mt-14'>
          <RotateLoader />
        </div>
      ):(
        <div className=''>
            <div className=' w-full max-sm:w-full bg-gray-200 min-h-screen mx-auto rounded-xl flex flex-col justify-between'>
            <div className=' mt-0'>  
                <GroupTopbar newGroup={newGroup} setIsDeleteTrue={setIsDeleteTrue} />
            <div 
                className=' px-4 max-sm:px-0.5 py-3 pb-4 mx-auto flex-grow'
            >
                <MapGroupMessages messages={messages} isDeleteTrue={isDeleteTrue} />
            </div>
        </div>
           <div className='bottom-1 mt-2'>
                <GroupInput />
           </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default GroupMessages