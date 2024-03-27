
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SocketContext } from '../ChatForm/ChatContext'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChatGroupContext } from './ChatGroupProvider';

const MapGroupMessages = ({messages,isDeleteTrue}) => {
  const {chatSender}=useContext(SocketContext);
  const {setDeleteMultiple,setDeleteId,deleteMultiple}=useContext(ChatGroupContext);
  const scroll=useRef();

  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  },[messages])

  const [open, setOpen] = useState(false);
  const [openMsgId, setOpenMsgId] = useState(null);
  const [openMore, setOpenMore] = useState(null);

  const handleDelete=(id)=> {
    setDeleteId(id);
  }

  
  const handleChange=(msg)=> {
    if(!deleteMultiple.includes(msg)) {
        setDeleteMultiple((prev)=> ([...prev,msg]));
    } else {
        setDeleteMultiple((prev)=> {
            return prev.filter((d)=> d !==msg)
        })
    }
}

  return (
    <div>
        <div className=' flex overflow-y-auto flex-col gap-1'>
        {messages.length>0 &&  messages?.map((msg)=> (  
            <div className=' gap-0 ' key={msg._id}> 
                <div  
                    className={`cursor-pointer w-full `} 
                    onClick={()=> !isDeleteTrue ? setOpenMore(msg._id) : handleChange(msg) }
                 >
                    <div className={`${chatSender?._id===msg.sender._id ? "mainUser":"user "} ${deleteMultiple.includes(msg) && ' bg-blue-500 text-red-400'}`} 
                        >
                       <div className='' >
                         <p className=' text-[10px]'>{new Date(msg.createdAt).toLocaleTimeString()}</p>
                         <p className=' text-[13px]'>{msg.sender.username}</p>
                         <p className=''> {msg.text}</p>
                       </div>
                    </div>  
                </div>
                <div className={`${chatSender?._id===msg.sender._id ? "float-end":"float-start"}`}>
                    <div className=' flex-center text-center mt-2 ml-0 relative'>
                        {openMore===msg._id && (
                             <Button onClick={()=> {
                                setOpen((prev)=> !prev)
                                setOpenMsgId(msg._id)
                            }}>
                                <MoreVertIcon className=' cursor-pointer' fontSize='small' />
                               
                            </Button>
                        )}
                        {open && openMsgId===msg._id && (
                            <div className={`absolute top-6 bg-white px-3 py-1 rounded-md z-10 ${chatSender?._id===msg.sender._id ? " right-3":" left-3"}`}>
                                <div className=' flex flex-col'>
                                    <button className=' flex gap-1' onClick={()=> handleDelete(msg._id)}>
                                        <DeleteIcon fontSize='small' className='' /> 
                                        <p>Delete</p>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ))}
        <div ref={scroll} />
    </div>
    </div>
  )
}

export default MapGroupMessages