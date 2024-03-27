import React, { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { DeleteMultiple, createMessage, deleteMsg, getUser } from '../../api';

const socket=io('http://localhost:8002/chat');

export const SocketContext=createContext();

export const ChatProvider = ({children}) => {
    const [chatSender, setChatSender] = useState(null);
    const [chatReceiver, setChatReceiver] = useState(null);    
    const [messages, setMessages] = useState([]);
    const [chatRoom, setChatRoom] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);     
    const [sendMsg, setSendMsg] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [typing, setTyping] = useState(false);
    const [typingNow, setTypingNow] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [newNotify, setNewNotify] = useState(null);
    const [deleteMultiple, setDeleteMultiple] = useState([]);
    const [deleteTrue, setDeleteTrue] = useState(false);

    const localData=JSON.parse(localStorage.getItem('profile'))?.data;

    useEffect(()=> {
        const newFunc=async()=> {
            if(localData) {
                const newUser=await getUser(localData?._id);
                setChatSender(newUser.data);
            }
        }
        newFunc();
    },[])

    useEffect(()=> {
        const newFunc=async()=> {
            if(deleteTrue) { 
                console.log('delete',deleteMultiple);
                await DeleteMultiple(deleteMultiple);

                const newMsgs = messages.filter((msg) => !deleteMultiple.some((d) => d._id === msg._id));
                console.log('delete');
                console.log('msgs',newMsgs);
                socket.emit('deleteMultiple',({messages:newMsgs,sender:chatSender?._id,receiver:chatReceiver?._id}));
                setDeleteMultiple([]);
                setDeleteTrue(false);
            }
        }
        newFunc();

    },[deleteTrue]);


    useEffect(()=> {
        if(!socket) return;
        if(chatSender) {
            socket.emit('newUser',(chatSender?._id));

            socket.on('onlineUsers',(allOnline)=> {
                setOnlineUsers(allOnline);
                console.log('onlineUsers',allOnline);
            })

            return ()=> {
                socket.off('newUser');
                socket.off('onlineUsers');
            }
        }
    },[socket,chatSender])
 
    useEffect(()=> {
        if(!socket) return;
        const newFunc=async()=> {
            if(sendMsg) {
                const newMsg=await createMessage({text:sendMsg,sender:chatSender?._id,receiver:chatReceiver?._id});
                socket.emit('sendMessage',({
                    newMsg:newMsg.data,sender:chatSender?._id,receiver:chatReceiver?._id,name:chatSender?.username
                }));
                setSendMsg(null);
            }
        }
        newFunc();
    },[socket,sendMsg])
 
    useEffect(()=> {
        const newFunc=async()=> {
            if(deleteId) {
                await deleteMsg(deleteId);
                const newMessages=messages.filter((msg)=> msg._id !==deleteId);
                console.log('newMessages',newMessages);
                socket.emit('deleteMsg',({newMessages,sender:chatSender._id,receiver:chatReceiver._id}));
            }
        }
        newFunc();
    },[socket,deleteId])

    useEffect(()=> {
        if(typing) {
            socket.emit('startTyping',({sender:chatSender?._id,receiver:chatReceiver?._id}));
        } else if(!typing) {
            socket.emit('stopTyping',({sender:chatSender?._id,receiver:chatReceiver?._id}));
        }
    },[typing])

    useEffect(()=> {
        if(!socket) return;

        socket.on('receiveMsg',(newMsg)=> {
            console.log('message',newMsg);
            setMessages((prevMsgs)=> [...prevMsgs,newMsg]);
        })
        socket.on('notify',(newNotify)=> {
            setNewNotify({...newNotify});
            setNotifications((prev)=> [...prev,{...newNotify}]);
        })
        socket.on('delete',(messages)=> {
            setMessages(messages);
        })
        socket.on('setDeleted',(newMessages)=> {
            console.log('delete',newMessages);
            setMessages(newMessages);
        })
        socket.on('typing',({typingNow})=> {
            setTypingNow(typingNow);
        })

        return ()=> {
            socket.off('receiveMsg');
            socket.off('notify');
        }

    },[socket])


  return (
    <SocketContext.Provider value={{
        onlineUsers,
        setChatReceiver,
        setMessages,
        setChatRoom,
        setSendMsg,
        messages,
        setDeleteId,
        setTyping,
        typingNow,
        notifications,
        setNotifications,
        chatReceiver,
        chatSender,
        newNotify,
        setNewNotify,
        deleteMultiple,
        setDeleteMultiple,
        setDeleteTrue


    }}>
        {children}
    </SocketContext.Provider>
  )
}

