
import React, { useContext, useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { SocketContext } from './ChatContext';
import { Button, Checkbox } from '@mui/material';
import ScrollToBottom from 'react-scroll-to-bottom';

const MapMessages = ({messages,mainUser,isDeleteTrue}) => {
    const {setDeleteId,setDeleteMultiple,deleteMultiple}=useContext(SocketContext);     

    const scroll=useRef();
    const [open, setOpen] = useState(false);
    const [openMsgId, setOpenMsgId] = useState(null);
    const [openMore, setOpenMore] = useState(null);

    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    
    },[messages])

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
    <ScrollToBottom>
    <div className=' flex overflow-y-auto flex-col gap-1 mx-auto'>
        {messages.length>0 &&  messages?.map((msg)=> (  
            <div className=' gap-0' key={msg._id}> 
                <div className=' cursor-pointer w-full'
                    onClick={()=> !isDeleteTrue ? setOpenMore(msg._id) : handleChange(msg) }
                    >
                    <div className={`${mainUser?._id===msg.sender ? "mainUser":"user "} ${deleteMultiple.includes(msg) && ' bg-blue-500 text-red-400'}`}

                        >
                       <div className='' >
                         <p className=' text-[13px]'>{new Date(msg.createdAt).toLocaleTimeString()}</p>
                         <p className=''> {msg.text}</p>
                       </div>
                    </div>  
                </div>
                <div className={`${mainUser?._id===msg.sender ? "float-end":"float-start"}`}>
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
                            <div className={`absolute top-6 bg-white px-3 py-1 rounded-md z-10 ${mainUser?._id===msg.sender ? " right-3":" left-3"}`}>
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
    </ScrollToBottom>
  )
}

export default MapMessages