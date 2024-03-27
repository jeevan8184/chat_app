import React, { createContext, useContext, useEffect, useState } from 'react'
import io  from 'socket.io-client';
import { SocketContext } from '../ChatForm/ChatContext';
import { DeleteMultiple, createGroupMessage, deleteMsg } from '../../api';

const socket=io('http://localhost:8002/group');
const ChatGroupContext=createContext();


const ChatGroupProvider = ({children}) => {
  const {chatSender}=useContext(SocketContext);

  const [members, setMembers] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  const [messages, setMessages] = useState([]);
  const [newGroup, setNewGroup] = useState(null);
  const [sendNewMessage, setSendNewMessage] = useState(null);
  const [deleteTrue, setDeleteTrue] = useState(false);
  const [deleteMultiple, setDeleteMultiple] = useState([]);
  const [groupNotifies, setGroupNotifies] = useState([]);
  const [groupNewNotify, setGroupNewNotify] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  

  useEffect(()=> {
    if(!socket) return;

    if(chatSender) {
      socket.emit('addUser',chatSender._id);
    }

  },[chatSender,socket]);

  useEffect(()=> {
    if(!socket) return;

    if(newGroup) {
      socket.emit('group',newGroup)
    } 

  },[newGroup,socket]);

  useEffect(()=> {
    if(!socket) return;

    const newFunc=async()=> {
      if(sendNewMessage && newGroup) {
        const createMsg=await createGroupMessage({
          text:sendNewMessage,
          sender:chatSender?._id,
          chatId:newGroup._id
        });
        console.log('new Msg', createMsg.data);
        socket.emit('sendNewMsg',{
          message:createMsg.data,
          sender:chatSender._id,
          newGroup:newGroup._id
        });
        setSendNewMessage(null);
      }
    }
    newFunc();

  },[sendNewMessage,socket])

  useEffect(()=> {
    if(!socket) return;
    const newFunc=async()=> {
      if(deleteId) {
        await deleteMsg(deleteId);
        console.log('newMessages',deleteId);
        socket.emit('deleteMsg',({deleteId,sender:chatSender?._id}));
      }
    }
    newFunc();
  },[deleteId,socket]);

  useEffect(()=> {
    const newFunc=async()=> {
        if(deleteTrue) { 
            await DeleteMultiple(deleteMultiple);
            socket.emit('deleteAll',{messages:deleteMultiple,sender:chatSender?._id})
            console.log('delete',deleteMultiple);
            setDeleteMultiple([]);
            setDeleteTrue(false);
        } 
    }
    newFunc();

},[deleteTrue]);

  useEffect(()=> {
    if(!socket) return;

    socket.on('groupOnline',(groupOnline)=> {
      console.log('groupLine',groupOnline);
    })

    socket.on('receiveMsg',(message)=> {
      setMessages((prev)=> [...prev,message]);
    })
    socket.on('newNotify',(newNotify)=> {
      setGroupNewNotify({...newNotify});
      setGroupNotifies((prev)=> [...prev,{...newNotify}]);
      console.log('newNotify',newNotify);
    })

    socket.on('delete',(NewMessages)=> {
      setMessages((prevMsgs)=> {
        return prevMsgs.filter((m)=> !NewMessages.some((n)=> m._id===n._id ));
      })
    })

    socket.on('setDeleteMsg',(deleteId)=> {
      setMessages((prevMessages)=> {
        return prevMessages.filter((msg)=> msg._id !==deleteId)
      })
    })
    
    return ()=> {
      socket.off('groupOnline');
      socket.off('receiveMsg');
      socket.off('newNotify');
    }

  },[socket])


  return (
    <ChatGroupContext.Provider value={{
      setMembers,
      setCheckBox,
      checkBox,
      members,
      setMessages,
      messages,
      setNewGroup,
      newGroup,
      setSendNewMessage,
      setDeleteMultiple,
      deleteMultiple,
      setDeleteTrue,
      groupNotifies,
      setGroupNotifies,
      groupNewNotify,
      setGroupNewNotify,
      setDeleteId,

    }}>
      {children}
    </ChatGroupContext.Provider>
  )
}

export {ChatGroupProvider,ChatGroupContext};

