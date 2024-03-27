
import React,{useContext, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { SocketContext } from '../ChatForm/ChatContext';
import { ChatGroupContext } from '../ChatGroup/ChatGroupProvider';

const UserCard = ({newUser}) => {

    const Navigate=useNavigate();
    const {onlineUsers,notifications,typingNow}=useContext(SocketContext);

    const Online=onlineUsers.find((user)=> user.userId===newUser?._id);
    const userNotifies=notifications.filter((n)=> n.sender===newUser?._id)
    
  return (
    <div className=' cursor-pointer'>
          <div className=' px-4 py-1 bg-gray-100 rounded-2xl mx-2 cursor-pointer'>
       <div className=' flex-between '>
       <div className=' flex gap-2 cursor-pointer relative' onClick={()=> {
             Navigate(`/chat/${newUser._id}`);
        }}>
          {Online && (
             <div className=' bg-green-500 rounded-full absolute top-0 p-1.5'></div>
          )}
            <img 
              src={newUser.profilePic} 
              alt='profile'
              height={40} 
              width={40} 
              className=' rounded-3xl object-contain top-0 rounded-tl-5xl'
            />
            <div className=' flex flex-col'>
                <p className=' font-semibold'>{newUser.username}</p>
                <p className=' text-gray-500 text-[14px]'>{newUser.author.email}</p>
                <div className=' text-green-500 font-semibold text-[14px]'>{Online && typingNow && "typing..."}</div>
            </div>
        </div>
        <div className=' text-[12px] rounded-full px-2 bg-green-500 text-white'>{userNotifies.length>0 ? `${userNotifies.length}`:null}</div>
       </div>
      </div>
    </div>
  )
}

export default UserCard
