import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createChat, fetchChatMessages, getUser, getUserWithId } from '../../api';
import {RotateLoader} from 'react-spinners'
import { SocketContext } from './ChatContext';
import MapMessages from './MapMessages';
import Input from './Input';
import ChatTopbar from './ChatTopbar';

const ChatMessages = () => {
    const {
        setChatReceiver,
        setMessages,
        messages,
        notifications,
        setNotifications,
        newNotify,
        setNewNotify,
        setChatRoom
    }=useContext(SocketContext);

    const {id}=useParams();
    const localData=JSON.parse(localStorage.getItem('profile'))?.data;
    const [user, setUser] = useState(null);
    const [mainUser, setMainUser] = useState(null);
    const [chat, setChat] = useState(null);
    const [isDeleteTrue, setisDeleteTrue] = useState(false);

    const ChatMsgRef=useRef();
    useEffect(() => {
        if (ChatMsgRef.current) {
            ChatMsgRef.current.scrollTop = ChatMsgRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(()=> {
        const newFunc=async()=> {
            const newUser=await getUserWithId(id);
            const mainUser=await getUser(localData?._id);
            setMainUser(mainUser.data);
            setUser(newUser.data);
        }
        newFunc();
    },[id])

    useEffect(()=> {
        if(user) {
            const useNotifies=notifications.map((n)=> n.sender===user?._id ? {...n,isRead:true}:n); 
            setNotifications(useNotifies);

            setNotifications((notifies)=> {
                return notifies.filter((n)=> n.isRead !==true)
            })
            setNewNotify(null);
        }
    },[newNotify,user])

    useEffect(()=> {
        const newFunc=async()=> {
            if(mainUser && user) {
                setChatReceiver(user);
                const newChat=await createChat({senderId:mainUser?._id,receiverId:user?._id});
                console.log('newChat.data',newChat.data);
                setChat(newChat.data);
                setChatRoom(newChat.data);

            }
        }
        newFunc();
    },[user,mainUser])

    useEffect(()=> {
        const newFunc=async()=> {
            if(chat) {
                const chatMsgs=await fetchChatMessages(chat?._id);
                console.log(chatMsgs.data);
                setMessages(chatMsgs.data);
            }
        }
        newFunc();
    },[chat]);

  return (
   <>
    {!user ? (
        <div className=' flex-center mt-10'>
             <RotateLoader />
        </div>
    ):(
        <div className=' w-full max-sm:w-full bg-gray-200 min-h-screen mx-auto rounded-xl flex flex-col justify-between'>
        <div className=''>  
                <ChatTopbar user={user} setisDeleteTrue={setisDeleteTrue}/>
            <div 
                className=' px-4 py-3 pb-4 mx-auto flex-grow'
            >
                <MapMessages messages={messages} mainUser={mainUser} isDeleteTrue={isDeleteTrue}/>
            </div>
        </div>
           <div className='bottom-1 mt-2'>
                <Input />
           </div>
        </div>
    )}
   </>
  )
}

export default ChatMessages;

