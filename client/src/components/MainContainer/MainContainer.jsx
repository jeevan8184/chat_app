import React, { useEffect } from 'react'
import Topbar from '../Topbar/Topbar'
import { Container } from '@mui/material'
import Pages from './Pages'
import ChatForm from '../ChatForm/ChatForm'

const MainContainer = () => {

  return (
    <div className=' xl:flex'>
     <div className=' bg-gray-50 max-sm:w-full md:w-[600px] sm:px-10 min-h-screen'>
        <Pages />
      </div>
      <div className=' max-md:flex'>

      </div>
    </div>
  )
}

export default MainContainer