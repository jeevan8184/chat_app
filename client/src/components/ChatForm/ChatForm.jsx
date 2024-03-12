
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../api';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client'

const socket=io('http://localhost:8002');

const ChatForm = () => {
  const localUser=JSON.parse(localStorage.getItem('profile')).data;

  const {id}=useParams();
  const Navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [mainUser, setMainUser] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const handleSend=()=> {
    if(text.trim() !=='') {
      console.log('text',text);
      socket.emit('send_msg',{text,username:mainUser.username});
    }
    setText('');
  }

  useEffect(()=> {
    const newFunc=async()=> {
      const data=await getUser(id);
      const mainData=await getUser(localUser._id);
      console.log(data.data);
      setUser(data.data);
      setMainUser(mainData.data);
    }
    newFunc();
  },[id])

  useEffect(()=> {
    socket.on('receive_msg',(msg)=> {
      console.log(msg);
      setMessages((prevMesgs)=> ([...prevMesgs,msg]))
    })
    return ()=> {
      socket.off('receive_msg');
    }
  },[socket]);

  return (
    <div className=' max-w-3xl mx-auto bg-neutral-200  border min-h-screen flex justify-between flex-col'>
        <div className=' w-full'>
        <div className='py-1 bg-blue-400 text-white px-2 flex items-center gap-2'>
          <button onClick={()=> Navigate(-1)}><ArrowBackIcon fontSize='small' /></button>
          <img src={user?.profilePic} alt='profilePic' height={30} width={30} className=' rounded-full object-contain cursor-pointer ml-1' />
          <div className=' flex flex-col'>
            <p className=' font-semibold'>{user?.username}</p>
          </div>
        </div>
        <div className=' flex flex-col w-full'>
          {messages.map((newMsg,i)=> (
          <div className=' w-full' key={i}>
             <div className={` flex flex-col w-full ${newMsg.sender===socket.id ? ' float-end font-bold text-xl text-green-500 flex-end' : ' flex-start font-bold text-xl text-red-500' }`} >
              <p className=' text-black text-sm'> {new Date(newMsg.timestamp).toLocaleTimeString()}</p>
              <p className=''>{newMsg.text}</p>
           </div>
          </div>
          ))}
        </div>
        </div>
        <div className=' mb-2 px-auto flex-center w-full gap-2'>
          <input 
            type='text' 
            placeholder='message ' 
            className=' px-6 py-2 w-80 rounded-xl text-black'
            value={text}
            onKeyDown={(e)=> e.key==='Enter' && handleSend() }
            onChange={(e)=> setText(e.target.value)}
          />
          <button className=' px-4 py-1 rounded-lg bg-slate-300' onClick={handleSend}>
            <SendIcon className=' text-blue-500' />
          </button>
        </div>
    </div>
  )
}

export default ChatForm;