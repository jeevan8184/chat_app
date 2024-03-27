import { Button, Dialog, DialogActions } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { RemoveMember } from '../../../api';
import { ChatGroupContext } from '../ChatGroupProvider';
import { SocketContext } from '../../ChatForm/ChatContext';

const GroupMember = ({member,orgGroup,fetchGroup}) => {
  const Navigate=useNavigate();
  const {chatSender}=useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteMember=async()=> {

    console.log('not working...');
      try {
        setIsDeleting(true);
        const group=await RemoveMember({memberId:member?._id,chatId:orgGroup._id});
        console.log("deleted group",group.data);
        await fetchGroup();

        setIsDeleting(false);
        setOpen(false);

      } catch (error) {
        console.log(error);
        setIsDeleting(false);
      }
  }

  return (
    <div className=' bg-gray-100 my-1 pr-2 rounded-md cursor-pointer'>
      <div className=' flex flex-row gap-2 flex-between' onClick={()=> Navigate(`/chatProfile/${member._id}`)}>
       <div className=' flex gap-2'>
       <img 
          src={member.profilePic} 
          alt='profile' 
          className=' h-14 w-14 rounded-full object-contain'
         />
         <div className=' flex flex-col'>
           <p className=' font-semibold text-md'>{member.username}</p>
           <p className=' w-[150px] truncate text-gray-600 '>{member.bio}</p>
         </div>
       </div>
       <div className=''>
       {orgGroup.creator===chatSender._id && (
              chatSender._id ===member._id ? (
                <button className=' text-blue-500 cursor-pointer' onClick={(e)=> e.stopPropagation()} >You</button>
              ) : (
               <button className=' cursor-pointer' onClick={(e)=> {
                 setOpen(true);
                 e.stopPropagation();
               }}>
                 <DeleteIcon />
             </button>
              )
       )}
            
       </div>
      </div>
        <div>
        <Dialog 
            open={open}
            onClose={()=> setOpen(false)}
        >
            <DialogActions className=' flex flex-col gap-2'>
                <button 
                    onClick={()=> {
                        handleDeleteMember();
                    }} 
                    className=' text-red-500 border px-4 py-2 rounded-xl w-full'
                    >
                      {isDeleting ? 'Deleting...':<p><span>Are you sure you want to</span> Delete </p> }
                </button>
                <button 
                    onClick={()=>setOpen(false)}
                    className=' border px-3 py-1 rounded-xl w-full'
                    >
                        cancel
                </button>
            </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default GroupMember