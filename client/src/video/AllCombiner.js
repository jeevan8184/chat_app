
import React from 'react'
import {Typography,Grid, AppBar} from '@mui/material'
import VideoPlayer from './VideoPlayer'
import Sidebar from './Sidebar'
import Notifications from './Notifications'

const AllCombiner = () => {
  return (
    <div className=' flex flex-col items-center  mb-20'>
       <div className=' w-[600px] mx-100 my-10'>
            <AppBar className=' rounded-xl' position='static' color=''>
                <Typography align='center' gutterBottom variant='h4' >Video Call</Typography>
            </AppBar>
       </div>
       <div className=' flex flex-col '>
       <VideoPlayer />
        <Sidebar >
            <Notifications />
        </Sidebar>
       </div>
    </div>
  )
}

export default AllCombiner

