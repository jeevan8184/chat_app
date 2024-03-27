import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUser } from '../../../api';
import { RotateLoader } from 'react-spinners';
import { Divider } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { SocketContext } from '../ChatContext';

const MainChtProfile = () => {
    const {chatSender}=useContext(SocketContext);
    const {userId}=useParams();
    const [orgUser, setOrgUser] = useState(null);
    const Navigate=useNavigate();
    
    useEffect(()=> {
        const newFunc=async()=> {
            if(userId) {
                const newUser=await fetchUser(userId);
                setOrgUser(newUser.data);
            }
        }
        newFunc();
    },[userId]);

    const handleUpdateProfile=async()=> {
        Navigate(`/onbaording/update?userId=${chatSender._id}`);
    }

  return (
    <div className=' flex w-full'>
        <div className=' flex w-full'>
            {!orgUser ? (
                <div className=' flex-center'>
                    <RotateLoader />
                </div>
            ):(
                <div className=' max-sm:w-full w-[600px] bg-gray-50 h-full min-h-screen md:px-3 px-1'>
                    <div className=' flex flex-col gap-2'>
                        <h1 className=' flex-center text-2xl font-bold py-2'>{orgUser.username}</h1>
                        <img 
                            src={orgUser.profilePic}   
                            alt='profile'
                            className=' h-60 w-60 rounded-3xl flex-center text-center mx-auto'
                        />
                        <Divider className=' py-2 px-2' />
                        {orgUser._id === chatSender._id && (
                            <div className=''>
                               <button  
                                   onClick={handleUpdateProfile}
                                   className=' flex gap-1 font-bold hover:bg-gray-300 rounded-xl px-3 py-0.5'>
                                       <CreateIcon /> update 
                               </button>
                           </div>
                        )}
                        <div className=''>
                            <p className=''><span className=' font-semibold'>Email : </span>{orgUser.author.email} </p>
                        </div>
                    </div>
                    <div className='py-2 flex flex-col gap-1'>
                        {orgUser.groups.map((g)=> (
                            <div className=' bg-gray-100 my-1 rounded-md cursor-pointer'>
                            <div className=' flex flex-row gap-2 flex-between' onClick={()=> Navigate(`/groupProfile/${g._id}`)}>
                             <div className=' flex gap-2'>
                             <img 
                                src={g.profilePic} 
                                alt='profile' 
                                className=' h-14 w-14 rounded-full object-contain'
                               />
                               <div className=' flex flex-col'>
                                 <p className=' font-semibold text-md'>{g.groupName}</p>
                                 <p className=' w-[150px] truncate text-gray-600 '>{g.bio}</p>
                               </div>
                             </div>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default MainChtProfile