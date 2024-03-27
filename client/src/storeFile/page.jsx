import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import FileBase64 from 'react-file-base64';
const socket=io('http://localhost:3001');

const Page = () => {
    
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [room, setRoom] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [username, setUsername] = useState('');
    const [typingUsers, setTypingUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [file, setFile] = useState(null);
    const [reactions, setReactions] = useState({});

    const handleTyping=()=> {
        socket.emit('typing',{username,room});
    }
    const handleStopTyping=()=> {
        socket.emit('stop_typing',{username,room});
    }
    const handleDelete=(msg)=> {
        socket.emit('delete_msg',{room:msg.room,msgId:msg.timestamp});
    }

    const handleFileUpload = () => {
        if(file) {
            socket.emit('send_file',{username,room,img:true,file});
        }
        setFile(null);
    };

    const handleReaction=(msgId,reaction,room,name)=> {
        socket.emit('add_reaction',{msgId,reaction,room,name});
    }

    useEffect(()=> {
        socket.on('user_typing',({username,isTyping})=> {
            setTypingUsers((prevUsers)=> {
                if(isTyping) {
                    return [...new Set([...prevUsers,username])];
                }else {
                    return prevUsers.filter((user)=> user !== username);
                }
            })
        })
        socket.on('add_rxn', ({ msgId, reaction, name }) => {
            setReactions((prevReactions) => ({
                ...prevReactions,
                [msgId]: [...(prevReactions[msgId] || []), { reaction, name }],
            }));

        });
        socket.on('receive_file', ({username,room,img,timestamp,file}) => {
            setMessages((prevMsg)=> [...prevMsg,{img,room,username,timestamp,file}]);
        });
        socket.on('receive_msg',(msg)=> {
            setMessages((prevMsgs)=> [...prevMsgs,{...msg,emojiRxn:reactions[msg.timestamp] || []}]);
        })
        socket.on('deleting_msg',(msgId)=> {
            setMessages((prevMsg)=> prevMsg.filter((msg)=> msg.timestamp !==msgId));
        })
        socket.on('online_users',({users,statuses})=> {
            setOnlineUsers(users);
            setStatuses(statuses);
        })
        socket.on('user_left',(leftUser)=> {
            setOnlineUsers((prevUsers)=> prevUsers.filter((user)=> user !==leftUser));
        })
        socket.on('disconnect',({room})=> {
            console.log(`${room} disconnected...`)
        }) 

        return ()=> {
            socket.off('receive_msg');
            socket.off('receive_file');
            socket.off('add_rxn');
        }
    },[socket,reactions]);

    const handleRoom=()=> {
        if(room.trim() !=="") {
            socket.emit('join_room',{room,username});
        }
        setIsJoining(true);
    }

    const handleMsg=()=> {
        if(text.trim() !== "") {
            socket.emit('send_msg',{text,room,username});
            setIsJoining(false);
            handleStopTyping();
        }
        setText('');
    }

    const handleLeaveRoom=()=> {
        socket.emit('leave_room',{room,username});
        setRoom('');
        setMessages([]);
        setOnlineUsers([]);
    }

  return (
    <div className=' mt-10 ml-10 mb-40'>
        <div className=' flex flex-col gap-2'>
            <h1 className=' text-2xl'> </h1>
            <div className=' flex gap-2 flex-col'>
               <div className=' flex gap-2'>
               <input 
                    type='text'
                    placeholder='Username'
                    autoFocus
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    className=' px-4 py-1 border rounded-xl border-gray-500'
                />
                <input 
                    type='text' 
                    placeholder='selectr room...'
                    value={room} 
                    onKeyDown={(e)=> e.key==='Enter' && handleRoom()}
                    onChange={(e)=> setRoom(e.target.value)}
                    className=' px-3 py-2 w-36 border border-gray-500 rounded-xl'
                />
               </div>
               <div className=' flex'>
               <button 
                    className={`rounded-full px-5 py-1 border ${
                        isJoining ? 'bg-gray-300' : 'bg-gray-100'
                      } active:bg-gray-400`}
                    onClick={handleRoom}
                    type=' button'
                >
                    Join Room
                </button>
                <button 
                    disabled={!room}
                    className={` rounded-full px-5 py-1 border text-white bg-red-500 active:bg-red-700 ${!room && ' bg-red-300 active:bg-red-300'} `}
                    onClick={handleLeaveRoom}
                    type=' button'
                >
                    Leave Room
                </button>
               </div>
            </div>
            <div className=''>
                {onlineUsers.map((user,i)=> (
                    <div className='' key={i}>
                        {user} {statuses[user]==='online'?'Online':'Offline'}
                    </div>
                ))}
            </div>
            <div className=' flex flex-col w-full gap-2 '>
                {messages.map((msg,idx)=> (
                    <div className=' flex flex-row items-center' key={idx}>
                    {msg.img ? (
                        <div className='gap-1 w-96 px-2 py-1 rounded-md bg-gray-300'>
                           <div className={` ${msg.sender===socket.id ? ' float-start':' float-start '}`}>
                                <p className=' font-semibold text-black '>{msg.username} {new Date(msg.timestamp).toLocaleTimeString()}</p>
                                <img src={msg.file} alt='images' height={350} width={350} className=' object-contain' />
                           </div>
                        </div>
                    ): (
                    <div className=' gap-1 w-96 px-2 py-1 rounded-md bg-gray-300'>
                        <div className={` ${msg.system && ' bg-gray-500 text-white text-center'} ${msg.sender===socket.id ? ' float-end font-bold text-xl text-green-500' : ' float-star font-bold text-xl text-red-500' }`} >
                           <p className=' text-black text-sm'>{msg.username} {new Date(msg.timestamp).toLocaleTimeString()}</p>
                           <p className=''>{msg.text}</p>
                           <div className=' flex gap-1'>
                            {msg.emojiRxn?.map((reaction,i)=> (
                                <div className='' key={i}>{reaction.name} reacted {reaction.reaction}</div>
                            ))}
                           </div>
                        </div>
                    </div>
                    )}
                    <div className=''>
                        <button type='button' className=' bg-red-500 px-4 py-1 rounded-full text-white active:bg-red-700' onClick={()=> handleDelete(msg)}>
                            Delete 
                        </button>
                        <button 
                            className=''
                            type='button'
                            onClick={()=> handleReaction(msg.timestamp,'👍',msg.room,msg.username)}
                        >
                            👍
                        </button>
                        <button 
                            className=''
                            type='button'
                            onClick={()=> handleReaction(msg.timestamp,'❤️',msg.room,msg.username)}
                        >
                            ❤️
                        </button>
                    </div>
                    </div>
                ))}
            </div>
            <div className=' text-center px-4 py-1 bg-gray-500 text-white rounded-full w-60'>
                {typingUsers.length>0 && (
                    <div className=''>
                        {typingUsers.length===1 ? 
                            `${typingUsers[0]} is typing...` : `${typingUsers.join(', ')} are typing...` 
                        }
                    </div>
                )}
            </div>
           <div className=' flex gap-3'>
                <FileBase64 multiple={false} 
                    onDone={({base64})=> setFile(base64)}
                />
                <button className=' px-4 py-1 text-sm rounded-full bg-gray-600 text-white' onClick={handleFileUpload}>Upload file</button>
           </div>
            <div className=' flex gap-2'>
                <>
                <input   
                    type='text' 
                    placeholder=' send msgs...'
                    value={text} 
                    onKeyDown={(e)=> e.key==='Enter' && handleMsg()}
                    onChange={(e)=>{
                        setText(e.target.value);
                        e.target.value ? handleTyping(): handleStopTyping();
                    }}
                    className=' px-3 py-2 w-80 border border-gray-400 rounded-full'
                />
                <button 
                    className=' rounded-full px-5 py-1 text-white bg-green-500 active:bg-green-600'
                    onClick={handleMsg}
                    type=' button'
                >
                    send msg
                </button>
                </>
            </div>
        </div>
    </div>
  )
}

export default Page

