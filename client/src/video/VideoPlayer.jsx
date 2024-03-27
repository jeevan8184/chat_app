import React from 'react'
import { useContext } from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { SocketContext } from './Context';

const VideoPlayer = () => {
  const {myVideo,userVideo,name,stream,endedCall,callAccepted}=useContext(SocketContext);
  console.log('stream',stream);
  return (
    <div className=' mb-10'>
      <Grid container className=''>
         {/* {stream && ( */}
            <Paper elevation={4} style={{padding:'20px 0px'}}>
               <Typography gutterBottom variant='h5'>{name || 'Name'}</Typography>
               <div className=' w-[100px] h-[100px]'>
                  <video playsInline muted ref={myVideo} autoPlay className=' w-full p-6' />
               </div>
            </Paper>
         {/* )} */}

        {callAccepted &&  !endedCall && (
            <Paper elevation={4} className=''>
               <Typography gutterBottom variant='h5'>{name || 'Name'}</Typography>
               <video playsInline ref={userVideo} autoPlay className=' w-[550px] md:w-[300px]' />
            </Paper>
         )}
      </Grid>
    </div>
  )
}

export default VideoPlayer