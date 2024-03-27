import React, { useState } from 'react'
import { Button, Grid,TextField, Typography } from '@mui/material'
import { useContext } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhoneIcon from '@mui/icons-material/Phone'
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled'
import { SocketContext } from './Context';


const Sidebar = ({children}) => {
  const {name,setName,me,callAccepted,endedCall,callUser,leaveCall}=useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <div className=' mt-20 mb-10'>
         <div className='flex flex-row gap-2 '>
          <div className=' flex flex-col'>
            <Typography variant='h5'>Account Info</Typography>
            <TextField label='Names' value={name} onChange={(e)=> setName(e.target.value)} style={{width:"full"}} fullWidth/>
            <CopyToClipboard text={me} className='mt-2'>
               <Button variant='contained' fullWidth startIcon={<AssignmentIcon />} style={{marginTop:"6px"}}> Account Id</Button>
            </CopyToClipboard>
          </div>
          <div className=' flex flex-col ml-8'>
             <Typography variant='h6' gutterBottom >Make a call</Typography>
             <TextField value={idToCall} onChange={(e)=> setIdToCall(e.target.value)} fullWidth />
             {(callAccepted && !endedCall) ? (
              <Button variant='contained' color='error' startIcon={<PhoneDisabledIcon />} onClick={()=>leaveCall()} fullWidth>Hang Up</Button>
             ):(
              <Button variant='contained' startIcon={<PhoneIcon />} onClick={()=> callUser(idToCall)} fullWidth>Add Call</Button>
             )}
          </div>
         </div>
      {children}
    </div>
  )
}

export default Sidebar 
