

import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { fetchGroupDetails } from '../../../api';
import { RotateLoader } from 'react-spinners';
import GroupMember from './GroupMember';
import MainChtProfile from '../../ChatForm/ChatProfile/MainChtProfile';
import { Divider } from '@mui/material';

const MainProfile = () => {
    const {groupId}=useParams();
    const [orgGroup, setOrgGroup] = useState(null);
    const {pathname}=useLocation();

    const fetchGroup=async()=> {
        if(groupId) {
            const newGroup=await fetchGroupDetails(groupId);
            setOrgGroup(newGroup.data);
       }
    }

    useEffect(()=> {
        fetchGroup();
    },[groupId]);

  return (
    <div>
      <div className=' md:flex flex-row gap-1 pb-10'>
        <div className=''>
            {!orgGroup ? (
                <div className=' text-center mt-10 flex-center'>  
                    <RotateLoader />
                </div>
            ):(
                <div className=' max-sm:w-full w-[600px] bg-gray-50 h-full min-h-screen md:px-3 px-1'>
                    <div className=''>
                        <h1 className=' font-bold text-3xl py-2 flex-center mx-auto'>{orgGroup.groupName}</h1>
                        <img 
                            src={orgGroup.profilePic} 
                            alt='profile'
                            className=' h-60 w-60 rounded-3xl mx-auto'
                         />
                         <p className=' font-semibold text-xl '>{orgGroup.bio}</p>
                        <Divider className=' py-2' />
                    </div>
                    <div className=''>
                        <h1 className=' text-xl font-semibold'>Group Members</h1>
                        {orgGroup.members.map((member)=> (
                            <div className='' key={member._id}>
                                <GroupMember member={member} orgGroup={orgGroup} fetchGroup={fetchGroup} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
         <div className=''>
            {pathname.includes('/chatProfile') && (
                <div className=''>
                    <MainChtProfile />
                </div>
            )}
         </div>
        </div>
    </div>
  )
}

export default MainProfile;