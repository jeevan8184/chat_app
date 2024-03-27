
import React, { useContext, useState } from 'react'
import { SocketContext } from './ChatContext'
import { Button } from '@mui/material';
import EmojiPicker from 'emoji-picker-react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import SendIcon from '@mui/icons-material/Send'


const Input = () => {
    const {setSendMsg,setTyping}=useContext(SocketContext);

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);


    const handleSend=async()=> {
        if(text.trim() !=='') {           
            setSendMsg(text);
            setText('');
            setTyping(false);
        }
    }
    const handleTyping=()=> {
        setTyping(true);
    }
    const handleStopTyping=()=> {
        setTyping(false);
    }

  return (
    <div className=' bottom-1'>
          <div className=' mb-2 flex-center flex'>
        <input 
            placeholder='message...and' 
            value={text}
            onKeyDown={(e)=> e.key==='Enter' && handleSend()}
            onChange={(e)=>{
                setText(e.target.value);
                e.target.value ? handleTyping(): handleStopTyping();
            }}
            className=' px-3 py-2 w-80 rounded-full' 
        />
    <div className=' relative'>
        <Button onClick={()=> setOpen((prev)=> !prev)}>
            <EmojiEmotionsIcon />
        </Button>
        <div className=' absolute bottom-10 right-1'>
        {open && (
        <EmojiPicker 
            open={open}
            searchDisabled
            skinTonesDisabled
            allowExpandReactions
            onEmojiClick={(e)=> setText((prev)=> prev+e.emoji)} 
            height={300} 
            width={300} 
            style={{fontSize:"2rem"}}
        />
        )}
            </div>
        </div>
    
        <button className=' px-4 py-1 bg-slate-300 rounded-xl' onClick={handleSend}>
            <SendIcon className=' text-blue-500' />
        </button>
    </div>
    </div>
  )
}

export default Input