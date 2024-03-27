import { Button, Paper } from '@mui/material';
import React, { useContext, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import {} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import CreateChat from './createChat';
import { SocketContext } from '../../ChatForm/ChatContext';
import { ChatGroupContext } from '../../ChatGroup/ChatGroupProvider';
import { UserContext } from '../UserContext';

const Notifications = () => {

    const Navigate=useNavigate();
    const {notifications,setNotifications}=useContext(SocketContext);
    const {groupNotifies,setGroupNotifies}=useContext(ChatGroupContext);
    const {allGroups}=useContext(UserContext);     

    const currentGroupNotifies=groupNotifies.filter((n)=> allGroups.some((g)=> g._id===n.groupId));

    console.log('currentGroupNotifies',currentGroupNotifies);
  
    const [open, setOpen] = useState(false);
  
    const handleView=(n)=> {
        setNotifications((notifications)=> {
          return notifications.map((newNotify)=>newNotify.date===n.date ? {...newNotify,isRead:true} : newNotify )
        } )
    
        setNotifications((notifies)=> {
          return notifies.filter((n)=> n.isRead !==true)
        })
      
        setOpen(false);
        Navigate(`/chat/${n.sender}`)
      }
    
    const handleGroupView=(n)=> {
      setGroupNotifies((prevNotifies)=> {
        return prevNotifies.map((newNotify)=> newNotify.date===n.date ? {...newNotify,isRead:true} : newNotify)
      })
      setGroupNotifies((prevNotifies)=> {
        return prevNotifies.filter((newNotify)=> newNotify.isRead !==true);
      })
      setOpen(false);
      Navigate(`/group/${n.groupId}`);
    }

    const handleGroupRead=(n)=> {
      setGroupNotifies((prevNotifies)=> {
        return prevNotifies.map((newNotify)=> newNotify.date===n.date ? {...newNotify,isRead:true} : newNotify)
      })
      setGroupNotifies((prevNotifies)=> {
        return prevNotifies.filter((newNotify)=> newNotify.isRead !==true);
      })
    }
    
      const handleRead=(n)=> {
        
        setNotifications((notifications)=> {
          return notifications.map((newNotify)=>newNotify.date===n.date ? {...newNotify,isRead:true} : newNotify )
        } )
    
        setNotifications((notifies)=> {
          return notifies.filter((n)=> n.isRead !==true)
      })
      }

  return (
    <div>
        <div className=' flex flex-row'>
        <div className=" relative" >
            <div className=" flex">
            <Button onClick={()=> {
               setOpen((prev)=> !prev)
            }}>
            <NotificationsIcon className=" text-blue-500"/>
              <span className=" rounded-full px-2 text-sm text-white bg-slate-600"> {notifications.length+currentGroupNotifies.length} </span>
            </Button>
            </div>
            {open && (
              <Paper className=" absolute top-4 right-0 w-[250px] mt-3 rounded-md px-2 py-1 z-10" elevation={1}>
                <div className=" flex flex-col gap-1">
                <h1 className=" font-semibold py-2">{notifications.length>0 ? `You got ${notifications.length} new Messages`: "No notifications"}</h1>
                  {notifications.map((n)=> (
                    <div className=" flex flex-col" key={n.receiver}>
                     <p className=" font-semibold">{n.name}</p>
                     <p className=" text-[14px] text-gray-900 ml-2">{n.newMsg.text}</p>
                     <div className=" flex justify-between py-1 ">
                        <button className=" rounded-full bg-gray-500 px-4 text-[14px] py-0.5 text-white" onClick={()=> handleView(n)}>View</button>
                        <button className=" rounded-full bg-gray-500 px-4 text-[14px] py-0.5 text-white" onClick={()=> handleRead(n)}>mark as Read</button>
                     </div>
                    </div>
                  ))}
                  {currentGroupNotifies?.map((n)=> (
                    <div className=" flex flex-col" key={n.receiver}>
                     <p className=" font-semibold">{n.groupName}</p>
                     <p className=" text-[14px] text-gray-900 ml-2">{n.message.text}</p>
                     <div className=" flex justify-between py-1 ">
                        <button className=" rounded-full bg-gray-500 px-4 text-[14px] py-0.5 text-white" onClick={()=> handleGroupView(n)}>View</button>
                        <button className=" rounded-full bg-gray-500 px-4 text-[14px] py-0.5 text-white" onClick={()=> handleGroupRead(n)}>mark as Read</button>
                     </div>
                    </div>
                  ))}
                </div>
              </Paper>
            )}
          </div>
          <CreateChat />
        </div>
    </div>
  )
}

export default Notifications