
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import { ChatGroupContext } from './ChatGroupProvider';

const GroupInput = () => {
  const {setSendNewMessage}=useContext(ChatGroupContext);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const handleSend=()=> {
    if(text.trim() !=='') {
      setSendNewMessage(text);
      setText(''); 
    }
  }

  return (
    <div>
      <div className=' mb-2 flex-center '>
        <input 
          value={text}
          onChange={(e)=> setText(e.target.value)}
          placeholder='messages...'
          className=' w-80 rounded-full px-3 py-2'
          autoFocus
          onKeyDown={(e)=> e.key==='Enter' && handleSend()}

        />
        <Button onClick={()=> setOpen((prev)=> !prev) }>
          <EmojiEmotionsIcon />
        </Button>
        <div className=' absolute bottom-0'>
           {open && (
            <div className=''>
              <EmojiPicker 
                searchDisabled
                height={300}
                width={300}
                style={{fontSize:"2rem"}}
                onEmojiClick={(e)=> setText((prev)=> prev+e.emoji)}
                allowExpandReactions
              />
            </div>
           )}
        </div>
        <div className=''>
           <button className=' px-4 py-1 bg-slate-300 rounded-xl' onClick={handleSend}>
              <SendIcon className=' text-blue-500' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupInput;