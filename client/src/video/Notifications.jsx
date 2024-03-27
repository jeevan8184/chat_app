import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { SocketContext } from './Context';

const Notifications = () => {
  const {call,answerCall,callAccepted}=useContext(SocketContext);

  return (
    <div className=' mt-10 pt-10'>
      {call.isReceived && !callAccepted && (
       <div className=''>
          <h3>{call.name} is calling...</h3>
          <Button fullWidth variant='contained' onClick={answerCall}>Answer</Button>
       </div>
      ) }
    </div>
  )
}

export default Notifications