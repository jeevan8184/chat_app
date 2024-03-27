
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import GroupIcon from '@mui/icons-material/Group';
import { Button, Paper } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';           

const CreateChat = () => {

  const Navigate=useNavigate(); 

    const [moreOpt, setMoreOpt] = useState(false);

  return (

    <div>
        <div className=' relative'>
            <div className=' flex '>
             <div className=''>
                <button onClick={()=> setMoreOpt((prev)=> !prev) }>
                  <MoreHorizIcon />
                </button>
             </div>
             {moreOpt && (
                <Paper className=' absolute top-5 right-0 w-[150px] mt-4 rounded-md px-2 py-2  z-10' elevation={4}>
                    <div className=' flex gap-0 flex-col'>
                       <button 
                            className=' gap-0.5 add '
                            onClick={()=> {
                              Navigate(`/search?createChat=${true}`)
                              setMoreOpt(false);
                            }}
                        > 
                                <GroupIcon />
                                 create group
                            </button>
                       <p className=' add'>Share</p>
                    </div>
                </Paper>
             )}
            </div>
          </div>
    </div>
  )
}

export default CreateChat