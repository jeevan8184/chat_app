import React, { useContext, useState } from 'react'
import { ChatGroupContext } from '../ChatGroup/ChatGroupProvider'
import { UserContext } from '../MainContainer/UserContext';
import SelectUsers from './SelectUsers';
import DoneIcon from '@mui/icons-material/Done';
import SearchUsers from './SearchUsers';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AddMemberToGroup } from '../../api';
import GroupPage from '../MainContainer/groupCreation/GroupPage';

const SearchPage = () => {
    const {newGroup,setMembers}=useContext(ChatGroupContext);
    const {users}=useContext(UserContext);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const Navigate=useNavigate();
    const location=useLocation();
    const {pathname}=useLocation();
    const createChat=new URLSearchParams(location.search).get('createChat');

    const notGroupMembers=users.filter((u)=> !newGroup?.members.some((m)=> m._id===u._id));

    console.log('notGroupmembers',notGroupMembers);

    const handleAddMember=async()=> {
        const newMemberIds=selectedMembers.map((user)=> user._id);
        if(newMemberIds.length>0) {
            const addedGroup=await AddMemberToGroup({chatId:newGroup._id,newMemberIds});
            console.log('addedgroup',addedGroup.data);
        }
        setSelectedMembers([]);
        Navigate('/');
        window.location.reload();
    }

    console.log('createChat',createChat);

    const handlecreateChat=()=> {
        setMembers(selectedMembers);
        setSelectedMembers([]);
        Navigate('/page');
    }

  return (
    <div className=' md:flex flex-row gap-2 border'>
        <div className=' bg-gray-50 min-h-screen flex flex-col gap-2 border'>
           <div className='max-sm:w-full w-[600px]'>
                <div className=' px-3 flex-between'>
                    <h1 className=' py-4 text-xl font-semibold'>Select Users</h1>
                    <Button onClick={()=> createChat ? handlecreateChat() : handleAddMember() }><DoneIcon /></Button>
                </div>
                <div className=' px-3 py-2'>
                    <SearchUsers />
                </div>
                <div className=" flex flex-col gap-2  max-sm:w-full w-[600px] ">
                   {createChat ? (
                        users?.map((newUser,i)=> (
                        <div className=" flex flex-col gap-2 cursor-pointer" key={i}>
                            <SelectUsers 
                                newUser={newUser} 
                                setSelectedMembers={setSelectedMembers}
                                selectedMembers={selectedMembers}
                             />
                        </div>
                    ))
                   ): (
                    notGroupMembers &&  notGroupMembers?.map((newUser,i)=> (
                        <div className=" flex flex-col gap-2 cursor-pointer" key={i}>
                            <SelectUsers 
                                newUser={newUser} 
                                setSelectedMembers={setSelectedMembers}
                                selectedMembers={selectedMembers}
                             />
                        </div>  
                    ))
                   )}
                </div>
           </div>
        </div>
        <div className=' max-sm:hidden w-full '>
            {pathname.includes('/page') && (
                 <GroupPage />
            )}
        </div>
    </div>
  )
}

export default SearchPage


